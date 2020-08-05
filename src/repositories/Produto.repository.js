import { db } from '../configFirebase';

import { collection as arquitetura } from './Arquitetura.repository';
import { collection as categoria } from './Categoria.repository';
import { collection as loja } from './Loja.repository';
import { collection as marca } from './Marca.repository';
import { collection as modelo } from './Modelo.repository';
import { collection as variacao } from './Variacao.repository';

export const collection = '/produtos';

const getData = async (col, key = null) => {
	if (key) {
		return db.ref(col).child(key).once('value').then(async (snap) => {
			const item = await snap.val();

			return { ...item, _id: snap.key };
		});
	}
	return null;
};

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
	syncComplete: async (key, onChange) => {
		const list = [];
		db.ref(collection).on('child_added', async (proS) => {
			const pro = proS.val();

			if (pro.modelo) {
				pro.modelo = await getData(modelo, pro.modelo);
				if (pro.modelo.arquitetura) {
					pro.modelo.arquitetura = await getData(
						arquitetura, pro.modelo.arquitetura,
					);
					if (pro.modelo.arquitetura.categorias) {
						pro.modelo.arquitetura.categorias = await getData(
							categoria, pro.modelo.arquitetura.categorias,
						);
					}
				}
				if (pro.modelo.marca) pro.modelo.marca = await getData(marca, pro.modelo.marca);
			}
			if (pro.loja) pro.loja = await getData(loja, pro.loja);
			if (pro.variacao) pro.variacao = await getData(variacao, pro.variacao);

			list.push({
				...pro,
				_id: proS.key,
			});
			onChange(key, list);
		});
	},
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
	addPreco: async (data, mod) => db.ref(collection).orderByChild('modelo').equalTo(mod || '').on('child_added', async (snap) => {
		const val = snap.val();
		const precos = val.precos || [];
		precos.push(data);
		val.precos = precos;
		await db.ref(collection).child(snap.key).set({
			...val,
		});
	}),
};
