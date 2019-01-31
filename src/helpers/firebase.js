import * as firebase from 'firebase';

export default class Firebase {
  static getConfig() {
    return {
      apiKey: 'AIzaSyDk9aUrRU8SATe9VXmGmUaBF-pyiCFKq8s',
      authDomain: 'pay-slip-generator.firebaseapp.com',
      databaseURL: 'https://pay-slip-generator.firebaseio.com',
      projectId: 'pay-slip-generator',
      storageBucket: 'pay-slip-generator.appspot.com',
      messagingSenderId: '942261387337',
    };
  }

  static async userSignIn(loginDetails) {
    return firebase.auth().signInWithEmailAndPassword(loginDetails.email, loginDetails.passowrd);
  }

  static generateUserDetails(userDetails) {
    return {
      email: userDetails.email,
      uid: userDetails.uid,
      creationTime: userDetails.metadata.creationTime,
      lastSignInTime: userDetails.metadata.lastSignInTime,
    };
  }
}
