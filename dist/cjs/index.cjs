#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var import_path = __toESM(require("path"), 1);
var import_commander = require("commander");
var import_fs_extra = require("fs-extra");
(() => {
  const createESMModulePackageJSON = (buildDir) => {
    if (!(0, import_fs_extra.existsSync)(buildDir)) {
      console.error(`Dist folder not found: ${buildDir}`);
      process.exit(1);
    }
    const dirs = (0, import_fs_extra.readdirSync)(buildDir);
    dirs.forEach((dir) => {
      if (dir === "esm") {
        const packageJSONPath = import_path.default.join(buildDir, dir, "package.json");
        if (!(0, import_fs_extra.existsSync)(packageJSONPath)) {
          const packageContent = JSON.stringify({ type: "module" }, null, 2);
          (0, import_fs_extra.writeFileSync)(packageJSONPath, packageContent, "utf8");
          console.log(`Created: ${packageJSONPath}`);
        } else {
          console.log(`Skipped (already exists): ${packageJSONPath}`);
        }
      }
    });
  };
  import_commander.program.name("esm-package-json").description('Generate a minimal package.json with type: "module" in your dist/esm folder').option("-d, --dist <dist>", "Dist folder path", "./dist").action((options) => {
    createESMModulePackageJSON(options.dist);
  });
  import_commander.program.parse();
})();
