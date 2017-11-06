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
    this.filesToRead = numberOfFiles;
    this.onFinishReadingFilesCallback = callback;
  }

  static readFile(file){
    fs.readFile(file, 'utf8',  (err, html) => {
      if (err){
        console.log(err);
      return;
      }
      let cssGenerator = new CSSGenerator(html);
      cssGenerator.matchClasses();
      this.filesRead++;
      if (this.filesRead == this.filesToRead){
        this.onFinishReadingFilesCallback();
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

    if (this.matchedClasses == []) return;
    this.matchedClasses.sort().forEach((matchedClass) => {
      let shortcut = matchedClass.match(/[a-z]+/);  
      let dynamicClass = DYNAMIC_CLASSES.find((c) => c.shortcut == shortcut);
      let value = matchedClass.match(/[0-9]+/);
      let instacedShortcut = `.${dynamicClass['shortcut']}${value}`;
      if (!this.generatedClasses[instacedShortcut]){
        this.css += `${instacedShortcut}{${dynamicClass['className']}: ${value}px;}`;   
        this  .generatedClasses[instacedShortcut] = true;
      } 
    });
    CSSGenerator.createOutput();
    
  }

  static reset(){
    this.matchedClasses = [];
    this.css = '';
    this.generatedClasses = {};
    this.filesRead = 0;
    this.filesToRead = 0;
    this.onFinishReadingFilesCallback = function(){};
  }

}

CSSGenerator.reset();

module.exports = CSSGenerator;