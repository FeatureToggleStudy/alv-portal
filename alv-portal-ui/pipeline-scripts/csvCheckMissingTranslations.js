const csvParser = require('papaparse');
const minimist = require('minimist');
const fs = require('fs');

function checkMissingTranslations(parsedCsv) {
    const errored = parsedCsv.data.filter(line => line.key && !(!!line.de && !!line.en && !!line.fr && !!line.it));
    console.log(csvParser.unparse(errored));
}

const argv = minimist(process.argv.slice(2));
let csvFileName = argv._[0];

if (argv.help) {
    console.info(`
    This script checks if there are missing translations in the translation csv file
    for example if you have a line like this, it will report about it because italian and 
    french translations are missing:
    global.notifications.darger,Achtung,Danger,,,
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
    complete: checkMissingTranslations,
    error: function (err, file, inputElem, reason) {
        console.error(err, file, inputElem, reason);
        process.exit(-1);
    }
};

csvParser.parse(fs.createReadStream(csvFileName), parserConfig);
