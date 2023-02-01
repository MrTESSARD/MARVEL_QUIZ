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