import { Client } from 'ssh2';

const conn = new Client();

conn.on('ready', () => {
  console.log('SSH Connection to VPS (51.255.46.206) Established!');
  
  const cmd = `
    echo "=== RAM & SWAP ===" && free -h &&
    echo "\n=== DISK ===" && df -h / &&
    echo "\n=== DOCKER CONTAINERS ===" && docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" &&
    echo "\n=== PORTS IN USE ===" && ss -tulpn | grep LISTEN
  `;

  conn.exec(cmd, (err, stream) => {
    if (err) {
      console.error('Exec error:', err);
      conn.end();
      process.exit(1);
    }

    stream.on('close', (code, signal) => {
      console.log(`\nCommand exited with code ${code}`);
      conn.end();
      process.exit(code || 0);
    }).on('data', (data) => {
      process.stdout.write(data);
    }).stderr.on('data', (data) => {
      process.stderr.write(data);
    });
  });
}).on('error', (err) => {
  console.error('SSH Connection Failed:', err.message);
  process.exit(1);
}).connect({
  host: '51.255.46.206',
  port: 22,
  username: 'debian',
  password: 'Ali15091985@@'
});
