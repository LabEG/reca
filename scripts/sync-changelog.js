import {copyFileSync} from "fs";
import {fileURLToPath} from "url";
import {dirname, join} from "path";

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const rootDir = join(dirName, "..");

// Paths to CHANGELOG files
const rootChangelogPath = join(rootDir, "CHANGELOG.md");
const packagesChangelogPath = join(rootDir, "packages/reca/CHANGELOG.md");

// Copy root CHANGELOG to packages/reca
copyFileSync(rootChangelogPath, packagesChangelogPath);

// eslint-disable-next-line no-console
console.log("✓ CHANGELOG.md synced from root to packages/reca/CHANGELOG.md\n");
