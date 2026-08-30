import { Client } from 'ssh2';

const conn = new Client();

conn.on('ready', () => {
  console.log('Inspecting Coolify configuration and projects...');
  const cmd = `
    docker exec coolify-db psql -U coolify -d coolify -c "SELECT id, name, description FROM projects;"
    docker exec coolify-db psql -U coolify -d coolify -c "SELECT id, name, type, fqdn FROM applications LIMIT 5;" || true
    docker exec coolify-db psql -U coolify -d coolify -c "SELECT id, name, fqdn FROM services LIMIT 5;" || true
  `;
  conn.exec(cmd, (err, stream) => {
    if (err) throw err;
    stream.on('close', () => { conn.end(); process.exit(0); })
      .on('data', (d) => process.stdout.write(d))
      .stderr.on('data', (d) => process.stderr.write(d));
  });
}).connect({
  host: '51.255.46.206',
  port: 22,
  username: 'debian',
  password: 'Ali15091985@@'
});
