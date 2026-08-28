import { Client } from 'ssh2';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const configContent = fs.readFileSync(path.resolve(__dirname, '../server/centrifugo/config.json'), 'utf8');
const configB64 = Buffer.from(configContent, 'utf8').toString('base64');

const conn = new Client();
conn.on('ready', () => {
  console.log('SSH Connection Ready! Writing config via base64...');

  const cmd = `
    echo 'Ali15091985@@' | sudo -S mkdir -p /data/centrifugo &&
    echo '${configB64}' | base64 -d | sudo tee /data/centrifugo/config.json > /dev/null &&
    echo 'Ali15091985@@' | sudo -S chmod 644 /data/centrifugo/config.json &&
    echo 'Ali15091985@@' | sudo -S docker stop bricolemoi-centrifugo 2>/dev/null || true &&
    echo 'Ali15091985@@' | sudo -S docker rm bricolemoi-centrifugo 2>/dev/null || true &&
    echo 'Ali15091985@@' | sudo -S docker run -d \
      --name bricolemoi-centrifugo \
      --restart unless-stopped \
      -p 8800:8000 \
      -v /data/centrifugo/config.json:/centrifugo/config.json \
      centrifugo/centrifugo:v5 \
      centrifugo -c /centrifugo/config.json &&
    echo "=== CENTRIFUGO CONTAINER RELAUNCHED ===" &&
    sleep 2 &&
    echo 'Ali15091985@@' | sudo -S docker logs --tail 25 bricolemoi-centrifugo
  `;

  conn.exec(cmd, (err, stream) => {
    if (err) throw err;
    stream.on('close', (code) => {
      console.log('Relaunch script finished with exit code:', code);
      conn.end();
      process.exit(0);
    }).on('data', (data) => {
      console.log(data.toString());
    }).stderr.on('data', (data) => {
      console.error('STDERR:', data.toString());
    });
  });
}).connect({
  host: '51.255.46.206',
  port: 22,
  username: 'debian',
  password: 'Ali15091985@@'
});
