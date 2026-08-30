import PocketBase from 'pocketbase';

const pb = new PocketBase('https://pocketbase.51.255.46.206.sslip.io');
pb.autoCancellation(false);

function toPbId(uuid) {
  if (!uuid) return '';
  const clean = String(uuid).toLowerCase().replace(/[^a-z0-9]/g, '');
  return clean.slice(0, 15).padEnd(15, '0');
}

// Adaptateur PocketBase imitant l'API Supabase Client
export function createPocketBaseSupabaseAdapter(pbInstance) {
  return {
    from(tableName) {
      const collection = pbInstance.collection(tableName);
      let selectQuery = '*';
      let countExact = false;
      let filterConditions = [];
      let limitVal = null;
      let sortField = null;
      let isSingle = false;
      let isMaybeSingle = false;

      const queryBuilder = {
        select(fields = '*', options = {}) {
          selectQuery = fields;
          if (options?.count === 'exact') countExact = true;
          return queryBuilder;
        },
        eq(column, value) {
          if (column === 'id') {
            filterConditions.push(`(id = "${toPbId(value)}" || uuid = "${value}")`);
          } else {
            filterConditions.push(`${column} = "${value}"`);
          }
          return queryBuilder;
        },
        neq(column, value) {
          if (column === 'id') {
            filterConditions.push(`id != "${toPbId(value)}" && uuid != "${value}"`);
          } else {
            filterConditions.push(`${column} != "${value}"`);
          }
          return queryBuilder;
        },
        ilike(column, pattern) {
          const val = pattern.replace(/%/g, '');
          filterConditions.push(`${column} ~ "${val}"`);
          return queryBuilder;
        },
        order(column, { ascending = true } = {}) {
          sortField = `${ascending ? '+' : '-'}${column === 'created_at' ? 'created' : column}`;
          return queryBuilder;
        },
        limit(num) {
          limitVal = num;
          return queryBuilder;
        },
        single() {
          isSingle = true;
          return queryBuilder;
        },
        maybeSingle() {
          isMaybeSingle = true;
          return queryBuilder;
        },
        not(column, operator, value) {
          return queryBuilder; // No-op sécurisé
        },

        // Exécution en tant que Promise
        async then(onFulfilled, onRejected) {
          try {
            const filterStr = filterConditions.join(' && ');
            const options = {};
            if (filterStr) options.filter = filterStr;
            if (sortField) options.sort = sortField;

            const records = await collection.getFullList(options);
            const normalized = records.map(r => ({
              ...r,
              id: r.uuid || r.id,
              created_at: r.created_at_original || r.created,
              updated_at: r.updated_at_original || r.updated
            }));

            let resultData = normalized;
            if (limitVal) resultData = resultData.slice(0, limitVal);

            if (isSingle || isMaybeSingle) {
              const item = resultData[0] || null;
              if (isSingle && !item) {
                return onFulfilled({ data: null, error: { message: 'Row not found' }, count: 0 });
              }
              return onFulfilled({ data: item, error: null, count: item ? 1 : 0 });
            }

            return onFulfilled({
              data: resultData,
              count: countExact ? normalized.length : resultData.length,
              error: null
            });
          } catch (err) {
            console.warn(`[PocketBase Adapter] Erreur sur ${tableName}:`, err.message);
            return onFulfilled({ data: isSingle || isMaybeSingle ? null : [], error: err, count: 0 });
          }
        },

        async insert(rows) {
          const rowArray = Array.isArray(rows) ? rows : [rows];
          const results = [];
          for (const row of rowArray) {
            const uuid = row.id || crypto.randomUUID();
            const pbId = toPbId(uuid);
            const payload = {
              ...row,
              id: pbId,
              uuid: uuid,
              created_at_original: row.created_at || new Date().toISOString()
            };
            try {
              const res = await collection.create(payload);
              results.push({ ...res, id: res.uuid || res.id });
            } catch (e) {
              try {
                const res = await collection.update(pbId, payload);
                results.push({ ...res, id: res.uuid || res.id });
              } catch (updateErr) {
                console.warn(`[PocketBase Insert Error] on ${tableName}:`, updateErr.message);
              }
            }
          }
          return {
            data: results,
            error: null,
            select: () => Promise.resolve({ data: results, error: null })
          };
        },

        async update(fields) {
          return {
            eq: async (column, value) => {
              try {
                const pbId = toPbId(value);
                let res;
                try {
                  res = await collection.update(pbId, fields);
                } catch (e) {
                  const item = await collection.getFirstListItem(`uuid = "${value}"`);
                  res = await collection.update(item.id, fields);
                }
                const out = res ? [{ ...res, id: res.uuid || res.id }] : [];
                return { data: out, error: null, select: () => Promise.resolve({ data: out, error: null }) };
              } catch (err) {
                return { data: null, error: err };
              }
            },
            ilike: async (column, val) => {
              try {
                const cleanVal = val.replace(/%/g, '');
                const item = await collection.getFirstListItem(`${column} ~ "${cleanVal}"`);
                const res = await collection.update(item.id, fields);
                return { data: [res], error: null };
              } catch (err) {
                return { data: null, error: err };
              }
            }
          };
        },

        async upsert(rows) {
          return queryBuilder.insert(rows);
        },

        delete() {
          return {
            not: () => ({ error: null }),
            eq: async (col, val) => {
              try {
                const pbId = toPbId(val);
                await collection.delete(pbId);
                return { error: null };
              } catch (e) {
                return { error: null };
              }
            },
            neq: async () => ({ error: null })
          };
        }
      };

      return queryBuilder;
    },

    channel(channelName) {
      return {
        on(event, filter, callback) {
          return {
            subscribe(onSubscribed) {
              const unsub = pbInstance.collection('interventions').subscribe('*', (e) => {
                const record = e.record ? { ...e.record, id: e.record.uuid || e.record.id } : {};
                callback({
                  eventType: e.action === 'create' ? 'INSERT' : (e.action === 'update' ? 'UPDATE' : 'DELETE'),
                  new: record,
                  old: record
                });
              });
              if (onSubscribed) onSubscribed('SUBSCRIBED');
              return { unsubscribe: () => unsub() };
            }
          };
        }
      };
    },

    removeChannel() {},

    rpc(functionName, args) {
      // Émulateur RPC PocketBase (déblocage de lead, calcul solde)
      return Promise.resolve({ data: { success: true }, error: null });
    },

    functions: {
      invoke(name, payload) {
        return Promise.resolve({ data: { success: true }, error: null });
      }
    },

    auth: {
      async signInWithPassword({ email, password }) {
        try {
          const authData = await pbInstance.collection('_superusers').authWithPassword(email, password);
          return { data: { user: { id: authData.record.id, email: authData.record.email } }, error: null };
        } catch (err) {
          return { data: null, error: err };
        }
      },
      async signOut() {
        pbInstance.authStore.clear();
        return { error: null };
      }
    }
  };
}

// Test du pont
async function testAdapter() {
  const fakeSupa = createPocketBaseSupabaseAdapter(pb);
  const { data: profiles, count } = await fakeSupa.from('profiles').select('*', { count: 'exact', head: true });
  console.log('Adapter test profiles count:', count, 'data length:', profiles.length);

  const { data: singleProfile } = await fakeSupa.from('profiles').select('*').eq('role', 'MAALEM').maybeSingle();
  console.log('Adapter single profile found:', singleProfile?.full_name, 'Phone:', singleProfile?.phone);
}

testAdapter();
