fs = require('fs'); 
const DYNAMIC_CLASSES = require('./dynamic_classes');
DynamicClass = require('./dynamic_class');

class CSSGenerator{

  constructor(html){
    this.html = html;
  }

  matchClasses(){
    let matchedClasses = DynamicClass.matchClasses(this.html);
    CSSGenerator.matchedClasses = CSSGenerator.matchedClasses.concat(matchedClasses);
  }

  static startReading(numberOfFiles, callback = () => {}){
    this.filesToRead = numberOfFiles;
    this.onFinishGeneratingCssCallback = callback;
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
        CSSGenerator.buildCss();
      } 
    });
  }

  static createOutput(){
    fs.writeFile('./css-shortcuts.css', this.css, (err) => {   
      if (err){
        console.log(err);
        return;
      }
      this.onFinishGeneratingCssCallback();
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
        this.generatedClasses[instacedShortcut] = true;
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