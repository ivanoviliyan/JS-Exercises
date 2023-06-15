const { describe } = require('mocha');
const findNewApartment = require('./findApartment');
const { expect } = require('chai');

describe('class findNewAparment', () => {
	describe('function isGoodLoaction', () => {
		it('Test => throw -> Invalid input!', () => {
			let city1 = 1;
			let nearPublicTransportation1 = true;
			expect(() =>
				findNewApartment.isGoodLocation(city1, nearPublicTransportation1)
			).to.throw(Error, 'Invalid input!');
			let city2 = 'Vratsa';
			let nearPublicTransportation2 = 'Ablanitsa';
			expect(() =>
				findNewApartment.isGoodLocation(city2, nearPublicTransportation2)
			).to.throw(Error, 'Invalid input!');
		});
		it('Test => return -> This location is not suitable for you.', () => {
			expect(findNewApartment.isGoodLocation('Vratsa', true)).to.be.equal(
				'This location is not suitable for you.'
			);
		});
		it('Test => return -> You can go on home tour!', () => {
			let city = 'Sofia';
			let nearPublicTransportation = true;

			expect(
				findNewApartment.isGoodLocation(city, nearPublicTransportation)
			).to.be.equal('You can go on home tour!');
		});
		it('Test => return -> There is no public transport in area.', () => {
			let city = 'Sofia';
			let nearPublicTransportation = false;

			expect(
				findNewApartment.isGoodLocation(city, nearPublicTransportation)
			).to.be.equal('There is no public transport in area.');
		});
	});
	describe('function isLargeEnough', () => {
		it('Test => throw -> Invalid input!', () => {
			let apartments1 = 'apart';
			let minimalSquareMeters1 = 1;
			expect(() =>
				findNewApartment.isLargeEnough(apartments1, minimalSquareMeters1)
			).to.throw(Error, 'Invalid input!');

			let apartments2 = [];
			let minimalSquareMeters2 = 1;
			expect(() =>
				findNewApartment.isLargeEnough(apartments2, minimalSquareMeters2)
			).to.throw(Error, 'Invalid input!');

			let apartments3 = [40, 50, 60];
			let minimalSquareMeters3 = '1';
			expect(() =>
				findNewApartment.isLargeEnough(apartments3, minimalSquareMeters3)
			).to.throw(Error, 'Invalid input!');
		});
		it('Test => return -> changed array of apartments', () => {
			let apartments = [40, 50, 60, 70];
			let minimalSquareMeters = 60;

			expect(
				findNewApartment.isLargeEnough(apartments, minimalSquareMeters)
			).to.be.equal('60, 70');
		});
	});
	describe('function isItAffordable', () => {
		it('Test => throw -> Invalid input!', () => {
			let price1 = 'str';
			let budget1 = 23;
			expect(() => findNewApartment.isItAffordable(price1, budget1)).to.throw(
				Error,
				'Invalid input!'
			);

			let price2 = 23;
			let budget2 = '23';
			expect(() => findNewApartment.isItAffordable(price2, budget2)).to.throw(
				Error,
				'Invalid input!'
			);
		});
		it("Test => return -> You don't have enough money for this house!", () => {
			let price = 30;
			let budget = 25;
			expect(findNewApartment.isItAffordable(price, budget)).to.be.equal(
				"You don't have enough money for this house!"
			);
		});
		it('Test => return -> You can afford this home!', () => {
			let price = 30;
			let budget = 30;
			expect(findNewApartment.isItAffordable(price, budget)).to.be.equal(
				'You can afford this home!'
			);
		});
	});
});
