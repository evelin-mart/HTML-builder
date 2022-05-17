const path = require('path');
const fs = require('fs');

const output = path.join(__dirname, 'project-dist');

//copy assets
let input = path.join(__dirname, 'assets');
let assets = path.join(output, 'assets');

(async function () {
  try {
    await fs.promises.open(assets, 'r');
    await fs.promises.rm(assets, { recursive: true }, (err) => {
      if (err) console.log(err);
    });
  } catch (e) {
    null;
  } finally {
    await fs.promises.mkdir(assets, { recursive: true }, (err) => {
      if (err) console.log(err);
    });
    fs.readdir(input, {withFileTypes: true}, (err, files) => {
      if (err) console.log(err);
      else {
        files.forEach((file) => {
          fs.copyFile(path.resolve(input, file), path.resolve(assets, file), (err) => {
            if (err) console.log(err);
          });
        });
      }
    });
  }
})();
