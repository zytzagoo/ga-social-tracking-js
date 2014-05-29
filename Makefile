MINIFY = uglifyjs --lint -c -m toplevel=true
LINT = jshint --show-non-errors

GIT_VERSION := $(shell git describe --abbrev=6 --dirty --always)
BANNER = /*! ga-social-tracking-js; build: $(GIT_VERSION); http://zytzagoo.github.io/ga-social-tracking-js/ */

DIST_WP := "dist/wp-ga-social-tracking-js/"
# only removes quotes from begin/end: http://stackoverflow.com/a/10434751
DIST_WP_NQ := $(patsubst "%",%,$(DIST_WP))

.PHONY: all clean wp-plugin

all: dist/ga-social-tracking.min.js

clean:
	rm -rf dist/*

lint: src/ga-social-tracking.js
	$(LINT) $<

test:
	$(MAKE) lint
	phantomjs ./tests/runner.js ./tests/tests.html

dist/ga-social-tracking.min.js: src/ga-social-tracking.js
	echo $(BANNER) > $@
	$(MINIFY) < $< >> $@

wp-plugin: dist/ga-social-tracking.min.js src/wp-ga-social-tracking-js.php
	-mkdir $(DIST_WP) 2>/dev/null
	cp -f src/wp-ga-social-tracking-js.php dist/ga-social-tracking.min.js $(DIST_WP_NQ)
	cd dist && zip -9r wp-ga-social-tracking-js.zip wp-ga-social-tracking-js && cd ..
