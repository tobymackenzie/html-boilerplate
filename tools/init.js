#!/usr/bin/env node
//-# requires bower, bundler, node, npm, ruby, rubygems
/* global require */
var CommandRunner = require('./src/CommandRunner');

var commandRunner = new CommandRunner({name: 'init.js'});
commandRunner.run([
	'npm install'
	,'bundle install'
	,'bower install'
]);
