let CSSGenerator = require('../lib/css_generator');

describe('CSSGenerator', () => {

  describe('#matchClasses', () => {

    describe('with 	one file', () => {

      beforeEach(function(done){
      	CSSGenerator.startReading(1, done);
      	CSSGenerator.readFile('./examples/example.html');
      });

      let exampleClasses = [ 'm40', 'ml10', 'ml20', 'mr15', 'mr25', 'mt20', 'mt4', 'mb6', 'mb13', 'p4', 'pl10', 'pb30', 'fs30', 'fs22', 'fs34', 'fs14' ];

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

      let exampleClasses = [ 'ml2', 'ml4', 'mr1', 'mr3', 'mr5', 'ml3', 'ml5', 'mr2', 'mr4', 'mr6' ]	

      it('stored the right matched classes', (done) => {

        expect(CSSGenerator.matchedClasses).toEqual(exampleClasses);
        done();
      
      });
      
    });

  });

});
