# Google Analytics Social Tracking Helper

Include this on your GA-enabled web property and it should start tracking/logging your visitor's social interactions automatically.

Requires a GA-enabled web property, obviously.

## Demo

Soon (TM). There's a test-suite though, until a demo appears.

## Quickstart

Include the script at the bottom of your HTML pages, ideally before the closing `</body>` tag:

    <script src="some-path/ga-social-tracking.min.js">

## Features

* Supports both `ga.js` and `analytics.js` web properties / APIs
* Facebook social actions: `like`, `unlike`, `send`
* Twitter intent events: `follow`, `tweet`, `retweet`, `favorite`, `click`
* Other social networks depending on feasability/interest (PRs appreciated!)

## Devdocs

* https://developers.google.com/analytics/devguides/collection/gajs/methods/gaJSApiSocialTracking
* https://developers.google.com/analytics/devguides/collection/analyticsjs/social-interactions
* https://dev.twitter.com/docs/tfw/events

## Contributing

Grab the latest code:

    git clone https://github.com/zytzagoo/ga-social-tracking-js.git

Change stuff, run the tests, lint it, file a PR. Have fun.

A Makefile helps you do some of the above things:

```make
    make lint # runs jshint lint checking
    make test # runs the test suite using phantomjs
    make build/ga-social-tracking.min.js # creates the built/minified version
    make # creates the built/minified version
```

You'll need at least `jshint` and `uglifyjs` installed for this.

Pull requests are welcome, as long as they make sense!

Some basic rules:

* automated builds/tests are green
* code is lint-free (no errors, run `make lint`)
* try avoiding external dependencies
* no errors/warnings thrown in recent versions of Chrome, Firefox, Safari, IE(s)...
* no errors/warnings on iOS and Android platforms

## License (MIT)

Copyright (c) 2014 zytzagoo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
