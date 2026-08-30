import { Client } from 'ssh2';

const conn = new Client();

conn.on('ready', () => {
  const cmd = `docker exec bricolemoi-pocketbase /usr/local/bin/pocketbase superuser upsert admin@bricolemoi.ma "BricoleMoi2026!Securise"`;
  conn.exec(cmd, (err, stream) => {
    if (err) throw err;
    stream.on('close', (code) => {
      conn.end();
      process.exit(code || 0);
    }).on('data', (d) => process.stdout.write(d))
      .stderr.on('data', (d) => process.stderr.write(d));
  });
}).connect({
  host: '51.255.46.206',
  port: 22,
  username: 'debian',
  password: 'Ali15091985@@'
});
