import { db } from '../configFirebase';

export const collection = 'notificacoes';

export default {
	sync: async (key, onChange) => db.ref(collection).on('value', (snap) => {
		const list = [];
		snap.forEach((item) => {
			list.push(item.val());
		});
		onChange(key, list);
	}),
};
