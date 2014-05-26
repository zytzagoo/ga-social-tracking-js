MINIFY = uglifyjs --lint -c -m toplevel=true
LINT = jshint --show-non-errors

GIT_VERSION := $(shell git describe --abbrev=6 --dirty --always)
BANNER = /*! ga-social-tracking-js; build: $(GIT_VERSION); http://zytzagoo.github.io/ga-social-tracking-js/ */

.PHONY: all clean

all: build/ga-social-tracking.min.js

clean:
	rm -f build/ga-social-tracking.min.js

lint: src/ga-social-tracking.js
	$(LINT) $<

test:
	$(MAKE) lint
	phantomjs ./tests/runner.js ./tests/tests.html

build/ga-social-tracking.min.js: src/ga-social-tracking.js
	echo $(BANNER) > $@
	$(MINIFY) < $< >> $@
