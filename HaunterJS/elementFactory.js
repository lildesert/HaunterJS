
var Element = require('./element');
var ButtonElement = require('./buttonElement');
var TextBoxElement = require('./textBoxElement');
var LinkButtonElement = require('./linkButtonElement');
var LabelElement = require('./labelElement');
var DropDownListElement = require('./dropDownListElement');
var CheckBoxElement = require('./checkBoxElement');

function ElementFactory(browser, webdriver) {
    this.browser = browser;
    this.webdriver = webdriver;
}

ElementFactory.prototype.elementClass = Element;

ElementFactory.prototype.createElement = function (options) {

    switch(options.elementType)
    {
        case "TextBox" :
            this.elementClass = TextBoxElement;
            break;
        case "Button" :
            this.elementClass = ButtonElement;
            break;
        case "LinkButton" :
            this.elementClass = LinkButtonElement;
            break;
        case "DropDownList" :
            this.elementClass = DropDownListElement;
            break;
        case "Label" :
            this.elementClass = LabelElement;
            break;
        case "CheckBox" :
            this.elementClass = CheckBoxElement;
            break;
    }

    return new this.elementClass(this.browser, this.webdriver, options);

};

module.exports = ElementFactory;