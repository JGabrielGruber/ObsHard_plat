import { db } from '../configFirebase';

export const collection = 'notificacoes';

export default {
	sync: async (key, onChange) => db.ref(collection).orderByChild('timestamp').on('value', (snap) => {
		const list = [];
		snap.forEach((item) => {
			list.unshift(item.val());
		});
		onChange(key, list);
	}),
};
