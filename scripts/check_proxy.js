import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  console.log('SSH Connection Ready! Checking proxy & docker containers...');

  const cmd = `
    docker ps --format "table {{.Names}}\t{{.Ports}}\t{{.Status}}"
  `;

  conn.exec(cmd, (err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
      conn.end();
      process.exit(0);
    }).on('data', (data) => {
      console.log(data.toString());
    });
  });
}).connect({
  host: '51.255.46.206',
  port: 22,
  username: 'debian',
  password: 'Ali15091985@@'
});
