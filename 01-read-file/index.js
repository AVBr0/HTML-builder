const fs = require('fs');
const path = require('path');

let rs = fs.createReadStream(path.join(__dirname, 'text.txt'));
rs.on('data', data => console.log(data.toString()));
