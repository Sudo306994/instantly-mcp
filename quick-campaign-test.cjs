#!/usr/bin/env node

const { spawn } = require('child_process');

const API_KEY = 'ODkxZWUzNjEtOWE5MC00ZGM5LWExOWQtNWZhYWUxZDk4ZDNlOkZoTmdZWnJSSHRyeg==';

const request = {
  jsonrpc: '2.0',
  id: 99,
  method: 'tools/call',
  params: {
    name: 'create_campaign',
    arguments: {
      name: 'Quick Test Campaign',
      subject: 'Test Subject',
      body: 'Test body content.',
      email_list: ['brandoncharleson@onlinetopoffunnel.org'],
      timezone: 'Etc/GMT+12'
    }
  }
};

console.log('🧪 Testing campaign creation...');
console.log('Request:', JSON.stringify(request, null, 2));

const child = spawn('node', ['dist/index.js', '--api-key', API_KEY], {
  stdio: ['pipe', 'pipe', 'pipe']
});

let stdout = '';
let stderr = '';

child.stdout.on('data', (data) => {
  stdout += data.toString();
});

child.stderr.on('data', (data) => {
  stderr += data.toString();
  console.log('Debug:', data.toString());
});

child.on('close', (code) => {
  console.log('\n📊 Results:');
  console.log('Exit code:', code);
  
  if (stdout.trim()) {
    try {
      const response = JSON.parse(stdout.trim());
      if (response.error) {
        console.log('❌ Error:', response.error.message);
      } else {
        console.log('✅ Success! Campaign created.');
        console.log('Response:', JSON.stringify(response.result, null, 2));
      }
    } catch (e) {
      console.log('❌ Invalid JSON response:', stdout);
    }
  } else {
    console.log('❌ No response received');
  }
});

// Send request and close stdin
child.stdin.write(JSON.stringify(request) + '\n');
child.stdin.end();

// Set timeout
setTimeout(() => {
  console.log('⏱️ Timeout - killing process');
  child.kill();
}, 30000);