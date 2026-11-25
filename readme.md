API Jeux Vidéo

Une petite API REST pour gérer ma collection de jeux vidéo. Faite en TypeScript avec Express et SQLite, pour le TP CRUD.

On peut lister les jeux, en voir un, en ajouter, en modifier et en supprimer.

Ce qu'il y a dedans
TypeScript + Node.js
Express pour le serveur
SQLite (better-sqlite3) pour la base
Swagger pour la doc
Bruno pour les tests
Lancer le projet
npm install

La base game.db n'est pas sur le repo (elle est dans le .gitignore). Pour la recréer :

Ouvrir DB Browser for SQLite
Créer une nouvelle base src/database/game.db
Exécuter le contenu de src/database/schema.sql
Ajouter quelques jeux avec des INSERT INTO
Enregistrer (Ctrl + S) et fermer DB Browser

Puis :

npm run dev

L'API tourne sur http://localhost:3000

Les routes
Méthode	Route	Ça fait quoi
GET	/api/games	tous les jeux
GET	/api/games/:id	un jeu
POST	/api/games	ajouter un jeu
PUT	/api/games/:id	modifier un jeu (il faut envoyer tous les champs)
DELETE	/api/games/:id	supprimer un jeu

Exemple de jeu à envoyer :

json
{
  "title": "Celeste",
  "editor": "Maddy Makes Games",
  "releaseYear": 2018,
  "genre": "Plateforme",
  "rating": 9
}

Les règles : titre, éditeur et genre obligatoires, année entre 1950 et 2100, note entre 0 et 10. Sinon l'API répond 400 avec la liste des erreurs.

La doc

Swagger est dispo sur http://localhost:3000/api/docs, on peut tester toutes les routes directement dedans.

Les tests

La collection Bruno est dans docs/Bruno. Il faut l'ouvrir dans Bruno, choisir l'environnement Local, puis lancer la collection avec le Runner (le serveur doit tourner).

Il y a les tests qui doivent marcher (200, 201, 204) et ceux qui doivent échouer proprement (400, 404).

Comment c'est rangé
src/
├── routes/        les URLs
├── controllers/   lit la requête, renvoie la réponse
├── services/      vérifie les données
├── repositories/  les requêtes SQL
├── database/      connexion à SQLite + schema.sql
├── models/        le type Game
├── config/        le chemin du projet
├── app.ts         config d'Express
└── server.ts      démarre le serveur

Une requête passe par : route → controller → service → repository → base.

Les galères rencontrées
Cannot find module 'node:url' : TypeScript 7 ne charge plus les types de Node tout seul, il a fallu ajouter "types": ["node"] dans le tsconfig.
Erreur TS2307 : un s en trop dans un nom de fichier (games.repository au lieu de game.repository), et il faut mettre .js dans les imports même si le fichier est en .ts.
database is locked : DB Browser était ouvert avec des modifs pas enregistrées, ça bloquait l'API. Solution : enregistrer et fermer DB Browser pendant les tests.
Dans la base la colonne s'appelle release_year mais dans le code c'est releaseYear, c'est le repository qui fait la traduction.
Les requêtes SQL utilisent des ? / @nom (requêtes préparées) pour éviter les injections SQL.
