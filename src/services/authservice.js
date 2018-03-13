import firebaseApp from '@firebasehelper';

export default class AuthService {
	static requireSignIn() {
		return new Promise((resolve, reject) => {
			var onAuthStateChangedListener = firebaseApp.auth().onAuthStateChanged( (user) => {
				if (user) {
					onAuthStateChangedListener();
					resolve(user);
				} else {
					onAuthStateChangedListener();
					reject({
						type: 'SIGN_IN_REQUIRED'
					});
				}
			})
		});
	}

    static addExpoToken(token)
    {
        const uid = firebaseApp.auth().currentUser.uid;
        try{
            firebaseApp.firestore()
                .collection('users')
                .doc(uid)
                .collection('expoTokens')
                .doc(token).set({state: true});
        } catch(error) {
            // console.log(error);
        }
    }

	static signOut() {
		return firebaseApp.auth().signOut();
	}

    static signin(email, password) {
        return firebaseApp.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
        .then((user) => {
            return user.uid;
        })
        .catch((error) => {
            throw error;
        });
    }
}
