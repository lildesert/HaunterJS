var inherits = require('util').inherits;
var Element = require('./element');

var CheckBoxElement = function(browser, driver, options){
    Element.call(this, browser, driver, options);
};

inherits(CheckBoxElement, Element);

CheckBoxElement.prototype.check = function() {
    var elmt = this.webElement;
    elmt.isSelected().then(function(selected)
    {
        if(!selected){
            elmt.click();
        }
    });
};

CheckBoxElement.prototype.uncheck = function() {
    var elmt = this.webElement;
    elmt.isSelected().then(function(selected)
    {
        if(selected){
            elmt.click();
        }
    });
};


module.exports = CheckBoxElement;