let CSSGenerator = require('../lib/css_generator');

describe('CSSGenerator', () => {

  describe('#matchClasses', () => {

    describe('with one file', () => {

      beforeEach(function(done){
      	CSSGenerator.startReading(1, done);
      	CSSGenerator.readFile('./examples/example.html');
      });

      let exampleClasses = [ 'fs14','fs22','fs30','fs34','m40','mb13','mb6','ml10','ml20','mr15','mr25','mt20','mt4','p4','pb30','pl10' ]

      it('stored the right matched classes', (done) => {

        expect(CSSGenerator.matchedClasses).toEqual(exampleClasses);
        done();
      
      });

    });
  

    describe('with multiple files', () => {

      beforeEach(function(done){
      	CSSGenerator.reset();	
      	CSSGenerator.startReading(2	, done);
      	CSSGenerator.readFile('./examples/example3.html');
      	CSSGenerator.readFile('./examples/example4.html');
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
        CSSGenerator.startReading(1 , done);
        CSSGenerator.readFile('./examples/example2.html');
    });

    it('write unique class definition on css', (done) => {
      expect(CSSGenerator.css).toContain('.ml2{margin-left: 2px;}');
      done();
    });

  });

});
