#!/usr/bin/env node

// src/index.ts
import path from "path.js";
import { program } from "commander";
import { existsSync, readdirSync, writeFileSync } from "fs-extra";
(() => {
  const createESMModulePackageJSON = (buildDir) => {
    if (!existsSync(buildDir)) {
      console.error(`Dist folder not found: ${buildDir}`);
      process.exit(1);
    }
    const dirs = readdirSync(buildDir);
    dirs.forEach((dir) => {
      if (dir === "esm") {
        const packageJSONPath = path.join(buildDir, dir, "package.json");
        if (!existsSync(packageJSONPath)) {
          const packageContent = JSON.stringify({ type: "module" }, null, 2);
          writeFileSync(packageJSONPath, packageContent, "utf8");
          console.log(`Created: ${packageJSONPath}`);
        } else {
          console.log(`Skipped (already exists): ${packageJSONPath}`);
        }
      }
    });
  };
  program.name("esm-package-json").description('Generate a minimal package.json with type: "module" in your dist/esm folder').option("-d, --dist <dist>", "Dist folder path", "./dist").action((options) => {
    createESMModulePackageJSON(options.dist);
  });
  program.parse();
})();
