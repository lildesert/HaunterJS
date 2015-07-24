
/**************************************** Region require ****************************************/
var h = require('./commonMocha');

/**************************************** Test Init ****************************************/
h.test.before(function(done)
{
    this.timeout(20000);
    h.config.devis.numDevis = require(h.config.savePath +'/numDevis.json').numDevis;
    console.log("numDevis : "+h.config.devis.numDevis);
    h.before(done)
});


/**************************************** Test Cleanup ****************************************/
h.test.after(function(done)
{
    this.timeout(20000);

    //On supprime le devis pour cleanup
    h.browser.get(h.serveur +"/devis/"+h.config.devis.numDevis+"/delete-devis");

    h.after(done)
});

/**************************************** Test DECO ****************************************/
h.test.describe('Test DECO - Validation d\'un devis existant', function() {
    //Timeout global
    this.timeout(150000);

    h.test.it('1 - Parcours Login', function(done) {

        var tbLogin = h.ElementFactory.createElement( {
            elementType: "TextBox",
            selectorType: h.TypeSelector.id,
            selector: "username"} );

        var tbPassword = h.ElementFactory.createElement( {
            elementType: "TextBox",
            selectorType: h.TypeSelector.id,
            selector: "password"} );

        var btLogin = h.ElementFactory.createElement( {
            elementType: "Button",
            selectorType: h.TypeSelector.id,
            selector: "_submit"} );

        tbLogin.setText(h.config.auth.login);
        tbPassword.setText(h.config.auth.password);
        btLogin.clickButton();
        done();

    });

    h.test.it('2 - Accès à DECO', function(done) {

        var lbtDeco = h.ElementFactory.createElement( {
            elementType: "LinkButton",
            selectorType: h.TypeSelector.linkText,
            selector: "DECO"} );
        lbtDeco.clickLink(20000);

        h.browser.waitForElement(h.TypeSelector.id, 'action-creer-nouveau-devis', true).then(function() {
            done();
        });

    });

    h.test.it('3 - Accès devis existant', function(done) {

        //Click link accès devis via son numéro
        var lbtAccessDevisByNumber = h.ElementFactory.createElement( {
            elementType: h.TypeElement.linkbutton,
            selectorType: h.TypeSelector.id,
            selector: "recherche-devis-title"} );
        lbtAccessDevisByNumber.clickLink();

        //Click button accès devis via son numéro
        var tbNumDevis = h.ElementFactory.createElement( {
            elementType: h.TypeElement.textbox,
            selectorType: h.TypeSelector.id,
            selector: "recherche-numero-devis"} );
        tbNumDevis.setText(h.config.devis.numDevis);

        //Click button accès devis via son numéro
        var btSearch = h.ElementFactory.createElement( {
            elementType: h.TypeElement.button,
            selectorType: h.TypeSelector.id,
            selector: "devis-recherche-button"} );
        btSearch.clickButton();

        h.browser.waitForElement(h.TypeSelector.id, 'devis-action-demande-derogation', true, 120000).then(function() {
            done();
        });
    });

    h.test.it('4 - Demande dérogation', function(done) {

        //Click button pour changer d'onglet
        var lbtClient = h.ElementFactory.createElement( {
        elementType: h.TypeElement.linkbutton,
        selectorType: h.TypeSelector.id,
        selector: "ui-id-2"} );
        lbtClient.clickLink();

        //Click button demande dérogation
        var btDerogation = h.ElementFactory.createElement( {
            elementType: h.TypeElement.button,
            selectorType: h.TypeSelector.id,
            selector: "devis-action-demande-derogation"} );
        btDerogation.clickButton();

        //Click button confirmer
        var btConfirm = h.ElementFactory.createElement( {
            elementType: h.TypeElement.button,
            selectorType: h.TypeSelector.xpath,
            selector: "/html/body/div[@aria-describedby='dialog-devis-demande-derogation']/div[3]/div/button[2]"} );
        btConfirm.clickButton();

        h.browser.waitForElement(h.TypeSelector.xpath, '/html/body/div[1]/div/section/ul[2]/li[2]/input', true, 120000).then(function() {
            done();
        });

    });

    h.test.it('5 - Accès à PIROGUE et derogation', function(done) {

        //Click button PIROGUE
        var lbtPirogue = h.ElementFactory.createElement( {
            elementType: h.TypeElement.linkbutton,
            selectorType: h.TypeSelector.linkText,
            selector: "PIROGUE"} );
        lbtPirogue.clickLink();

        h.browser.waitForElement(h.TypeSelector.name, "formIndexFiltre[siren]", true, 40000);

        //Saisie du filtre par n° devis
        var tbNumDevis = h.ElementFactory.createElement( {
            elementType: h.TypeElement.textbox,
            selectorType: h.TypeSelector.name,
            selector: "formIndexFiltre[reference]"} );
        tbNumDevis.setText(h.config.devis.numDevis);

        //Click button filtrer
        var btFilter = h.ElementFactory.createElement( {
            elementType: h.TypeElement.button,
            selectorType: h.TypeSelector.name,
            selector: "submitFiltre"} );
        btFilter.clickButton();

        var loading = h.ElementFactory.createElement( {
            elementType: h.TypeElement.label,
            selectorType: h.TypeSelector.id,
            selector: "user-list-table_processing"} );

        h.browser.wait(function(){
            return loading.webElement.isDisplayed().then(function (displayed) {
                if (displayed) {
                    return false;
                }
                return loading.webElement.isEnabled();
            });
        }, 20000).then(function() {
            //Click pour accéder au devis
            var ligneDevis = h.ElementFactory.createElement( {
                elementType: h.TypeElement.linkbutton,
                selectorType: h.TypeSelector.xpath,
                selector: "/html/body/div[1]/div[1]/div[3]/div[3]/div/div/table/tbody/tr/td[5]"} );
            ligneDevis.clickLink();
        });

        h.browser.waitForElement(h.TypeSelector.id, "pirogue_sollicitation", true, 40000).then(function() {
            done();
        });

    });

    h.test.it('6 - Traitement de la dérogation', function(done) {

        //Click button garanties reçues
        var lbtGaranties = h.ElementFactory.createElement( {
            elementType: h.TypeElement.linkbutton,
            selectorType: h.TypeSelector.xpath,
            selector: "/html/body/div[1]/div[1]/div[2]/div[1]/form/div[7]/article/div[5]/label/span"} );
        lbtGaranties.clickLink();

        //Selection du statut
        var ddlStatut = h.ElementFactory.createElement( {
            elementType: h.TypeElement.dropdownlist,
            selectorType: h.TypeSelector.name,
            selector: "formSollicitationDetail[sollicitation][statutSollicitation]"} );
        ddlStatut.selectOption(h.config.devis.derogationStatut);

        //Click button valider
        var btValider = h.ElementFactory.createElement( {
            elementType: h.TypeElement.button,
            selectorType: h.TypeSelector.name,
            selector: "validateSollicitation"} );
        btValider.clickButton();

        var ddlStatutConfirm = h.ElementFactory.createElement( {
            elementType: h.TypeElement.dropdownlist,
            selectorType: h.TypeSelector.name,
            selector: "formSollicitationDetail[sollicitation][statutSollicitation]"} );

        ddlStatutConfirm.getValue().then(function(val){
            h.assert.equal(h.config.devis.derogationStatut, val);
            done();
        });

    });

    h.test.it('7 - Acceptation de la derogation', function(done) {

        //Accès au devis
        h.browser.get(h.serveur +"/devis/"+h.config.devis.numDevis+"/consulter");

        //Click button accepter dérogation
        var btAccept = h.ElementFactory.createElement( {
            elementType: h.TypeElement.button,
            selectorType: h.TypeSelector.id,
            selector: "devis-action-accepter-derogation"} );
        //waitAndClick(btAccept);
        btAccept.clickButton();

        //Click button confirmer
        var btConfirm = h.ElementFactory.createElement( {
            elementType: h.TypeElement.button,
            selectorType: h.TypeSelector.xpath,
            selector: "/html/body/div[@aria-describedby='accepterDerogation-devis-dialog']/div[3]/div/button[2]"} );
        btConfirm.clickButton();

        h.browser.waitForElement(h.TypeSelector.id, "loading_data", false, 40000);

        //Click button envoyer
        var btSend = h.ElementFactory.createElement( {
            elementType: h.TypeElement.button,
            selectorType: h.TypeSelector.id,
            selector: "devis-action-envoyer"} );
        btSend.clickButton();

        //Click button confirmer
        var btConfirmSend = h.ElementFactory.createElement( {
            elementType: h.TypeElement.button,
            selectorType: h.TypeSelector.xpath,
            selector: "/html/body/div[@aria-describedby='envoyer-devis-dialog']/div[3]/div/button[2]"} );
        btConfirmSend.clickButton();

        h.browser.waitForElement(h.TypeSelector.id, "loading_data", false, 40000).then(function() {
            h.browser.get(h.serveur +"/devis/"+h.config.devis.numDevis+"/consulter");
        });

        //Check box conditions générales
        var cbConditions = h.ElementFactory.createElement( {
            elementType: h.TypeElement.checkbox,
            selectorType: h.TypeSelector.id,
            selector: "accept_cgv"} );
        cbConditions.check();

        //On chnage d'onglet pour que phantomJS soit content
        var btHisto = h.ElementFactory.createElement( {
            elementType: h.TypeElement.button,
            selectorType: h.TypeSelector.id,
            selector: "ui-id-2"} );
        btHisto.clickButton();

        //Click button accepter devis
        var btSigner = h.ElementFactory.createElement( {
            elementType: h.TypeElement.button,
            selectorType: h.TypeSelector.id,
            selector: "devis-action-signer"} );
        btSigner.clickButton();

        //Click button confirmer
        var btConfirmSignature = h.ElementFactory.createElement( {
            elementType: h.TypeElement.button,
            selectorType: h.TypeSelector.xpath,
            selector: "/html/body/div[@aria-describedby='signer-devis-dialog']/div[3]/div/button[2]"} );
        btConfirmSignature.clickButton();

        //On vérifie que le bouton générer collecte est bien présent
        h.browser.waitForElement(h.TypeSelector.id, "loading_data", false, 40000).then(function() {
            h.browser.get(h.serveur +"/devis/"+h.config.devis.numDevis+"/consulter").then(function(){
                h.browser.waitForElement(h.TypeSelector.id, "devis-action-generer-collecte", true, 40000).then(function() {
                    done();
                });
            });
        });
    });

});