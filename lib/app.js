let CSSGenerator = require('./css_generator');
let args = process.argv.slice(2);

let promises = [];
for (arg of args) {
  promises.push(CSSGenerator.readFile(arg));	
};

Promise.all(promises)
.then(() => CSSGenerator.buildCss())
.catch(error => { 
  console.log(error);
});;





