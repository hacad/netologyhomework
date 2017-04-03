const crypto = require('crypto');
const fs = require('fs');

const hash = crypto.createHash('md5');
hash.setEncoding('hex');

const inputFileName = './input.txt';
const input = fs.createReadStream(inputFileName);

const outputFileName = './output.txt';
const output = fs.createWriteStream(outputFileName);

//add a new line
// hash.on('end', () => {
//     console.log();
// });

input.pipe(hash).pipe(output).on('finish', () => {console.log();});
hash.pipe(process.stdout)