# Rapport du mini-projet

## Titre

Developpement d'un chatbot intelligent et deploiement dans un environnement virtualise.

## Contexte

Le projet s'inscrit dans le cadre du Cloud Computing et de la virtualisation. Il montre comment une application intelligente peut etre developpee, conteneurisee et deployee sous forme de services independants.

Le domaine choisi est l'assistance client Orange Maroc. Le chatbot repond aux demandes courantes : offres mobile, fibre, factures, paiement, suivi de consommation, assistance technique, agences, roaming et reclamations.

## Objectifs

- Concevoir un chatbot capable de comprendre des messages en langage naturel.
- Utiliser Rasa comme framework NLP et moteur conversationnel.
- Proposer une interface web simple pour les utilisateurs.
- Conteneuriser l'ensemble de l'application avec Docker.
- Simuler un deploiement cloud a travers plusieurs services Docker.

## Technologies utilisees

- Rasa : moteur conversationnel et classification des intentions.
- Rasa SDK : execution des actions personnalisees.
- HTML, CSS, JavaScript : interface utilisateur.
- Nginx : serveur web et reverse proxy vers Rasa.
- Docker Compose : orchestration des conteneurs.

## Fonctionnement

L'utilisateur envoie un message depuis l'interface web. Nginx transmet la requete au webhook REST de Rasa. Rasa analyse l'intention, choisit la reponse ou declenche une action personnalisee. Pour une reclamation, le serveur d'actions genere une reference de ticket simulee.

## Architecture applicative

```text
Navigateur web
    |
    v
Conteneur web Nginx
    |
    v
Conteneur Rasa
    |
    v
Conteneur Actions Rasa SDK
```

## Intentions implementees

- saluer
- aurevoir
- remercier
- bot_challenge
- offres_mobile
- offres_fibre
- suivi_conso
- factures
- assistance_technique
- agences
- reclamation
- contact_humain
- roaming
- paiement

## Deploiement

Le deploiement est realise avec la commande :

```bash
docker compose up --build
```

L'interface web est ensuite disponible a l'adresse :

```text
http://localhost:8080
```

## Conclusion

Ce mini-projet montre une chaine complete de developpement : donnees conversationnelles, modele Rasa, interface web, action metier et deploiement virtualise. Il peut etre enrichi avec une base de donnees, une authentification client, des statistiques de conversation ou une integration avec un vrai systeme CRM.
