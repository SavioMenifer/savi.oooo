const posthtml = require("posthtml");

module.exports = function (eleventyConfig) {
  eleventyConfig.addTransform("posthtml", function (content, outputPath) {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if (outputPath && outputPath.endsWith(".html")) {
      return posthtml([
        require("posthtml-modules")({
          root: "./src/views",
          initial: true,
        }),
      ])
        .process(content)
        .then((result) => result.html);
    }
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
    .use(footnote);

  eleventyConfig.setLibrary("md", markdownLib);

  return {
    dir: {
      input: "src",
      output: "dist",
      layouts: "views/layouts",
    },
  };
};
