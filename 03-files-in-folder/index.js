const { readdir, stat } = require('fs/promises');
const path = require('path');
const folderPath = path.join(__dirname, 'secret-folder');

const filesInFolder = async () => {
  try {
    const files = await readdir(folderPath, { withFileTypes: true });

    files.forEach(async f => {
      const filePath = path.join(__dirname, 'secret-folder', f.name);
      const fileStat = await stat(filePath);
    
      if (f.isFile()) {
        const fileName = f.name.split('.').slice(0, -1).join('.');
        const fileExtension = path.extname(f.name).split('.')[1];
        const fileSize = (fileStat.size)/1024;
        console.log(`${fileExtension !== undefined ? fileName : f.name} - ${fileExtension !== undefined ? fileExtension : 'none'} - ${fileSize} kb`);
      }
    });
  } catch (err) {
    console.error(err);
  }
};

filesInFolder();