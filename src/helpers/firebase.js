import * as firebase from 'firebase';

export default class Firebase {
  static getConfig() {
    return {
      apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
      authDomain: 'pay-slip-generator.firebaseapp.com',
      databaseURL: 'https://pay-slip-generator.firebaseio.com',
      projectId: 'pay-slip-generator',
      storageBucket: 'pay-slip-generator.appspot.com',
      messagingSenderId: '942261387337',
    };
  }

  static async userSignIn(loginDetails) {
    const { email, password } = loginDetails;
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  static async userSignUp(signupDetails) {
    const { email, password } = signupDetails;
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  static generateUserDetails(userDetails) {
    return {
      email: userDetails.email,
      uid: userDetails.uid,
      creationTime: userDetails.metadata.creationTime,
      lastSignInTime: userDetails.metadata.lastSignInTime,
    };
  }

  static db() {
    return firebase.firestore();
  }

  static collectionRef(collectionOne) {
    return this.db().collection(collectionOne);
  }
}
