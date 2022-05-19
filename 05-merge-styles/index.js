const path = require('path');
const fs = require('fs');

const input = path.join(__dirname, 'styles');
const output = path.join(__dirname, 'project-dist', 'bundle.css');

fs.open(output, 'w', (err) => {
  if (err) console.log(err);
});

fs.readdir(input, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach((file) => {
      const fileName = path.resolve(input, file);
      if (path.extname(file).match('.css')) {
        const stream = fs.createReadStream(fileName, 'utf-8');
        stream.on('data', (chunk) => {
          fs.appendFile(output, chunk, (err) => {
            if (err) {
              console.log(err);
            }
          });
        });
      }
    });
  }
});
