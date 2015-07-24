var inherits = require('util').inherits;
var Element = require('./element');

var TextBoxElement = function(browser, driver, options){
    Element.call(this, browser, driver, options);
};

inherits(TextBoxElement, Element);

TextBoxElement.prototype.setText = function(text) {
    this.webElement.clear();
    return this.webElement.sendKeys(text);
};

/*
* A utiliser avec une promise car appel asynchrone
* Exemple : tbTest.getText().then(function(text){ var result = text; });
*/
TextBoxElement.prototype.getText = function() {
    //webElement.getText() doesn't work here
    return this.webElement.getAttribute('value');
};

module.exports = TextBoxElement;