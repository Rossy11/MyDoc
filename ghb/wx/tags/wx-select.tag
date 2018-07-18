wx-select
    wx-cells-base(title="{ opts.title }", class="{single: !opts.multiple, multiple: opts.multiple}", options="{ opts.options }")
        .cell(each="{ opts.options }", onclick="{ parent.parent.click }", class="clickable {selected: selected }")
            .check
            .main { main }

    script(type="text/es6").
        var tag = this;

        tag.click = function (e) {
            if (tag.opts.multiple) {
                e.item.selected = !e.item.selected;
            } else {
                tag.opts.options.forEach(function (v) {
                    v.selected = false;
                });
                e.item.selected = true;
            }

            if (typeof tag.opts.onchange === 'function') {
                var values = [];
                tag.opts.options.forEach(function (v) {
                    if (v.selected) {
                        values.push(v.value);
                    }
                });
                tag.opts.onchange(values);
            }
        };

    style(scoped).
        .multiple .check {
            float: left;
            font-size: 23px;
            line-height: 23px;
            padding-right: 0.35em;
            vertical-align: top;
        }

        .multiple .check:before {
            content: '\EA01';
            color: #c9c9c9;
            font-family: weui;
        }

        .multiple .selected .check:before {
            content: '\EA06';
            color: #09BB07;
        }

        .single .check {
            float: right;
        }

        .single .selected .check:before {
            content: '\EA08';
            color: #09BB07;
            font-family: weui;
            font-size: 16px;
        }

        .main {
            line-height: 24px;
        }
