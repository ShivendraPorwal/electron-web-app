const fs = require("fs");
const { execSync } = require("child_process");
const readline = require("readline");

/**
 * Readline interface to ask for user input
 */
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Function to get the current version from package.json
 */
function getCurrentVersion() {
  const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf8"));
  return packageJson.version;
}

/**
 * Function to update version based on the user input
 * @param {"major" | "minor" | "patch"} versionType
 * @param {`${number}.${number}.${number}`} currentVersion
 * @returns Updated version
 */
function updateVersion(versionType, currentVersion) {
  const versionParts = currentVersion.split(".").map(Number);

  if (versionType === "major") {
    versionParts[0] += 1; // Increment major version
    versionParts[1] = 0; // Reset minor version
    versionParts[2] = 0; // Reset patch version
  } else if (versionType === "minor") {
    versionParts[1] += 1; // Increment minor version
    versionParts[2] = 0; // Reset patch version
  } else if (versionType === "patch") {
    versionParts[2] += 1; // Increment patch version
  }

  const newVersion = versionParts.join(".");
  console.log(`Updated version to: ${newVersion}`);
  return newVersion;
}

/**
 * Function to update the version in package.json
 * @param {`${number}.${number}.${number}`} newVersion New updated version
 */
function updatePackageJson(newVersion) {
  const packageJsonPath = "./package.json";
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  packageJson.version = newVersion;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log(`Updated package.json version to ${newVersion}`);
}

/**
 * Function to commit the version update
 * @description
 * This function will add the package.json file to the staging area,
 * commit the changes with a message, and push the changes to the remote repository.
 * which will trigger the CI/CD pipeline to create a release.
 */
function commitVersionUpdate(newVersion) {
  console.log(`Committing version update: ${newVersion}`);
  execSync("git add package.json");
  execSync(`git commit -m "chore: update version to ${newVersion}"`);
  execSync("git push");
}

/**
 * Prompt the user for the version update type
 */
function askVersionUpdate(currentVersion) {
  rl.question(
    `Current version is ${currentVersion}. Do you want to update the version to (major, minor, patch)? `,
    (answer) => {
      if (["major", "minor", "patch"].includes(answer)) {
        const newVersion = updateVersion(answer, currentVersion);
        updatePackageJson(newVersion);
        commitVersionUpdate(newVersion); // Commit the version change
        rl.close();
      } else {
        console.log(
          'Invalid option. Please enter "major", "minor", or "patch".'
        );
        rl.close();
      }
    }
  );
}

// Main execution flow
function main() {
  const currentVersion = getCurrentVersion();
  askVersionUpdate(currentVersion);
}

main();
