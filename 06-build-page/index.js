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

  // copy assets
  let input = path.join(__dirname, 'assets');
  const assets = path.join(output, 'assets');

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

  // merge styles

  input = path.join(__dirname, 'styles');
  const styles = path.join(output, 'styles.css');

  fs.open(styles, 'w', (err) => {
    if (err) console.log(err);
  });

  fs.readdir(input, (err, files) => {
    if (err) console.log(err);
    else {
      files.forEach((file) => {
        if (path.extname(file).match('.css')) {
          const stream = fs.createReadStream(path.resolve(input, file), 'utf-8');
          stream.on('data', (chunk) =>
            fs.appendFile(styles, chunk, (err) => {
              if (err) {
                console.log(err);
              }
            }),
          );
        }
      });
    }
  });

  // build html

  const source = path.join(__dirname, 'template.html');
  const components = path.join(__dirname, 'components');
  const index = path.join(output, 'index.html');
  const templates = {};

  fs.open(index, 'w', (err) => {
    if (err) console.log(err);
  });

  await fs.promises.readdir(components, { withFileTypes: true }, (err, files) => {
    if (err) console.log(err);
    else {
      files.forEach((file) => {
        if (path.extname(file.name).match('.html')) {
          const data = '';
          const streamIn = fs.createReadStream(path.resolve(components, file.name), 'utf8');
          const streamOut = fs.createWriteStream(data, 'utf8');
          streamIn.pipe(streamOut);
          streamOut.on('close', () => {
            console.log(data);
            templates[file.name.slice(0, -5)] = data;
          });
        }
      });
    }
  });
})();
