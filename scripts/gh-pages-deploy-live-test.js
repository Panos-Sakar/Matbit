const execa = require("execa");
const fs = require("fs");

(async () => 
{
  try {
    
    await execa("move", ["vue.config.js", "scripts\\tempFiles"]);
    console.log("Building...");

    //await execa("npm", ["run", "build"]);
    // Understand if it's dist or build folder
    //const folderName = fs.existsSync("dist") ? "dist" : "build";

    console.log("Successfully deployed");
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
})();
