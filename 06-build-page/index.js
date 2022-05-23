//-----------Global-----------
const path = require('path');
const { mkdir, readdir, readFile, writeFile, copyFile } = require('fs/promises');
//-----------For Page Building-----------
const newHTML_folderPath = path.join(__dirname, 'project-dist');
const currentHTML_folderPath = path.join(__dirname, 'template.html');
const originalAssetsPath = path.join(__dirname, 'assets');
const newAssetsPath = path.join(newHTML_folderPath, 'assets');
const componentsPath = path.join(__dirname, 'components');
//-----------For CSS Bundle-----------
const originalStylesPath = path.join(__dirname, 'styles');
const newStylesPath = path.join(__dirname, 'project-dist', 'style.css');
let cssBundle = [];

//-----------HTML-Page-Building-----------
const createNewPage = async () => {
  let pageContent = await readFile(currentHTML_folderPath, 'utf-8');

  try {
    const elements = await readdir(componentsPath, { withFileTypes: true });
    elements.forEach(async e => {
      const elementPath = path.join(componentsPath, e.name);
      const elementContent = await readFile(elementPath, 'utf-8');
      const fileExtension = path.extname(e.name).split('.')[1];
      const template = `{{${e.name.split('.')[0]}}}`;

      if (pageContent.includes(template) && fileExtension === 'html') {
        pageContent = pageContent.replace(template, elementContent);
        await writeFile((path.join(newHTML_folderPath, 'index.html')), pageContent);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//-----------CSS Bundle-----------
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

//-----------Copy CSS Bundle to new path-----------
const copyAssetsFolder = async (originPath, requiredPath) => {
  try {
    await mkdir(requiredPath, { recursive: true });

    const files = await readdir(originPath, { withFileTypes: true });
    files.forEach(f => {
      if(f.isFile()) {
        copyFile(path.join(originPath, f.name), path.join(requiredPath, f.name));
      } else {
        copyAssetsFolder(path.join(originPath, f.name), path.join(requiredPath, f.name));
      }
    });
  } catch (err) {
    console.log(err);
  }
};

(async () => {
  await mkdir(newHTML_folderPath, { recursive: true });
  await createNewPage();
  await createCssBundle();
  await copyAssetsFolder(originalAssetsPath, newAssetsPath);
})();