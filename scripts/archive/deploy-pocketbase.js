import { Client } from 'ssh2';

const conn = new Client();

conn.on('ready', () => {
  console.log('SSH Connection Ready! Starting PocketBase deployment...');

  const remoteScript = `
    set -e
    echo "1. Creating persistent data directory..."
    sudo mkdir -p /var/lib/bricolemoi-pocketbase/pb_data
    sudo chown -R 1000:1000 /var/lib/bricolemoi-pocketbase/pb_data || true

    echo "2. Pulling PocketBase Docker image..."
    docker pull ghcr.io/muchobien/pocketbase:latest

    echo "3. Removing any existing container..."
    docker rm -f bricolemoi-pocketbase || true

    echo "4. Running bricolemoi-pocketbase container on network coolify..."
    docker run -d \\
      --name bricolemoi-pocketbase \\
      --restart unless-stopped \\
      --network coolify \\
      -p 8090:8090 \\
      -v /var/lib/bricolemoi-pocketbase/pb_data:/pb/pb_data \\
      --label "traefik.enable=true" \\
      --label "traefik.docker.network=coolify" \\
      --label "traefik.http.routers.pocketbase-http.entrypoints=http" \\
      --label "traefik.http.routers.pocketbase-http.middlewares=redirect-to-https@docker" \\
      --label "traefik.http.routers.pocketbase-http.rule=Host(\`pocketbase.51.255.46.206.sslip.io\`)" \\
      --label "traefik.http.routers.pocketbase-https.entrypoints=https" \\
      --label "traefik.http.routers.pocketbase-https.rule=Host(\`pocketbase.51.255.46.206.sslip.io\`)" \\
      --label "traefik.http.routers.pocketbase-https.tls=true" \\
      --label "traefik.http.routers.pocketbase-https.tls.certresolver=letsencrypt" \\
      --label "traefik.http.services.pocketbase.loadbalancer.server.port=8090" \\
      ghcr.io/muchobien/pocketbase:latest

    echo "5. Checking container status..."
    sleep 3
    docker ps --filter "name=bricolemoi-pocketbase" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
    docker logs --tail 20 bricolemoi-pocketbase
  `;

  conn.exec(remoteScript, (err, stream) => {
    if (err) {
      console.error('Exec error:', err);
      conn.end();
      process.exit(1);
    }
    stream.on('close', (code) => {
      console.log(`\nDeployment finished with exit code: ${code}`);
      conn.end();
      process.exit(code || 0);
    }).on('data', (d) => process.stdout.write(d))
      .stderr.on('data', (d) => process.stderr.write(d));
  });
}).on('error', (err) => {
  console.error('SSH Error:', err);
  process.exit(1);
}).connect({
  host: '51.255.46.206',
  port: 22,
  username: 'debian',
  password: 'Ali15091985@@'
});
