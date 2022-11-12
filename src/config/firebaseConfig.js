const { Buffer } = require('buffer');
const { initializeApp, cert, getApps} = require('firebase-admin/app');


const envKeys = require('./envKeys');

let tempFIREBASE_private_key = Buffer.from(envKeys?.FIREBASE_private_key, 'base64').toString('ascii');

const serviceAccount = {
    type: envKeys.FIREBASE_type,
    project_id: envKeys.FIREBASE_project_id,
    private_key_id: envKeys.FIREBASE_private_key_id,
    private_key: tempFIREBASE_private_key?.replace(/\\n/g, '\n'),
    client_email: envKeys.FIREBASE_client_email,
    client_id: envKeys.FIREBASE_client_id,
    auth_uri: envKeys.FIREBASE_auth_uri,
    token_uri: envKeys.FIREBASE_token_uri,
    auth_provider_x509_cert_url: envKeys.FIREBASE_auth_provider_x509_cert_url,
    client_x509_cert_url: envKeys.FIREBASE_client_x509_cert_url,
};

let firebaseApp = null;

if ( !getApps().length ) {
    firebaseApp = initializeApp({
        credential: cert(serviceAccount),
        databaseURL: envKeys.FIREBASE_databaseURL,
    });
}

module.exports = firebaseApp;