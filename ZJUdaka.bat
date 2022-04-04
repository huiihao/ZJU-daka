@echo off

start msedge.exe https://healthreport.zju.edu.cn/ncov/wap/default/index

ping -n 60 127.0.0.1  //等待1分钟

taskkill /im msedge.exe /f  //关闭edge浏览器