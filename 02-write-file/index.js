const fs = require('fs');
const path = require('path');
const { stdin, exit } = process;
const writeStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));


console.log('Please, write the text here...');
stdin.on('data', data => {
  data.toString().slice(0, -2) === 'exit' ? exit() : writeStream.write(data);
});

process.on('exit', () => console.log('Bye! Happy to see \'u again!'));