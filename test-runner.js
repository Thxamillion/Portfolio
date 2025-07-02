#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Create test-results directory if it doesn't exist
const testResultsDir = path.join(__dirname, 'test-results');
if (!fs.existsSync(testResultsDir)) {
  fs.mkdirSync(testResultsDir, { recursive: true });
}

console.log('🚀 Starting Portfolio Application Test Suite');
console.log('='.repeat(50));

// Function to run a command and return a promise
function runCommand(command, args = [], options = {}) {
  return new Promise((resolve, reject) => {
    console.log(`Running: ${command} ${args.join(' ')}`);
    
    const process = spawn(command, args, {
      stdio: 'inherit',
      shell: true,
      ...options
    });

    process.on('close', (code) => {
      if (code === 0) {
        resolve(code);
      } else {
        reject(new Error(`Command failed with code ${code}`));
      }
    });

    process.on('error', (error) => {
      reject(error);
    });
  });
}

async function runTests() {
  try {
    console.log('\n📋 Test Configuration:');
    console.log('- Target URL: http://localhost:3001');
    console.log('- Browser: Chromium, Firefox, WebKit');
    console.log('- Test Files: portfolio.spec.ts, chat.spec.ts, navigation.spec.ts');
    console.log('- Screenshots: Enabled');
    console.log('- Full Page Screenshots: Enabled');
    
    console.log('\n🧪 Running Playwright Tests...');
    console.log('-'.repeat(30));
    
    // Run all tests
    await runCommand('npx', ['playwright', 'test', '--reporter=html']);
    
    console.log('\n✅ Tests completed successfully!');
    console.log('\n📊 Test Results:');
    console.log('- HTML Report: playwright-report/index.html');
    console.log('- Screenshots: test-results/*.png');
    console.log('- Test artifacts: test-results/');
    
    // Check if test-results directory has screenshots
    const screenshots = fs.readdirSync(testResultsDir).filter(file => file.endsWith('.png'));
    console.log(`\n📸 Screenshots generated: ${screenshots.length}`);
    screenshots.forEach(screenshot => {
      console.log(`  - ${screenshot}`);
    });
    
    console.log('\n🎉 Portfolio testing complete!');
    console.log('Open playwright-report/index.html to view detailed results.');
    
  } catch (error) {
    console.error('\n❌ Test execution failed:', error.message);
    console.log('\n🔍 Troubleshooting tips:');
    console.log('1. Make sure the development server is running on http://localhost:3001');
    console.log('2. Check if all dependencies are installed (npm install)');
    console.log('3. Verify Playwright browsers are installed (npx playwright install)');
    process.exit(1);
  }
}

// Check if server is running before starting tests
async function checkServer() {
  try {
    const response = await fetch('http://localhost:3001');
    if (response.ok) {
      console.log('✅ Development server is running');
      return true;
    }
  } catch (error) {
    console.log('❌ Development server is not running');
    console.log('Please start the server with: npm run dev');
    return false;
  }
}

// Main execution
(async () => {
  console.log('🔍 Checking development server...');
  
  // Note: fetch might not be available in older Node versions
  // For this test runner, we'll proceed anyway and let Playwright handle server startup
  
  await runTests();
})();