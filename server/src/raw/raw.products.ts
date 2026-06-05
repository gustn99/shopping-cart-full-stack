interface RawProduct {
	id: number;
	price: number;
	name: string;
	imgUrl: string;
}

export const rawProducts: RawProduct[] = [
	{
		id: 1,
		price: 18000,
		name: 'Shopping Basket',
		imgUrl: 'https://images.unsplash.com/photo-1584473457406-6240486418e9?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	},
	{
		id: 2,
		price: 32000,
		name: 'Tote Bag',
		imgUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	},
	{
		id: 3,
		price: 9900,
		name: 'Reusable Cup',
		imgUrl: 'https://images.unsplash.com/photo-1615485736894-a2d2e6d4cd9a?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	},
];

let snapshot: RawProduct[] = [];

export const transaction = () => {
	// 깊은 복사
	snapshot = JSON.parse(JSON.stringify(rawProducts));
};

export const rollback = () => {
	// 메모리 주소 유지
	rawProducts.splice(0, rawProducts.length, ...snapshot);
};
