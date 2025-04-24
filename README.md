# vuejs-demo

This is an example project with a demo how to use VueJS

https://vuejs-demo-three.vercel.app/

## Setup

Make sure to install dependencies:

- NodeJS (LTS)
- [VS Code Vue extension](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run all tests

```sh
npm run test
```

### Run specific tests

```sh
npm run test:unit
npm run test:unit:watch
npm run test:e2e
npm run test:e2e:ui
npm run test:types
npm run lint
```

---

# Exercices Vue - Gestion de Memecoins

## Pages

### 🔹 Page Memecoin `/exercices`

- [X] Créer la page `/exercices`
- [X] Ajouter une section affichant la liste des memecoins
- [X] Récupérer les memecoins via `https://nuxt-demo-blush.vercel.app/api/get-memecoins`
- [X] Afficher les memecoins dans la page

### 🔹 Formulaire de création de memecoin

- [X] Ajouter un formulaire dans la page `/exercices`
- [X] Champs du formulaire :
    - [X] `name` (4-16 caractères, obligatoire)
    - [X] `symbol` (2-4 majuscules, obligatoire)
    - [X] `description` (0-1000 caractères, optionnel)
    - [X] `logoUrl` (0-200 caractères, URL valide, optionnel)
- [X] Validation côté client
- [X] Empêcher l’envoi si les champs sont invalides
- [X] Afficher les erreurs de validation
- [X] Envoyer les données à `https://nuxt-demo-blush.vercel.app/api/create-memecoin`
- [X] Afficher les résultats (succès/erreur)
- [X] Rafraîchir la liste après création

### Bonus

- [X] Stocker la liste des memecoins dans un store Pinia

## Authentification

### 🔹 Page de login

- [X] Ajouter une page d’authentification
- [X] Créer un formulaire avec un seul champ `password`
    - [X] Le mot de passe ne doit pas être vide
- [X] Envoyer une requête POST à `https://nuxt-demo-blush.vercel.app/api/login`
    - (Le mot de passe attendu est **admin123**)
- [X] Stocker le token JWT dans un store Pinia
- [X] Stocker aussi le `userId` retourné
- [X] Injecter le token JWT dans les futures requêtes API
- [X] Changer l’URL de création de memecoin vers :
    - `https://nuxt-demo-blush.vercel.app/api/create-memecoin-protected`
- [X] Vérifier que le `owner` du memecoin créé correspond à l’utilisateur connecté

### 🔹 UI dynamique selon état connecté

- [X] Si **connecté** :
    - [X] Afficher un bouton "Se déconnecter" dans la navbar
    - [X] Rediriger l’utilisateur si il essaie d’accéder à la page de login
- [X] Si **non connecté** :
    - [X] Afficher un bouton "Se connecter" dans la navbar
    - [X] Cacher le formulaire de création de memecoin
    - [X] Afficher un bouton pour se connecter à la place

### Bonus

- [X] Persister l’état de connexion avec `localStorage`

## Tests

- [ ] Créer des **tests unitaires** pour :
    - [ ] Store Pinia d’authentification
    - [ ] Store Pinia des memecoins (si utilisé)
    - [ ] Composant liste des memecoins
    - [ ] Formulaire de création de memecoin
- [ ] Créer un **test end-to-end (e2e)** :
    - [ ] Simuler une authentification
    - [ ] Créer un memecoin
    - [ ] Vérifier qu’il est bien affiché dans la liste

## Rendu

- [ ] Commit & push du travail sur votre **fork**
- [ ] Créer une **pull request** vers le projet d’origine pour validation
