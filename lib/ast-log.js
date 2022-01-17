const fs = require('fs');
const path = require('path');
const util = require('util');

const logsPath = path.join(__dirname, '..', 'logs');


const inspectOptions = {
  depth: 5,
};

module.exports = function astLog(id, ast) {
  const inspected = util.inspect(ast, inspectOptions);

  const data = [
    '/*************************************',
    ' * ' + id,
    ' */',
    ' ',
    inspected,
    ' ',
  ].join('\n');

  fs.writeFile(path.join(logsPath, `${id}.js`), data, (err) => {
    if (err) throw err;
    // console.log('The file has been saved!');
  });
  // console.log();
  // console.log(, id);
  // console.log();
  // console.log(' ');
  //
  // console.log(' ');
}
