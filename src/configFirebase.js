import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';

const firebaseConfig = {
	authDomain: 'obsgpu-bot.firebaseapp.com',
	databaseURL: 'https://obsgpu-bot.firebaseio.com',
	projectId: 'obsgpu-bot',
	storageBucket: 'obsgpu-bot.appspot.com',
	messagingSenderId: '91330971757',
	appId: '1:91330971757:web:9a73f216a8a94fe00f5764',
	apiKey: 'AIzaSyD4zaQXmn_mQCySTEo1I6z8XZMVhb98nL0',
};

firebase.initializeApp(firebaseConfig);

export default function initializeFirebase() {
	firebase.app().firestore().enablePersistence();
	return firebase.app;
}

export const db = firebase.database();
export const fs = firebase.firestore();
