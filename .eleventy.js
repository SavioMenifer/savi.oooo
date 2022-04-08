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

  return {
    dir: {
      input: "src",
      output: "dist",
      layouts: "views/layouts",
    },
  };
};
