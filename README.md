html-boilerplate
================

An html project boilerplate not currently meant for direct use but more of for experimentation with ideas about the components of a generic site, with an attempt to be agnostic of the server technologies used and focus on the build tools and the base of what is delivered to the client.  A brief overview until I get time to go into more detail:

- tools: tools for working on the site, including for initial setup and for preprocessing/building the assets of the site
	- init.js: run this first to install project dependencies with npm, bundler, and bower.
	- Gruntfile.js: contains grunt tasks for building scss files to css with Sass and require.js modules to production js with r.js.
		- build:js does the js build for prod environment.  The dev environment requires no build
		- build:css does the css build for dev environment
		- build:css:prod does the css build for prod environment
		- watch:css does the equivalent of build:css every time a source file is changed
		- hint runs jshint on the js files
	- src/CommandRunner: a helper for running shell commands
	- assets: js used in the build process
	- etc: configuration files
- web: represents the web root
	- _: site assets
		- lib: where third party / non-site specific assets should go.  bower will put stuff here
		- scripts/src: where site require modules should go.  main.js contains the require config and the main require call that will load all other modules
		- styles/src: where site scss files will go.  builds/main.scss loads all other scss files as partials.  Can put any other builds here, such as an IE specific build.
		- views: will contain view files for the site.  has an example site skeleton and a json version to be used when subsequent pages are loaded via ajax
	- htaccess: apache server configuration
