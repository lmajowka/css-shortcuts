let CSSGenerator = require('../lib/css_generator');

describe('CSSGenerator', () => {

  describe('#matchClasses', () => {

    describe('with one file', () => {

      beforeEach(function(done){
      	CSSGenerator.readFile('./examples/example.html').then(done);
      });

      let exampleClasses = [ 'm40', 'ml10', 'ml20', 'mr15','mr25','mt20','mt4','mb6','mb13','p4','pl10','pb30','fs30','fs22','fs34','fs14' ]

      it('stored the right matched classes', (done) => {

        expect(CSSGenerator.matchedClasses).toEqual(exampleClasses);
        done();
      });

    });
  

    describe('with multiple files', () => {

      beforeEach(function(done){
      	CSSGenerator.reset();	
      	let p1 = CSSGenerator.readFile('./examples/example3.html');
        let p2 = CSSGenerator.readFile('./examples/example4.html');
        Promise.all([p1,p2]).then(done);
      });


      it('stored the right matched classes', (done) => {

        expect(CSSGenerator.matchedClasses).toContain('ml2'); //class from example3
        expect(CSSGenerator.matchedClasses).toContain('ml3'); //class from example4
        expect(CSSGenerator.matchedClasses).not.toContain('ml30'); //not present in neither files
        done();
      
      });
      
    });

  });

  describe('#buildCss', () =>{

    beforeEach(function(done){
        CSSGenerator.reset(); 
        CSSGenerator.readFile('./examples/example2.html').then(() => {CSSGenerator.buildCss(); done()});
    });

    it('write unique class definition on css', (done) => {
      expect(CSSGenerator.css).toContain('.ml2{margin-left: 2px;}');
      done();
    });

  });

});
