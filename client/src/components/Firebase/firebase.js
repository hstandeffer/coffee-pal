import app from 'firebase/app'
import 'firebase/auth';
import 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyBbmQDagNn9z-qDpa8_xmHyKfnjG901Cqo",
  authDomain: "coffee-pal-app.firebaseapp.com",
  databaseURL: "https://coffee-pal-app.firebaseio.com",
  projectId: "coffee-pal-app",
  storageBucket: "coffee-pal-app.appspot.com",
  messagingSenderId: "197851326315",
  appId: "1:197851326315:web:e8aef28c76ac33aaf8ce2e",
  measurementId: "G-SE0SL6CFVE"
}

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.auth = app.auth();
    this.db = app.database();
  }

  // this listener function expects two functions, next and fallback
  // next takes the authUser variable as an argument and in the HOCs a function is provided
  // as well as an action to take depending if the user is authorized or not
  // if an authUser is provided, next is run (the function provided first in HOC), otherwise the fallback function is run
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val()
 
            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = {}
            }
 
            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              ...dbUser,
            }
 
            next(authUser)
          });
      } else {
        fallback()
      }
    })

  // **Auth API **
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  // ** User API **

  user = uid => this.db.ref(`users/${uid}`); // get a specific user
  
  users = () => this.db.ref(`users`); // get all users

  userCoffees = (uid) => this.db.ref(`users/${uid}/coffees`) // get a specific user's saved coffees
  
  userTastings = uid => this.db.ref(`users/${uid}/tastings`) // get a specific user's tastings


  //  ** Coffee API **
  coffee = id => this.db.ref(`coffee/${id}`); // get a specific coffee

  coffees = () => this.db.ref(`coffee`) // get all coffees

  // ** User Added Coffees **
  userAddedCoffees = () => this.db.ref(`userAddedCoffees`) // get all coffees added by users (will be used to confirm new additions before moving to main coffee collection)
}

export default Firebase;