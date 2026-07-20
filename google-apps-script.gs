/**
 * Thalès Informatique — Réception des leads de la landing page
 * Sage 100 Experience Cloud → Google Sheet
 *
 * À coller dans : Google Sheet > Extensions > Apps Script
 * Puis : Déployer > Nouveau déploiement > Type "Application Web"
 *   - Exécuter en tant que : Moi
 *   - Qui a accès : Tout le monde
 * Copiez l'URL "…/exec" et collez-la dans index.html (constante SHEET_ENDPOINT).
 */

// En-têtes de colonnes créés automatiquement sur une feuille vide.
var HEADERS = [
  'Date', 'Prénom', 'Nom', 'Entreprise', 'Email',
  'Téléphone', 'Fonction', 'Besoin', 'Source', 'Page'
];

function doPost(e) {
  try {
    var lock = LockService.getScriptLock();
    lock.waitLock(20000); // évite les écritures simultanées

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // Crée la ligne d'en-tête si la feuille est vide.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    }

    var p = e.parameter || {};
    sheet.appendRow([
      p.date || new Date().toLocaleString('fr-FR'),
      p.prenom || '',
      p.nom || '',
      p.entreprise || '',
      p.email || '',
      p.tel || '',
      p.fonction || '',
      p.message || '',
      p.source || '',
      p.page || ''
    ]);

    lock.releaseLock();
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Permet de vérifier que le déploiement répond (ouvrez l'URL /exec dans le navigateur).
function doGet() {
  return ContentService
    .createTextOutput('Endpoint Thalès Informatique — Sage 100 Experience Cloud : OK')
    .setMimeType(ContentService.MimeType.TEXT);
}
