## Route, Link, Exact, et Switch dans React
Date: Thu Jan 05 2023 16:34:11

## Add Header, Landing and Footer
Date: Thu Jan 05 2023 13:33:13

## FIREBASE CONFIG
# il faut autoriser de créer à tous mais lecture si Authentifié 
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow create
      allow read: if request.auth.uid != null
    }
  }
}

# Deploiement
https://console.firebase.google.com/project/marvel-quiz-6d041/hosting/sites
npm install -g firebase-tools
firebase login ( tapper no pour la collecte CLI)
npm run build
firebase init

# suite à ça deux fichiers sont crées :
.firebaserc
firebase.json

firebase deploy