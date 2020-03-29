const { program } = require('commander');
const { encryption } = require('./encryptor');

program
  .requiredOption('-s, --shift <number>', 'a shift')
  .requiredOption('-a, --action <action>', 'an action encode/decode')
  .option('-i, --input <file-path>', 'an input file')
  .option('-o, --output <file-path>', 'an output file')
  .action(() => {
    const keys = program.opts();
    switch (keys.action) {
      case 'encode':
        encryption(keys);
        break;
      case 'decode':
        keys.shift *= -1;
        encryption(keys);
        break;
      default:
        console.error(
          "error:  required option '-a, --action <action>' not specified or incorrect action enter(it can be only encode or decode)"
        );
    }
  });

program.parse(process.argv);
