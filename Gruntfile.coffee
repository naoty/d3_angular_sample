module.exports = (grunt) ->
  grunt.initConfig
    watch:
      scripts:
        files: ["src/**/*.coffee"]
        tasks: ["coffee"]
    coffee:
      compile:
        expand: true,
        cwd: "src"
        src: ["**/*.coffee"]
        dest: "dest/"
        ext: ".js"

  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-contrib-coffee"

  grunt.registerTask "default", ["coffee", "watch"]
