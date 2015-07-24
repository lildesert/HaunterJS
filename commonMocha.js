
/**************************************** Region require ****************************************/

var h = {};

//Your config file
h.config = require('./configFile');

//A dataset for my project
h.jeu = require('./jeu');

h.webdriver = require('selenium-webdriver');
h.assert = require('assert');
h.test = require('selenium-webdriver/testing');
h.proxy = require('selenium-webdriver/proxy');
h.fs = require('fs');

h.Factory = require('./../HaunterJS/elementFactory');
h.TypeElement = require('./../HaunterJS/typeElement');
h.TypeSelector = require('./../HaunterJS/typeSelector');


var browserProxy = {proxyType: 'manual',httpProxy: 'localhost:3128', sslProxy: 'localhost:3128'};
if (process.env.http_proxy) {
    browserProxy.sslProxy =
        browserProxy.httpProxy =
            process.env.http_proxy.replace(/^http:\/\//, '');
}

h.phantomJsCapabilities = {'browserName': 'phantomjs',
    'proxy': browserProxy,
    'phantomjs.cli.args': ['--ignore-ssl-errors=yes', '--webdriver-loglevel=DEBUG']
};

h.chromeCapabilities = {'browserName': 'chrome',
    'proxy': browserProxy
};

h.firefoxCapabilities = {'browserName': 'firefox',
    'proxy': browserProxy
};

h.before = function(done) {
    h.browser = new h.webdriver.Builder()
        .withCapabilities(h[h.config.capabilities])
        .build();

    h.browser.getCapabilities().then(function(val){
        console.log("browser name : "+val.get("browserName"));
        console.log("browser version : "+val.get("version"));
    });

    //Fonction pour prendre une capture d'écran (ne fonctionne pas sous Chrome)
    //ex : h.browser.saveScreenshot("test.png");
    h.webdriver.WebDriver.prototype.saveScreenshot = function(filename) {
        return h.browser.takeScreenshot().then(function(data) {
            h.fs.writeFile(filename, data.replace(/^data:image\/png;base64,/,''), 'base64', function(err) {
                if(err) throw err;
            });
        })
    };

    //Fonction mettant la suite de test en attente le temps qu'un élément apparaisse ou disparaisse (param present true / false)
    h.webdriver.WebDriver.prototype.waitForElement = function(typeSelector, selector, present, timeout) {
        return h.browser.wait(function () {
            return h.browser.findElements(h.webdriver.By[typeSelector](selector)).then(function (val) {
                return present == true ? val.length == 1 : val.length == 0;
            })
        }, timeout ? timeout : 20000)
    };

    //Initialisation de notre factory
    h.ElementFactory = new h.Factory(h.browser, h.webdriver);

    //Accès au site web et positionnement du cookie pour analyse de la couverture de code
    h.serveur = h.config.url;
    if(h.jeu.serveurDeco) {
        h.serveur = h.jeu.serveurDeco;
    }
    h.browser.get(h.serveur).then(function() {
        if(h.jeu.cookies) {
            var i;
            for (i in h.jeu.cookies) {
                h.browser.manage().addCookie(
                    i,
                    h.jeu.cookies[i]
                );
            }
        }

        done();
    });
};

h.after = function(done) {
    h.browser.quit().then(function(){
        done();
    });
};

module.exports = h;
