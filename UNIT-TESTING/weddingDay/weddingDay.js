const { expect } = require('chai');
const { describe, it } = require('mocha');

const weddingDay = {
	pickVenue(capacity, pricePerGuest, location) {
		if (
			typeof capacity !== 'number' ||
			typeof pricePerGuest !== 'number' ||
			typeof location !== 'string' ||
			location === ''
		) {
			throw new Error('Invalid Information!');
		}
		if (location == 'Varna') {
			if (capacity >= 150 && pricePerGuest <= 120) {
				return `This venue meets the requirements, with capacity of ${capacity} guests and ${pricePerGuest}$ cover.`;
			} else {
				return `This venue does not meet your requirements!`;
			}
		} else {
			throw new Error(`The location of this venue is not in the correct area!`);
		}
	},

	otherSpendings(weddingDecoration, photography, discount) {
		if (
			!Array.isArray(weddingDecoration) ||
			!Array.isArray(photography) ||
			typeof discount !== 'boolean'
		) {
			throw new Error('Invalid Information!');
		}
		let totalPrice = 0;

		weddingDecoration.forEach((decoration) => {
			if (decoration === 'flowers') {
				totalPrice += 500;
			} else if (decoration === 'Fabric drapes and curtains') {
				totalPrice += 400;
			}
		});

		photography.forEach((service) => {
			if (service === 'pictures') {
				totalPrice += 700;
			} else if (service === 'video') {
				totalPrice += 1300;
			}
		});
		if (discount) {
			totalPrice = totalPrice * 0.85;
			return `You spend ${totalPrice}$ for wedding decoration and photography with 15% discount!`;
		} else {
			return `You spend ${totalPrice}$ for wedding decoration and photography!`;
		}
	},
	tableDistribution(guests, tables) {
		if (
			typeof guests !== 'number' ||
			guests <= 0 ||
			typeof tables !== 'number' ||
			tables <= 0
		) {
			throw new Error('Invalid Information!');
		}
		let peopleOnTable = Math.round(guests / tables);

		if (peopleOnTable < 6) {
			return `There is only ${peopleOnTable} people on every table, you can join some tables.`;
		} else {
			return `You have ${tables} tables with ${peopleOnTable} guests on table.`;
		}
	},
};

describe('weddingDay Object Tests', () => {
	describe('* PickVenue() Tests', () => {
		describe('Invalid Information', () => {
			it('Validation for the input(capacity)', () => {
				expect(() => weddingDay.pickVenue('str', 1, 'str')).to.throw(
					Error,
					'Invalid Information'
				);
			});
			it('Validation for the input(pricePerGuest)', () => {
				expect(() => weddingDay.pickVenue(1, '1', 'str')).to.throw(
					Error,
					'Invalid Information'
				);
			});
			it('Validation for the input(location)', () => {
				expect(() => weddingDay.pickVenue(1, 2, '')).to.throw(
					Error,
					'Invalid Information'
				);
				expect(() => weddingDay.pickVenue(1, 2, 3)).to.throw(
					Error,
					'Invalid Information'
				);
			});
		});
		describe('The location of this venue', () => {
			it('Validation for the input(loction) != Varna', () => {
				expect(() => weddingDay.pickVenue(1, 2, 'Vratsa')).to.throw(
					Error,
					'The location of this venue is not in the correct area!'
				);
			});
			it('Validation for the input(loction) = Varna', () => {
				expect(weddingDay.pickVenue(150, 120, 'Varna')).to.be.equal(
					'This venue meets the requirements, with capacity of 150 guests and 120$ cover.'
				);
			});
			it('Validation for the input(loction) = Varna && Meet the requiarements', () => {
				expect(weddingDay.pickVenue(140, 110, 'Varna')).to.be.equal(
					'This venue does not meet your requirements!'
				);
			});
		});
	});
	describe('* otherSpendings() Tests', () => {
		describe('Validation for the input', () => {
			it('Validation for the input(weddingDecoration)', () => {
				expect(() =>
					weddingDay.otherSpendings('str', [1, 2, 3], true)
				).to.throw(Error, 'Invalid Information!');
			});
			it('Validation for the input(photography)', () => {
				expect(() =>
					weddingDay.otherSpendings([1, 2, 3], 'str', true)
				).to.throw(Error, 'Invalid Information!');
			});
			it('Validation for the input(discount)', () => {
				expect(() =>
					weddingDay.otherSpendings([1, 2, 3], [1, 2, 3, 4], 'true')
				).to.throw(Error, 'Invalid Information!');
			});
		});
		describe('Validation for the discount functionality', () => {
			let weddingDecorationTestArr = ['flowers', 'flowers', 'flowers'];
			let photographyTestArr = ['pictures', 'pictures', 'pictures'];
			let totalPriceTest1 =
				weddingDecorationTestArr.length * 500 + photographyTestArr.length * 700;
			totalPriceTest1 -= totalPriceTest1 * 0.15;
			let weddingDecorationTestArr2 = [
				'flowers',
				'flowers',
				'Fabric drapes and curtains',
			];
			let photographyTestArr2 = ['video', 'video', 'pictures'];
			let totalPriceTest2 = 2 * 500 + 400 + 2 * 1300 + 700;

			it('Discount -> TRUE', () => {
				expect(
					weddingDay.otherSpendings(
						weddingDecorationTestArr,
						photographyTestArr,
						true
					)
				).to.be.equal(
					`You spend ${totalPriceTest1}$ for wedding decoration and photography with 15% discount!`
				);
			});
			it('Discount -> FALSE', () => {
				expect(
					weddingDay.otherSpendings(
						weddingDecorationTestArr2,
						photographyTestArr2,
						false
					)
				).to.be.equal(
					`You spend ${totalPriceTest2}$ for wedding decoration and photography!`
				);
			});
		});
		// if (discount) {
		// 	totalPrice = totalPrice * 0.85;
		// 	return `You spend ${totalPrice}$ for wedding decoration and photography with 15% discount!`;
		// } else {
		// 	return `You spend ${totalPrice}$ for wedding decoration and photography!`;
		// }
	});
	describe('* tableDistribution() Test', () => {
		describe('Validation for input', () => {
			it('Validation for input(guests)', () => {
				expect(() => {
					weddingDay
						.tableDistribution('str', 1)
						.to.throw(Error, 'Invalid Information!');
				});
				expect(() => {
					weddingDay
						.tableDistribution(-1, 1)
						.to.throw(Error, 'Invalid Information!');
				});
			});
			it('Validation for input(tables)', () => {
				expect(() => {
					weddingDay
						.tableDistribution(1, 'str')
						.to.throw(Error, 'Invalid Information!');
				});
				expect(() => {
					weddingDay
						.tableDistribution(-1, 1)
						.to.throw(Error, 'Invalid Information!');
				});
			});
		});
		describe('Peoples comparison with 6', () => {
			let peopleOnTableTest1 = Math.round(5 / 2);
			it('Less than 6', () => {
				expect(weddingDay.tableDistribution(5, 2)).to.be.equal(
					`There is only ${peopleOnTableTest1} people on every table, you can join some tables.`
				);
			});
			let peopleOnTableTest2 = Math.round(13 / 2);
			it('More or equal to 6', () => {
				expect(weddingDay.tableDistribution(13, 2)).to.be.equal(
					`You have 2 tables with ${peopleOnTableTest2} guests on table.`
				);
			});
		});
	});
});
