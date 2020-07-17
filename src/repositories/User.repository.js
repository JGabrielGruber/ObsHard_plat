import firebase from 'firebase';

export default {
	login: async (log) => {
		try {
			await firebase.auth().setPersistence(
				log.remember
					? firebase.auth.Auth.Persistence.LOCAL
					: firebase.auth.Auth.Persistence.SESSION,
			);
			await firebase.auth().signInWithEmailAndPassword(log.email, log.password);
			return true;
		} catch (error) {
			return false;
		}
	},
	signup: async (sig) => {
		try {
			await firebase.auth().createUserWithEmailAndPassword(sig.email, sig.password);
			await firebase.auth().signInWithEmailAndPassword(sig.email, sig.password);
			const user = firebase.auth().currentUser;
			user.updateProfile(sig);
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	},
	logout: async () => {
		await firebase.auth().signOut();
	},
	get: async () => firebase.auth().currentUser,
};
