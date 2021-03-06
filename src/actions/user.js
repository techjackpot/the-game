import ErrorMessages from '../constants/errors';
import statusMessage from './status';
import Firebase from '../lib/firebase';

import moment from 'moment';

/**
  * Get this User's Details
  */
function getUserDetails(dispatch) {
  const UID = (
    Firebase
    && Firebase.auth()
    && Firebase.auth().currentUser
    && Firebase.auth().currentUser.uid
  ) ? Firebase.auth().currentUser.uid : null;

  if (!UID) return false;

  const listener_user = Firebase.firestore().collection('users').doc(UID).collection('public').doc('profile').onSnapshot((doc) => {
    const data = doc.data() || {};
    return dispatch({
      type: 'USER_DETAILS_UPDATE',
      data,
    });
  });

  return Firebase.firestore().collection('users').doc(UID).collection('apps').doc('ww').get().then((challengeDoc) => {
    if (challengeDoc.exists) {
      let challengeId = challengeDoc.data().activeChallenge;
      if (challengeId) {
        const listener_challenge = Firebase.firestore().collection('users').doc(UID).collection('apps').doc('ww').collection('challenges').doc(challengeId).onSnapshot((snapshot) => {
          if (snapshot.exists) {
            const data = snapshot.data() || {};
            data.id = challengeId;
            console.log(data.id);
            return dispatch({
              type: 'USER_DETAILS_UPDATE',
              data: {challenge: data},
            })
          }
        });
      }
    }
  });
}

export function getUserData() {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  // Ensure token is up to date
  return dispatch => new Promise(async (resolve, reject) => {
    Firebase.auth().onAuthStateChanged((loggedIn) => {
      if (loggedIn) {
        return resolve(getUserDetails(dispatch));
      }
      return () => new Promise(() => reject());
    });
  });
}

/**
  * Login to Firebase with Email/Password
  */
export function login(formData) {
  const {
    email,
    password,
  } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    await statusMessage(dispatch, 'loading', true);

    // Validation checks
    if (!email) return reject({ message: ErrorMessages.missingEmail });
    if (!password) return reject({ message: ErrorMessages.missingPassword });

    // Go to Firebase
    // return Firebase.auth()
    //   .setPersistence(Firebase.auth.Auth.Persistence.LOCAL)
    //   .then(() =>
        Firebase.auth()
          .signInAndRetrieveDataWithEmailAndPassword(email, password)
          .then(async (res) => {
            if (res && res.user.uid) {
              // Update last logged in data
              /* might be need to update last-logged-in timestamp on firestore */

              // Send verification Email when email hasn't been verified
              // if (res.emailVerified === false) {
              //   Firebase.auth().currentUser
              //     .sendEmailVerification()
              //     .catch(() => console.log('Verification email failed to send'));
              // }

              // Get User Data
              getUserDetails(dispatch);
            }

            await statusMessage(dispatch, 'loading', false);

            // Send Login data to Redux
            return resolve(dispatch({
              type: 'USER_LOGIN',
              data: res,
            }));
          }).catch(reject)
        // );
  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });
}

/**
  * Logout
  */
export function logout() {
  return dispatch => new Promise(async (resolve, reject) => {
    await statusMessage(dispatch, 'loading', true);
    Firebase.auth().signOut()
      .then(() => {
        dispatch({ type: 'USER_RESET' });
        setTimeout(async () => {
          resolve();
          await statusMessage(dispatch, 'loading', false);
        }, 1000); // Resolve after 1s so that user sees a message
      }).catch(reject);
  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });
}
