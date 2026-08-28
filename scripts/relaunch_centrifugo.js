import { Client } from 'ssh2';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const configContent = fs.readFileSync(path.resolve(__dirname, '../server/centrifugo/config.json'), 'utf8');
const configB64 = Buffer.from(configContent, 'utf8').toString('base64');

const conn = new Client();
conn.on('ready', () => {
  console.log('SSH Connection Ready! Launching Centrifugo with clean Traefik labels...');

  const dockerRunCmd = [
    "echo 'Ali15091985@@' | sudo -S mkdir -p /data/centrifugo",
    `echo '${configB64}' | base64 -d | sudo tee /data/centrifugo/config.json > /dev/null`,
    "echo 'Ali15091985@@' | sudo -S chmod 644 /data/centrifugo/config.json",
    "echo 'Ali15091985@@' | sudo -S docker stop bricolemoi-centrifugo 2>/dev/null || true",
    "echo 'Ali15091985@@' | sudo -S docker rm bricolemoi-centrifugo 2>/dev/null || true",
    "echo 'Ali15091985@@' | sudo -S docker run -d " +
      "--name bricolemoi-centrifugo " +
      "--restart unless-stopped " +
      "--network coolify " +
      "-p 8800:8000 " +
      "-v /data/centrifugo/config.json:/centrifugo/config.json " +
      '-l "traefik.enable=true" ' +
      '-l "traefik.docker.network=coolify" ' +
      '-l \'traefik.http.routers.centrifugo-http.rule=Host(`centrifugo.51.255.46.206.sslip.io`)\' ' +
      '-l "traefik.http.routers.centrifugo-http.entrypoints=http" ' +
      '-l "traefik.http.routers.centrifugo-http.middlewares=redirect-to-https@docker" ' +
      '-l \'traefik.http.routers.centrifugo-https.rule=Host(`centrifugo.51.255.46.206.sslip.io`)\' ' +
      '-l "traefik.http.routers.centrifugo-https.entrypoints=https" ' +
      '-l "traefik.http.routers.centrifugo-https.tls=true" ' +
      '-l "traefik.http.routers.centrifugo-https.tls.certresolver=letsencrypt" ' +
      '-l "traefik.http.services.centrifugo.loadbalancer.server.port=8000" ' +
      "centrifugo/centrifugo:v5 " +
      "centrifugo -c /centrifugo/config.json",
    "echo '=== CENTRIFUGO RELAUNCH COMPLETED ==='",
    "sleep 3",
    "echo 'Ali15091985@@' | sudo -S docker logs --tail 10 bricolemoi-centrifugo"
  ].join(' && ');

  conn.exec(dockerRunCmd, (err, stream) => {
    if (err) throw err;
    stream.on('close', (code) => {
      console.log('Finished with exit code:', code);
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
