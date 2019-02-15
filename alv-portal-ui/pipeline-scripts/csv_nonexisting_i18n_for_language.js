
const csvParser = require('papaparse');
const minimist = require('minimist');
const fs = require('fs');
const path = require('path');

const argv = minimist(process.argv.slice(2));
const csvFileName  = argv._[0];

if (!csvFileName) {
  console.error('Please provide the csv file with translation as the first argument');
  process.exit(-1)
}
let languagePrefix = argv.language || 'de';

if (argv.help) {
  console.info(`
    This script checks for missing translation for the given language
    
    Usage: node csv_nonexisting_i18n_for_language.js mytranlationfile.csv --language=en
    `);
  process.exit(0);
}


const parserConfig = {
  header: true,
  /**
   * @param parsedCsv looks like this:
   * {data: ParsedLine[]}
   * where ParsedLine is
   * interface ParsedLine {
   *     page: string,
   *     key: string, //dot-delimited key e.g. 'activate.messages.error'
   *     de: string,
   *     en: string,
   *     fr: string,
   *     it: string,
   * }
   */
  complete: function (parsedCsv) {
    console.log(parsedCsv.data.filter(line => !line[languagePrefix]).map(line=>line.key).join('\n'))
  },

  error: function (err, file, inputElem, reason) {
    console.error(err, file, inputElem, reason);
    process.exit(-1);
  }
};

const file = fs.createReadStream(path.join(__dirname, csvFileName));
csvParser.parse(file, parserConfig);
