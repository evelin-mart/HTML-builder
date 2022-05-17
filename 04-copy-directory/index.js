const path = require('path');
const fs = require('fs');

const folder = path.join(__dirname, 'files');
const folderCopy = path.join(__dirname, 'files-copy');

(async function () {
  try {
    await fs.promises.rm(folderCopy, { recursive: true }, (err) => {
      if (err) null;
    });
  } catch {
    null;
  } finally {
    fs.mkdir(folderCopy, (err) => {
      if (err) console.log(err);
    });
  }
  fs.readdir(folder, (err, files) => {
    if (err) console.log(err);
    else {
      files.forEach((file) => {
        fs.copyFile(path.resolve(folder, file), path.resolve(folderCopy, file), (err) => {
          if (err) console.log(err);
        });
      });
    }
  });
})();
