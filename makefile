./dest/jsonp.js: ./event-emitter/src/event-emitter.js ./dest
	./node_modules/.bin/browserify ./src/jsonp.js -t babelify --outfile ./dest/jsonp.js

./dest:
	mkdir ./dest
