import { fs } from '../configFirebase';

export const collection = 'tabelona';

export default {
	sync: async (key, onChange) => fs.collection(collection).limitToLast(5).onSnapshot((snap) => {
		const list = [];
		snap.forEach((item) => {
			list.push({
				...item.data(),
				_id: item.key,
			});
		});
		onChange(key, list);
	}),
};
