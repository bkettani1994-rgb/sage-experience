# Connecter le formulaire de la landing page à un Google Sheet

La landing page `index.html` envoie chaque demande de démo dans une feuille Google Sheet,
sans serveur ni abonnement, via un **Google Apps Script Web App**. Suivez ces étapes une seule fois.

---

## 1. Créer la feuille de réception

1. Allez sur [sheets.google.com](https://sheets.google.com) et créez une feuille vide.
2. Nommez-la par ex. **« Leads – Sage 100 Experience Cloud »**.
   (Les colonnes se créent automatiquement à la première réception.)

## 2. Ajouter le script

1. Dans la feuille : menu **Extensions → Apps Script**.
2. Supprimez le code par défaut, puis collez tout le contenu du fichier **`google-apps-script.gs`**.
3. Cliquez sur **Enregistrer** (icône disquette).

## 3. Déployer en application Web

1. En haut à droite : **Déployer → Nouveau déploiement**.
2. Cliquez sur l'engrenage **⚙ → Application Web**.
3. Renseignez :
   - **Description** : `Leads Sage 100 Experience Cloud`
   - **Exécuter en tant que** : *Moi*
   - **Qui a accès** : **Tout le monde**
4. Cliquez sur **Déployer**, puis **Autoriser l'accès** (choisissez votre compte Google et
   validez l'avertissement « application non vérifiée » → *Options avancées → Accéder au projet*).
5. **Copiez l'URL de l'application Web** — elle se termine par `/exec`.

> Vérification : ouvrez cette URL dans le navigateur. Vous devez voir le message
> « Endpoint Thalès Informatique — Sage 100 Experience Cloud : OK ».

## 4. Brancher la landing page

1. Ouvrez `index.html`.
2. Cherchez la ligne :
   ```js
   var SHEET_ENDPOINT = 'https://script.google.com/macros/s/XXXXXXXXXXXX/exec';
   ```
3. Remplacez toute l'URL par celle copiée à l'étape 3, puis enregistrez.

C'est terminé : chaque formulaire soumis crée une nouvelle ligne dans votre feuille
(Date, Prénom, Nom, Entreprise, Email, Téléphone, Fonction, Besoin, Source, Page).

---

## Bon à savoir

- **Notification par email** : dans le Sheet, `Outils → Règles de notification` pour être
  alerté à chaque nouvelle ligne. (Ou ajoutez un `MailApp.sendEmail(...)` dans le script.)
- **Mettre à jour le script plus tard** : après modification, refaites **Déployer → Gérer les
  déploiements → ✏ Modifier → Nouvelle version**. L'URL `/exec` reste la même.
- **Tant que l'URL n'est pas remplacée**, la page affiche quand même l'écran de confirmation
  mais n'enregistre rien (les données partent dans la console du navigateur) — pratique pour tester.
- **Alternative sans Google** : le même formulaire fonctionne avec Formspree, un CRM (HubSpot,
  Zoho) ou une API interne — il suffit de pointer `SHEET_ENDPOINT` vers l'endpoint voulu.
