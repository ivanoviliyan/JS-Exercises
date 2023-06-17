const lottery = require('./Lottery');
const { it, describe } = require('mocha');
const { expect } = require('chai');

describe('lottery tests', () => {
	describe('buyLotteryTicket', () => {
		it('Unable to buy', () => {
			let ticketPrice = 30;
			let ticketCount = 3;
			let buy = false;
			expect(() => {
				lottery.buyLotteryTicket(ticketPrice, ticketCount, buy);
			}).to.throw(Error, 'Unable to buy lottery ticket!');
		});
		it('Invalid input! ticketPrice 1', () => {
			let ticketPrice = 0;
			let ticketCount = 3;
			let buy = true;
			expect(() => {
				lottery.buyLotteryTicket(ticketPrice, ticketCount, buy);
			}).to.throw(Error, 'Invalid input!');
		});
		it('Invalid input! ticketCount 1', () => {
			let ticketPrice = 20;
			let ticketCount = 0;
			let buy = true;
			expect(() => {
				lottery.buyLotteryTicket(ticketPrice, ticketCount, buy);
			}).to.throw(Error, 'Invalid input!');
		});
		it('Invalid input! ticketPrice 2', () => {
			let ticketPrice = '20';
			let ticketCount = 5;
			let buy = true;
			expect(() => {
				lottery.buyLotteryTicket(ticketPrice, ticketCount, buy);
			}).to.throw(Error, 'Invalid input!');
		});
		it('Invalid input! ticketCount 2', () => {
			let ticketPrice = 20;
			let ticketCount = '5';
			let buy = true;
			expect(() => {
				lottery.buyLotteryTicket(ticketPrice, ticketCount, buy);
			}).to.throw(Error, 'Invalid input!');
		});
		it('Invalid input! buy', () => {
			let ticketPrice = 20;
			let ticketCount = 5;
			let buy = 'true';
			expect(() => {
				lottery.buyLotteryTicket(ticketPrice, ticketCount, buy);
			}).to.throw(Error, 'Invalid input!');
		});
		it('Valid data', () => {
			let ticketPrice = 20;
			let ticketCount = 5;
			let buy = true;
			expect(
				lottery.buyLotteryTicket(ticketPrice, ticketCount, buy)
			).to.be.equal('You bought 5 tickets for 100$.');
		});
	});
	describe('checkTicket', () => {
		it('Invalid input! ticketNumbers 1', () => {
			let ticketNumbers = 'string';
			let luckyNumbers = [1, 2, 3, 4];

			expect(() => {
				lottery.checkTicket(ticketNumbers, luckyNumbers);
			}).to.throw(Error, 'Invalid input!');
		});
		it('Invalid input! luckyNumbers 1', () => {
			let ticketNumbers = [1, 2, 3, 4];
			let luckyNumbers = 'string';

			expect(() => {
				lottery.checkTicket(ticketNumbers, luckyNumbers);
			}).to.throw(Error, 'Invalid input!');
		});
		it('Invalid input! ticketNumbers 2', () => {
			let ticketNumbers = [1, 2, 3, 4, 5, 6];
			let luckyNumbers = [1, 2, 3, 4];

			expect(() => {
				lottery.checkTicket(ticketNumbers, luckyNumbers);
			}).to.throw(Error, 'Invalid input!');
		});
		it('Invalid input! luckyNumbers 2', () => {
			let ticketNumbers = [1, 2, 3, 4];
			let luckyNumbers = [1, 2, 3, 4, 5, 6];

			expect(() => {
				lottery.checkTicket(ticketNumbers, luckyNumbers);
			}).to.throw(Error, 'Invalid input!');
		});
		it('Valid data -> win', () => {
			let ticketNumbers = [1, 2, 3, 4, 5, 6];
			let luckyNumbers = [4, 5, 6, 7, 8, 9];

			expect(lottery.checkTicket(ticketNumbers, luckyNumbers)).to.be.equal(
				'Congratulations you win, check your reward!'
			);
		});
		it('Valid data -> JACKPOT', () => {
			let ticketNumbers = [1, 2, 3, 4, 5, 6];
			let luckyNumbers = [1, 2, 3, 4, 5, 6];

			expect(lottery.checkTicket(ticketNumbers, luckyNumbers)).to.be.equal(
				'You win the JACKPOT!!!'
			);
		});
	});
	describe('secondChance', () => {
		it('Invalid input!', () => {
			let ticketID = '5';
			let secondChanceWinningIDs = [1, 2, 3];

			expect(() => {
				lottery.secondChance(ticketID, secondChanceWinningIDs);
			}).to.throw(Error, 'Invalid input!');
		});
		it('Invalid input!', () => {
			let ticketID = 5;
			let secondChanceWinningIDs = '[1, 2, 3]';

			expect(() => {
				lottery.secondChance(ticketID, secondChanceWinningIDs);
			}).to.throw(Error, 'Invalid input!');
		});
		it('Valid input!', () => {
			let ticketID = 2;
			let secondChanceWinningIDs = [1, 2, 3];

			expect(
				lottery.secondChance(ticketID, secondChanceWinningIDs)
			).to.be.equal('You win our second chance prize!');
		});
		it('Valid input!', () => {
			let ticketID = 4;
			let secondChanceWinningIDs = [1, 2, 3];

			expect(
				lottery.secondChance(ticketID, secondChanceWinningIDs)
			).to.be.equal("Sorry, your ticket didn't win!");
		});
	});
});
