const Readable = require('stream').Readable;
const Writable = require('stream').Writable;
const Transform = require('stream').Transform;
const readline = require('readline');

function getRandomInt(min, max) {
  let random =  Math.floor(Math.random() * (max - min)) + min;
  return random;
}

class EndlessNumberStream extends Readable {
  constructor() {
    super();
  }

  _read() {
    const random = getRandomInt(0, 61);
    this.push(random.toString());
  }
}

class WritableStream extends Writable {
  constructor() {
    super();

    this._height = 20;
    this._width = 80;
    this._x = 0;
    this._y = new Array(this._width);
    for(let x = 0; x < this._width; x++) {
      this._y[x] = getRandomInt(0, this._height);
    }
  }

  _write(chunk, encoding, callback) {
    function inScreenYPosition(yPosition, height) {
      if(yPosition < 0) {
        return yPosition + height;
      } else if (yPosition < height) {
        return yPosition;
      } else {
        return 0;
      }
    }

    const greenColor = '\x1b[32m';
    const whiteColor = '\x1b[37m';
    let resetColor = '\x1b[0m';
    let currentColor = '';

    if(this._x % 10 == 1) {
      currentColor = whiteColor;
    } else {
      currentColor = greenColor;
    }

    readline.cursorTo(process.stdout, this._x, this._y[this._x]);
    process.stdout.write(currentColor + chunk + resetColor);

    if(this._x % 10 == 9){
      currentColor = whiteColor;
    } else {
      currentColor = greenColor;
    }
    
    let temp = this._y[this._x] - 2;
    readline.cursorTo(process.stdout, this._x, inScreenYPosition(temp, this._height));
    process.stdout.write(currentColor + chunk + resetColor);
    
    
    temp = this._y[this._x] - 20;
    readline.cursorTo(process.stdout, this._x, inScreenYPosition(temp, this._height));
    process.stdout.write(currentColor + chunk + resetColor);
    process.stdout.write(' ');

    this._y[this._x] = inScreenYPosition(this._y[this._x] + 1, this._height);

    this._x++;
    if(this._x > this._width) {
      this._x = 0;
    }

    callback();
  }
}

class CustomTransform extends Transform {
  constructor(options) {
    super(options);
    
    this._chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  }

  _transform(chunk, encoding, callback) {
    setTimeout(() => {
      this.push(this._chars.charAt(chunk));
      callback();
    }, 1);
  }

  _flush(callback) {
    callback();
  }
}

const input = new EndlessNumberStream();
const transform = new CustomTransform();
const output = new WritableStream();

console.log('\033c');
input.pipe(transform).pipe(output);
