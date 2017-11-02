fs = require('fs');
const DYNAMIC_CLASSES = require('./dynamic_classes');

fs.readFile('./example.html', 'utf8', function (err, html) {
  if (err){
    console.log(err);
    return;
  }
  createOutput(html);
});

createOutput = function(html){
  let css = buildCss(html);	
  fs.writeFile('./output.css', css, function (err) {   
    if (err){
      console.log(err);
      return;
    }
  });
}

buildCss = function(html){

  let css = "";

  DYNAMIC_CLASSES.forEach(function(dynamicClass){
  	let searchStr = `${dynamicClass['shortcut']}([0-9])+`;
  	let strRegExPattern = '\\b'+searchStr +'\\b'; 
    let matchedClasses = html.match(new RegExp(strRegExPattern,'g'));	
    if (!matchedClasses) return;
    matchedClasses.forEach(function(matchedClass){
      let value = matchedClass.match(/[0-9]+/);	 
      css += `.${dynamicClass['shortcut']}${value}{${dynamicClass['className']}: ${value}px;}`;		
    });
  });

  return css;
  err
}