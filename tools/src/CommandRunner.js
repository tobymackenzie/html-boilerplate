/*
Class: CommandRunner
Run an array of commands
*/
/* global module, require */

var _sys = require('sys');
var childProcess = require('child_process');
var _mergeInto = require('util')._extend;

var CommandRunner = function(_opts, _commands){
	if(typeof _opts === 'object'){
		_mergeInto(this, _opts);
	}
	if(_commands){
		this.run(_commands);
	}
};
_mergeInto(CommandRunner.prototype, {
	getCommandObjectFromString: function(_string){
		var _pieces = _string.split(' ');
		var _command = _pieces.shift();
		var _args = (_pieces.length) ? _pieces.splice(' ') : undefined;
		return {
			command: _command
			,args: _args
		};
	}
	,getFullCommandString: function(_command){
		var _return = _command.command;
		if(_command.args){
			var _args = _command.args;
			_return += ' ' + _args.join(' ');
		}
		return _return;
	}
	,name: 'CommandRunner'
	,print: function(_data){
		_sys.print(_data);
	}
	,run: function(_arg1){
		if(_arg1 instanceof Array){
			return this.runMulti.apply(this, arguments);
		}else{
			return this.runSingle.apply(this, arguments);
		}
	}
	,runMulti: function(_commands, _name, _done){
		var _this = this;
		var _iCommands = -1;
		var _procs = [];
		if(!_name){
			_name = _this.name;
		}
		_this.print('Starting ' + _name + '\n---------------\n');
		var _runNextCommand = function(_code){
			if(!_code){
				++_iCommands;
				if(_commands[_iCommands]){
					_procs.push(_this.runSingle(_commands[_iCommands], _runNextCommand));
				}else{
					_this.print(_name + ' done\n');
					if(typeof _done === 'function'){
						_done();
					}
				}
			}
		};
		_runNextCommand();
		return _procs;
	}
	,runProc: function(){
		return childProcess.spawn.apply(childProcess, arguments);
	}
	,runSingle: function(_command, _close){
		var _this = this;
		if(typeof _command === 'string'){
			_command = _this.getCommandObjectFromString(_command);
		}
		// _mergeInto(_opts, {cwd: process.cwd()});
		var _proc;
		var _commandString = _this.getFullCommandString(_command);
		_this.print('Running `' + _commandString + '`\n');
		_proc = _this.runProc(_command.command, _command.args, _command.opts);
		_proc.stdout.on('data', _this.print);
		_proc.stderr.on('data', _this.print);
		_proc.on('close', function(_code){
			if(_code === 0){
				_this.print('Done running `' + _commandString + '`\n---------------\n');
				if(typeof _command.success === 'function'){
					_command.success();
				}
			}else{
				if(typeof _command.failure === 'function'){
					_command.failure(_code);
				}
				_this.print('Error running `' + _commandString + '`, stopping\n');
			}
			if(typeof _close === 'function'){
				_close(_code);
			}
			if(typeof _command.close === 'function'){
				_command.close(_code);
			}
		});
		return _proc;
	}
});

module.exports = CommandRunner;
