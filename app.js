fs = require('fs'); 
let cssGenerator = require('./css_generator');



fs.readFile('./example.html', 'utf8', function (err, html) {
  if (err){
    console.log(err);
    return;
  }
  new cssGenerator().createOutput(html);
});



