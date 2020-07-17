import firebase from 'firebase';

const firebaseConfig = {
	authDomain: "obsgpu-bot.firebaseapp.com",
	databaseURL: "https://obsgpu-bot.firebaseio.com",
	projectId: "obsgpu-bot",
	storageBucket: "obsgpu-bot.appspot.com",
	messagingSenderId: "91330971757",
	appId: "1:91330971757:web:9a73f216a8a94fe00f5764",
};

firebase.initializeApp({
	...firebaseConfig,
	apiKey: process.env.REACT_APP_APIKEY,
});

export default function initializeFirebase() {
	return firebase.app;
}

export const db = firebase.firestore();
