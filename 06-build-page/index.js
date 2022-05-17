const path = require('path');
const fs = require('fs');

const output = path.join(__dirname, 'project-dist');

//clear dist
(async () => {
  try {
    await fs.promises.rm(output, { recursive: true }, (err) => {
      if (err) throw err;
    });
  } catch {
    null;
  } finally {
    await fs.promises.mkdir(output, (err) => {
      if (err) console.log(err);
    });
  }

  //copy assets
  let input = path.join(__dirname, 'assets');
  let assets = path.join(output, 'assets');

  await fs.promises.mkdir(assets, (err) => {
    if (err) console.log(err);
  });

  const deepCopy = (folder, folderCopy) => {
    fs.readdir(folder, { withFileTypes: true }, (err, files) => {
      if (err) console.log(err);
      else {
        files.forEach(async function (file) {
          if (file.isDirectory()) {
            const input = path.join(folder, file.name);
            const output = path.join(folderCopy, file.name);
            await fs.promises.mkdir(output, () => {});
            deepCopy(input, output);
          } else if (file.isFile()) {
            fs.copyFile(
              path.resolve(folder, file.name),
              path.resolve(folderCopy, file.name),
              (err) => {
                if (err) console.log(err);
              },
            );
          }
        });
      }
    });
  };

  deepCopy(input, assets);
})();
