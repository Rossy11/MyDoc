/**
 * Created by Administrator on 2017/6/13 0013.
 */
setData();
function setData() {
    var shark = localStorage.getItem("shark");
    var hot = localStorage.getItem("hot");
    console.log(shark + "----------" + hot);
    if (shark == "OK") {
        document.getElementById("shark").style.display = "block";
    }
    if (hot == "OK") {
        document.getElementById("hot").style.display = "block";
    }
}
function shark() {
    localStorage.removeItem('shark');
    localStorage.removeItem('hot');
    window.location.href = "../sharkSystem/production/remoteCtrl.html";
}
function hot() {
    localStorage.removeItem('shark');
    localStorage.removeItem('hot');
    window.location.href = "machineS.html";
}
