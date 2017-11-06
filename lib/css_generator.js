fs = require('fs'); 
const DYNAMIC_CLASSES = require('./dynamic_classes');

class CSSGenerator{

  constructor(html){
  	this.matchedClasses = [];
    this.html = html;
  }

  matchClasses(){

    DYNAMIC_CLASSES.forEach((dynamicClass) => {
  	  let searchStr = `${dynamicClass['shortcut']}([0-9])+`;
  	  let strRegExPattern = '\\b'+searchStr +'\\b'; 
      let matchedClasses = this.html.match(new RegExp(strRegExPattern,'g')) || [];
  
      CSSGenerator.matchedClasses = CSSGenerator.matchedClasses.concat(matchedClasses.filter(n => true));  
    });
    
  }

  static startReading(numberOfFiles, callback){
    CSSGenerator.filesToRead = numberOfFiles;
    CSSGenerator.onFinishReadingFilesCallback = callback;
  }

  static readFile(file){
    fs.readFile(file, 'utf8', function (err, html) {
      if (err){
        console.log(err);
      return;
      }
      let cssGenerator = new CSSGenerator(html);
      cssGenerator.matchClasses();
      CSSGenerator.filesRead++;
      if (CSSGenerator.filesRead == CSSGenerator.filesToRead){
        CSSGenerator.onFinishReadingFilesCallback();
      } 
    });
  }

  static createOutput(){
    fs.writeFile('./css-shortcuts.css', this.css, function (err) {   
      if (err){
        console.log(err);
        return;
      }
    });
  }

  static buildCss(){

    if (CSSGenerator.matchedClasses == []) return;
    CSSGenerator.matchedClasses.sort().forEach((matchedClass) => {
      let shortcut = matchedClass.match(/[a-z]+/);  
      let dynamicClass = DYNAMIC_CLASSES.find((c) => c.shortcut == shortcut);
      let value = matchedClass.match(/[0-9]+/);
      let instacedShortcut = `.${dynamicClass['shortcut']}${value}`;
      if (!CSSGenerator.generatedClasses[instacedShortcut]){
        CSSGenerator.css += `${instacedShortcut}{${dynamicClass['className']}: ${value}px;}`;   
        CSSGenerator.generatedClasses[instacedShortcut] = true;
      } 
    });
    CSSGenerator.createOutput();
    
  }

  static reset(){
    CSSGenerator.matchedClasses = [];
    CSSGenerator.css = '';
    CSSGenerator.generatedClasses = {};
    CSSGenerator.filesRead = 0;
    CSSGenerator.filesToRead = 0;
    CSSGenerator.onFinishReadingFilesCallback = function(){};
  }

}

CSSGenerator.reset();

module.exports = CSSGenerator;