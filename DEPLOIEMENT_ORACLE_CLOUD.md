# Deploiement sur Oracle Cloud

Ce guide permet d'heberger le chatbot sur une machine virtuelle Oracle Cloud afin que le professeur puisse utiliser l'interface web depuis un navigateur.

## 1. Verifier l'architecture de la VM

Dans la session SSH :

```bash
uname -m
```

Si le resultat est `x86_64`, le projet peut utiliser directement les images Docker Rasa.

Si le resultat est `aarch64`, la VM est ARM. Les images Rasa peuvent ne pas etre compatibles. Le plus simple est alors de creer une VM Oracle Cloud en architecture AMD/x86_64.

Option alternative sur ARM : utiliser l'emulation `linux/amd64` avec le fichier `docker-compose.arm-emulation.yml`. Cette option peut etre lente, surtout pendant l'entrainement Rasa.

## 2. Installer Docker et Docker Compose

Sur Ubuntu :

```bash
sudo apt update
sudo apt install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo $VERSION_CODENAME) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo usermod -aG docker $USER
```

Fermer puis rouvrir la session SSH, puis verifier :

```bash
docker --version
docker compose version
```

## 3. Envoyer le projet vers la VM

Depuis le PC local, dans PowerShell :

```powershell
scp -r "C:\Users\Acer\Documents\Codex\2026-06-08\mini-projet-d-veloppement-d-un\outputs\orange-maroc-rasa-chatbot" ubuntu@IP_PUBLIQUE:/home/ubuntu/
```

Remplacer `ubuntu` par le nom d'utilisateur SSH si necessaire, et `IP_PUBLIQUE` par l'adresse IP publique de la VM.

## 4. Lancer le projet sur la VM

Dans la session SSH :

```bash
cd /home/ubuntu/orange-maroc-rasa-chatbot
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
```

Verifier les conteneurs :

```bash
docker compose ps
```

Voir les logs :

```bash
docker compose logs -f
```

## 5. Ouvrir le port HTTP sur Oracle Cloud

Dans Oracle Cloud Console :

1. Aller dans la VM.
2. Ouvrir le VCN/Subnet associe.
3. Aller dans Security Lists ou Network Security Groups.
4. Ajouter une regle Ingress :
   - Source CIDR : `0.0.0.0/0`
   - IP Protocol : TCP
   - Destination Port Range : `80`

Sur la VM, ouvrir aussi le firewall local si necessaire :

```bash
sudo ufw allow 80/tcp
sudo ufw reload
```

Si `ufw` n'est pas active, cette etape peut afficher un message sans impact.

## 6. Tester le site

Dans un navigateur :

```text
http://IP_PUBLIQUE
```

Le professeur pourra utiliser cette URL.

## 7. Arreter ou redemarrer

Arreter :

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml down
```

Redemarrer :

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

Mettre a jour apres modification :

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
```
