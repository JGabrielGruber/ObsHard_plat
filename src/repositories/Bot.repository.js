import { db } from '../configFirebase';

export const id = 'bot';

export default {
	sync: async (key, onChange) => db.ref().child(id).on('value', (snap) => {
		const data = snap.val();
		onChange(key, data);
	}),
	update: async (data) => db.ref().child(id).set(data),
};
