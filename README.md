# ZJU-daka(这东西没有库，总不能删库跑路了吧)

**ZJU每日健康上报自动化打卡教程**，利用**windows**自带的功能：**任务计划程序**，以及**edge浏览器(firefox浏览器也行)插件**，实现每日健康上报：

<img src="https://user-images.githubusercontent.com/48110180/161521489-5bca2e53-c342-4c38-bfde-faed5573c18c.png" width="500px">

 - 需本地运行或服务器(自己的电脑)
 - 默认每次提交上次所提交的内容（只有时间部分更新）
 - 打卡信息有变时，请手动打卡一次
 - 电脑只要一直处于开机状态，或者每天正常开关机，就会实现自动打卡。

## Update
### 2022.05.08
加了验证码，脚本得改进。学有余力的同学可以看：[教程思路1](https://www.bilibili.com/video/BV1fU4y1f7Nm/?spm_id_from=333.788.recommend_more_video.1)或者[教程思路2](https://www.bilibili.com/video/BV1yb4y1U7Ny/?spm_id_from=333.788.recommend_more_video.8)。

这里提供一个简单的方法，下载我已经上传的**AutoVerify 1.1.7.crx**，拖进chrome或者edge浏览器的插件页面安装即可。自己去插件市场下载也可以，但是这个之能用在chrome或者edge浏览器，firefox浏览器用不了。然后手动再填写一遍之后，在验证码图片右键→识别此验证码，然后刷新页面，验证码从此之后会自动填写，如果不行多试几次，这个方法我得等第二天看行不行。可能会遇到报错：sfcyglqCannot read properties of undefined (reading 'getElementsByTagName')，这个原因在**浙江大学健康打卡自动化脚本.user.js**文件内容，可能需要修改一下。

利用[谷歌浏览器插件迁移到火狐浏览器教程](https://blog.csdn.net/qq_36292543/article/details/119028157)，做了一个我已经上传的**AutoVerify 1.1.7.xpi**，拖进firefox浏览器的插件页面安装即可。过程中可能遇到[跳不出reCAPTCHA验证码](https://blog.csdn.net/qq_38388811/article/details/109137619)的问题，可以看链接解决。

### 2022.04.13
"taskkill /im msedge.exe /f  //关闭edge浏览器进程"，报错，建议去掉中文再试试，不行就用 taskkill /f /fi "IMAGENAME eq msedge.exe" 。

因为可能设备日常处于开机状态，主力浏览器(edge浏览器)一直开着不想关掉的网页，这个时候可以用别的浏览器(firefox浏览器)进行自动打卡。

![image](https://user-images.githubusercontent.com/48110180/163113054-c4e07269-b365-421c-9e7a-ef3d288ef5cd.png)

### 2022.04.07
如果定位不了，可能是以下问题：1. 挂着vpn；2. 浏览器别的插件的定位，比如Momentum的地理定位是可以手动调的。反正只要改成杭州就都可以，无风险地区也行。

### 2022.04.06
内容变动，需手动填一次，多了一项选择校区，因为城西银泰出事了。
###### BYW，一开始至少是不厌烦上海的，现在开始讨厌了，可能是我读书读的少，也没考上复旦上交，不知道上海的经济地位到底有多重要。但是，就像网友说的，杭州的医生护士去上海支援抗疫，上海的一些选手散播病毒，部分人赚guo难cai。虽然大家都说着吴越方言，但我看到的是世界的参差。

### 2022.04.05
第Ⅴ步修正一下

## 步骤

**〇.** 如果主力浏览器(edge浏览器)一直开着不想关掉的网页，那么可以用别的浏览器(chrome浏览器、firefox浏览器)进行自动打卡的操作。后续发现chrome浏览器不行，firefox浏览器可以。之后默认edge浏览器为主力浏览器，firefox浏览器为别的浏览器。

**Edge浏览器Tampermonkey插件的安装：** 打开edge浏览器(firefox浏览器也行，但是得与Ⅳ对应)，**fig1、2**. Extentions→Manage extensions→Get extensions for Microsoft Edge，**fig3**. 搜索“Tampermonkey”并安装，**fig4**. 确保该插件是开启的。**Tampermonkey下载缓慢可点击此处去[官网](https://www.tampermonkey.net/)下载。**


| fig1                 | fig2                     | fig3                |fig4                 |
|:--------------------:|:------------------------:|:-------------------:|:-------------------:|
| ![image](https://user-images.githubusercontent.com/48110180/161521840-4a906494-9576-4ceb-b238-dd3c5480848d.png#pic_center) | ![image](https://user-images.githubusercontent.com/48110180/161521851-84fbd3a0-b350-467f-a49b-2d22ae05af06.png#pic_center) | ![image](https://user-images.githubusercontent.com/48110180/161521876-e3db7da9-9c78-4eac-bd74-d96f485c0833.png#pic_center) | ![image](https://user-images.githubusercontent.com/48110180/161530171-d55178db-c7ff-45bd-9165-9fc9a2ddbce8.png#pic_center) |

**Firefox浏览器Tampermonkey插件的安装：**(用firefox浏览器)打开[扩展商店](https://addons.mozilla.org/zh-CN/firefox/collections/4757633/webdeveloper/)搜索安装即可，同edge浏览器。

**Chrome浏览器Tampermonkey插件的安装(可以直接跳过但是可以学一下)：**

由于大家的chrome浏览器可能打不开扩展商店，所以可以去下面的网站搜索chrome浏览器的插件安装包并进行手动安装：

[Crx搜搜](https://www.crxsoso.com/)：这个网址可以直接用chrome浏览器打开，和chrome插件商店一样会自动安装插件。如果安装失败，则手动安装，可以点击网页中的离线安装按教程进行操作。

![image](https://user-images.githubusercontent.com/48110180/163117444-d996ef0f-34ae-4f3c-80cf-77da4f63ec7f.png)

[CrxDL.COM](https://crxdl.com/)：这个网址只能下载Crx文件，再进行手动安装插件。电脑和手机都可以安装 Chrome 扩展插件，在网上有很多具体的安装方法，这里列举两个安装教程：[电脑安装](https://www.cccitu.com/3391.html)、[手机安装](https://www.cccitu.com/982.html)。

在chrome浏览器安装好Tampermonkey后，接着步骤Ⅰ按照教程操作。额外步骤：打开[每日上报](https://healthreport.zju.edu.cn/ncov/wap/default/index)界面手动登陆一次，且授权获取定位：

![image](https://user-images.githubusercontent.com/48110180/163118454-1ca196db-0280-455f-a2b7-8275d6d27898.png)

一般chrome浏览器自动打卡会：获取位置信息失败，请检查定位服务是否开启！用[chrome浏览器模拟定位](https://blog.csdn.net/weixin_47882458/article/details/107237924)也不行，由于edge浏览器是chrome内核，在edge浏览器同样的操作，是可以自动获取到模拟定位的。

- - -

**Ⅰ.** **fig5**. 点击该链接进行安装：[浙江大学健康上报自动化脚本 (greasyfork.org)](https://greasyfork.org/en/scripts/430082-%E6%B5%99%E6%B1%9F%E5%A4%A7%E5%AD%A6%E5%81%A5%E5%BA%B7%E6%89%93%E5%8D%A1%E8%87%AA%E5%8A%A8%E5%8C%96%E8%84%9A%E6%9C%AC-%E4%BF%AE%E6%AD%A3%E7%89%88)；**fig6**. 安装不了的(一般不会装不了)，将该项目文件夹下的**浙江大学健康打卡自动化脚本.user.js**文件内容复制到图中位置。

| fig5                | fig6                     |
|:--------------------:|:------------------------:|
| ![image](https://user-images.githubusercontent.com/48110180/161521893-f36f4bd5-aa01-4cb0-8dd9-5ee352a0d9d3.png#pic_center) | ![image](https://user-images.githubusercontent.com/48110180/161539362-d820c319-0c1d-4172-bd01-0ed008369131.png#pic_center) | 

- - -

**Ⅱ.** 打开“任务计划程序”，“常规”如图按需自定义设置。

<img src="https://user-images.githubusercontent.com/48110180/161522050-ac89b8d8-6267-4f92-a6d4-11990aac29d5.png" width="500px">

- - -

**Ⅲ.** “触发器”如图按需自定义设置。

<img src="https://user-images.githubusercontent.com/48110180/161522064-886306c8-b1f0-40e6-99f3-95abf7cf34f1.png" width="500px">

- - -

**Ⅳ.** 在自己选定的文件夹创建一个新的txt文件(比如：ZJUdaka.txt)，并输入以下内容并保存。然后重命名为batch处理文件，即将txt后缀改为bat(比如：ZJUdaka.bat)。msedge.exe可以换成别的浏览器，比如firefox.exe。

```batch
@echo off
start msedge.exe https://healthreport.zju.edu.cn/ncov/wap/default/index  //打开健康上报网页
ping -n 60 127.0.0.1  //等待60秒，可以短亿点
taskkill /im msedge.exe /f /t //关闭edge浏览器进程；如果想看打卡结果或者开着想留着的网页的话，这步得去掉
```

```batch
@echo off
start firefox.exe https://healthreport.zju.edu.cn/ncov/wap/default/index  //打开健康上报网页
ping -n 60 127.0.0.1  //等待60秒，可以短亿点
taskkill /im firefox.exe /f  //关闭firefox浏览器进程；“taskkill /im firefox.exe /f /t” 也行；如果想看打卡结果或者开着想留着的网页的话，这步得去掉
```
中文最好全部删掉，不然可能报错。**上面的关闭不了浏览器**，改进脚本如下，可以关闭浏览器：
```batch
@echo off
start firefox.exe https://healthreport.zju.edu.cn/ncov/wap/default/index
TIMEOUT 60
taskkill /f /fi "IMAGENAME eq firefox.exe"
```
(等待时间TIMEOUT看电脑运行的快不快，保证网页打卡获取地理位置信息完成)
- - -

**Ⅴ.** “操作”如图按需自定义设置

<img src="https://user-images.githubusercontent.com/48110180/161522109-32c512ec-7ba0-487b-bf2d-42363ef9fef8.png" width="500px">

大家可能会发现任务状态会一直处于“准备就绪”的状态，而到时间不会自己运行。

这边按下图设置，应该可以，即在“起始于”填入程序或脚本的根目录。

<img src="https://user-images.githubusercontent.com/48110180/161714828-42bae286-a040-4171-9f9a-ff892fb74c06.png" width="500px">

**起始于**这个操作在windows计划任务的设置里是个可选项，所以我们在操作的时候一般都忽略了，但因此会导致错误的发生。比如我的定时任务程序中需要用到一个文件，在读的时候就会报未能找到文件“C:\Windows\system32\xxx”,又或者程序要写一个文件的时候也会报错，这些都是因为没有设置"起始于"导致的，起始于的目的是指定你执行文件的根目录，如果没有指定程序就会寻址到C:\Windows\system32这个目录下。

- - -

**Ⅵ.** “条件”如图按需自定义设置。

<img src="https://user-images.githubusercontent.com/48110180/161522131-32d14288-b684-4d38-a303-faed35f4f2ef.png" width="500px">

- - -

**Ⅶ.** “设置”如图按需自定义设置。

<img src="https://user-images.githubusercontent.com/48110180/161522147-d3e1f6b4-96d8-45f8-9043-6cbb734e9f81.png" width="500px">

- - -

**Ⅷ.** 点击确定，此处输入的密码是帐号密码，不是开机的pin码。

<img src="https://user-images.githubusercontent.com/48110180/161522165-acdcd74e-a76b-445d-b7bf-1bf9ea9b7c27.png" width="500px">

- - -

**Ⅸ.** 任务计划程序库→拉到最底下找到“ZJUdaka”选中→运行→状态变为“准备就绪”即可。

<img src="https://user-images.githubusercontent.com/48110180/161522183-a95c698d-93dc-4bb7-a70c-9b6e6f4b9859.png" width="500px">

- - -

**Ⅹ.** 理论上来说已经设置完成了。最后一定要手动进行以下操作：用第Ⅳ步中对应的浏览器打开[健康上报网页](https://healthreport.zju.edu.cn/ncov/wap/default/index)，进行一次账户登录(最之后就不用登陆了)，然后“允许”网页获取位置信息，如果有“记住此决定”这类选项的，一定要选中。

![image](https://user-images.githubusercontent.com/48110180/163131188-f8e7cc95-9076-46a6-9fdc-e071f3c545de.png)

如果出现这个，让它不要再弹出来了：

![image](https://user-images.githubusercontent.com/48110180/163135916-73e9d2bd-1323-47ed-a4c6-ce8c9e433dd0.png)

firefox浏览器可能会出现以下报错：

![image](https://user-images.githubusercontent.com/48110180/163160563-06e34f98-8ea7-4c67-8248-f354368dda61.png)

原因：在自动打卡脚本运行中，Tampermonkey插件的自动打卡脚本还没有运行完，即每日上报未提交，浏览器就被关闭。

解决方法：以排障模式(安全模式)打开浏览器，点击右上角三个点→帮助→关闭排障模式。同时将bat文件的TIMEOUT时间适当变长，保证自动打卡脚本运行完毕。

![image](https://user-images.githubusercontent.com/48110180/163163615-0c887adf-f591-4455-8f6a-516204796fad.png)

