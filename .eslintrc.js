module.exports = {
	"parser": "babel-eslint",
    "env": {
        "browser": true,
        "node": true,
		"es6": true,
    },
    "extends": "airbnb",
    "rules": {
        "indent": [2, "tab", { "SwitchCase": 1, "VariableDeclarator": 1 }],
        "no-tabs": 0,
        "react/prop-types": 0,
        "react/jsx-indent": [2, "tab"],
        "react/jsx-indent-props": [2, "tab"],
		"quotes": [2, "double"] ,
		"import/extensions": 0,
		"arrow-parens": 0,

		
    }
};