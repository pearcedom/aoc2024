.PRECIOUS: ans/day%.txt input/day%.txt src/day%.js
.PHONY: all day%
days := $(shell seq -f "%02g" $$(date -d "$D" '+%d'))

all: $(addprefix day, $(days))

day%: ans/day%.txt
	@echo "Day $* --------------------------------------------------"
	@cat $<

ans/day%.txt: src/day%.js input/day%.txt | ans/
	docker run -v $(shell pwd):/aoc -w /aoc -it node $< > $@

# for .ses see
# www.reddit.com/r/adventofcode/comments/a2vonl/how_to_download_inputs_with_a_script/
input/day%.txt: | input/ .ses
	curl https://adventofcode.com/2024/day/$$(echo $* | sed s/^0//)/input \
		--cookie "session=$$(cat .ses)" \
		> $@

src/day%.js: | src/
	@echo "#!/usr/bin/env node" > $@
	chmod u+x $@

%/:
	mkdir -p $@

clean:
	rm -rf ans
	rm -rf input
