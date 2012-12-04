# {%= full_name %}

{%= description %}

## Getting Started
Install `{%= full_name %}` globally and call it from the shell
```shell
sudo npm install -g {%= full_name %}
{%= full_name %}
```

The `{%= template_name %}` template should be added to your grunt userDir (`~/.grunt` for Linux or `%USERPROFILE%` for Windows).

You can now call `grunt init:{%= template_name %}` and the init prompt will start.

### Manual Install
Clone the repository, enter the directory, and run `grunt` to install `{%= full_name %}`.
```shell
git clone {%= repository %} {%= full_name %}
cd {%= full_name %}
grunt
```

[grunt]: http://gruntjs.com/
[getting_started]: https://github.com/gruntjs/grunt/blob/master/docs/getting_started.md

## Documentation
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint your code using [grunt][grunt] and test via `npm test`.

## Release History
_(Nothing yet)_

## License
Copyright (c) {%= grunt.template.today('yyyy') %} {%= author_name %}
Licensed under the {%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}.
