const path = require('path');
const { readdir, readFile, writeFile } = require('fs/promises');

const originalStylesPath = path.join(__dirname, 'styles');
const newStylesPath = path.join(__dirname, 'project-dist', 'bundle.css');
let cssBundle = [];

const createCssBundle = async () => {
  try {
    const originalFiles = await readdir(originalStylesPath, { withFileTypes: true });

    for (let f of originalFiles) {
      const filePath = path.join(originalStylesPath, f.name);
      const fileExtension = path.extname(f.name).split('.')[1];
  
      if (fileExtension === 'css') {
        const fileContent = await readFile(filePath);
        cssBundle.push(`/*---------------start-file---------------*/\n\n${fileContent}\n/*---------------end-file---------------*/\n\n`);
      }
  
      await writeFile(newStylesPath, cssBundle);
    }

  } catch (err) {
    console.log(err);
  }
};

createCssBundle();