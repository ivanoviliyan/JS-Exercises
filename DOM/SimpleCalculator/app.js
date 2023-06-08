function calculator() {
	const selectedElements = {
		selector1: '',
		selector2: '',
		result: '',
	};

	function calculate(x, y, operator) {
		x = Number(x);
		y = Number(y);
		if (operator === '+') {
			return x + y;
		}
		return x - y;
	}

	return {
		init: function (selector1, selector2, result) {
			selectedElements.selector1 = document.querySelector(selector1);
			selectedElements.selector2 = document.querySelector(selector2);
			selectedElements.result = document.querySelector(result);
		},
		add: function () {
			const result = calculate(
				selectedElements.selector1.value,
				selectedElements.selector2.value,
				'+'
			);
			selectedElements.result.value = result;
		},
		subtract: function () {
			const result = calculate(
				selectedElements.selector1.value,
				selectedElements.selector2.value,
				'-'
			);
			selectedElements.result.value = result;
		},
	};
}
const calculate = calculator();

calculate.init('#num1', '#num2', '#result');
