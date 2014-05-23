MINIFY = uglifyjs --lint -c -m toplevel=true
LINT = jshint --show-non-errors

.PHONY: all clean

clean:
	rm -f build/ga-social-tracking.min.js

all: build/ga-social-tracking.min.js

lint: src/ga-social-tracking.js
	$(LINT) $<

test:
	$(MAKE) lint
	phantomjs ./tests/runner.js ./tests/tests.html

build/ga-social-tracking.min.js: src/ga-social-tracking.js
	$(MINIFY) < $< > $@
