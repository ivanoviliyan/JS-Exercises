class OnlineShop {
	constructor(warehouseSpace) {
		this.warehouseSpace = warehouseSpace;
		this.products = [];
		this.sales = [];
	}

	loadingStore(product, quantity, spaceRequired) {
		if (spaceRequired > this.warehouseSpace) {
			throw new Error('Not enough space in the warehouse.');
		}
		const obj = {
			product,
			quantity,
		};
		this.products.push(obj);
		this.warehouseSpace -= spaceRequired;

		return `The ${product} has been successfully delivered in the warehouse.`;
	}

	quantityCheck(product, minimalQuantity) {
		const hasProduct = this.products.find((x) => x.product === product);
		if (!hasProduct) {
			throw new Error(`There is no ${product} in the warehouse.`);
		}

		if (minimalQuantity <= 0) {
			throw new Error('The quantity cannot be zero or negative.');
		}

		if (minimalQuantity <= hasProduct.quantity) {
			return `You have enough from product ${product}.`;
		}

		const difference = Math.abs(minimalQuantity - hasProduct.quantity);

		hasProduct.quantity = minimalQuantity;

		return `You added ${difference} more from the ${hasProduct.product} products.`;
	}

	sellProduct(product) {
		const hasProduct = this.products.find((x) => x.product === product);
		if (!hasProduct) {
			throw new Error(`There is no ${product} in the warehouse.`);
		}

		hasProduct.quantity -= 1;

		this.sales.push({ product, quantity: hasProduct.quantity });
		return `The ${product} has been successfully sold.`;
	}

	revision() {
		if (this.sales.length === 0) {
			throw new Error('There are no sales today!');
		}

		const result = [];
		result.push(`You sold ${this.sales.length} products today!`);
		result.push('Products in the warehouse:');
		this.sales.forEach((element) => {
			result.push(`${element.product}-${element.quantity} more left`);
		});

		return result.join('\n');
	}
}
