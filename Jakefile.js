var build = require('./build/build.js');

desc('Check IconLabel plugin source for errors with JSHint');
task('lint', build.lint);

desc('Combine and compress IconLabel plugon source files');
task('build', ['lint'], build.build);

task('default', ['build']);
