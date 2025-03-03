const admin = require('firebase-admin');
var serviceAccount = require("../broker-system-2f8c5-firebase-adminsdk-j0z57-a6310e5fb1.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
