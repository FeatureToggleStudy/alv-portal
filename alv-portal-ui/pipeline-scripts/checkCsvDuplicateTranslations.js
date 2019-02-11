const csvParser = require('papaparse');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const minimist = require('minimist');

const argv = minimist(process.argv.slice(2));
let csvFileName = argv._[0];

if (argv.help) {
  console.info(`
    This script checks the duplicate translations in the translations.csv file
    
    Usage: node pipeline-scripts/checkCsvDuplicateTranslations.js ../translations.csv    
    `);
  process.exit(0);
}

if (!csvFileName) {
  console.error('Please provide the csv file with translation as the first argument');
  process.exit(-1)
}

const parserConfig = {
  header: true,
  complete: checkDuplicates,
  error: function (err, file, inputElem, reason) {
    console.error(err, file, inputElem, reason);
    process.exit(-1);
  }
};

const file = fs.createReadStream(path.join(__dirname, csvFileName));
csvParser.parse(file, parserConfig);

//==========================================================================

function checkDuplicateKeys(parsedCsv) {
  const keys = parsedCsv.map(line => line.key);
  let duplicateKeys = [];
  for (let key of keys) {
    if (key && keys.indexOf(key) !== keys.lastIndexOf(key)) {
      duplicateKeys.push(key);
    }
  }
  return _.uniq(duplicateKeys)
}

function checkDuplicateTranslationsInMultipleKeys(parsedCsv) {
  const translations = _.countBy(parsedCsv.filter(line => line.key && line.de).map(line => line.de));
  let resultForDuplicateTranslations = {};
  _.transform(translations, function(result, count /*value*/, label/*key*/) {
    if (count > 1) {
      resultForDuplicateTranslations[label] = parsedCsv.filter(line => line.de === label).map(line => line.key);
    }
  }, []);

  // final result should look something like {key: line.de, value: [line.key...]}
  return resultForDuplicateTranslations;
}

function checkExactDuplicateTranslations(parsedCsv) {
  return parsedCsv.filter(line => line.key && notEmpty(line) && exactMatch(line))
}

function checkPartialDuplicateTranslations(parsedCsv) {
  return parsedCsv.filter(line => line.key && notEmpty(line) && !exactMatch(line) && partialMatch(line))
}

function notEmpty(line) {
  return !!line.de && !!line.en && !!line.fr && !!line.it
}

function exactMatch(line) {
  return line.de === line.en && line.de === line.fr && line.de === line.it
}

function partialMatch(line) {
  return (line.de === line.en) || (line.en === line.fr) || (line.en === line.it) || (line.fr === line.it)
}

/**
 * Check duplicate translation in translations.csv file
 * Possible that all language translations are the same
 * or there is a partial duplicate translations, meaning for example,
 * english and italian translations are the same (italian is wrong)
 *
 */
function checkDuplicates(parsedCsv) {
  console.log('.......... The following translation are EXACT duplicate.');
  console.log(csvParser.unparse(checkExactDuplicateTranslations(parsedCsv.data)));
  console.log('..........');
  console.log('.......... The following translation are PARTIAL duplicate.');
  console.log(csvParser.unparse(checkPartialDuplicateTranslations(parsedCsv.data)));
  console.log('..........');
  console.log('.......... The following translation have exactly the same KEY.');
  console.log(checkDuplicateKeys(parsedCsv.data));
  console.log('..........');
  console.log('.......... The following translation have multiple occurrences for different keys.');
  console.log(checkDuplicateTranslationsInMultipleKeys(parsedCsv.data));
  console.log('..........');

}


