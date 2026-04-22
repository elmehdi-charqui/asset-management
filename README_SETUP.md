# 🚀 OCP Asset Management - Guide d'installation

Ce guide vous explique comment installer et lancer ce projet sur un autre ordinateur.

## 📋 Prérequis
Assurez-vous d'avoir les éléments suivants installés :
- **PHP** (>= 8.2)
- **Composer**
- **Node.js & NPM**
- **MySQL** (ou un serveur type XAMPP/WampServer)

## 🛠️ Étapes d'installation

1. **Extraction / Clonage**
   Copiez le dossier du projet sur votre nouveau PC.

2. **Installation des dépendances PHP**
   ```bash
   composer install
   ```

3. **Installation des dépendances JavaScript**
   ```bash
   npm install
   ```

4. **Configuration de l'environnement**
   - Copiez le fichier `.env.example` et renommez-le en `.env`.
   - Modifiez les informations de connexion à la base de données dans le fichier `.env` :
     ```env
     DB_CONNECTION=mysql
     DB_HOST=127.0.0.1
     DB_PORT=3306
     DB_DATABASE=ocp_asset_management
     DB_USERNAME=votre_utilisateur
     DB_PASSWORD=votre_mot_de_passe
     ```

5. **Génération de la clé d'application**
   ```bash
   php artisan key:generate
   ```

6. **Migration et Seeding (Base de données)**
   Créez d'abord la base de données dans MySQL, puis lancez :
   ```bash
   php artisan migrate --seed
   ```

7. **Lancement du projet**
   Vous devez ouvrir deux terminaux :

   **Terminal 1 (Serveur Backend) :**
   ```bash
   php artisan serve
   ```

   **Terminal 2 (Compilation Frontend) :**
   ```bash
   npm run dev
   ```

8. **Accès**
   Ouvrez votre navigateur sur : `http://127.0.0.1:8000`

---
**Note :** Pour que le logo OCP s'affiche, assurez-vous d'avoir placé votre fichier image dans `public/images/logo-ocp.png`.
