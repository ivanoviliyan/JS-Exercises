class WineSelection {
	constructor(space) {
		this.space = space;
		this.cellar = 0;
		this.wines = [];
		this.bill = 0;
	}

	reserveABottle(wineName, wineType, price) {
		if (this.cellar === this.space) {
			throw new Error('Not enough space in the cellar.');
		}
		this.cellar += 1;

		const wine = {
			wineName,
			wineType,
			price,
			paid: false,
		};

		this.wines.push(wine);

		return `You reserved a bottle of ${wineName} ${wineType} wine.`;
	}
	payWineBottle(wineName, price) {
		const wine = this.wines.find((w) => w.wineName === wineName);

		if (!wine) {
			throw new Error(`${wineName} is not in the cellar.`);
		}

		if (wine.paid) {
			throw new Error(`${wineName} has already been paid.`);
		}

		wine.paid = true;
		this.bill += wine.price;

		return `You bought a ${wineName} for a ${price}$.`;
	}
	openBottle(wineName) {
		const wine = this.wines.find((w) => w.wineName === wineName);

		if (!wine) {
			throw new Error(`The wine, you're looking for, is not found.`);
		}

		if (!wine.paid) {
			throw new Error(`${wineName} need to be paid before open the bottle.`);
		}

		this.wines.filter((w) => w.wineName !== wineName);

		return `You drank a bottle of ${wineName}.`;
	}
	cellarRevision(wineType) {
		if (!wineType) {
			const result = [];
			result.push(
				`You have space for ${this.space - this.cellar} bottles more.`
			);
			result.push(`You paid ${this.bill}$ for the wine.`);

			this.wines.sort((a, b) => a.wineName.localeCompare(b.wineName));

			this.wines.forEach((el) => {
				const isPaid = el.paid ? 'Has Paid' : 'Not Paid';
				result.push(`${el.wineName} > ${el.wineType} - ${isPaid}.`);
			});

			return result.join('\n');
		}

		const wine = this.wines.find((w) => w.wineType === wineType);

		if (!wine) {
			throw new Error(`There is no ${wineType} in the cellar.`);
		}
		const isPaid = wine.paid ? 'Has Paid' : 'Not Paid';
		return `${wine.wineName} > ${wine.wineType} - ${isPaid}.`;
	}
}
