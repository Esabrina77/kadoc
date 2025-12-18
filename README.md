# Kadoc 🧠

> **Votre Cerveau de Code Personnel.** Une base de connaissances haute performance pour gérer vos snippets de code et votre documentation technique.

Kadoc est une application conçue par des développeurs pour stocker, organiser et retrouver rapidement des bouts de code et de la documentation. Construit avec un accent sur la **vitesse**, l'**esthétique** et l'**expérience développeur**.

## ✨ Fonctionnalités

- **⚡ Ultra Rapide** : Backend en Go pour une latence minimale.
- **🎨 Interface Glassmorphism** : Un design moderne et élégant utilisant Tailwind CSS v4 et des effets de transparence.
- **💻 Snippets Intelligents** : 
  - Coloration syntaxique pour de nombreux langages.
  - Notes de complexité et historique des versions.
  - Copie et partage en un clic.
- **📄 Documentation Markdown** :
  - Rendu Markdown complet pour vos guides et notes d'architecture.
  - Typographie adaptative mode clair/sombre (`prose`).
- **🌍 Internationalisation** : Entièrement traduit en Anglais et Français.
- **🔍 Recherche Instantanée** : Filtres de recherche dédiés pour les snippets et la documentation.

## 🛠 Stack Technique

### Frontend
- **Framework** : [Next.js 16 (App Router)](https://nextjs.org/)
- **Langage** : TypeScript
- **Style** : [Tailwind CSS v4](https://tailwindcss.com/)
- **I18n** : [next-intl](https://next-intl-docs.vercel.app/)
- **Icônes** : [Lucide React](https://lucide.dev/)

### Backend
- **Langage** : [Go (Golang)](https://go.dev/)
- **ORM Base de données** : [Prisma Client Go](https://github.com/steebchen/prisma-client-go)
- **Base de données** : PostgreSQL (Développement & Production)
- **Hot Reload** : `fresh` pour le développement Go

## 🚀 Démarrage

### Prérequis
- Node.js (v18+)
- Go (v1.20+)
- Base de données PostgreSQL (Locale ou Docker)

### 1. Installation du Backend

Naviguez dans le dossier backend :
```bash
cd backend
```

Configurez vos variables d'environnement :
Créez un fichier `.env` dans le dossier `backend/` :
```env
DATABASE_URL="postgres://user:password@localhost:5432/kadoc_db"
PORT=3006
```

Installez les dépendances Go et lancez :
```bash
# Synchroniser les dépendances
go mod tidy

# Générer le client Prisma et pousser le schéma
go run github.com/steebchen/prisma-client-go db push

# Lancer le serveur (avec fresh pour le hot-reload ou go run)
go run main.go
# OU si vous avez 'fresh' installé :
fresh
```
L'API démarrera sur `http://localhost:3006`.

### 2. Installation du Frontend

Naviguez dans le dossier frontend :
```bash
cd frontend
```

Installez les dépendances :
```bash
npm install
```

Lancez le serveur de développement :
```bash
npm run dev
```
L'application sera accessible sur `http://localhost:3000`.

## 📂 Structure du Projet

```text
kadoc/
├── backend/            # Backend Go
│   ├── handlers/       # Gestionnaires de requêtes HTTP
│   ├── routes/         # Routage API
│   ├── db/             # Connexion Base de données
│   ├── schema.prisma   # Schéma de base de données
│   └── main.go         # Point d'entrée
│
├── frontend/           # Frontend Next.js
│   ├── messages/       # Fichiers JSON i18n (en/fr)
│   ├── src/
│   │   ├── app/        # Next.js App Router
│   │   ├── components/ # Composants React (Cartes Glass, Navbar...)
│   │   └── styles/     # CSS Global & config Tailwind
│   └── next.config.ts  # Configuration Next.js
└── README.md
```

## 📜 Licence

Ce projet est open-source et disponible sous la licence MIT.
