var inherits = require('util').inherits;
var Element = require('./element');

var LabelElement = function(browser, driver, options){
    Element.call(this, browser, driver, options);
};

inherits(LabelElement, Element);

LabelElement.prototype.getText = function() {
    return this.webElement.getText();
};

module.exports = LabelElement;