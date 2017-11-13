export const slugify = function(word) {
	return word.replace(/ /i, "_");
};

export const unslugify = function(word) {
	return word.replace(/\_/i, " ");
};


export const linkOnClick = function(e) {
		e.stopPropagation();
	}
