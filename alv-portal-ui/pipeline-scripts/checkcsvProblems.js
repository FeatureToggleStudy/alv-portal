const csvParser = require('papaparse');
const minimist = require('minimist');
const fs = require('fs');
const path = require('path');

process.on('uncaughtException', (err) => {
  fs.writeSync(1, `Caught exception: ${err}\n`);
});

function checkColumnNumbers(csvFileName) {
  console.log('Check if there are problems with the commas in the file...');
  const parserConfig = {
    complete: function (parsedCsv) {
      console.log('yoyoyoyo');
      const headerLength = parsedCsv.data[0].length;
      // if the amount of columns in a given row is biggern than in the header, most likely
      // there's a problems with a comma in one of the cells.
      const errRows = parsedCsv.data.filter(line => (line.length > headerLength));
      if (!errRows.length) {
        console.log('no problems found')
      } else {
        console.log(csvParser.unparse(errRows));
      }
    }
  };

  const file = fs.createReadStream(path.join(__dirname, csvFileName));
  csvParser.parse(file, parserConfig);
}

const argv = minimist(process.argv.slice(2));
let csvFileName = argv._[0];

if (!csvFileName) {
  console.error("Which file do you want to check?");
  process.exit(-1);
}

if (argv.help) {
  console.info(`
    This script checks the problems in the translations.csv file
    
    Usage: node checkCsvProblems mytranlationfile.csv
    `);
  process.exit(-1);
}

checkColumnNumbers(csvFileName);
