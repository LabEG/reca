import {readFileSync, writeFileSync} from "fs";
import {fileURLToPath} from "url";
import {dirname, join} from "path";

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const rootDir = join(dirName, "..");

// Read root package.json
const rootPackagePath = join(rootDir, "package.json");
const rootPackage = JSON.parse(readFileSync(rootPackagePath, "utf-8"));
const {version} = rootPackage;

// List of workspace packages to sync version to
const packages = ["packages/reca", "packages/reca-docs"];

// Update each package.json with the root version
for (const pkg of packages) {
    const packagePath = join(rootDir, pkg, "package.json");
    const pkgJson = JSON.parse(readFileSync(packagePath, "utf-8"));
    pkgJson.version = version;
    writeFileSync(packagePath, `${JSON.stringify(pkgJson, null, 2)}\n`, "utf-8");
    // eslint-disable-next-line no-console
    console.log(`✓ Updated ${pkg}/package.json to version ${version}`);
}

// eslint-disable-next-line no-console
console.log(`\n✓ All packages synced to version ${version}\n`);
