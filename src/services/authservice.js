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
