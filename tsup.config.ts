import { esbuildPluginFilePathExtensions } from 'esbuild-plugin-file-path-extensions';
import { defineConfig, Options } from 'tsup';

const tsupConfig = defineConfig(() => {
	const baseConfig: Options = {
		entry: ['src/index.ts'],
		dts: false,
	};

	const cjs: Options = {
		...baseConfig,
		platform: 'node',
		target: 'es6',
		format: 'cjs',
		outDir: 'dist/cjs',
		tsconfig: 'tsconfig.cjs.json',
		esbuildPlugins: [esbuildPluginFilePathExtensions({ cjsExtension: 'cjs' })],
		banner: {
			js: '#!/usr/bin/env node',
		},
	};

	const esm: Options = {
		...baseConfig,
		platform: 'browser',
		target: 'esnext',
		format: 'esm',
		outDir: 'dist/esm',
		tsconfig: 'tsconfig.esm.json',
		esbuildPlugins: [esbuildPluginFilePathExtensions({ esmExtension: 'js' })],
		banner: {
			js: '#!/usr/bin/env node',
		},
	};

	const types: Options = {
		...baseConfig,
		format: ['esm'],
		outDir: 'dist/types',

		dts: {
			only: true,
		},
	};

	return [cjs, esm, types];
});

export default tsupConfig;
