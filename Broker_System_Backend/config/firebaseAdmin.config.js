const admin = require('firebase-admin');
var serviceAccount = require(process.env.FIREBASE_CONFIG);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
