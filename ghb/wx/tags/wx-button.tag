wx-button
    button(type="button", disabled="{ opts.disabled === true || opts.disabled === '' }")
        <yield/>

    script(type="text/es6").

    style(scoped).
        :scope {
            position: relative;
            display: block;
        }

        button {
            display: block;
            width: 100%;
            padding: 0;
            font-size: 18px;
            text-align: center;
            line-height: 2.33333333;
            border-radius: 5px;
            color: #454545;
            background: #F7F7F7;
            overflow: hidden;
            border: none;
        }

        button:after {
            position: absolute;
            top: 0;
            left: 0;
            width: 200%;
            height: 200%;
            content: " ";
            box-sizing: border-box;
            border-radius: 10px;
            border: 1px solid rgba(0,0,0,0.2);
            -webkit-transform: scale(0.5);
                -ms-transform: scale(0.5);
                    transform: scale(0.5);
            -webkit-transform-origin: 0 0;
                -ms-transform-origin: 0 0;
                    transform-origin: 0 0;
        }

        button:active {
            color: #A1A1A1;
            background-color: #DEDEDE;
        }

        button:disabled {
            color: #c9c9c9;
        }

        :scope.wx-primary > button {
            color: #fff;
            background: #04be02;
        }

        :scope.wx-primary > button:active {
            color: rgba(255, 255, 255, 0.4);
            background-color: #039702;
        }

        :scope.wx-primary > button:disabled {
            color: rgba(255, 255, 255, 0.6);
        }

        :scope.wx-danger > button {
            color: #fff;
            background-color: #EF4F4F;;
        }

        :scope.wx-danger > button:active {
            color: rgba(255, 255, 255, 0.4);
            background-color: #C13E3E;
        }

        :scope.wx-danger > button:disabled {
            color: rgba(255, 255, 255, 0.6);
        }

        button:focus {
            outline: none;
        }
