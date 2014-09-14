/* global ENV:true, require, window */
if(typeof ENV === 'undefined'){
	ENV = 'prod';
}

//--shared noop function
var noop = function(){};

//--safe console.log
var clog = (ENV === 'dev')
	? function(){
		//-@ http://www.paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
		//--store logs to an array for reference
		if(!clog.history){
			clog.history = [];
		}
		clog.history.push(arguments);

		//--load firebug lite for non-supporting browsers
		if(!(window.console && window.console.log)){
			require(['https://getfirebug.com/firebug-lite.js'], function(){
				for(var _i = 0; _i < clog.history.length; _i++){
					window.console.log(clog.history[_i]);
				}
			});
		}else{
			window.console.log(Array.prototype.slice.call(arguments));
		}
	}
	: noop
;

//--config
require.config({
	baseUrl: '/_/scripts/src'
	,paths: {
		base: '.'
		,jquery: '../../lib/jquery/dist/jquery'
		,lib: '../../lib'
		,tmclasses: '../../lib/tmclasses/src'
		,tmlib: '../../lib/tmlib'
	}
	// ,shim: {}
});

//--run
require([
	//-# put all app dependencies here
], function(){
	clog('loaded');
});
