#
# npm install -g terser
#

OPTIONS	= -c -m --source-map includeSources,filename
MINJS	= dist/nwdiagram2.min.js

JS = \
	static/site/js/iida.startup.js \
	static/site/js/iida.models.*.js \
	static/site/js/iida.appdata.svg.js \
	static/site/js/iida.appdata.lab_*.js \
	static/site/js/iida.elements.js \
	static/site/js/iida.cy*.js \
	static/site/js/iida.nwdiagram.js

all: $(MINJS)

$(MINJS): $(JS) Makefile
	terser $(OPTIONS) $(JS) -o $(MINJS)
