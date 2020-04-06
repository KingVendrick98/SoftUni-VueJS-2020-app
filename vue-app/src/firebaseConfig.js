import firebase from 'firebase'
import 'firebase/firestore'

// firebase init goes here
const config = {
    apiKey: "AIzaSyAMOHFTokAnA1fo3uF-lG17zBi_z_yHAH0",
    authDomain: "vue-app-e89fd.firebaseapp.com",
    databaseURL: "https://vue-app-e89fd.firebaseio.com",
    projectId: "vue-app-e89fd",
    storageBucket: "vue-app-e89fd.appspot.com",
    messagingSenderId: "185073620482",
    appId: "1:185073620482:web:b2d3de8367e97c7c24b91b",
    measurementId: "G-0MZ5W7JC48"
}
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
    timestampsInSnapshots: true
}
db.settings(settings)

// firebase collections
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

export {
    db,
    auth,
    currentUser,
    usersCollection,
    postsCollection,
    commentsCollection,
    likesCollection
}