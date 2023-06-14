function solve() {
	class Figure {
		constructor() {
			this.units = 'cm';
			this.unitsDict = {
				cm: 1,
				mm: 10,
				m: 0.01,
			};
			this.unitsValue = this.unitsDict[this.units];
		}
		get area() {}
		changeUnits(v) {
			if (!['cm', 'mm', 'm'].includes(v)) {
				return;
			}
			this.unitsValue = this.unitsDict[v];
			this.units = v;
		}
		toString() {
			return `Figures units: ${this.units}`;
		}
	}
	class Circle extends Figure {
		constructor(r) {
			super();
			this.radius = r;
		}
		get area() {
			this.unitsValue = this.unitsDict[this.units];
			return (
				Math.PI * Math.pow(this.radius, 2) * this.unitsValue * this.unitsValue
			);
		}
		toString() {
			return `${super.toString()} Area: ${this.area} - radius: ${
				this.radius * this.unitsValue
			}`;
		}
	}

	class Rectangle extends Figure {
		constructor(w, h, u) {
			super();
			this.width = w;
			this.height = h;
			this.units = u;
		}
		get area() {
			this.unitsValue = this.unitsDict[this.units];
			return this.width * this.height * this.unitsValue * this.unitsValue;
		}
		toString() {
			this.unitsValue = this.unitsDict[this.units];
			return `${super.toString()} Area: ${this.area} - width: ${
				this.width * this.unitsValue
			}, height: ${this.height * this.unitsValue}`;
		}
	}
	return {
		Figure,
		Circle,
		Rectangle,
	};
}
