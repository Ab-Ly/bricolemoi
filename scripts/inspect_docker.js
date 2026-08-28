import { Client } from 'ssh2';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const configJson = fs.readFileSync(path.resolve(__dirname, '../server/centrifugo/config.json'), 'utf8');

const conn = new Client();
conn.on('ready', () => {
  console.log('SSH Connection Ready!');

  const remoteCmd = `
    docker inspect bricolemoi-centrifugo | grep -A 10 "Mounts"
  `;

  conn.exec(remoteCmd, (err, stream) => {
    if (err) throw err;
    stream.on('close', (code, signal) => {
      conn.end();
      process.exit(0);
    }).on('data', (data) => {
      console.log('STDOUT:\n' + data);
    }).stderr.on('data', (data) => {
      console.log('STDERR:\n' + data);
    });
  });
}).connect({
  host: '51.255.46.206',
  port: 22,
  username: 'debian',
  password: 'Ali15091985@@'
});
