/**
 * Created by Administrator on 2017/6/13 0013.
 */
var baseUrl = "http://180.97.83.70:30990/KV3Activity/";
setData()
function setData() {
    $.ajax({
        url: baseUrl + "queryActivityInfo/",
        type: 'POST',
        async: true,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        timeout: 1000,
        success: function (resp) {
            console.log(resp)
            var data = JSON.parse(resp).info;
            var count = data.length;
            var html = "";
            for (var i = 0; i < count; i++) {
                html += '<tr  onclick="choose(\'' + data[i].activity_id + '\')"><td class="borderLine">' + data[i].activity_id + '</td><td class="borderLine">' + data[i].activity_name + '</td></tr>';
            }
            document.getElementById("tbodyInfo").innerHTML = html;
        },
        error: function (resp) {

        }
    });
}
//进入后台资源管理页面
function choose(id) {
    localStorage.setItem("activity_id", id);
    window.location.href = "../systemResource/uploadRes.html";
}