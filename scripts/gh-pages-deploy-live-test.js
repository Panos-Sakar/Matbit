const execa = require("execa");
const fs = require("fs");

(async () => 
{
  try {
    
    await execa("move", ["vue.config.js", "scripts\\tempFiles"]);
    await execa("move", ["scripts\\scriptFiles\\vue.config.js", ".\\"]);

    console.log("Building...");

    await execa("npm", ["run", "build"]);

    await execa("move", ["vue.config.js", "scripts\\scriptFiles"]);
    await execa("move", ["scripts\\tempFiles\\vue.config.js", ".\\"]);

    console.log("Copying build output...");
    
    const folderName = fs.existsSync("dist") ? "dist\\" : "build\\"; // Understand if it's dist or build folder
    await execa("Xcopy", [folderName, "..\\Matbit-live-test\\" , "/e/d/c/y"]);

    console.log("Commiting ro Github...");
    await execa("git", ["add", "--all"], { cwd: '../Matbit-live-test/' });
    try{

      await execa("git", ["commit", "-m", '"Update Matbit-live-test"'], { cwd: '../Matbit-live-test/' });
    }catch (e) {
      console.log(e.message);
    }
    await execa("git", ["push", "origin", "--all", "--force"], { cwd: '../Matbit-live-test/' });

  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }finally{
    console.log("Successfully deployed");
  }
})();
