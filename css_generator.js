const DYNAMIC_CLASSES = require('./dynamic_classes');

class cssGenerator{
	
  constructor(){
  	this.css = '';
  }

  createOutput(html){
    this.buildCss(html);	
    fs.writeFile('./output.css', this.css, function (err) {   
      if (err){
        console.log(err);
        return;
      }
    });
  }

  buildCss(html){

    DYNAMIC_CLASSES.forEach((dynamicClass) => {
  	  let searchStr = `${dynamicClass['shortcut']}([0-9])+`;
  	  let strRegExPattern = '\\b'+searchStr +'\\b'; 
      let matchedClasses = html.match(new RegExp(strRegExPattern,'g'));	
      if (!matchedClasses) return;
      matchedClasses.forEach((matchedClass) => {
        let value = matchedClass.match(/[0-9]+/);	 
        this.css += `.${dynamicClass['shortcut']}${value}{${dynamicClass['className']}: ${value}px;}`;		
      });
    });
    
  }

}

module.exports = cssGenerator;