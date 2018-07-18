wx-cells-base
    .title(if="{ typeof opts.title == 'string' }") { opts.title }
    .cells
        <yield/>

    script(type="text/es6").

    style(scoped).
        .title {
            margin-top: .77em;
            margin-bottom: .3em;
            padding-left: 15px;
            padding-right: 15px;
            color: #888;
            font-size: 14px;
        }

        .cells {
            margin-top: 1.17647059em;
            background-color: #FFFFFF;
            line-height: 1.41176471;
            font-size: 17px;
            overflow: hidden;
            position: relative;
        }

        .cells:before {
            content: " ";
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 1px;
            border-top: 1px solid #D9D9D9;
            transform-origin: 0 0;
            transform: scaleY(0.5);
        }

        .cells:after {
            content: " ";
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 1px;
            border-bottom: 1px solid #D9D9D9;
            transform-origin: 0 100%;
            transform: scaleY(0.5);
        }

        .title + .cells {
            margin-top: 0;
        }

        .cell {
            position: relative;
            padding: 10px 15px;
        }

        .cell.clickable:active {
            background-color: #ECECEC;
        }

        .cell + .cell:before {
            content: " ";
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 1px;
            border-top: 1px solid #D9D9D9;
            transform-origin: 0 0;
            transform: scaleY(0.5);
            left: 15px;
        }

