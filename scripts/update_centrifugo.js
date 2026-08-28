import { Client } from 'ssh2';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const newConfig = {
  token_hmac_secret_key: "bricolemoi_super_jwt_secret_key_v5_prod_2026",
  admin: true,
  admin_password: "BricoleMoi2026_AdminSecretKey!",
  admin_secret: "BricoleMoi2026_AdminJwtSecretToken!",
  api_key: "bricolemoi_http_api_key_v5_secret",
  allow_anonymous_connect_without_token: true,
  allowed_origins: ["*"],
  client: {
    allow_anonymous_connect_without_token: true,
    allowed_origins: ["*"],
    history_max_publication_limit: 100,
    max_message_size: 65536
  },
  channel: {
    without_namespace: {
      allow_subscribe_for_client: true,
      allow_publish_for_client: true,
      allow_presence_for_client: true,
      allow_subscribe_for_anonymous: true,
      allow_publish_for_anonymous: true,
      allow_presence_for_anonymous: true,
      history_size: 50,
      history_ttl: "3600s"
    }
  },
  namespaces: [
    {
      name: "jobs",
      allow_subscribe_for_client: true,
      allow_publish_for_client: true,
      allow_presence_for_client: true,
      allow_subscribe_for_anonymous: true,
      allow_publish_for_anonymous: true,
      history_size: 50,
      history_ttl: "300s",
      force_recovery: true
    },
    {
      name: "tracking",
      allow_subscribe_for_client: true,
      allow_publish_for_client: true,
      allow_presence_for_client: true,
      allow_subscribe_for_anonymous: true,
      allow_publish_for_anonymous: true,
      history_size: 10,
      history_ttl: "60s"
    },
    {
      name: "user",
      allow_subscribe_for_client: true,
      allow_publish_for_client: true,
      allow_presence_for_client: true,
      allow_subscribe_for_anonymous: true,
      allow_publish_for_anonymous: true,
      history_size: 20,
      history_ttl: "3600s",
      presence: true
    },
    {
      name: "admin",
      allow_subscribe_for_client: true,
      allow_publish_for_client: true,
      allow_presence_for_client: true,
      allow_subscribe_for_anonymous: true,
      allow_publish_for_anonymous: true,
      history_size: 50,
      history_ttl: "86400s"
    }
  ]
};

// Mettre à jour localement
fs.writeFileSync(
  path.resolve(__dirname, '../server/centrifugo/config.json'),
  JSON.stringify(newConfig, null, 2),
  'utf8'
);

const conn = new Client();
conn.on('ready', () => {
  console.log('SSH Connection Ready!');
  
  const configJsonStr = JSON.stringify(newConfig).replace(/"/g, '\\"');
  const remoteCmd = `
    echo "${configJsonStr}" > /home/debian/centrifugo/config.json &&
    docker restart bricolemoi-centrifugo &&
    echo "DOCKER_RESTARTED_OK"
  `;

  conn.exec(remoteCmd, (err, stream) => {
    if (err) throw err;
    stream.on('close', (code, signal) => {
      console.log('Stream closed with code ' + code);
      conn.end();
      process.exit(0);
    }).on('data', (data) => {
      console.log('STDOUT: ' + data);
    }).stderr.on('data', (data) => {
      console.log('STDERR: ' + data);
    });
  });
}).connect({
  host: '51.255.46.206',
  port: 22,
  username: 'debian',
  password: 'Ali15091985@@'
});
