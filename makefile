./dest/jsonp.js: ./build/event-emitter.js ./build/jsonp.js
	cat ./build/event-emitter.js ./build/jsonp.js > ./dest/jsonp.js
	rm -rf ./build

./build/jsonp.js: ./src/jsonp.js ./build
	./node_modules/.bin/babel ./src/jsonp.js -o ./build/jsonp.js --modules umd --module-id Jsonp

./build/event-emitter.js: ./event-emitter/src/event-emitter.js ./build
	./node_modules/.bin/babel ./event-emitter/src/event-emitter.js -o ./build/event-emitter.js --modules umd --module-id EventEmitter

./dest:
	mkdir ./dest

./build:
	mkdir ./build
