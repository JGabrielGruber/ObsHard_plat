import { db } from '../configFirebase';

const collection = '/marcas';

export default {
	add: async (data) => (await db.ref(collection).push(data)).key,
	get: async () => db.collection(collection).get(),
	sync: async (key, onChange) => db.ref(collection).on('value', (snap) => {
		const list = [];
		snap.forEach((item) => {
			list.push({
				...item.val(),
				_id: item.key,
			});
		});
		onChange(key, list);
	}),
	getById: async (id) => db.collection(collection).doc(id).get(),
	syncById: async (key, onChange, id) => db.ref(collection).child(id).on('value', (snap) => {
		onChange(key, {
			...snap.val(),
			_id: snap.key,
		});
	}),
	update: async (data) => db.ref(collection).child(data._id).set({
		...data,
		_id: null,
	}),
	delete: async (data) => db.ref(collection).child(data._id).remove(),
};
