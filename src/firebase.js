import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

let firebaseConfig = {
    apiKey: "AIzaSyB9SelGT9n4RREodxDivQ0UGMAr3Uwj0Jg",
    authDomain: "blog-teste-8985c.firebaseapp.com",
    databaseURL: "https://blog-teste-8985c.firebaseio.com",
    projectId: "blog-teste-8985c",
    storageBucket: "blog-teste-8985c.appspot.com",
    messagingSenderId: "29701703055",
    appId: "1:29701703055:web:68aa49b42f47ee305c37fa",
    measurementId: "G-7Y733NL342"
};

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);

        this.app = app.database();
    }

    login(email, password) {
        return app.auth().signInWithEmailAndPassword(email, password);
    }

    async register(nome, email, password) {
        await app.auth().createUserWithEmailAndPassword(email, password);

        const uid = app.auth().currentUser.uid;

        return app.database().ref('usuarios').child(uid).set({
            nome: nome
        })
    }

    isInitialized() {
        return new Promise(resolve => {
            app.auth().onAuthStateChanged(resolve);
        })
    }

    getCurrent() {
        return app.auth().currentUser && app.auth().currentUser.email;
    }

    async getUserName(callback) {
        if (!app.auth().currentUser) {
            return null;
        }

        const uid = app.auth().currentUser.uid;
        await app.database().ref('usuarios').child(uid).once('value').then(callback);
    }
}

export default new Firebase();