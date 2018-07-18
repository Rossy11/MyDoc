/**
 * Created by Administrator on 2017/6/13 0013.
 */
var baseUrl = "http://180.97.83.70:30990/KV3Activity/";
setData();
var txt = "";
var nameList = [];
var data_id = "";
var dataList = [];
var signHover = false;//点击图片时，访问的效果禁止掉
var edit = false;//当前是否为编辑状态
var index = -1;//存储当前点击id
//表格行添加元素事件
function setData() {
    setHeight();
    $.ajax({
        url: baseUrl + "queryActivityInfo/",
        type: 'POST',
        async: true,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        timeout: 1000,
        success: function (resp) {
            // console.log(JSON.parse(resp).info);
            var data = JSON.parse(resp).info;
            var count = data.length;
            var html = "";
            for (var i = 0; i < count; i++) {
                // console.log(JSON.parse(resp).info[i].AREA);
                txt = data[i].activity_name;
                data_id = data[i].activity_id;
                html += '<tr id="trhover' + i + '" onmouseover="trHover(\'' + i + '\')" onmouseout="trHoverout(\'' + i + '\')"><td class="borderLine" onclick="choose(\'' + data[i].activity_id + '\')">' + data[i].activity_id +
                    '</td><td class="borderLine getfouce"  onclick="choose(\'' + data[i].activity_id + '\')">' +
                    '<input id="editInput' + i + '" readonly onclick="showName()" type="text" style="" class="xiugai" value="' + txt + '"/>'
                    + '</td><td class="borderLine">' +
                    '<img src="edit1.png" id="editImg' + i + '" onmouseover="changImg(\'' + i + '\')" onmouseout="changImg1(\'' + i + '\')" onclick="eidtName(\'' + i + '\')"  class="editts" style="diaplay:block;text-align:left;widht:25px;height:25px;position:absolute;right: 500%;cursor: pointer;"> '
                    + '</td>' + '<td class="borderLine" onclick="choose(\'' + data[i].activity_id + '\')">' + data[i].AREA + '</td></tr>';
                nameList.push(txt);
                dataList.push(data_id);
            }
            document.getElementById("tbodyInfo").innerHTML = html;
        },
        error: function (resp) {

        }
    });
}

//显示名字
function showName() {
    event.stopPropagation();
    console.log(event);
}

//鼠标移动到表格上，背景变颜色
function trHover(i) {
    $("#trhover" + i).css("background", "#e9e9e9");
}
function trHoverout(i) {
    $("#trhover" + i).css("background", "");
}

//鼠标经过的时候更换照片
function changImg(i) {
    if (!signHover && index == i) {
        $("#editImg" + i).attr("src", "edit2.png");
    } else if (signHover && index == i) {

    } else {
        $("#editImg" + i).attr("src", "edit2.png");
    }
}

//鼠标离开的时候更换回原来的照片
function changImg1(i) {
    if (!signHover && index == i) {
        $("#editImg" + i).attr("src", "edit1.png");
    } else if (signHover && index == i) {

    } else {
        $("#editImg" + i).attr("src", "edit1.png");
    }
}

//点击获取焦点 修改内容并提交
function eidtName(i) {
    event.stopPropagation();
    if (index == i||index==-1) {
        signHover = !signHover;
        edit = !edit;
        if (edit) {
            $("#editImg" + i).attr("src", "submit_edit.png");//图片改变
            $("#editInput" + i).removeAttr("readonly");//添加是否可编辑属性，true可编辑
            $("#editInput" + i).val(txt);//文字加入到文本框
            var txts = $("#editInput" + i).text();//保存文字

            $("#editInput" + i).val(nameList[i]).focus();//获取光标
        } else {
            var texts = $("#editInput" + i).val();
            $("#editImg" + i).attr("src", "edit1.png");
            $("#editInput" + i).blur();
            $("#editInput" + i).attr("readonly", "false");//失去焦点的时候不可编辑
            data_id = dataList[i];
            // alert(texts)
            if (texts == "") {
                $(".title").append('<img class="img_apply" src="failllll.png">');
                setTimeout(function () {
                    $(".img_apply").hide()
                }, 3000);
                $("#editInput" + i).val(nameList[i]);

            } else {
                $.ajax({
                    type: "POST",
                    url: "http://180.97.83.70:30990/KV3Activity/updateActivityName/",
                    async: true,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    dataType: "json",
                    data: {
                        activity_id: data_id,
                        activity_name: texts
                    },
                    success: function (resp) {
                        // console.log(data_id);
                        // console.log("11111")
                        // console.log(resp)
                        $(".title").append('<img class="img_apply" src="sucssss.png">');
                        setTimeout(function () {
                            $(".img_apply").hide()
                        }, 3000);
                    },
                    error: function (resp) {
                        $(".title").append('<img class="img_apply" src="failllll.png">');
                        setTimeout(function () {
                            $(".img_apply").hide()
                        }, 3000);
                    }
                });
            }
        }
    } else {
        $("#editImg" + index).attr("src", "edit1.png");
        $("#editInput" + index).val(nameList[index]);
        edit = true;
        signHover = true;
        $("#editImg" + i).attr("src", "submit_edit.png");//图片改变
        $("#editInput" + i).removeAttr("readonly");//添加是否可编辑属性，true可编辑
        $("#editInput" + i).val(txt);//文字加入到文本框
        var txts = $("#editInput" + i).text();//保存文字
        $("#editInput" + i).val(nameList[i]).focus();//获取光标
    }
    index = i;
}

//进入后台资源管理页面
function choose(id) {
    event.stopPropagation();
    localStorage.setItem("activity_id", id);
    window.location.href = "/static/uploadRes.html";
}


//获取body的高度
function setHeight() {
    var height = document.body.scrollHeight;//网页正文全文高度
    $("#body").height(height);
    // console.log(height);
}
//窗口发生变化时在调用获取body高度的函数
window.onresize = function () {
    setHeight();
};


//当编辑里填入值并未提交时，点击其他区域，编辑框中的内容恢复成以前的内容，并且提交图标改变成编辑之前的图标样式
function clickArea() {
    console.log(111)
    $("#editImg" + index).attr("src", "edit1.png");
    $("#editInput" + index).val(nameList[index]);

}
