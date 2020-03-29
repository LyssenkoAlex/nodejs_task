const fs = require('fs');
const { pipeline, Readable } = require('stream');
const cipher = require('./transform-stream');

function encryption(keys) {
  const transformStream = new cipher(keys.shift);
  let readStd;

  if (!keys.input) {
    readStd = Readable.from(process.stdin);
  }

  pipeline(
    keys.input ? fs.createReadStream(keys.input) : readStd,
    transformStream,
    keys.output
      ? fs.createWriteStream(keys.output, { flags: 'a' })
      : process.stdout,
    err => {
      if (err) console.error('Pipeline error', err);
    }
  );
}

module.exports = { encryption };
