module.exports = function(grunt){
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    less: {
      style: {
        files: {
          "css/style.css": ["less/style.less"]
        }
      }
    },
    postcss: {
      options: {
        processors: [
          require("autoprefixer")({browsers: "last 2 versions"})
        ]
      },
      style: {
        src: "css/*.css"
      }
    },
    watch: {
      style: {
        files: ["less/**/*.less"],
        tasks: ["less", "postcss"],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.registerTask("build", [
    "less",
    "postcss"
  ]);
};