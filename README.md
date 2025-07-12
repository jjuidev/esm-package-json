# @jjuidev/esm-package-json

A utility CLI tool that automatically generates a minimal `package.json` file with `"type": "module"` in your `dist/esm` folder to ensure proper ESM module resolution.

## Installation

### Global Installation (Recommended)

```bash
npm install -g @jjuidev/esm-package-json
```

### Local Installation

```bash
npm install --save-dev @jjuidev/esm-package-json
```

## Usage

### CLI Usage

After building your TypeScript project, run:

```bash
esm-package-json
```

Or specify a custom dist folder:

```bash
esm-package-json --dist ./build
esm-package-json -d ./output
```

### What it does

This tool scans your dist folder and:

1. Looks for an `esm` subdirectory
2. Creates a `package.json` file inside the `esm` folder if it doesn't exist
3. The generated `package.json` contains: `{"type": "module"}`

This ensures that your ESM modules are properly recognized by Node.js and bundlers.

### Example

Given this project structure:

```
your-project/
├── dist/
│   ├── cjs/
│   │   └── index.cjs
│   └── esm/
│       └── index.js
└── package.json
```

Running `esm-package-json` will create:

```
your-project/
├── dist/
│   ├── cjs/
│   │   └── index.cjs
│   └── esm/
│       ├── index.js
│       └── package.json  ← Generated with {"type": "module"}
└── package.json
```

## Options

| Option   | Alias | Description                  | Default  |
| -------- | ----- | ---------------------------- | -------- |
| `--dist` | `-d`  | Specify the dist folder path | `./dist` |

## Integration with Build Tools

### With tsup

Add to your `package.json` scripts:

```json
{
	"scripts": {
		"build": "tsup",
		"postbuild": "esm-package-json"
	}
}
```

### With npm scripts

```json
{
	"scripts": {
		"build": "tsc && esm-package-json",
		"build:watch": "tsc --watch & esm-package-json --dist ./dist"
	}
}
```

## Why do you need this?

When building dual-package libraries (both CommonJS and ESM), you often have separate output folders:

- `dist/cjs/` for CommonJS files
- `dist/esm/` for ESM files

Node.js determines module type based on the nearest `package.json` file. Without a `package.json` with `"type": "module"` in the ESM folder, Node.js might not correctly identify your ESM modules, leading to import/export issues.

## Requirements

- Node.js >= 16.0.0

## Repository

- **GitHub**: [https://github.com/jjuidev/esm-package-json](https://github.com/jjuidev/esm-package-json)
- **Issues**: [https://github.com/jjuidev/esm-package-json/issues](https://github.com/jjuidev/esm-package-json/issues)

## License

MIT © [jjuidev](https://github.com/jjuidev)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Changelog

### 1.0.0

- Initial release
- CLI tool to generate ESM package.json files
- Support for custom dist folder paths
