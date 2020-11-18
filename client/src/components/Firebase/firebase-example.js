import app from 'firebase/app'
import 'firebase/auth';
import 'firebase/database'

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.auth = app.auth();
    this.db = app.database();
  }

  // **Auth API **
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email,password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  // **User API **

  user = uid => this.db.ref(`users/${uid}`);
  
  users = () => this.db.ref(`users`);

  coffee = id => this.db.ref(`coffee/${id}`);

  coffees = () => this.db.ref(`coffee`) // use plural, even though singular in database

  userCoffees = (uid, coffeeId) => coffeeId ? (this.db.ref(`usersCoffees/${uid}/${coffeeId}`)) : (this.db.ref(`usersCoffees/${uid}`))

  usersCoffees = () => this.db.ref(`usersCoffees`)

  coffeeUsers = (id) => this.db.ref(`coffeesUsers/${id}`)

  coffeesUsers = () => this.db.ref(`coffeesUsers`)
}

export default Firebase;