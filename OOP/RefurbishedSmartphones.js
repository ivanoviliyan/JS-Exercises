class RefurbishedSmartphones {
	constructor(retailer) {
		this.retailer = retailer;
		this.availableSmartphones = [];
		this.soldSmartphones = [];
		this.revenue = 0;
	}

	addSmartphone(model, storage, price, condition) {
		if (typeof model !== 'string' || model === '') {
			throw new Error('Invalid smartphone!');
		}
		if (!Number.isInteger(storage) || storage < 0) {
			throw new Error('Invalid smartphone!');
		}
		if (typeof price !== 'number' || price < 0) {
			throw new Error('Invalid smartphone!');
		}
		if (typeof condition !== 'string' || condition === '') {
			throw new Error('Invalid smartphone!');
		}

		this.availableSmartphones.push({ model, storage, price, condition });
		return `New smartphone added: ${model} / ${storage} GB / ${condition} condition - ${price.toFixed(
			2
		)}$`;
	}

	sellSmartphone(model, desiredStorage) {
		let soldPrice = 0;
		let foundPhone = this.availableSmartphones.find((x) => x.model == model);

		if (!foundPhone) {
			throw new Error(`${model} was not found!`);
		}

		if (foundPhone.storage >= desiredStorage) {
			soldPrice = foundPhone.price;
		} else if (Math.abs(foundPhone.storage - desiredStorage) <= 128) {
			soldPrice = foundPhone.price - foundPhone.price * 0.1;
		} else {
			soldPrice = foundPhone.price - foundPhone.price * 0.2;
		}

		this.revenue += soldPrice;

		this.availableSmartphones.filter((x) => x.model !== model);

		this.soldSmartphones.push({
			model: foundPhone.model,
			storage: foundPhone.storage,
			soldPrice,
		});

		return `${model} was sold for ${soldPrice.toFixed(2)}$`;
	}

	upgradePhones() {
		if (this.availableSmartphones.length === 0) {
			throw new Error('There are no available smartphones!');
		}

		this.availableSmartphones = this.availableSmartphones.map((phone) => {
			return {
				...phone,
				storage: phone.storage * 2,
				price: phone.price.toFixed(2),
			};
		});

		const result = [`Upgraded Smartphones:`];
		this.availableSmartphones.forEach(
			({ model, storage, price, condition }) => {
				result.push(
					`${model} / ${storage} GB / ${condition} condition / ${price}$`
				);
			}
		);
		return result.join('\n');
	}

	salesJournal(criteria) {
		if (criteria !== 'storage' && criteria !== 'model') {
			throw new Error('Invalid criteria!');
		}
		if (criteria === 'storage') {
			this.soldSmartphones.sort((a, b) => b.storage - a.storage);
		} else {
			this.soldSmartphones.sort((a, b) => a.model.localeCompare(b.model));
		}
		const sold = this.soldSmartphones.length;
		const result = [
			`${this.retailer} has a total income of ${this.revenue.toFixed(2)}$`,
		];
		result.push(`${sold} smartphones sold:`);
		this.soldSmartphones.forEach(({ model, storage, soldPrice }) => {
			result.push(`${model} / ${storage} GB / ${soldPrice.toFixed(2)}$`);
		});

		return result.join('\n');
	}
}
// let retailer = new RefurbishedSmartphones('SecondLife Devices');
// console.log(retailer.addSmartphone('Samsung S20 Ultra', 256, 1000, 'good'));
// console.log(retailer.addSmartphone('Iphone 12 mini', 128, 800, 'perfect'));
// console.log(retailer.addSmartphone('', 512, 1900, 'good'));

// let retailer = new RefurbishedSmartphones('SecondLife Devices');
// retailer.addSmartphone('Samsung S20 Ultra', 256, 1000, 'good');
// retailer.addSmartphone('Iphone 12 mini', 128, 800, 'perfect');
// retailer.addSmartphone('Xiaomi Redmi Note 10 Pro', 128, 330, 'perfect');
// console.log(retailer.sellSmartphone('Samsung S20 Ultra', 256));
// console.log(retailer.sellSmartphone('Xiaomi Redmi Note 10 Pro', 256));
// console.log(retailer.sellSmartphone('Samsung Galaxy A13', 64));

// let retailer = new RefurbishedSmartphones('SecondLife Devices');
// retailer.addSmartphone('Samsung S20 Ultra', 256, 1000, 'good');
// retailer.addSmartphone('Iphone 12 mini', 128, 800, 'perfect');
// retailer.addSmartphone('Xiaomi Redmi Note 10 Pro', 128, 330, 'perfect');
// console.log(retailer.upgradePhones());

let retailer = new RefurbishedSmartphones('SecondLife Devices');
retailer.addSmartphone('Samsung S20 Ultra', 256, 1000, 'good');
retailer.addSmartphone('Iphone 12 mini', 128, 800, 'perfect');
retailer.addSmartphone('Xiaomi Redmi Note 10 Pro', 128, 330, 'perfect');
retailer.sellSmartphone('Samsung S20 Ultra', 256);
retailer.sellSmartphone('Xiaomi Redmi Note 10 Pro', 256);
console.log(retailer.salesJournal('model'));
