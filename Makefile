dist:
	babel --plugins kneden src --out-dir dist

test:
	npm test

install:
	npm install


.PHONY: test build dist