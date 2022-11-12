const envKeys = {
    CUSTOM_ENV: process.env.CUSTOM_ENV,
    mongoURI: process.env.mongoURI,
    jwtSectetKeyValue: process.env.jwtSectetKeyValue,
    NODE_ENV: '',
    BACKEND_URL: '',

    IMAGEKIT_PUBLICKEY: '',
    IMAGEKIT_PRIVATEKEY: '',
    IMAGEKIT_ID: '',

    FIREBASE_type: process.env.FIREBASE_type,
    FIREBASE_project_id: process.env.FIREBASE_project_id,
    FIREBASE_private_key_id: process.env.FIREBASE_private_key_id,
    FIREBASE_private_key: process.env.FIREBASE_private_key,
    FIREBASE_client_email: process.env.FIREBASE_client_email,
    FIREBASE_client_id: process.env.FIREBASE_client_id,
    FIREBASE_auth_uri: process.env.FIREBASE_auth_uri,
    FIREBASE_token_uri: process.env.FIREBASE_token_uri,
    FIREBASE_auth_provider_x509_cert_url: process.env.FIREBASE_auth_provider_x509_cert_url,
    FIREBASE_client_x509_cert_url: process.env.FIREBASE_client_x509_cert_url,
};

module.exports = envKeys;