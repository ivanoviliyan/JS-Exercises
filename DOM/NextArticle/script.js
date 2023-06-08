function getArticleGenerator(articles) {
	const content = document.querySelector('#content');

	return function () {
		if (articles.length) {
			const aritcle = document.createElement('article');
			aritcle.textContent = articles.shift();
			content.appendChild(aritcle);
		}
	};
}
