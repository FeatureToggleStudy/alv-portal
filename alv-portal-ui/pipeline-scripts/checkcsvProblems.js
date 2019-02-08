const csvParser = require('papaparse');
const minimist = require('minimist');
const fs = require('fs');

function checkColumnNumbers(csvFileName) {
  console.log('Check if there are problems with the commas in the file...');
  const parserConfig = {
    header: false, //we will parse to array, not to an object
    complete: function (parsedCsv) {
      console.log('yoyoyoyo');
      const headerLength = parsedCsv[0].length;
      // if the amount of columns in a given row is biggern than in the header, most likely
      // there's a problems with a comma in one of the cells.
      const errRows = parsedCsv.filter(line => (line.length > headerLength));
      if (!errRows.length) {
        console.log('no problems found')
      }
      else {
        console.log(csvParser.unparse(errRows));
      }
    }
  };

  csvParser.parse(fs.createReadStream(csvFileName), parserConfig);
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
