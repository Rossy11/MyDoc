wx-progress
    .progress
        .bar
            .percent(style="width: { opts.percent * 100 }%")
        .cancel(if="{ opts.oncancel }", onclick="{ opts.oncancel }")

    script(type="text/es6").
        var tag = this;

    style(scoped).
        .progress {
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -webkit-align-items: center;
            -ms-flex-align: center;
            align-items: center;
            padding: 0 15px;
        }

        .cancel {
            margin-left: 15px;
        }

        .cancel:before {
            color: #F43530;
            font-size: 22px;
            font-family: weui;
            content: '\EA0D';
        }

        .bar {
            width: 100%;
            background-color: #EBEBEB;
            height: 3px;
            -webkit-box-flex: 1;
                -webkit-flex: 1;
                    -ms-flex: 1;
                        flex: 1;
        }

        .percent {
            height: 100%;
            background-color: #09BB07;
        }
