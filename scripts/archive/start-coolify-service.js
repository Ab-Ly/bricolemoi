import { Client } from 'ssh2';

const conn = new Client();

conn.on('ready', () => {
  console.log('Starting Coolify Service 6 via StartService action...');

  const cmd = `
    docker exec -i coolify php artisan tinker << 'EOF'
      $service = App\\Models\\Service::find(6);
      if ($service) {
        $action = new App\\Actions\\Service\\StartService();
        $action->handle($service);
        echo "Coolify StartService executed successfully!\\n";
      }
EOF

    sleep 4
    docker ps --filter "name=pocketbase" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
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
