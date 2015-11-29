html-boilerplate
================

This is the front-end playground of Toby Mackenzie, for experimenting with generic front-end code, organization, and process ideas for what an "ideal" front-end setup might be like.  It is not necessarily meant for direct use, but more likely for providing bits to integrate into a more complete system.  It attempts to be as agnostic as possible of the back-end.

Directory Structure
-------------------

- bin
	- init.js: run this first to install project dependencies with npm, bundler, and bower.
	- src/CommandRunner: a helper for running shell commands
- gruntfile.js: contains grunt tasks for building scss files to css with Sass and require.js modules to production js with r.js.
	- build:js does the js build for prod environment.  The dev environment requires no build
	- build:css does the css build for dev environment
	- build:css:prod does the css build for prod environment
	- watch:css does the equivalent of build:css every time a source file is changed
	- hint runs jshint on the js files
- src: stores the HTML, JS, and CSS in development form, to be built and put into the web root.
	- build: assets used in the build process
	- lib: where third party / non-site specific assets should go.  bower will put stuff here
	- scripts: Where site require modules should go.  main.js contains the main require call that will load all other modules.  config/main.js contains the requirejs config.
	- styles: where site scss files will go.  'builds/main.scss' loads all other scss files as partials.  Another build is 'nomq-desktop.scss' for old browsers that don't support media queries but should still get the full experience (IE 8 in this case).
	- views: view files for the site.  contains an example site "skeleton" representing the basic HTML structure of and HTML document.  Also contains a json "skeleton" to be used when pages are loaded via ajax.
- web: represents the web root.  CSS and JS will be built into here.  Would normally contain a back-end controller, but in this case, a grunt task will build the views into here.  A 'dev' and 'prod' setup of HTML, CSS, and JS are put into place.  The 'dev' setup is meant to make it easier to develop, while 'prod' is meant to be performance optimized.
	- _: Location of site assets.  Built into here by grunt or symlinked when applicable.
	- htaccess: apache server configuration

Tools
-----

- [Grunt](http://gruntjs.com/): Grunt is used for building and linting.
- [SASS](http://sass-lang.com): SCSS is used for making CSS development easier.
	- [grunt-contrib-sass](https://github.com/gruntjs/grunt-contrib-sass): Used to build SCSS into CSS.
	- [grunt-autoprefixer](https://github.com/nDmitry/grunt-autoprefixer): Automatically handle browser prefixes with a configured set of browsers, so only the spec version needs to be written.
- [require.js](http://requirejs.org/): Used to help organize JS into modules, manage dependencies between them, and to load them from the browsers.
	- r.js: Use to concatenate require.js modules and minify for production
	- [almond](https://github.com/jrburke/almond): Minimal version of require.js to be used in single file builds.
- [Swig](http://paularmstrong.github.io/swig/): Not necessarily advocated by this project, but used to inject data and add simple logic to the HTML templates.  From the [Jinja](http://jinja.pocoo.org/) family of templating engines that includes [Twig](http://twig.sensiolabs.org/).
