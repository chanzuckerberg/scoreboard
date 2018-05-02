export const slugify = function(word) {
	return word.replace(/ /i, "_");
};

export const discourseify = function(word) {
	return word.replace(/ /i, "");
};

export const unslugify = function(word) {
	return word.replace(/\_/i, " ");
};

export const linkOnClick = function(e) {
	e.stopPropagation();
};

export const formatScore = function(score, sigfig) {
	let formatted = "-";
	try {
		formatted = score.toFixed(sigfig)
	}
	catch (err) {}
	return formatted
}
