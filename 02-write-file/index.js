const path = require('path');
const fs = require('fs');
const { stdin, stdout, exit } = process;

fs.createWriteStream(path.join(__dirname, 'file.txt'));

stdout.write('Your text below:\n');
stdin.on('data', (data) => {
  if (data.toString().match(/exit/i)) {
    exit();
  } else {
    fs.appendFile(path.join(__dirname, 'file.txt'), data.toString(), (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
});

process.on('exit', () => {
  stdout.write('\nBye!');
});

process.on('SIGINT', () => {
  exit();
});
