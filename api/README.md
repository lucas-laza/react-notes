Démarrer le serveur d'API qui s'appuie sur le fichier `db.json` :

```
npx json-server --watch db.json --port 4000
```

Initialiser `db.json` avec le contenu suivant :

```
{
  "notes": [
    {
      "id": 1,
      "title": "Initiation à React",
      "content": "Lorem ipsum…"
    },
    {
      "id": 2,
      "title": "Utilisation de json-server",
      "content": "Bla bla"
    }
  ],
  "profile": {
    "name": "Arnaud"
  }
}
```
