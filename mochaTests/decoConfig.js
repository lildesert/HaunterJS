var config = {};

config.capabilities = "phantomJsCapabilities";
//config.capabilities = "firefoxCapabilities";
//config.capabilities = "chromeCapabilities";

config.url = "http://deco.bouyguestelecom.fr";

//config.savePath = "/tmp";
config.savePath = ".";

config.auth = {};
config.auth.login = "jbistoqu";
config.auth.password = "QAvRDaCb";

config.devis = {};

//Test creation devis
config.devis.bytel = {};
config.devis.bytel.cdAffaire = "test137";
config.devis.bytel.commercial = "admin";
config.devis.bytel.iav = "IAV non sollicité";
config.devis.bytel.parcours2 = false;
config.devis.bytel.parcours3 = false;

config.devis.client = {};
config.devis.client.siren = "432126092";
config.devis.client.raison = "GOOGLE INC";
config.devis.client.siret = "43212609200027";
config.devis.client.nomSite = "GOOGLE INC";

config.devis.client.contact = {};
config.devis.client.contact.civilite = "M.";
config.devis.client.contact.nom = "Moles";
config.devis.client.contact.prenom = "Marc";
config.devis.client.contact.telephone = "0156458597";
config.devis.client.contact.email = "mmoles@bouyguestelecom.fr";
config.devis.client.contact.mobile = "0652666666";
config.devis.client.contact.fonction = "DSI";

config.devis.offre = {};
config.devis.offre.offreMobile = "B5F Mob Neo D";


//Test validation devis
config.devis.derogationStatut = "traite";

module.exports = config;