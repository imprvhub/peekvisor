import fs from "node:fs/promises";
import { globby } from "globby";
import { minify } from "html-minifier-terser";

const path = "./.vercel/output/static";
const files = await globby(`${path}/**/*.html`);

await Promise.all(
  files.map(async (file) => {
    let html = await fs.readFile(file, "utf-8");

    html = await minify(html, {
      removeComments: true,
      preserveLineBreaks: true,
      collapseWhitespace: true,
      minifyJS: true,
    });
    await fs.writeFile(file, html);
  }),
);
