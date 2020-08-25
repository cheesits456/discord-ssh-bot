const semver = require("semver"),
	pkg = require('./package.json');

try {
	require("./script.js");
} catch (e) {
	if (e instanceof SyntaxError && !semver.satisfies(process.version, pkg.engines.node)) {
		console.error("Incompatible Node.js version! Please update to version 14 or higher!");
	} else {
		console.error(e);
	}
}
