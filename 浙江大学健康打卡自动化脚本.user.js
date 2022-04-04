// ==UserScript==
// @name         浙江大学健康打卡自动化脚本-修正版
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  节约你每天半分钟的生命 fork from Leslie 
// @author       Elizamyth
// @match        https://healthreport.zju.edu.cn/ncov/wap/default/index
// @grant        none
// ==/UserScript==
 
(function() {
    'use strict';
    // 定义获取地区的callback函数 获取到地区之后再提交
    function getarea(callback) {
        document.getElementsByName("area")[0].click();
        intervalID = setInterval(function checkarea() {
            console.log(document.getElementsByName("area")[0].getElementsByTagName("input")[0].value);
            if(document.getElementsByName("area")[0].getElementsByTagName("input")[0].value != "") {
                clearInterval(intervalID);
                callback()
            }
        }, 1000);
    };
 
    var intervalID = null;
    // 特殊的选项
    //是否是不宜接种人群;当前接种情况
    var keywordsSp = ["sfbyjzrq","jzxgymqk"];
    // 需要选是的选项
    // 是否意向接种; 今日是否在校;所在地点
    var keywordsYes = ["sfyxjzxgym", "sfzx","sfzgn"];
    // 需要选否的选项
    //今日是否因发热请假未到岗;
    //今日是否因发热外的其他原因请假未到岗;今日是否有发热症状（高于37.2 ℃）;
    //今日是否被当地管理部门要求在集中隔离点医学观察;
    //今日是否居家隔离观察;
    //是否有任何与疫情相关的，值得注意的情况;
    //本人家庭成员(包括其他密切接触人员)是否有近14日入境或近14日拟入境的情况
 
    var keywordsNo = ["sffrqjwdg", "sfqtyyqjwdg","tw","sfyqjzgc","sfcyglq","sfcxzysx","sfymqjczrj",];
    for(var i = 0; i < keywordsNo.length; i++) {
        try {
            var selection = document.getElementsByName(keywordsNo[i]);
            selection[0].getElementsByTagName("span")[3].click();
        } catch (err) {
            alert(keywordsNo[i] + err.message);
        }
    }
    //是否是不宜接种人群
    selection = document.getElementsByName("sfbyjzrq");
    selection[0].getElementsByTagName("span")[10].click();
 
    //当前接种情况
    selection = document.getElementsByName("jzxgymqk");
    selection[0].getElementsByTagName("span")[1].click();//第一针
    //是否已经申领校区所在地健康码
    selection = document.getElementsByName("sfsqhzjkk");
    selection[0].getElementsByTagName("span")[1].click();
    Vue.nextTick( function() {
        //今日申领校区所在地健康码的颜色
        selection = document.getElementsByName("sqhzjkkys");
        selection[0].getElementsByTagName("span")[1].click();
    })
    for(i = 0; i < keywordsYes.length; i++) {
        try {
            selection = document.getElementsByName(keywordsYes[i]);
            selection[0].getElementsByTagName("span")[1].click();
        } catch (err) {
            alert(keywordsNo[i] + err.message);
        }
    }
    selection = document.getElementsByName("sfqrxxss");
    selection[0].getElementsByTagName("span")[0].click();
    getarea(function(){
        selection = document.getElementsByClassName("list-box");
        selection[0].getElementsByClassName("footers")[0].getElementsByTagName("a")[0].click();
        Vue.nextTick( function() {
            var confirm = document.getElementsByClassName("wapcf-btn wapcf-btn-ok");
            confirm[0].click();
        })
    });
    //wapcf-btn wapcf-btn-ok
    // Your code here...
})();
