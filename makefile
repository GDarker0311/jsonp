./demo/index.js: ./event-emitter/src/event-emitter.js ./demo/index.jsx
	./node_modules/.bin/browserify ./demo/index.jsx -t babelify --outfile ./demo/index.js

./dest:
	mkdir ./dest
