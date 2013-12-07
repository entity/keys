
build: components index.js
	@component-build -dv

components: component.json
	@component-install -dv

clean:
	rm -rf components build

.PHONY: clean
