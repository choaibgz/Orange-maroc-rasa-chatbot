# Mini-projet : Chatbot Orange Maroc avec Rasa et Docker

Ce projet propose un chatbot intelligent d'assistance client inspire d'Orange Maroc. Il inclut un moteur conversationnel Rasa, une interface web responsive et une conteneurisation complete avec Docker Compose.

## Objectifs couverts

- Moteur conversationnel base sur Rasa.
- Interface web simple et clean aux couleurs Orange Maroc.
- Action serveur Rasa pour simuler la creation d'une reclamation.
- Deploiement local virtualise avec Docker Compose.
- Simulation cloud via architecture multi-conteneurs.

## Architecture

```text
Utilisateur
   |
   v
Interface Web Nginx : http://localhost:8080
   |
   v
Rasa Server : http://rasa:5005
   |
   v
Action Server : http://actions:5055
```

## Structure du projet

```text
orange-maroc-rasa-chatbot/
  docker-compose.yml
  README.md
  rasa/
    Dockerfile
    config.yml
    credentials.yml
    domain.yml
    endpoints.yml
    data/
      nlu.yml
      rules.yml
      stories.yml
  actions/
    Dockerfile
    actions.py
    requirements.txt
  web/
    index.html
    styles.css
    app.js
  nginx/
    default.conf
```

## Lancement avec Docker

Depuis ce dossier :

```bash
docker compose up --build
```

Si vous aviez deja lance une construction qui a echoue, relancez proprement avec :

```bash
docker compose down
docker compose build --no-cache
docker compose up
```

Puis ouvrir :

```text
http://localhost:8080
```

Pour arreter les conteneurs :

```bash
docker compose down
```

## Exemples de questions

- Bonjour
- Quelles sont vos offres mobile ?
- Je veux connaitre les offres fibre
- Comment payer ma facture ?
- Ma connexion internet ne marche pas
- Je veux faire une reclamation
- Ou trouver une agence Orange ?
- Je veux parler a un conseiller

## Simulation de deploiement cloud

Le fichier `docker-compose.yml` simule un deploiement cloud compose de trois services :

- `web` : serveur Nginx exposant l'interface et jouant le role de reverse proxy.
- `rasa` : serveur NLP qui recoit les messages utilisateur.
- `actions` : microservice qui execute la logique metier personnalisee.

Dans un cloud reel, ces services peuvent etre deployes sur une machine virtuelle, Docker Swarm, Kubernetes ou une plateforme PaaS compatible Docker.

Pour un deploiement Oracle Cloud, utiliser aussi le fichier :

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
```

Le guide detaille se trouve dans `DEPLOIEMENT_ORACLE_CLOUD.md`.

## Notes pedagogiques

Le chatbot est oriente service client : offres, factures, assistance technique, agences, roaming, paiement et reclamations. Les donnees sont volontairement simples pour rester adaptees a un mini-projet, mais la structure permet d'ajouter facilement de nouveaux intents, stories et actions.
