const csvParser = require('papaparse');
const minimist = require('minimist');
const fs = require('fs');
const path = require('path');


const argv = minimist(process.argv.slice(2));
let csvFileName = argv._[0];


if (argv.help) {
  console.info(`
    a clash is when we have both the key 'a.b.c' and the key 'a.b.c.d'.
    A script shows all clashes in stdout
    Usage: node csvCheckClashes.js mytranlationfile.csv 
    `);
  process.exit(0);
}


if (!csvFileName) {
  console.error('Please provide the csv file with translation as the first argument');
  process.exit(-1)
}

const parserConfig = {
  complete: function checkClashes(parsedCsv) {
    const keys = parsedCsv.data.map(line => line.key).sort(); //dot-delimited key e.g. 'activate.messages.error'
    const errored = keys.filter(function callback(el, index, arr) {
      if (arr[index + 1]) {
        return arr[index + 1].includes(el);
      }
    });
    errored.length ? console.log(errored): 0;
  }
};

const file = fs.createReadStream(path.join(__dirname, csvFileName));
csvParser.parse(file, parserConfig);
