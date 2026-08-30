import { Client } from 'ssh2';

const conn = new Client();

conn.on('ready', () => {
  console.log('Relaunching PocketBase with exact volume /pb_data & env credentials...');

  const cmd = `
    docker rm -f bricolemoi-pocketbase || true

    docker run -d \\
      --name bricolemoi-pocketbase \\
      --restart unless-stopped \\
      --network coolify \\
      -p 8090:8090 \\
      -v /var/lib/bricolemoi-pocketbase/pb_data:/pb_data \\
      -e PB_ADMIN_EMAIL="admin@bricolemoi.ma" \\
      -e PB_ADMIN_PASSWORD="BricoleMoi2026!Securise" \\
      --label "traefik.enable=true" \\
      --label "traefik.docker.network=coolify" \\
      --label 'traefik.http.routers.pocketbase-http.entrypoints=http' \\
      --label 'traefik.http.routers.pocketbase-http.middlewares=redirect-to-https@docker' \\
      --label 'traefik.http.routers.pocketbase-http.rule=Host(\`pocketbase.51.255.46.206.sslip.io\`)' \\
      --label 'traefik.http.routers.pocketbase-https.entrypoints=https' \\
      --label 'traefik.http.routers.pocketbase-https.rule=Host(\`pocketbase.51.255.46.206.sslip.io\`)' \\
      --label 'traefik.http.routers.pocketbase-https.tls=true' \\
      --label 'traefik.http.routers.pocketbase-https.tls.certresolver=letsencrypt' \\
      --label 'traefik.http.services.pocketbase.loadbalancer.server.port=8090' \\
      ghcr.io/muchobien/pocketbase:latest

    sleep 3
    docker logs --tail 25 bricolemoi-pocketbase
  `;

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
