/* global console, module, require */
module.exports = function(__grunt){
	//--show run time
	require('time-grunt')(__grunt);

	//--autoload grunt tasks package.json
	require('load-grunt-tasks')(__grunt);

	//--path configuration
	var __paths = {
		tools: '.'
	};
	__paths.src = __paths.tools + '/../src';
	__paths.lib = __paths.src + '/lib';
	__paths.webRoot = __paths.tools + '/../web';
	__paths.assets = __paths.src + '/assets';
	__paths.assetsTarget = __paths.webRoot + '/_';
	__paths.stylesSrc = __paths.assets + '/styles';
	__paths.stylesBuildsSrc = __paths.stylesSrc + '/builds';
	__paths.stylesTarget = __paths.assetsTarget + '/styles';
	__paths.stylesDev = __paths.stylesTarget + '/dev';
	__paths.stylesProd = __paths.stylesTarget + '/prod';
	__paths.scriptsTarget = __paths.assetsTarget + '/scripts';
	__paths.scriptsSrc = __paths.assets + '/scripts';
	__paths.scriptsDev = __paths.scriptsTarget + '/dev';
	__paths.scriptsProd = __paths.scriptsTarget + '/prod';

	//-# for test
	__paths.views = __paths.src + '/views';

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
		,symlink: {
			options: {
				overwrite: true
			}
			,devJS: {
				dest: __paths.scriptsDev
				,overwrite: true
				,src: __paths.scriptsSrc
			}
			,libDev: {
				dest: __paths.assetsTarget + '/lib'
				,overwrite: true
				,src: __paths.lib
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
					,optimize: 'uglify2'
					,include: ['../../../tools/node_modules/almond/almond', 'builds/main']
					,mainConfigFile: __paths.scriptsSrc + '/config/main.js'
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
		,'build:dev': [
			'build:css:dev'
			,'build:js:dev'
		]
		,'build:js': [
			'requirejs:require'
		]
		,'build:js:dev': [
			'symlink:devJS'
			,'symlink:libDev'
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

		//-# for test
		,'test:build': [
			'test:views'
			,'build:dev'
			,'build:prod'
		]
		,'test:views': function(){
			var fs = require('fs');
			var swig = require('swig');
			var _data = {
				app: {
					devName: 'Toby Mackenzie'
					,devUrl: 'http://www.tobymackenzie.com'
					,devYears: '2014'
					,environment: 'dev'
				}
				,doc: {
					aside: 'Sit amet lorem nonummy.'
					,charset: 'utf-8'
					,content: 'Lorem ipsum dolor sit amet.  Nonummy.  Nonummy nonummy nonummy.'
					,description: 'This is a test'
					,keywords: 'test,html,boilerplate'
					,lang: 'en'
					,name: 'test'
					,styles: undefined
					,title: 'Test'
				}
				,site: {
					isResponsive: true
					,name: 'Test'
					,nav: [
						{
							name: 'Dev'
							,subNav: [
								{
									name: 'html'
									,url: 'index.dev.html'
								}
								,{
									name: 'json'
									,url: 'index.dev.json'
								}
							]
						}
						,{
							name: 'Prod'
							,subNav: [
								{
									name: 'html'
									,url: 'index.html'
								}
								,{
									name: 'json'
									,url: 'index.json'
								}
							]
						}
						,
					]
					,title: 'Test Site'
				}
			};
			fs.writeFileSync(__paths.webRoot + '/index.dev.html', swig.renderFile(__paths.views + '/skeletons/site.html.twig', _data));
			fs.writeFileSync(__paths.webRoot + '/index.dev.json', swig.renderFile(__paths.views + '/skeletons/site.json.twig', _data));
			_data.app.environment = 'prod';
			fs.writeFileSync(__paths.webRoot + '/index.html', swig.renderFile(__paths.views + '/skeletons/site.html.twig', _data));
			fs.writeFileSync(__paths.webRoot + '/index.json', swig.renderFile(__paths.views + '/skeletons/site.json.twig', _data));
		}
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
