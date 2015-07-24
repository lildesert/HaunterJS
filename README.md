# HaunterJS
Integration test library written in javascript. Based on Selenium webdriver, NodeJS and Mocha.

Environnement pour les tests d'intégration :

- NodeJs avec npm : récupérer le package msi sur le site https://nodejs.org/ (cliquer sur Install)

NPM : Manager de paquets (comme apt) est inclus dans le package NodeJS.

Une fois le package NodeJS installé, il faut lancer une invit de commande windows, et démarrer la récupération des autres outils via NPM.

- Selenium-webdriver : "npm install selenium-webdriver"

- Mocha (installé via "npm -g install mocha"), ici -g signifie global pour que Mocha soit ajouté dans le path Utilisateur

- Chromedriver pour lancer le test avec Google Chrome (à ajouter dans le path)

- PhantomJs en version 1.9.8 (à ajouter dans le path) https://bitbucket.org/ariya/phantomjs/downloads

- En option, un plugin pour NodeJS est disponible sur PhpStorm. Il permet de lancer des tests Mocha directement depuis l'IDE
