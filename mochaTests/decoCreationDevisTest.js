
/**************************************** Region require ****************************************/
var h = require('./commonMocha');

/**************************************** Test Init ****************************************/
h.test.before(function(done)
{
    this.timeout(20000);
    h.before(done)
});


/**************************************** Test Cleanup ****************************************/
h.test.after(function(done)
{
    this.timeout(10000);
    h.after(done)
});

/**************************************** Test DECO ****************************************/
h.test.describe('Test DECO - Création d\'un nouveau devis contrôlé', function() {
    //Timeout global
    this.timeout(240000);

    /******************** Parcours Login *********************/
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

    /******************** Accès à DECO *********************/
    h.test.it('2 - Accès à DECO', function(done) {

        var lbtDeco = h.ElementFactory.createElement( {
            elementType: "LinkButton",
            selectorType: h.TypeSelector.linkText,
            selector: "DECO"} );
        lbtDeco.clickLink(20000);

        h.browser.waitForElement(h.TypeSelector.id,'action-creer-nouveau-devis', true).then(function() {
            done();
        });

    });

    /******************** Création d'un nouveau devis *********************/
    h.test.it('3 - Nouveau devis - onglet ByTel', function(done) {

        //Click button nouveau devis
        var lbtNewDevis = h.ElementFactory.createElement( {
            elementType: "LinkButton",
            selectorType: h.TypeSelector.id,
            selector: "action-creer-nouveau-devis"} );
        lbtNewDevis.clickLink();

        //Saisie du code affaire
        var tbCdAffaire = h.ElementFactory.createElement( {
            elementType: "TextBox",
            selectorType: h.TypeSelector.id,
            selector: "bytel-code-affaire"} );
        tbCdAffaire.setText(h.config.devis.bytel.cdAffaire);

        //Sélection de l'IAV
        var ddlIAV = h.ElementFactory.createElement( {
            elementType: "DropDownList",
            selectorType: h.TypeSelector.id,
            selector: "bytel-iav"} );
        ddlIAV.selectOption(h.config.devis.bytel.iav);

        if(h.config.devis.bytel.parcours3)
        {
            console.log("Onglet ByTel - Parcours 3 actif");

            //Click button ajout d'un commercial
            var lbtCommercial = h.ElementFactory.createElement( {
                elementType: "LinkButton",
                selectorType: h.TypeSelector.linkText,
                selector: "Pour un commercial ?"} );
            lbtCommercial.clickLink();

            //Saisie du login commercial
            var tbLoginComm = h.ElementFactory.createElement( {
                elementType: "TextBox",
                selectorType: h.TypeSelector.id,
                selector: "bytel-substitut-dialog-login"} );
            tbLoginComm.setText(h.config.devis.bytel.commercial);

            //Ajout du commercial
            var btAddCommercial = h.ElementFactory.createElement( {
                elementType: "Button",
                selectorType: h.TypeSelector.xpath,
                selector: "/html/body/div[11]/div[3]/div/button[2]"} );
            btAddCommercial.clickButton();

            //On attend la réponse de l'appel AJAX en attendant la dispariton du loading
            h.browser.waitForElement(h.TypeSelector.id,'loading_data', false).then(function() {
                //On vérifie si l'action s'est bien déroulée
                var lblIdSubstitut = h.ElementFactory.createElement( {
                    elementType: "Label",
                    selectorType: h.TypeSelector.xpath,
                    selector: "/html/body/div[1]/div[1]/form/div[2]/div[1]/div[2]/h4"} );
                lblIdSubstitut.webElement.isDisplayed().then(function(val){
                    h.assert.equal(true, val);
                });
            });

            //Click button supprimer la substitution
            var lbtDelSub = h.ElementFactory.createElement( {
                elementType: "LinkButton",
                selectorType: h.TypeSelector.linkText,
                selector: "Supprimer la substitution ?"} );
            lbtDelSub.clickLink();

            //Valider la suppression
            var btDelCommercial = h.ElementFactory.createElement( {
                elementType: "Button",
                selectorType: h.TypeSelector.xpath,
                selector: "/html/body/div[12]/div[3]/div/button[2]"} );
            btDelCommercial.clickButton();

            //On attend la réponse de l'appel AJAX en attendant la dispariton du loading
            h.browser.waitForElement(h.TypeSelector.id,'loading_data', false).then(function() {
                //On vérifie si l'action s'est bien déroulée
                var lblIdSubstitut = h.ElementFactory.createElement( {
                    elementType: "Label",
                    selectorType: h.TypeSelector.xpath,
                    selector: "/html/body/div[1]/div[1]/form/div[2]/div[1]/div[2]/h4"} );
                lblIdSubstitut.webElement.isDisplayed().then(function(val){
                    h.assert.equal(false, val);
                });
            });

        }

        if(h.config.devis.bytel.parcours2)
        {
            console.log("Onglet ByTel - Parcours 2 actif");

            //Click button ajout d'un commercial
            var lbtCommercial = h.ElementFactory.createElement( {
                elementType: "LinkButton",
                selectorType: h.TypeSelector.linkText,
                selector: "Pour un commercial ?"} );
            lbtCommercial.clickLink();

            //Saisie du login commercial
            var tbLoginComm = h.ElementFactory.createElement( {
                elementType: "TextBox",
                selectorType: h.TypeSelector.id,
                selector: "bytel-substitut-dialog-login"} );
            tbLoginComm.setText(h.config.devis.bytel.commercial);

            //Ajout du commercial
            var btAddCommercial = h.ElementFactory.createElement( {
                elementType: "Button",
                selectorType: h.TypeSelector.xpath,
                selector: "/html/body/div[11]/div[3]/div/button[2]"} );
            btAddCommercial.clickButton();

            //On attend la réponse de l'appel AJAX en attendant la dispariton du loading
            h.browser.waitForElement(h.TypeSelector.id,'loading_data', false).then(function() {
                //On vérifie si l'action s'est bien déroulée
                var lblIdSubstitut = h.ElementFactory.createElement( {
                    elementType: "Label",
                    selectorType: h.TypeSelector.xpath,
                    selector: "/html/body/div[1]/div[1]/form/div[2]/div[1]/div[2]/h4"} );
                lblIdSubstitut.webElement.isDisplayed().then(function(val){
                    h.assert.equal(true, val);
                });
            });
        }

        done();
    });

    h.test.it('4 - Nouveau devis - onglet Client', function(done) {

        //Accès à l'onglet client
        var lbtClient = h.ElementFactory.createElement( {
            elementType: "LinkButton",
            selectorType: h.TypeSelector.id,
            selector: "ui-id-2"} );
        lbtClient.clickLink();

        //Saisie du SIREN
        var tbSiren = h.ElementFactory.createElement( {
            elementType: "TextBox",
            selectorType: h.TypeSelector.id,
            selector: "client-siren"} );
        tbSiren.setText(h.config.devis.client.siren);

        //Recherche des informations client
        var lbtInfoCli = h.ElementFactory.createElement( {
            elementType: "LinkButton",
            selectorType: h.TypeSelector.linkText,
            selector: "Info Client"} );
        lbtInfoCli.clickLink();

        var tbRaisonSoc = h.ElementFactory.createElement( {
            elementType: "TextBox",
            selectorType: h.TypeSelector.id,
            selector: "client-raison-sociale-hidden"} );

        //On attend la réponse de l'appel AJAX en attendant la dispariton du loading
        h.browser.waitForElement(h.TypeSelector.id, 'loading_data', false).then(function(){
            tbRaisonSoc.getText().then(function(text){
                //Vérification des informations client
                h.assert.equal(h.config.devis.client.raison, text);
            });
        });

        //Saisie du SIRET
        var tbSiret = h.ElementFactory.createElement( {
            elementType: "TextBox",
            selectorType: h.TypeSelector.id,
            selector: "client-site-signataire-siret"} );
        tbSiret.setText(h.config.devis.client.siret);

        //Recherche des informations site
        var lbtSiret = h.ElementFactory.createElement( {
            elementType: "LinkButton",
            selectorType: h.TypeSelector.id,
            selector: "client-site-signataire-recherche-info"} );
        lbtSiret.clickLink();

        var tbNomSite = h.ElementFactory.createElement( {
            elementType: "TextBox",
            selectorType: h.TypeSelector.id,
            selector: "client-site-signataire-nom"} );

        //On attend la réponse de l'appel AJAX en attendant la dispariton du loading
        h.browser.waitForElement(h.TypeSelector.id, 'loading_data', false).then(function(){
            tbNomSite.getText().then(function(text){
                try {
                    //Vérification des informations site
                    h.assert.equal(h.config.devis.client.nomSite, text);
                }
                catch(error) {
                    if(error instanceof h.assert.AssertionError)
                    {
                        h.browser.saveScreenshot("errorSiret.png");
                        console.log("Erreur lors de la vérification des informations du site");
                    }

                    throw error;
                }
            });
        });

        //Sélection de la civilité
        var ddlCivilite = h.ElementFactory.createElement( {
            elementType: "DropDownList",
            selectorType: h.TypeSelector.id,
            selector: "client-signataire-civilite"} );
        ddlCivilite.selectOption(h.config.devis.client.contact.civilite);

        //Saisie du nom du contact
        var tbNomContact = h.ElementFactory.createElement( {
            elementType: "TextBox",
            selectorType: h.TypeSelector.id,
            selector: "client-signataire-nom"} );
        tbNomContact.setText(h.config.devis.client.contact.nom);

        //Saisie du prénom du contact
        var tbPrenomContact = h.ElementFactory.createElement( {
            elementType: "TextBox",
            selectorType: h.TypeSelector.id,
            selector: "client-signataire-prenom"} );
        tbPrenomContact.setText(h.config.devis.client.contact.prenom);

        //Saisie du téléphone du contact
        var tbTelContact = h.ElementFactory.createElement( {
            elementType: "TextBox",
            selectorType: h.TypeSelector.id,
            selector: "client-signataire-tel-fixe"} );
        tbTelContact.setText(h.config.devis.client.contact.telephone);

        //Saisie du mail du contact
        var tbMailContact = h.ElementFactory.createElement( {
            elementType: "TextBox",
            selectorType: h.TypeSelector.id,
            selector: "client-signataire-email"} );
        tbMailContact.setText(h.config.devis.client.contact.email);

        //Saisie du mobile du contact
        var tbMobileContact = h.ElementFactory.createElement( {
            elementType: "TextBox",
            selectorType: h.TypeSelector.id,
            selector: "client-signataire-tel-mobile"} );
        tbMobileContact.setText(h.config.devis.client.contact.mobile);

        //Sélection de la fonction
        var ddlFonction = h.ElementFactory.createElement( {
            elementType: "DropDownList",
            selectorType: h.TypeSelector.id,
            selector: "client-signataire-fonction"} );
        ddlFonction.selectOption(h.config.devis.client.contact.fonction);

        done();
    });

    /******************** Accès à DECO *********************/
    h.test.it('5 - Nouveau devis - onglet Offres', function(done) {

        var lbtOffre = h.ElementFactory.createElement( {
            elementType: "LinkButton",
            selectorType: h.TypeSelector.id,
            selector: "ui-id-3"} );
        lbtOffre.clickLink();

        var lbtAjouterOffreTelMobile = h.ElementFactory.createElement( {
            elementType: "LinkButton",
            selectorType: h.TypeSelector.id,
            selector: "solution_telephonie_mobile_add"} );
        lbtAjouterOffreTelMobile.clickLink();

        h.browser.waitForElement(h.TypeSelector.id, 'loading_data', false);

        var lbtLoadOffre = h.ElementFactory.createElement({
            elementType: "LinkButton",
            selectorType: h.TypeSelector.xpath,
            selector: "/html/body/div[1]/div[1]/form/div[2]/div[3]/div[6]/table/tr[1]/td[1]/div/span[1]/a"
        });
        lbtLoadOffre.clickLink();

        var lbtChoix = h.ElementFactory.createElement( {
            elementType: h.TypeElement.linkbutton,
            selectorType: h.TypeSelector.linkText,
            selector: h.config.devis.offre.offreMobile} );
        lbtChoix.clickLink();

        var lbtByTel = h.ElementFactory.createElement( {
            elementType: h.TypeElement.linkbutton,
            selectorType: h.TypeSelector.id,
            selector: "ui-id-1"} );
        lbtByTel.clickLink();

        var btControler = h.ElementFactory.createElement( {
            elementType: "Button",
            selectorType: h.TypeSelector.id,
            selector: "devis-action-controler"} );
        btControler.clickButton();

        h.browser.waitForElement(h.TypeSelector.id, 'devis-action-demande-derogation', true, 40000).then(function(){
            var lblNumDevis = h.ElementFactory.createElement( {
                elementType: h.TypeElement.label,
                selectorType: h.TypeSelector.xpath,
                selector: "/html/body/div[1]/div[1]/div/h1"} );

            lblNumDevis.getText().then(function(text){
                var data = {
                    numDevis:text.substr(8,12)
                };

                var outputFilename = h.config.savePath +'/numDevis.json';

                h.fs.writeFile(outputFilename, JSON.stringify(data, null, 4), function(err) {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("\n JSON saved to " + outputFilename);
                    }
                });
            });

            done();
        });
    });

});