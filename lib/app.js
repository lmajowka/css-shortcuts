let CSSGenerator = require('./css_generator');
let args = process.argv.slice(2);

for (arg of args) {
  CSSGenerator.readFile(arg, CSSGenerator.buildCss);	
};









