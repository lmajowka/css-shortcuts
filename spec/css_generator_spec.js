let CSSGenerator = require('../lib/css_generator');

describe('CSSGenerator', function () {

  describe('matchClasses', function () {

    beforeEach(function(done){
    	CSSGenerator.readFile('./examples/example.html', done);
    });

    let exampleClasses = [ 'm40', 'ml10', 'ml20', 'mr15', 'mr25', 'mt20', 'mt4', 'mb6', 'mb13', 'p4', 'pl10', 'pb30', 'fs30', 'fs22', 'fs34', 'fs14' ];

    it('stored the right matched classes', function (done) {

      expect(CSSGenerator.matchedClasses).toEqual(exampleClasses);
      done();
      
      
    });
  });

});
