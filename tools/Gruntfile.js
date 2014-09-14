/* global console, module, require */
module.exports = function(__grunt){
	//--show run time
	require('time-grunt')(__grunt);

	//--autoload grunt tasks package.json
	require('load-grunt-tasks')(__grunt);

	//--path configuration
	var __paths = {
		tools: '.'
		,webRoot: '../web'
	};
	__paths.assets = __paths.webRoot + '/_';
	__paths.styles = __paths.assets + '/styles';
	__paths.stylesSrc = __paths.styles + '/src';
	__paths.stylesBuildsSrc = __paths.stylesSrc + '/builds';
	__paths.stylesDev = __paths.styles + '/dev';
	__paths.stylesProd = __paths.styles + '/prod';
	__paths.scripts = __paths.assets + '/scripts';
	__paths.scriptsSrc = __paths.scripts + '/src';
	__paths.scriptsProd = __paths.scripts + '/prod';

	//--grunt config
	__grunt.initConfig({
		autoprefixer: {
			dev: {
				options: {
					browsers: ['last 4 versions', '> 1%', 'ie >= 7', 'ff >= 3']
				}
				,src: __paths.stylesDev + '/**/*.css'
			}
			,prod: {
				options: {
					browsers: ['last 4 versions', '> 1%', 'ie >= 7', 'ff >= 3']
				}
				,src: __paths.stylesProd + '/**/*.css'
			}
		}
		,sass: {
			options: {
				require: ['sass-css-importer', 'sass-globbing']
				,unixNewlines: true
			}
			,dev: {
				files: [{
					cwd: __paths.stylesBuildsSrc
					,dest: __paths.stylesDev
					,expand: true
					,ext: '.css'
					,src: ['**/*.scss']
				}]
				,options: {
					lineNumbers: true
					,style: 'nested'
				}
			}
			,prod: {
				files: [{
					cwd: __paths.stylesBuildsSrc
					,dest: __paths.stylesProd
					,expand: true
					,ext: '.css'
					,src: ['**/*.scss']
				}]
				,options: {
					style: 'compressed'
				}
			}
		}
		,jshint: {
			options: {
				jshintrc: '../.jshintrc'
			}
			,all: [
				'Gruntfile.js'
				,__paths.scriptsSrc
			]
		}
		,requirejs: {
			require: {
				options: {
					baseUrl: __paths.scriptsSrc
					,include: ['../../../../tools/node_modules/almond/almond', 'main']
					,mainConfigFile: __paths.scriptsSrc + '/main.js'
					,optimize: 'uglify2'
					,out: __paths.scriptsProd + '/main.js'
					,wrap: {
						startFile: 'assets/scripts/wrap.start.js'
						,endFile: 'assets/scripts/wrap.end.js'
					}
					,wrapShim: true
				}
			}
		}
		,watch: {
			css: {
				files: __paths.stylesSrc + '/**/*.scss'
				,tasks: ['build:css:dev']
			}
			,js: {
				files: __paths.scriptsSrc + '/**/*.js'
				,tasks: ['jshint', 'build:js']
			}
			,prod: {
				files: [
					__paths.scriptsSrc
					,__paths.stylesSrc
				]
				,tasks: [
					'build:css:prod'
					,'build:js:prod'
				]
			}
		}
	});

	//--tasks
	/*---
	convenient configuration map of all tasks to register
	key is name of task
	value is either a map or an array of tasks or a function to run
		Map: can have two keys, 'value' and 'description'.  'description' is optional description of task.  'value' is either an array of tasks or a function to run
		Something Else: will be used as the 'value' equivalent of the map
	*/
	var __tasks = {
		'default': function(){
			console.log('available commands:\n', Object.keys(__tasks).toString().replace(/,/g, ', '));
		}
		,'all': {
			description: 'Run hinting and, if succesful, build css and js for production'
			,value: [
				'hint'
				,'build:prod'
			]
		}
		,'build:css': [
			'build:css:dev'
		]
		,'build:css:dev': [
			'sass:dev'
			,'autoprefixer:dev'
		]
		,'build:css:prod': [
			'sass:prod'
			,'autoprefixer:prod'
		]
		,'build:js': [
			'requirejs:require'
		]
		,'build:js:prod': [
			'jshint'
			,'build:js'
		]
		,'build:prod': [
			'build:css:prod'
			,'build:js:prod'
		]
		,'hint': [
			'jshint'
		]
		,'watch:dev': [
			'watch:css'
			,'watch:js'
		]
	};
	//---loop through all tasks, registering each
	var _item;
	for(var _key in __tasks){
		if(__tasks.hasOwnProperty(_key)){
			//--items are objects or are converted to them
			_item = __tasks[_key];
			if(_item instanceof Array || typeof _item === 'function'){
				_item = {
					value: _item
				};
			}
			if(_item.description){
				__grunt.registerTask(_key, _item.description, _item.value);
			}else{
				__grunt.registerTask(_key, _item.value);
			}
		}
	}
};
