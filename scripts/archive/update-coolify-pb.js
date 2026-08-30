import { Client } from 'ssh2';

const conn = new Client();

conn.on('ready', () => {
  console.log('Linking Coolify PocketBase service to our persistent data and HTTPS domain...');

  const compose = `services:
  pocketbase:
    image: 'ghcr.io/muchobien/pocketbase:latest'
    environment:
      - PB_ADMIN_EMAIL=admin@bricolemoi.ma
      - PB_ADMIN_PASSWORD=BricoleMoi2026!Securise
    volumes:
      - '/var/lib/bricolemoi-pocketbase/pb_data:/pb_data'
    ports:
      - '8090:8090'
    restart: unless-stopped
`;

  const escapeCompose = compose.replace(/'/g, "''");

  const cmd = `
    docker exec coolify-db psql -U coolify -d coolify -c "UPDATE services SET docker_compose_raw = '${escapeCompose}' WHERE id = 6;"
    docker exec coolify-db psql -U coolify -d coolify -c "UPDATE service_applications SET fqdn = 'https://pocketbase.51.255.46.206.sslip.io' WHERE service_id = 6;"
    
    # Redémarrer Coolify pour actualiser son état d'affichage
    docker exec -i coolify php artisan tinker << 'EOF'
      $service = App\\Models\\Service::find(6);
      if ($service) {
        $service->parse();
        echo "Coolify Service 6 Synced and Parsed!\\n";
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
