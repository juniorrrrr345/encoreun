# Configuration MongoDB Atlas - Guide étape par étape

## 1. Accéder à MongoDB Atlas
- Va sur https://cloud.mongodb.com
- Connecte-toi à ton compte

## 2. Créer un nouvel utilisateur
- Va dans "Database Access" (dans le menu de gauche)
- Clique sur "Add New Database User"
- Username: `LeLoup`
- Password: `LeLoup`
- User Privileges: "Read and write to any database"
- Clique sur "Add User"

## 3. Autoriser ton IP
- Va dans "Network Access" (dans le menu de gauche)
- Clique sur "Add IP Address"
- Choisis "Allow Access from Anywhere" (0.0.0.0/0)
- Clique sur "Confirm"

## 4. Obtenir la chaîne de connexion
- Va dans "Database" (dans le menu de gauche)
- Clique sur "Connect"
- Choisis "Connect your application"
- Copie la chaîne de connexion

## 5. Tester la connexion
```bash
cd api
node test-connection.js
```

## Alternative : Utiliser un mot de passe plus sécurisé
Si tu veux un mot de passe plus sécurisé, utilise quelque chose comme :
- Username: `LeLoup`
- Password: `LeLoup2024!` (ou un autre mot de passe sécurisé)

Puis mets à jour le fichier .env avec le nouveau mot de passe.