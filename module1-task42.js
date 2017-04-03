const Transform = require('stream').Transform;
const crypto = require('crypto');

const fs = require('fs');

class MD5HashTransform extends Transform {
    constructor(options) {
        super(options);
        this.digester = crypto.createHash('md5');
    }

    _transform(chunk, encoding, callback) {
        //remove utf8 special character
        let data = chunk.toString('utf8').replace(/[^\x00-\x7F]/g, "");
        this.digester.update(data);
        callback();
    }

    _flush(callback) {
        this.push(this.digester.digest('hex'));
        callback();
    }
}

var md5transform = new MD5HashTransform();

const inputFileName = './input.txt';
const input = fs.createReadStream(inputFileName, {encoding: 'utf8'});

const outputFileName = './output.txt';
const output = fs.createWriteStream(outputFileName);

input.pipe(md5transform).pipe(output).on('finish', () => console.log());
md5transform.pipe(process.stdout);
// md5transform.end();
// md5transform.pipe(process.stdout);
// md5transform.write('some text');
// md5transform.end();