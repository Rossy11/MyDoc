wx-cells
    wx-cells-base(title="{ opts.title }", dataset="{ opts.dataset }")
        .cell(each="{ opts.dataset }", onclick="{ click }", class="{ clickable: click }")
            .text(if="{ typeof text == 'string' }") { text }
            .main
                img(if="{ image }", src="{ image }")
                | { main }

    script(type="text/es6").
        var tag = this;
        tag.on('mount', function () {
            console.log('wx-cells', tag);
        });

    style(scoped).
        .main {
            vertical-align: middle;
            color: #000;
        }

        img {
            vertical-align: middle;
            width: 20px;
            height: 20px;
            margin-right: 5px;
        }

        .text {
            float: right;
            color: #888;
        }

        .clickable .text:after {
            content: " ";
            display: inline-block;
            -webkit-transform: rotate(45deg);
                -ms-transform: rotate(45deg);
                    transform: rotate(45deg);
            height: 6px;
            width: 6px;
            border-width: 2px 2px 0 0;
            border-color: #C8C8CD;
            border-style: solid;
            position: relative;
            top: -1px;
        }
