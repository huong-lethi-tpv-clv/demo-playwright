const report = require('multiple-cucumber-html-reporter');
const path = require('path');

report.generate({
  jsonDir: './reports',
  reportPath: './reports/html',
  metadata: {
    browser: {
      name: 'Multi-Browser',
      version: 'Latest'
    },
    device: 'Local Machine',
    platform: {
      name: process.platform,
      version: process.version
    }
  },
  customData: {
    title: 'E2E Test Results',
    data: [
      { label: 'Project', value: 'Chorus E2E Tests' },
      { label: 'Release', value: '1.0.0' },
      { label: 'Execution Date', value: new Date().toLocaleString() }
    ]
  }
});

console.log('✅ HTML Report generated at: ./reports/html/index.html');
