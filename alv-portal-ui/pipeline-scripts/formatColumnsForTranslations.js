const csvParser = require('papaparse');
const fs = require('fs');
const path = require('path');
const minimist = require('minimist');
const stringify = require('json-stable-stringify');

const argv = minimist(process.argv.slice(2));
let csvFileName = argv._[0];
let output = argv.output || '.';

if (argv.help) {
  console.info(`    
    This script add DESCRIPTION column to csv file with translations and removes PAGE column.
    The input csv file with header columns : 
    page,key,de,en,fr,it,...,< other languages >
    Is transferred to csv file with this header columns :
    key,description,de,en,fr,it
    
    Usage: node pipeline-scripts/csv2json-i18n.js ../translations.csv --output src/assets
    `);
  process.exit(0);
}

if (!csvFileName) {
  console.error('Please provide the csv file with translation as the first argument');
  process.exit(-1)
}

const parserConfig = {
  header: true,
  complete: formatCsvColumns,
  error: function (err, file, inputElem, reason) {
    console.error(err, file, inputElem, reason);
    process.exit(-1);
  }
};

const file = fs.createReadStream(path.join(__dirname, csvFileName));
csvParser.parse(file, parserConfig);

//==========================================================================

function createDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}

function changeColumnHeader(parsedCsv) {
  return parsedCsv.map(line => {
    return {
      key: line.key,
      description: '',
      de: line.de,
      en: line.en,
      fr: line.fr,
      it: line.it
    };
  })
}

/**
 * Add column DESCRIPTION and remove column PAGE from translations.csv file
 * and create new file in directory src/assets
 *
 */
function formatCsvColumns(parsedCsv) {

  createDir(`${output}`);
  const fileName = `${output}/translations-formatted.csv`;

  let data = csvParser.unparse(changeColumnHeader(parsedCsv.data));
  // data = data.replace(/[\\r\\n]/g, '');
  fs.writeFile(fileName, stringify(data),
    (err, value) => {
      if (err) {
        console.error(err);
        process.exit(-1);
      }
      console.log(`Successfully written to file ${fileName}`);
    })
}
