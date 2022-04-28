const Image = require("@11ty/eleventy-img");
const { parseHTML } = require("linkedom");
const path = require("path");

module.exports = function (eleventyConfig) {
  eleventyConfig.addLiquidShortcode("youtube", function (id, title) {
    return `<lite-youtube videoid="${id}" playlabel="${title}"></lite-youtube>`;
  });

  //markdown-it plugins
  let markdownIt = require("markdown-it");
  let markdownItAttrs = require("markdown-it-attrs");
  let implicitFigures = require("markdown-it-image-figures");
  let html5Media = require("markdown-it-html5-embed");
  let container = require("markdown-it-container");
  let footnote = require("markdown-it-footnote");
  let options = {
    html: true,
    typographer: true,
  };
  let markdownLib = markdownIt(options)
    .use(markdownItAttrs)
    .use(implicitFigures, {
      figcaption: true,
      copyAttrs: "^class$",
    })
    .use(html5Media, {
      useImageSyntax: true,
    })
    .use(container, "info")
    .use(container, "small-figure-text")
    .use(container, "large-figure-text")
    .use(container, "group")
    .use(container, "slider")
    .use(footnote);

  eleventyConfig.setLibrary("md", markdownLib);

  // image optimization using eleventy-img

  const ignoredFormats = [".svg"];
  const ignoredPages = ["about.html"];

  eleventyConfig.addTransform("transform", (content, outputPath) => {
    function endsWithAny(suffixes, string) {
      return suffixes.some(function (suffix) {
        return string.endsWith(suffix);
      });
    }

    if (outputPath && endsWithAny(ignoredPages, outputPath)) return content;

    if (outputPath && outputPath.endsWith(".html")) {
      let { document } = parseHTML(content);

      const images = [...document.querySelectorAll("img")];

      images.forEach((i, index) => {
        const src = "./src/" + i.getAttribute("src");

        const { ext } = path.parse(src);
        const { dir } = path.parse(i.getAttribute("src"));
        if (ignoredFormats.includes(ext)) {
          // use fs.copyFile to manually copy this file to your output dir
          return;
        }

        const options = {
          widths: [1600, 1920, null],
          sizes: "100vw",
          formats: ["webp", "jpeg"],
          urlPath: dir,
          outputDir: "./docs/" + dir,
          sharpJpegOptions: { quality: 90 },
          sharpWebpOptions: { quality: 90 },
          filenameFormat: function (id, src, width, format, options) {
            const extension = path.extname(src);
            const name = path.basename(src, extension);
            return `${name}-${width}w.${format}`;
          },
        };

        const meta = Image.statsSync(src, options);
        const last = meta.jpeg[meta.jpeg.length - 1];
        if (last.width < 500) return;

        Image(src, options);
        i.setAttribute("width", last.width);
        i.setAttribute("height", last.height);
        if (index !== 0) {
          i.setAttribute("loading", "lazy");
          i.setAttribute("decoding", "async");
        }

        i.outerHTML = `
          <picture>
            <source type="image/webp" sizes="${
              options.sizes
            }" srcset="${meta.webp.map((p) => p.srcset).join(", ")}">
            <source type="image/jpeg" sizes="${
              options.sizes
            }" srcset="${meta.jpeg.map((p) => p.srcset).join(", ")}">
            ${i.outerHTML}
          </picture>`;
      });

      return `<!DOCTYPE html>${document.documentElement.outerHTML}`;
    }
    return content;
  });

  eleventyConfig.setBrowserSyncConfig({
    middleware: [
      function (req, res, next) {
        if (/^[^.]+$/.test(req.url)) {
          res.setHeader("Content-Type", "text/html; charset=utf-8");
        }
        next();
      },
    ],
  });

  eleventyConfig.addFilter("removeHTML", function (value) {
    return value.replace(/\.html$/, "");
  });

  return {
    dir: {
      input: "src",
      output: "docs",
      layouts: "views/layouts",
      includes: "views/components",
    },
  };
};
