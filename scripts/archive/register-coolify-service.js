import { Client } from 'ssh2';

const conn = new Client();

conn.on('ready', () => {
  console.log('Registering PocketBase inside Coolify via Laravel tinker...');

  const tinkerScript = `
    $services = get_service_templates();
    $compose = data_get($services, 'pocketbase.compose');
    if ($compose) {
      $service = new App\\Models\\Service([
        'docker_compose_raw' => base64_decode($compose),
        'environment_id' => 1,
        'service_type' => 'pocketbase',
        'server_id' => 0,
        'destination_id' => 0,
        'destination_type' => 'App\\\\Models\\\\StandaloneDocker',
        'connect_to_docker_network' => true
      ]);
      $service->save();
      $service->name = 'pocketbase';
      $service->description = 'PocketBase BaaS BricoleMoi';
      $service->save();
      $service->parse(isNew: true);
      echo "COOLIFY_SERVICE_CREATED: " . $service->uuid . " (ID: " . $service->id . ")\\n";
    } else {
      echo "ERROR: Template pocketbase not found\\n";
    }
  `;

  // Écrire et exécuter dans coolify
  const cmd = `docker exec -i coolify php artisan tinker << 'EOF'
${tinkerScript}
EOF
`;

  conn.exec(cmd, (err, stream) => {
    if (err) throw err;
    stream.on('close', (code) => {
      console.log(`Coolify registration finished with code: ${code}`);
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
