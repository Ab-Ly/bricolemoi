import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  const cmd = `
    cat /data/coolify/services/au7ogglkufljgj6rppgwupzz/docker-compose.yml 2>/dev/null || true
  `;

  conn.exec(cmd, (err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
      conn.end();
      process.exit(0);
    }).on('data', (data) => {
      console.log('COOLIFY COMPOSE:\n' + data.toString());
    });
  });
}).connect({
  host: '51.255.46.206',
  port: 22,
  username: 'debian',
  password: 'Ali15091985@@'
});
