const path = require('path');
const {mkdir, readdir, copyFile, rm} = require('fs/promises');

const originalFolderPath = path.join(__dirname, 'files');
const newFolderPath = path.join(__dirname, 'files-copy');

(async () => {
  try {
    await rm(newFolderPath, { recursive: true, force: true });
    await mkdir(newFolderPath, { recursive: true });
    const originalFiles = await readdir(originalFolderPath, {withFileTypes:true});
    originalFiles.forEach(f => {
      if(f.isFile) {
        copyFile(path.join(originalFolderPath, f.name), path.join(newFolderPath, f.name));
      }
    });
  } catch (err){
    console.error(err);
  }
})();