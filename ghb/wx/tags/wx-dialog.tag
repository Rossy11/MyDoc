wx-dialog
    .mask
        .dialog(class="{ alert: !opts.confirm, confirm: opts.confirm }")
            .main { opts.main }
            .text { opts.text }
            .foot
                .cancel(onclick="{ oncancel }") 取消
                .accept(onclick="{ oncancel }") 确认

    script(type="text/es6").
        var tag = this;

        tag.oncancel = function () {
            tag.unmount(true);
        };

    style(scoped).
        :scope {
            line-height: 1.6em;
        }

        .mask {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            background: rgba(0, 0, 0, 0.6);
        }

        .dialog {
            position: absolute;
            width: 85%;
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-50%, -50%);
                -ms-transform: translate(-50%, -50%);
                    transform: translate(-50%, -50%);
            background: #fafafc;
            text-align: center;
            border-radius: 3px;
        }

        .main {
            padding: 1.2em 0 .5em;
        }

        .text {
            padding: 0 20px;
            font-size: 15px;
            color: #888;
        }

        .foot {
            position: relative;
            line-height: 42px;
            margin-top: 20px;
            font-size: 17px;
        }

        .foot:after {
            content: " ";
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 1px;
            border-top: 1px solid #d5d5d6;
            -webkit-transform-origin: 0 0;
                -ms-transform-origin: 0 0;
                    transform-origin: 0 0;
            -webkit-transform: scaleY(0.5);
                -ms-transform: scaleY(0.5);
                    transform: scaleY(0.5);
        }

        .accept {
            color: #0bb20c;
        }

        .alert .cancel {
            display: none;
        }

        .confirm .cancel {
            float: left;
            width: 50%;
        }

        .confirm .accept {
            margin-left: 50%;
        }
