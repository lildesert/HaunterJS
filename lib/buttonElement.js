var inherits = require('util').inherits;
var Element = require('./element');

var ButtonElement = function(browser, driver, options){
    Element.call(this, browser, driver, options);
};

inherits(ButtonElement, Element);

ButtonElement.prototype.clickButton = function(timeout) {
    var self = this;
    return this.browser.wait(this.webdriver.until.elementIsVisible(this.webElement), timeout ? timeout : 5000).then(function(){
        return self.webElement.click();
    });
};

module.exports = ButtonElement;