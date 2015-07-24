
function Element(browser, webdriver, options) {
    this.browser = browser;
    this.webdriver = webdriver;
    this.webElement = this.initializeElement(options.selectorType, options.selector);
}

Element.prototype.initializeElement = function(typeSelector, selector) {
    return this.browser.findElement(this.webdriver.By[typeSelector](selector));
};

module.exports = Element;