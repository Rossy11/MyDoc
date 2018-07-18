
riot.tag('wx-button', '<button type="button" __disabled="{ opts.disabled === true || opts.disabled === \'\' }"><yield></yield></button>', 'wx-button, [riot-tag="wx-button"]{ position: relative; display: block; } wx-button button, [riot-tag="wx-button"] button{ display: block; width: 100%; padding: 0; font-size: 18px; text-align: center; line-height: 2.33333333; border-radius: 5px; color: #454545; background: #F7F7F7; overflow: hidden; border: none; } wx-button button:after, [riot-tag="wx-button"] button:after{ position: absolute; top: 0; left: 0; width: 200%; height: 200%; content: " "; box-sizing: border-box; border-radius: 10px; border: 1px solid rgba(0,0,0,0.2); -webkit-transform: scale(0.5); -ms-transform: scale(0.5); transform: scale(0.5); -webkit-transform-origin: 0 0; -ms-transform-origin: 0 0; transform-origin: 0 0; } wx-button button:active, [riot-tag="wx-button"] button:active{ color: #A1A1A1; background-color: #DEDEDE; } wx-button button:disabled, [riot-tag="wx-button"] button:disabled{ color: #c9c9c9; } wx-button.wx-primary > button, [riot-tag="wx-button"].wx-primary > button{ color: #fff; background: #04be02; } wx-button.wx-primary > button:active, [riot-tag="wx-button"].wx-primary > button:active{ color: rgba(255, 255, 255, 0.4); background-color: #039702; } wx-button.wx-primary > button:disabled, [riot-tag="wx-button"].wx-primary > button:disabled{ color: rgba(255, 255, 255, 0.6); } wx-button.wx-danger > button, [riot-tag="wx-button"].wx-danger > button{ color: #fff; background-color: #EF4F4F;; } wx-button.wx-danger > button:active, [riot-tag="wx-button"].wx-danger > button:active{ color: rgba(255, 255, 255, 0.4); background-color: #C13E3E; } wx-button.wx-danger > button:disabled, [riot-tag="wx-button"].wx-danger > button:disabled{ color: rgba(255, 255, 255, 0.6); } wx-button button:focus, [riot-tag="wx-button"] button:focus{ outline: none; }', function(opts) {
});

riot.tag('wx-cells-base', '<div if="{ typeof opts.title == \'string\' }" class="title">{ opts.title }</div> <div class="cells"><yield></yield></div>', 'wx-cells-base .title, [riot-tag="wx-cells-base"] .title{ margin-top: .77em; margin-bottom: .3em; padding-left: 15px; padding-right: 15px; color: #888; font-size: 14px; } wx-cells-base .cells, [riot-tag="wx-cells-base"] .cells{ margin-top: 1.17647059em; background-color: #FFFFFF; line-height: 1.41176471; font-size: 17px; overflow: hidden; position: relative; } wx-cells-base .cells:before, [riot-tag="wx-cells-base"] .cells:before{ content: " "; position: absolute; left: 0; top: 0; width: 100%; height: 1px; border-top: 1px solid #D9D9D9; transform-origin: 0 0; transform: scaleY(0.5); } wx-cells-base .cells:after, [riot-tag="wx-cells-base"] .cells:after{ content: " "; position: absolute; left: 0; bottom: 0; width: 100%; height: 1px; border-bottom: 1px solid #D9D9D9; transform-origin: 0 100%; transform: scaleY(0.5); } wx-cells-base .title + .cells, [riot-tag="wx-cells-base"] .title + .cells{ margin-top: 0; } wx-cells-base .cell, [riot-tag="wx-cells-base"] .cell{ position: relative; padding: 10px 15px; } wx-cells-base .cell.clickable:active, [riot-tag="wx-cells-base"] .cell.clickable:active{ background-color: #ECECEC; } wx-cells-base .cell + .cell:before, [riot-tag="wx-cells-base"] .cell + .cell:before{ content: " "; position: absolute; left: 0; top: 0; width: 100%; height: 1px; border-top: 1px solid #D9D9D9; transform-origin: 0 0; transform: scaleY(0.5); left: 15px; }', function(opts) {
});

riot.tag('wx-cells', '<wx-cells-base title="{ opts.title }" dataset="{ opts.dataset }"> <div each="{ opts.dataset }" onclick="{ click }" class="cell { clickable: click }"> <div if="{ typeof text == \'string\' }" class="text">{ text }</div> <div class="main"><img if="{ image }" riot-src="{ image }">{ main }</div> </div> </wx-cells-base>', 'wx-cells .main, [riot-tag="wx-cells"] .main{ vertical-align: middle; color: #000; } wx-cells img, [riot-tag="wx-cells"] img{ vertical-align: middle; width: 20px; height: 20px; margin-right: 5px; } wx-cells .text, [riot-tag="wx-cells"] .text{ float: right; color: #888; } wx-cells .clickable .text:after, [riot-tag="wx-cells"] .clickable .text:after{ content: " "; display: inline-block; -webkit-transform: rotate(45deg); -ms-transform: rotate(45deg); transform: rotate(45deg); height: 6px; width: 6px; border-width: 2px 2px 0 0; border-color: #C8C8CD; border-style: solid; position: relative; top: -1px; }', function(opts) {
var tag = this;
tag.on('mount', function () {
    console.log('wx-cells', tag);
});
});

riot.tag('wx-dialog', '<div class="mask"> <div class="dialog { alert: !opts.confirm, confirm: opts.confirm }"> <div class="main">{ opts.main }</div> <div class="text">{ opts.text }</div> <div class="foot"> <div onclick="{ oncancel }" class="cancel">取消</div> <div onclick="{ oncancel }" class="accept">确认</div> </div> </div> </div>', 'wx-dialog, [riot-tag="wx-dialog"]{ line-height: 1.6em; } wx-dialog .mask, [riot-tag="wx-dialog"] .mask{ position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; background: rgba(0, 0, 0, 0.6); } wx-dialog .dialog, [riot-tag="wx-dialog"] .dialog{ position: absolute; width: 85%; top: 50%; left: 50%; -webkit-transform: translate(-50%, -50%); -ms-transform: translate(-50%, -50%); transform: translate(-50%, -50%); background: #fafafc; text-align: center; border-radius: 3px; } wx-dialog .main, [riot-tag="wx-dialog"] .main{ padding: 1.2em 0 .5em; } wx-dialog .text, [riot-tag="wx-dialog"] .text{ padding: 0 20px; font-size: 15px; color: #888; } wx-dialog .foot, [riot-tag="wx-dialog"] .foot{ position: relative; line-height: 42px; margin-top: 20px; font-size: 17px; } wx-dialog .foot:after, [riot-tag="wx-dialog"] .foot:after{ content: " "; position: absolute; left: 0; top: 0; width: 100%; height: 1px; border-top: 1px solid #d5d5d6; -webkit-transform-origin: 0 0; -ms-transform-origin: 0 0; transform-origin: 0 0; -webkit-transform: scaleY(0.5); -ms-transform: scaleY(0.5); transform: scaleY(0.5); } wx-dialog .accept, [riot-tag="wx-dialog"] .accept{ color: #0bb20c; } wx-dialog .alert .cancel, [riot-tag="wx-dialog"] .alert .cancel{ display: none; } wx-dialog .confirm .cancel, [riot-tag="wx-dialog"] .confirm .cancel{ float: left; width: 50%; } wx-dialog .confirm .accept, [riot-tag="wx-dialog"] .confirm .accept{ margin-left: 50%; }', function(opts) {
var tag = this;

tag.oncancel = function () {
    tag.unmount(true);
};
});

riot.tag('wx-progress', '<div class="progress"> <div class="bar"> <div riot-style="width: { opts.percent * 100 }%" class="percent"></div> </div> <div if="{ opts.oncancel }" onclick="{ opts.oncancel }" class="cancel"></div> </div>', 'wx-progress .progress, [riot-tag="wx-progress"] .progress{ display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center; padding: 0 15px; } wx-progress .cancel, [riot-tag="wx-progress"] .cancel{ margin-left: 15px; } wx-progress .cancel:before, [riot-tag="wx-progress"] .cancel:before{ color: #F43530; font-size: 22px; font-family: weui; content: \'\\EA0D\'; } wx-progress .bar, [riot-tag="wx-progress"] .bar{ width: 100%; background-color: #EBEBEB; height: 3px; -webkit-box-flex: 1; -webkit-flex: 1; -ms-flex: 1; flex: 1; } wx-progress .percent, [riot-tag="wx-progress"] .percent{ height: 100%; background-color: #09BB07; }', function(opts) {
var tag = this;
});

riot.tag('wx-select', '<wx-cells-base title="{ opts.title }" options="{ opts.options }" class="{single: !opts.multiple, multiple: opts.multiple}"> <div each="{ opts.options }" onclick="{ parent.parent.click }" class="cell clickable {selected: selected }"> <div class="check"></div> <div class="main">{ main }</div> </div> </wx-cells-base>', 'wx-select .multiple .check, [riot-tag="wx-select"] .multiple .check{ float: left; font-size: 23px; line-height: 23px; padding-right: 0.35em; vertical-align: top; } wx-select .multiple .check:before, [riot-tag="wx-select"] .multiple .check:before{ content: \'\\EA01\'; color: #c9c9c9; font-family: weui; } wx-select .multiple .selected .check:before, [riot-tag="wx-select"] .multiple .selected .check:before{ content: \'\\EA06\'; color: #09BB07; } wx-select .single .check, [riot-tag="wx-select"] .single .check{ float: right; } wx-select .single .selected .check:before, [riot-tag="wx-select"] .single .selected .check:before{ content: \'\\EA08\'; color: #09BB07; font-family: weui; font-size: 16px; } wx-select .main, [riot-tag="wx-select"] .main{ line-height: 24px; }', function(opts) {
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
});

riot.tag('wx-toast', '<div class="mask"> <div class="toast"> <div class="sign { opts.sign }"> <div class="loading-leaf loading-leaf-0"></div> <div class="loading-leaf loading-leaf-1"></div> <div class="loading-leaf loading-leaf-2"></div> <div class="loading-leaf loading-leaf-3"></div> <div class="loading-leaf loading-leaf-4"></div> <div class="loading-leaf loading-leaf-5"></div> <div class="loading-leaf loading-leaf-6"></div> <div class="loading-leaf loading-leaf-7"></div> <div class="loading-leaf loading-leaf-8"></div> <div class="loading-leaf loading-leaf-9"></div> <div class="loading-leaf loading-leaf-10"></div> <div class="loading-leaf loading-leaf-11"></div> </div> <div class="main">{ opts.main }</div> </div> </div>', 'wx-toast .mask, [riot-tag="wx-toast"] .mask{ position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; } wx-toast .toast, [riot-tag="wx-toast"] .toast{ position: absolute; width: 7.6em; min-height: 7.6em; top: 180px; left: 50%; margin-left: -3.8em; background: rgba(40, 40, 40, 0.75); text-align: center; border-radius: 5px; color: #fff; } wx-toast .sign.done, [riot-tag="wx-toast"] .sign.done{ margin: 22px 0 0; display: block; } wx-toast .sign.done:before, [riot-tag="wx-toast"] .sign.done:before{ content: \'\\EA08\'; color: #fff; font-size: 55px; font-family: weui; } wx-toast .main, [riot-tag="wx-toast"] .main{ margin: 0 0 15px; } wx-toast .loading + .main, [riot-tag="wx-toast"] .loading + .main{ margin-top: 64%; font-size: 14px; } wx-toast .sign.loading, [riot-tag="wx-toast"] .sign.loading{ position: absolute; width: 0px; left: 50%; top: 38%; } wx-toast .sign.loading .loading-leaf, [riot-tag="wx-toast"] .sign.loading .loading-leaf{ position: absolute; top: -1px; opacity: 0.25; } wx-toast .sign.loading .loading-leaf:before, [riot-tag="wx-toast"] .sign.loading .loading-leaf:before{ content: " "; position: absolute; width: 8.14px; height: 3.08px; background: #d1d1d5; box-shadow: rgba(0, 0, 0, 0.0980392) 0 0 1px; border-radius: 1px; -webkit-transform-origin: left 50% 0; -ms-transform-origin: left 50% 0; transform-origin: left 50% 0; } wx-toast .loading-leaf-0, [riot-tag="wx-toast"] .loading-leaf-0{ -webkit-animation: opacity-60-25-0-12 1.25s linear infinite; -ms-animation: opacity-60-25-0-12 1.25s linear infinite; animation: opacity-60-25-0-12 1.25s linear infinite; } wx-toast .loading-leaf-1, [riot-tag="wx-toast"] .loading-leaf-1{ -webkit-animation: opacity-60-25-1-12 1.25s linear infinite; -ms-animation: opacity-60-25-1-12 1.25s linear infinite; animation: opacity-60-25-1-12 1.25s linear infinite; } wx-toast .loading-leaf-2, [riot-tag="wx-toast"] .loading-leaf-2{ -webkit-animation: opacity-60-25-2-12 1.25s linear infinite; -ms-animation: opacity-60-25-2-12 1.25s linear infinite; animation: opacity-60-25-2-12 1.25s linear infinite; } wx-toast .loading-leaf-3, [riot-tag="wx-toast"] .loading-leaf-3{ -webkit-animation: opacity-60-25-3-12 1.25s linear infinite; -ms-animation: opacity-60-25-3-12 1.25s linear infinite; animation: opacity-60-25-3-12 1.25s linear infinite; } wx-toast .loading-leaf-4, [riot-tag="wx-toast"] .loading-leaf-4{ -webkit-animation: opacity-60-25-4-12 1.25s linear infinite; -ms-animation: opacity-60-25-4-12 1.25s linear infinite; animation: opacity-60-25-4-12 1.25s linear infinite; } wx-toast .loading-leaf-5, [riot-tag="wx-toast"] .loading-leaf-5{ -webkit-animation: opacity-60-25-5-12 1.25s linear infinite; -ms-animation: opacity-60-25-5-12 1.25s linear infinite; animation: opacity-60-25-5-12 1.25s linear infinite; } wx-toast .loading-leaf-6, [riot-tag="wx-toast"] .loading-leaf-6{ -webkit-animation: opacity-60-25-6-12 1.25s linear infinite; -ms-animation: opacity-60-25-6-12 1.25s linear infinite; animation: opacity-60-25-6-12 1.25s linear infinite; } wx-toast .loading-leaf-7, [riot-tag="wx-toast"] .loading-leaf-7{ -webkit-animation: opacity-60-25-7-12 1.25s linear infinite; -ms-animation: opacity-60-25-7-12 1.25s linear infinite; animation: opacity-60-25-7-12 1.25s linear infinite; } wx-toast .loading-leaf-8, [riot-tag="wx-toast"] .loading-leaf-8{ -webkit-animation: opacity-60-25-8-12 1.25s linear infinite; -ms-animation: opacity-60-25-8-12 1.25s linear infinite; animation: opacity-60-25-8-12 1.25s linear infinite; } wx-toast .loading-leaf-9, [riot-tag="wx-toast"] .loading-leaf-9{ -webkit-animation: opacity-60-25-9-12 1.25s linear infinite; -ms-animation: opacity-60-25-9-12 1.25s linear infinite; animation: opacity-60-25-9-12 1.25s linear infinite; } wx-toast .loading-leaf-10, [riot-tag="wx-toast"] .loading-leaf-10{ -webkit-animation: opacity-60-25-10-12 1.25s linear infinite; -ms-animation: opacity-60-25-10-12 1.25s linear infinite; animation: opacity-60-25-10-12 1.25s linear infinite; } wx-toast .loading-leaf-11, [riot-tag="wx-toast"] .loading-leaf-11{ -webkit-animation: opacity-60-25-11-12 1.25s linear infinite; -ms-animation: opacity-60-25-11-12 1.25s linear infinite; animation: opacity-60-25-11-12 1.25s linear infinite; } wx-toast .loading-leaf-0:before, [riot-tag="wx-toast"] .loading-leaf-0:before{ -webkit-transform: rotate(0deg) translate(7.92px, 0px); -ms-transform: rotate(0deg) translate(7.92px, 0px); transform: rotate(0deg) translate(7.92px, 0px); } wx-toast .loading-leaf-1:before, [riot-tag="wx-toast"] .loading-leaf-1:before{ -webkit-transform: rotate(30deg) translate(7.92px, 0px); -ms-transform: rotate(30deg) translate(7.92px, 0px); transform: rotate(30deg) translate(7.92px, 0px); } wx-toast .loading-leaf-2:before, [riot-tag="wx-toast"] .loading-leaf-2:before{ -webkit-transform: rotate(60deg) translate(7.92px, 0px); -ms-transform: rotate(60deg) translate(7.92px, 0px); transform: rotate(60deg) translate(7.92px, 0px); } wx-toast .loading-leaf-3:before, [riot-tag="wx-toast"] .loading-leaf-3:before{ -webkit-transform: rotate(90deg) translate(7.92px, 0px); -ms-transform: rotate(90deg) translate(7.92px, 0px); transform: rotate(90deg) translate(7.92px, 0px); } wx-toast .loading-leaf-4:before, [riot-tag="wx-toast"] .loading-leaf-4:before{ -webkit-transform: rotate(120deg) translate(7.92px, 0px); -ms-transform: rotate(120deg) translate(7.92px, 0px); transform: rotate(120deg) translate(7.92px, 0px); } wx-toast .loading-leaf-5:before, [riot-tag="wx-toast"] .loading-leaf-5:before{ -webkit-transform: rotate(150deg) translate(7.92px, 0px); -ms-transform: rotate(150deg) translate(7.92px, 0px); transform: rotate(150deg) translate(7.92px, 0px); } wx-toast .loading-leaf-6:before, [riot-tag="wx-toast"] .loading-leaf-6:before{ -webkit-transform: rotate(180deg) translate(7.92px, 0px); -ms-transform: rotate(180deg) translate(7.92px, 0px); transform: rotate(180deg) translate(7.92px, 0px); } wx-toast .loading-leaf-7:before, [riot-tag="wx-toast"] .loading-leaf-7:before{ -webkit-transform: rotate(210deg) translate(7.92px, 0px); -ms-transform: rotate(210deg) translate(7.92px, 0px); transform: rotate(210deg) translate(7.92px, 0px); } wx-toast .loading-leaf-8:before, [riot-tag="wx-toast"] .loading-leaf-8:before{ -webkit-transform: rotate(240deg) translate(7.92px, 0px); -ms-transform: rotate(240deg) translate(7.92px, 0px); transform: rotate(240deg) translate(7.92px, 0px); } wx-toast .loading-leaf-9:before, [riot-tag="wx-toast"] .loading-leaf-9:before{ -webkit-transform: rotate(270deg) translate(7.92px, 0px); -ms-transform: rotate(270deg) translate(7.92px, 0px); transform: rotate(270deg) translate(7.92px, 0px); } wx-toast .loading-leaf-10:before, [riot-tag="wx-toast"] .loading-leaf-10:before{ -webkit-transform: rotate(300deg) translate(7.92px, 0px); -ms-transform: rotate(300deg) translate(7.92px, 0px); transform: rotate(300deg) translate(7.92px, 0px); } wx-toast .loading-leaf-11:before, [riot-tag="wx-toast"] .loading-leaf-11:before{ -webkit-transform: rotate(330deg) translate(7.92px, 0px); -ms-transform: rotate(330deg) translate(7.92px, 0px); transform: rotate(330deg) translate(7.92px, 0px); } @-webkit-keyframes opacity-60-25-0-12{ 0%{ opacity: 0.25; } 0.01%{ opacity: 0.25; } 0.02%{ opacity: 1; } 60.01%{ opacity: 0.25; } 100%{ opacity: 0.25; } } @-webkit-keyframes opacity-60-25-1-12{ 0%{ opacity: 0.25; } 8.34333%{ opacity: 0.25; } 8.35333%{ opacity: 1; } 68.3433%{ opacity: 0.25; } 100%{ opacity: 0.25; } } @-webkit-keyframes opacity-60-25-2-12{ 0%{ opacity: 0.25; } 16.6767%{ opacity: 0.25; } 16.6867%{ opacity: 1; } 76.6767%{ opacity: 0.25; } 100%{ opacity: 0.25; } } @-webkit-keyframes opacity-60-25-3-12{ 0%{ opacity: 0.25; } 25.01%{ opacity: 0.25; } 25.02%{ opacity: 1; } 85.01%{ opacity: 0.25; } 100%{ opacity: 0.25; } } @-webkit-keyframes opacity-60-25-4-12{ 0%{ opacity: 0.25; } 33.3433%{ opacity: 0.25; } 33.3533%{ opacity: 1; } 93.3433%{ opacity: 0.25; } 100%{ opacity: 0.25; } } @-webkit-keyframes opacity-60-25-5-12{ 0%{ opacity: 0.270958333333333; } 41.6767%{ opacity: 0.25; } 41.6867%{ opacity: 1; } 1.67667%{ opacity: 0.25; } 100%{ opacity: 0.270958333333333; } } @-webkit-keyframes opacity-60-25-6-12{ 0%{ opacity: 0.375125; } 50.01%{ opacity: 0.25; } 50.02%{ opacity: 1; } 10.01%{ opacity: 0.25; } 100%{ opacity: 0.375125; } } @-webkit-keyframes opacity-60-25-7-12{ 0%{ opacity: 0.479291666666667; } 58.3433%{ opacity: 0.25; } 58.3533%{ opacity: 1; } 18.3433%{ opacity: 0.25; } 100%{ opacity: 0.479291666666667; } } @-webkit-keyframes opacity-60-25-8-12{ 0%{ opacity: 0.583458333333333; } 66.6767%{ opacity: 0.25; } 66.6867%{ opacity: 1; } 26.6767%{ opacity: 0.25; } 100%{ opacity: 0.583458333333333; } } @-webkit-keyframes opacity-60-25-9-12{ 0%{ opacity: 0.687625; } 75.01%{ opacity: 0.25; } 75.02%{ opacity: 1; } 35.01%{ opacity: 0.25; } 100%{ opacity: 0.687625; } } @-webkit-keyframes opacity-60-25-10-12{ 0%{ opacity: 0.791791666666667; } 83.3433%{ opacity: 0.25; } 83.3533%{ opacity: 1; } 43.3433%{ opacity: 0.25; } 100%{ opacity: 0.791791666666667; } } @-webkit-keyframes opacity-60-25-11-12{ 0%{ opacity: 0.895958333333333; } 91.6767%{ opacity: 0.25; } 91.6867%{ opacity: 1; } 51.6767%{ opacity: 0.25; } 100%{ opacity: 0.895958333333333; } }', function(opts) {
var tag = this;

tag.on('update', function () {
    tag.opts.sign = tag.opts.sign || 'done';
});

tag.on('mount', function () {
    setTimeout(function () {
        tag.unmount(true);
    }, tag.opts.timeout);
});
});