/* eslint-disable no-console */
const execa = require("execa");
const fs = require("fs");

(async () => {
  let exitCode = 0;
  try {
    await execa("git", ["checkout", "--orphan", "gh-pages"]);
    const { stdout } = await execa("git", ["diff-index", "HEAD"]);
    if (stdout) {
        console.log("Please stash or commit changes first!");
        process.exit(1);
    }
    // eslint-disable-next-line no-console
    console.log("Building started...");
    await execa("npm", ["run", "build"]);
    // Understand if it's dist or build folder
    console.log("Building done!");
    const folderName = fs.existsSync("dist") ? "dist" : "build";
    await execa("git", ["--work-tree", folderName, "add", "--all"]);
    await execa("git", ["--work-tree", folderName, "commit", "-m", "gh-pages"]);
    console.log("Pushing to gh-pages...");
    await execa("git", ["push", "origin", "HEAD:gh-pages", "--force"]);
    console.log("Deleting dist");
    await execa("rimraf", [folderName])
    console.log("Successfully deployed");
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e.message);
    process.exit(1);
  } finally {
    await execa("git", ["checkout", "-f", "master"]);
    await execa("git", ["branch", "-D", "gh-pages"]);
  }
process.exit(exitCode);
})();
