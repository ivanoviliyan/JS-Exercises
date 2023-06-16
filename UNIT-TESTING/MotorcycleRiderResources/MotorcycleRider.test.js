const { it, describe } = require('mocha');
const motorcycleRider = require('./MotorcycleRider');
const { expect } = require('chai');

describe('Tests for class MotorcycleRider', () => {
	describe('Test -> function licenseRestriction', () => {
		it('Mopeds with a maximum design speed of 45 km. per hour, engine volume is no more than 50 cubic centimeters, and the minimum age is 16.', () => {
			expect(motorcycleRider.licenseRestriction('AM')).to.be.equal(
				'Mopeds with a maximum design speed of 45 km. per hour, engine volume is no more than 50 cubic centimeters, and the minimum age is 16.'
			);
		});

		it('Motorcycles with engine volume is no more than 125 cubic centimeters, maximum power of 11KW. and the minimum age is 16.', () => {
			expect(motorcycleRider.licenseRestriction('A1')).to.be.equal(
				'Motorcycles with engine volume is no more than 125 cubic centimeters, maximum power of 11KW. and the minimum age is 16.'
			);
		});

		it('Motorcycles with maximum power of 35KW. and the minimum age is 18.', () => {
			expect(motorcycleRider.licenseRestriction('A2')).to.be.equal(
				'Motorcycles with maximum power of 35KW. and the minimum age is 18.'
			);
		});

		it('No motorcycle restrictions, and the minimum age is 24.', () => {
			expect(motorcycleRider.licenseRestriction('A')).to.be.equal(
				'No motorcycle restrictions, and the minimum age is 24.'
			);
		});

		it('Invalid Information!', () => {
			expect(() => motorcycleRider.licenseRestriction('Test')).to.throw(
				Error,
				'Invalid Information!'
			);
		});
	});
	describe('Test -> function motorcycleShowroom', () => {
		it('Invalid Information! -> engineVolume', () => {
			let engineVolume = 'str';
			let maximumEngineVolume = 50;
			expect(() => {
				motorcycleRider.motorcycleShowroom(engineVolume, maximumEngineVolume);
			}).to.throw(Error, 'Invalid Information!');
		});
		it('Invalid Information! -> engineVolume', () => {
			let engineVolume = new Array();
			let maximumEngineVolume = 48;
			expect(() => {
				motorcycleRider.motorcycleShowroom(engineVolume, maximumEngineVolume);
			}).to.throw(Error, 'Invalid Information!');
		});
		it('Invalid Information! -> maximumEngineVolume', () => {
			let engineVolume = [10, 20, 30];
			let maximumEngineVolume = '10';
			expect(() => {
				motorcycleRider.motorcycleShowroom(engineVolume, maximumEngineVolume);
			}).to.throw(Error, 'Invalid Information!');
		});
		it('Invalid Information! -> maximumEngineVolume', () => {
			let engineVolume = [10, 20, 30];
			let maximumEngineVolume = 48;
			expect(() => {
				motorcycleRider.motorcycleShowroom(engineVolume, maximumEngineVolume);
			}).to.throw(Error, 'Invalid Information!');
		});

		it('Valid Information!', () => {
			let engineVolume = [100, 150, 200, 250, 300];
			let maximumEngineVolume = 150;
			expect(
				motorcycleRider.motorcycleShowroom(engineVolume, maximumEngineVolume)
			).to.be.equal(
				'There are 2 available motorcycles matching your criteria!'
			);
		});
	});

	describe('Test -> function otherSpendings', () => {
		it('Invalid Information! -> equipment', () => {
			let equipment = 'str';
			let consumables = [1, 2, 3];
			let discount = true;
			expect(() => {
				motorcycleRider.otherSpendings(equipment, consumables, discount);
			}).to.throw(Error, 'Invalid Information!');
		});
		it('Invalid Information! -> consumables', () => {
			let equipment = [1, 2, 3];
			let consumables = '[1, 2, 3]';
			let discount = true;
			expect(() => {
				motorcycleRider.otherSpendings(equipment, consumables, discount);
			}).to.throw(Error, 'Invalid Information!');
		});
		it('Invalid Information! -> discount', () => {
			let equipment = [1, 2, 3];
			let consumables = [1, 2, 3];
			let discount = 'true';
			expect(() => {
				motorcycleRider.otherSpendings(equipment, consumables, discount);
			}).to.throw(Error, 'Invalid Information!');
		});

		it('Valid Information -> discount = true', () => {
			let equipment = ['helmet', 'jacked'];
			let consumables = ['engine oil', 'oil filter'];
			let discount = true;
			expect(
				motorcycleRider.otherSpendings(equipment, consumables, discount)
			).to.be.equal(
				`You spend $540.00 for equipment and consumables with 10% discount!`
			);
		});
		it('Valid Information -> discount = false', () => {
			let equipment = ['helmet', 'jacked'];
			let consumables = ['engine oil', 'oil filter'];
			let discount = false;
			expect(
				motorcycleRider.otherSpendings(equipment, consumables, discount)
			).to.be.equal(`You spend $600.00 for equipment and consumables!`);
		});
	});
});
