import { Client } from 'ssh2';

const conn = new Client();

conn.on('ready', () => {
  console.log('Releasing port 8090 and handing over to Coolify...');

  const cmd = `
    echo "1. Stopping and removing standalone container..."
    docker rm -f bricolemoi-pocketbase || true

    echo "2. Checking port 8090..."
    ss -tulpn | grep 8090 || echo "Port 8090 is now free!"

    echo "3. Removing any failed Coolify container attempt..."
    docker rm -f pocketbase-usx7m3pldabft8ilv46u56bc || true

    echo "4. Triggering Coolify deployment via php artisan..."
    docker exec -i coolify php artisan tinker << 'EOF'
      $service = App\\Models\\Service::find(6);
      if ($service) {
        // Redéployer proprement le service
        queue_service_deployment($service);
        echo "Service deployment queued in Coolify!\\n";
      }
EOF
  `;

  conn.exec(cmd, (err, stream) => {
    if (err) throw err;
    stream.on('close', (code) => {
      console.log(`Finished with code ${code}`);
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
