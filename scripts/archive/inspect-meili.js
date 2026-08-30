import { Client } from 'ssh2';

const conn = new Client();

conn.on('ready', () => {
  const cmd = `
    docker exec coolify-db psql -U coolify -d coolify -c "SELECT uuid, name, environment_id, server_id, destination_id, destination_type, service_type FROM services WHERE name = 'meilisearch';"
    docker exec coolify-db psql -U coolify -d coolify -c "SELECT docker_compose_raw FROM services WHERE name = 'meilisearch';"
    docker exec coolify-db psql -U coolify -d coolify -c "SELECT * FROM service_applications WHERE service_id = 3;"
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
