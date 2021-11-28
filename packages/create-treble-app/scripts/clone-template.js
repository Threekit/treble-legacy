import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
// import chalk from "chalk";
import spawn from "cross-spawn";

const __dirname = dirname(fileURLToPath(import.meta.url));

function copyDir(srcDir, destDir, skipFiles = []) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);
    copy(srcFile, destFile, skipFiles);
  }
}

function copy(src, dest, skipFiles = []) {
  // if (skipFiles.some((file) => src.includes(file))) return;

  const stat = fs.statSync(src);

  if (stat.isDirectory()) {
    copyDir(src, dest, skipFiles);
  } else {
    fs.copyFileSync(src, dest);
  }
}

function updatePackageJson(outputDir, projectName) {
  const pkgPath = path.resolve(outputDir, "package.json");
  const pkg = fs.readFileSync(pkgPath);
  const pkgPrepped = JSON.parse(pkg);
  pkgPrepped.name = projectName;
  fs.writeFileSync(pkgPath, JSON.stringify(pkgPrepped, null, 2));
}

function installDependencies(dir) {
  return new Promise((resolve, reject) => {
    let command = "yarnpkg";
    let args = ["install", "--cwd", dir];

    console.log("Installing dependencies...");

    const child = spawn(command, args, { stdio: "inherit" });
    child.on("close", (code) => {
      if (code !== 0) {
        reject({
          command: `${command} ${args.join(" ")}`,
        });
        return;
      }
      return resolve();
    });
  });
}

export default function cloneTemplate(projectName, templateName = "frontend") {
  const templatePath = path.resolve(__dirname, "..", "templates", templateName);
  const outputDir = path.resolve(process.cwd(), projectName);
  const skipFiles = ["node_modules", "dist", "build"];

  fs.mkdirSync(outputDir, { recursive: true });
  copy(templatePath, outputDir, skipFiles);

  try {
    updatePackageJson(outputDir, projectName);
    installDependencies(outputDir);
  } catch (e) {
    console.log(e);
  }
}
