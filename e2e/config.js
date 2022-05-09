const cypress = require('cypress');
const fse = require('fs-extra');
const { merge } = require('mochawesome-merge');
const generator = require('mochawesome-report-generator');

async function runTests() {
  await fse.emptyDir('mochawesome-reports');
  const { totalFailed } = await cypress.run();

  const jsonReport = await merge({ files: ['./mochawesome-reports/*.json',] });
  await generator.create(jsonReport, { inline: true });
  process.exit(totalFailed);
}

runTests();