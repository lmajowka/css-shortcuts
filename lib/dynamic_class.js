const DYNAMIC_CLASSES = require('./dynamic_classes');
class DynamicClass{

  static  matchClasses(html){
  	let totalMatchedClasses = [];
    DYNAMIC_CLASSES.forEach((dynamicClass) => {
  	  let searchStr = `${dynamicClass['shortcut']}([0-9])+`;
  	  let strRegExPattern = '\\b'+searchStr +'\\b'; 
      let matchedClasses = html.match(new RegExp(strRegExPattern,'g')) || [];
      totalMatchedClasses = totalMatchedClasses.concat(matchedClasses.filter(n => true));  
    });
    return totalMatchedClasses;
  }

}

module.exports = DynamicClass