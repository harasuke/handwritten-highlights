import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import dts from "rollup-plugin-dts"
import peerDepsExternal from "rollup-plugin-peer-deps-external";

const packageJson = require("./package.json");

function addUseClientDirective() {
  return {
    name: 'add-use-client',
    renderChunk(code) {
      const directive = '"use client";\n';
      if (!code.startsWith(directive)) {
        return {
          code: directive + code,
          map: null,
        };
      }
      return null;
    },
  };
}

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
        banner: '"use client"',
      },
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
        exports: "named",
      },
    ],
    external: ["react", "react-dom"],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
      }),
      terser(),
      addUseClientDirective()
    ],
  },
  {
    input: "src/index.ts",
    output: [{ file: packageJson.types }],
    plugins: [dts.default()]
  },
];
