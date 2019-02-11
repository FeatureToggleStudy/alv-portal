const csvParser = require('papaparse');
const _ = require('lodash');
const fs = require('fs');
const stringify = require('json-stable-stringify');
const minimist = require('minimist');

const argv = minimist(process.argv.slice(2));
let csvFileName = argv._[0];
let output = argv.output || '.';

if (argv.help) {
  console.info(`
    This script converts csv files with translations to json format of ngx-translate and splits them to language directories, one file per page. 
    The input csv file must have the following header and format: 
    key,de,en,fr,it,...,< other languages >
    
    Usage: node csv2jsoni18n mytranlationfile.csv --output ./translations
    `);
  process.exit(0);
}

if (!csvFileName) {
  console.error('Please provide the csv file with translation as the first argument');
  process.exit(-1)
}

const parserConfig = {
  header: true,
  complete: onCsvParsed,
  error: function (err, file, inputElem, reason) {
    console.error(err, file, inputElem, reason);
    process.exit(-1);
  }
};

csvParser.parse(fs.createReadStream(csvFileName), parserConfig);

//==========================================================================
/**
 * everything after the first column are languages
 * @param line ParsedLine
 * @returns {string[]} list of language codes
 */
function getLanguages(line) {
  return Object.keys(line).slice(1);
}

function transformCsv2Json(acc, line) {
  for (let lang of getLanguages(line)) {
    _.setWith(acc, lang + '.' + line.key, line[lang], Object)
  }
  return acc;
}

function createDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}

/**
 * creates one directory per language with one page per page in csv file
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
function onCsvParsed(parsedCsv) {

  const allLanguagesObj = parsedCsv.data.reduce(transformCsv2Json, {});
  for (let [language, languageFile] of Object.entries(allLanguagesObj)) {
    createDir(`${output}`);
    const fileName = `${output}/${language}.json`;
    fs.writeFile(fileName,
      stringify(languageFile, {space: 2}),
      (err, data) => {
        if (err) {
          console.error(err, data);
          process.exit(-1);
        }
      })
  }
}


