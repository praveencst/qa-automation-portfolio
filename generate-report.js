// generate-report.js
(async () => {
  const { generate } = await import('multiple-cucumber-html-reporter');

  generate({
    jsonDir: './reports',
    reportPath: './reports/html',
    metadata: {
      browser: { name: 'chromium', version: 'latest' },
      device: 'GitHub Actions Runner',
      platform: { name: 'ubuntu', version: 'latest' }
    },
    customData: {
      title: 'QA Automation Test Run',
      data: [
        { label: 'Project', value: 'E-Commerce Automation Suite' },
        { label: 'Release', value: '1.0.0' },
        { label: 'Date', value: new Date().toLocaleDateString() }
      ]
    }
  });

  console.log('✅ Report generated at reports/html/index.html');
})();