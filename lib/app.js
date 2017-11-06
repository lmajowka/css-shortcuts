let CSSGenerator = require('./css_generator');
let args = process.argv.slice(2);

CSSGenerator.startReading(args.length, CSSGenerator.buildCss);
for (arg of args) {
  CSSGenerator.readFile(arg);	
};











