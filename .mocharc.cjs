
module.exports = {
	colors: true,
	reporter: "spec",
	"node-option": [
		"experimental-specifier-resolution=node",
		"loader=ts-node/esm"
	],
	loader: [
	  "ts-node/register"
	],
	require: [
	  "global-jsdom/register"
	]
}