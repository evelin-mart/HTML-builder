const path = require('path');
const fs = require('fs');
const { stdout } = process;

const folder = path.join(__dirname, 'secret-folder');

fs.readdir(folder, (err, files) => {
  if (err) console.log(err);
  else {
    files.forEach((file) => {
      const fileName = path.resolve(folder, file);
      fs.stat(fileName, (err, stats) => {
        if (err) {
          console.log(err);
        } else {
          if (!stats.isDirectory()) {
            const info = path.parse(fileName);
            stdout.write(`${info.name} - ${info.ext.slice(1)} - ${stats.size}b\n`);
          }
        }
      });
    });
  }
});
