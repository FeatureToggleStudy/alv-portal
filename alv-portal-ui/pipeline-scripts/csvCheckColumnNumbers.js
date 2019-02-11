const csvParser = require('papaparse');
const minimist = require('minimist');
const fs = require('fs');
const path = require('path');

function checkColumnNumbers(csvFileName) {
  const parserConfig = {
    complete: function (parsedCsv) {
      const headerLength = parsedCsv.data[0].length;
      // if the amount of columns in a given row is bigger or smaller than in the header, most likely
      // there's a problems with a comma in one of the cells.
      const errRows = parsedCsv.data.filter(line => line.length !== headerLength);
      if (!errRows.length) {
        console.log('no problems found')
      } else {
        console.log(csvParser.unparse(errRows));
      }
    },
    error: function (err, file, inputElem, reason) {
      console.error(err, file, inputElem, reason);
      process.exit(-1);
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
