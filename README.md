# grunt-init-init

Create a grunt template from any grunt template

Attribution to [grunt-less](https://github.com/jharding/grunt-less) for file structure.

## Getting Started
Install `grunt-init-init` globally and call it from the shell
```shell
sudo npm install -g grunt-init-init
grunt-init-init
```

The `init` template should be added to your [grunt userDir][grunt_userdir] (`~/.grunt` for Linux or `%USERPROFILE%` for Windows).

You can now call `grunt init:init` and the init prompt will start.

### Manual Install
Clone the repository, enter the directory, and run `grunt` to install `grunt-init-gruntplugin2`.
```shell
git clone git://github.com/twolfson/grunt-init-init.git
cd grunt-init-init
grunt
```

[grunt]: http://gruntjs.com/
[getting_started]: https://github.com/gruntjs/grunt/blob/master/docs/getting_started.md
[grunt_userdir]: https://github.com/gruntjs/grunt/blob/master/docs/api_file.md
[grunt_templates]: https://github.com/gruntjs/grunt/blob/master/docs/task_init.md#built-in-templates
[grunt_init]: https://github.com/gruntjs/grunt/blob/master/docs/task_init.md

## Documentation
`grunt-init-init` reads in both from templates within your [grunt userDir][grunt_userdir] as well as the default [grunt templates][grunt_templates] as well.

Further info about the `init` task can be found within [grunt documentation][grunt_init].

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint your code using [grunt][grunt] and test via `npm test`.

## License
Copyright (c) 2012 Todd Wolfson
Licensed under the MIT license.
