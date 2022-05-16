const path = require('path');
const fs = require('fs');
const { stdout } = process;

let folder = path.join(__dirname, 'secret-folder');

fs.readdir(folder, (err, files) => {
  if (err) console.log(err);
  else {
    console.log('\nCurrent directory filenames:');
    files.forEach((file) => {
      fs.stat(path.resolve(__dirname, 'secret-folder', file), (err, stats) => {
        if (err) {
          console.log(err);
        } else {
          if (!stats.isDirectory()) {
            console.log(file);
          }
        }
      });
    });
  }
});
