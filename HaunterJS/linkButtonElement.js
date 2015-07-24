var inherits = require('util').inherits;
var Element = require('./element');

var LinkButtonElement = function(browser, driver, options){
    Element.call(this, browser, driver, options);
};

inherits(LinkButtonElement, Element);

LinkButtonElement.prototype.clickLink = function(timeout) {
    var self = this;
    return this.browser.wait(this.webdriver.until.elementIsVisible(this.webElement), timeout ? timeout : 5000).then(function(){
        return self.webElement.click();
    });
};

module.exports = LinkButtonElement;