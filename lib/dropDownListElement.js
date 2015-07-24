var inherits = require('util').inherits;
var Element = require('./element');

var DropDownListElement = function(browser, driver, options){
    Element.call(this, browser, driver, options);
};

inherits(DropDownListElement, Element);

DropDownListElement.prototype.selectOption = function(value) {
    this.webElement.findElement(this.webdriver.By.css('option[value="'+value+'"]')).then(function(option){
        return option.click();
    });
};

DropDownListElement.prototype.getValue = function() {
    return this.webElement.getAttribute('value');
};


module.exports = DropDownListElement;