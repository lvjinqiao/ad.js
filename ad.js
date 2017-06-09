/*

     ::::::::   :::::::::    ::::::::   ::::::::::        ::::::::   :::::::::: 
    :+:    :+:  :+:    :+:  :+:    :+:  :+:              :+:    :+:  :+:        
    +:+         +:+    +:+  +:+         +:+              +:+         +:+        
    +#+         +#+    +:+  +#+         +#++:++#         +#+         :#::+::#   
    +#+         +#+    +#+  +#+         +#+              +#+         +#+        
    #+#    #+#  #+#    #+#  #+#    #+#  #+#         #+#  #+#    #+#  #+#        
     ########   #########    ########   ##########  ###   ########   ###        


*/


(function() {
    'use strict';
    var cracks=[
        {name:"47影视云",url:"https://api.47ks.com/webcloud/?v=%s",title:"首选"},
        {name:"无名小站",url:"http://www.wmxz.wang/video.php?url=%s",title:"次选"},
        {name:"石头解析(s)",url:"https://jiexi.071811.cc/jx.php?url=%s"},
        {name:"爱看TV(s)",url:"http://aikan-tv.com/?url=%s"},
        {name:"最小品(s)",url:"https://www.zuixiaopin.com/api/cloudVideo?url=%s"},
        {name:"妹儿云(s)",url:"https://www.yymeier.com/api.php?url=%s"},
        {name:"那片(s)",url:"https://jxapi.nepian.com/ckparse/?url=%s"},
        {name:"眼睛会下雨(s)",url:"https://www.vipjiexi.com/yun.php?url=%s"},
        {name:"小海解析1(s)",url:"https://ckplaer.duapp.com/hai2.php?url=%s",title:"播放器似乎放在百度开发者平台"},
        {name:"小海解析2",url:"http://jx.ck921.com/hai2.php?url=%s",title:"和上面的用的应该是同样的服务器"},
        {name:"资源帝",url:"http://www.ziyuand.cn/jx1/jx.php?url=%s"},
        {name:"旋风解析",url:"http://api.xfsub.com/index.php?url=%s"},
        {name:"Relon",url:"http://yyygwz.com/index.php?url=%s"},
        {name:"SO视频",url:"http://parse.colaparse.cc/?url=%s"},
        {name:"5奇异",url:"http://www.jiexi.cx/5qiyi/?url=%s"},
        {name:"Moondown",url:"http://moon.moondown.net/?url=%s"},
        {name:"选片网",url:"http://jx.xuanpianwang.com/parse?url=%s"},
        {name:"云上",url:"http://www.ou522.cn/t2/1.php?url=%s"},
        {name:"强强卷",url:"http://000o.cc/jx/ty.php?url==%s"},
        {name:"Lewei369",url:"http://s1y2.com/?url=%s"},
        {name:"紫狐云",url:"http://yun.zihu.tv/api.php?url=%s"},
        {name:"土豪网",url:"http://www.tuhao13.com/yunparse/index.php?url=%s"},
        {name:"舞动秋天",url:"http://qtzr.net/s/?qt=%s"},
        {name:"97在线看",url:"http://www.97zxkan.com/jiexi/97zxkanapi.php?url=%s"},
        {name:"百域阁",url:"http://api.svip.baiyug.cn/svip/index.php?url=%s",title:"会检测是否frame,只能跳转不能嵌"},
        {name:"言朋影院",url:"http://vip.yingyanxinwen.cn/vip/index.php?url=%s",title:"会检测是否frame,只能跳转不能嵌"},
        {name:"迷失之梦",url:"http://mt2t.com/yun?url=%s",title:"这个解析站似乎不大稳定"},
        {name:"无名小站源",url:"http://www.sfsft.com/admin.php?url=%s",title:"无名小站的源"},
        {name:"VIP看看",url:"http://2.jx.72du.com/video.php?url=%s",title:"嵌了无名小站的服务"},
        {name:"歪歪电影",url:"http://www.yydy8.com/common/?url=%s",title:"嵌了47影视云的服务"},
        {name:"梦中人",url:"http://www.wpswan.com/mzr/vipparse/index.php?url=%s",title:"嵌了47影视云的服务"},
        {name:"71ki解析",url:"http://jx.71ki.com/tong.php?url=%s"},
        {name:"CloudParse",url:"http://api.cloudparse.com/?url=%s"},
        {name:"10号影院",url:"http://player.gakui.top/?url=%s"},
        {name:"PPYPP",url:"http://www.ppypp.com/yunparse/?url=%s"},
        {name:"疯狂解析",url:"http://vip.ifkdy.com/?url=%s",title:"仅是简单嵌了47影视云、小海解析等几个解析站"},
    ],video,videoWidth,videoHeight,i=0;
    var isMobile=function() {
        var userAgentInfo = navigator.userAgent.toLowerCase();
        var Agents=["android", "iphone",
                      "symbianos", "windows phone",
                      "ipad", "ipod" ,"midp" ,"ucweb"];
        var flag=false;
        for (var v=0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag=true;
                break;
            }
        }
        return flag;
    }();
    var iqiyi=location.hostname.indexOf("iqiyi.com")!=-1;
    var vipVideoCrackJump=GM_getValue(location.hostname+"_vipVideoCrackJump");
    var vipVideoCrackEmbed=GM_getValue("vipVideoCrackEmbed");
    var vipVideoCrackUrl=GM_getValue("vipVideoCrackUrl");
    var iframe=document.createElement("iframe");
    iframe.style.border="0";
    var selectStyle=document.createElement("style");
    selectStyle.innerHTML=".crackJump{font-size:12px;margin-left:5px;color:white;text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;-webkit-text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;-moz-text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;*filter: Glow(color=#000, strength=1);}.crackJump input{vertical-align:middle;}.vipSelect{background:black;color:white;font-size:12px;border:none;}.crackArea{position:absolute;z-index:999999;left:0px;top:0px;opacity:0.50;filter:alpha(opacity=50);transition:opacity 0.3s ease,width 0.3s ease;width:18px;height:18px;overflow:hidden;white-space:nowrap;border:1px solid #666;background:black;}.crackArea:hover{opacity:1;filter:alpha(opacity=100);width:230px;}.crackArea>p{display:block;font-size:13px;text-align:center;float:left;position:absolute;top:0px;background-color:black;width:100%;height:100%;margin:0 auto}.crackArea:hover>p{display:none;}.crackArea>label{display:none;}.crackArea:hover>label{display:initial;}";
    document.getElementsByTagName("head")[0].appendChild(selectStyle);
    var placeholder=document.createElement("div");
    placeholder.style.cssText="width:100%;height:100%;text-align:center;font-size:x-large;cursor:pointer;color:#666;";
    placeholder.innerHTML="点击恢复视频播放";
    placeholder.addEventListener("click",function(){
        if(placeholder.parentNode){
            placeholder.parentNode.replaceChild(video,placeholder);
        }
    });
    var select=document.createElement("select");
    select.className="vipSelect";
    select.innerHTML="<option value=''>💎 VIP解析</option>";
    if(!GM_getValue("hacgGodTurnVisited")){
        select.innerHTML+="<option value='https://greasyfork.org/scripts/23316/code/hacg.user.js'>\u2605\u4e0a\u8f66\u2605</option>";
    }
    cracks.forEach(function(item){
        var optionStr="<option value='"+item.url+"'"+(item.title?"title='"+item.title+"'":"")+">"+item.name+"</option>";
        select.innerHTML+=optionStr;
    });
    select.onchange=function(){
        var value=select.options[select.options.selectedIndex].value;
        if(value){
            var url=value.replace("%s",(iqiyi&&location.href.indexOf("#")!=-1?decodeURIComponent(document.querySelector(".sns-icon>li>a").href.replace(/.*url=(.*)%3Fsrc.*/,"$1")):location.href));
            if(value.indexOf("hacg.user.js")!=-1){
                GM_setValue("hacgGodTurnVisited",true);
                select.options.remove(select.options.selectedIndex);
            }else{
                vipVideoCrackUrl=value;
                GM_setValue("vipVideoCrackUrl",vipVideoCrackUrl);
                if(video.parentNode)video.parentNode.replaceChild(placeholder,video);
            }
            if(!vipVideoCrackEmbed || !embedCrack(url)){
                unsafeWindow.open(url);
            }
            select.options.selectedIndex=0;
        }
    };
    var quickAccess=document.createElement("label");
    quickAccess.className="crackJump";
    quickAccess.title="立即利用上次选择的接口破解";
    quickAccess.innerHTML="<input type='checkbox'>立即破解";
    var jumpCheck=quickAccess.querySelector("input");
    jumpCheck.onclick=function(){
        vipVideoCrackJump=jumpCheck.checked;
        GM_setValue(location.hostname+"_vipVideoCrackJump",vipVideoCrackJump);
        crackJump();
    };
    var embedLabel=document.createElement("label");
    embedLabel.className="crackJump";
    embedLabel.title="能嵌入当前站点的接口就直接嵌入页面";
    embedLabel.innerHTML="<input type='checkbox'>能嵌就嵌";
    var embedCheck=embedLabel.querySelector("input");
    embedCheck.onclick=function(){
        vipVideoCrackEmbed=embedCheck.checked;
        GM_setValue("vipVideoCrackEmbed",vipVideoCrackEmbed);
        crackJump();
    };
    var showP=document.createElement("p");
    showP.innerHTML="💎";
    var crackArea=document.createElement("div");
    crackArea.className="crackArea";
    crackArea.appendChild(select);
    crackArea.appendChild(showP);
    crackArea.appendChild(quickAccess);
    crackArea.appendChild(embedLabel);
    function crackJump(){
        if(vipVideoCrackJump){
            var value=vipVideoCrackUrl?vipVideoCrackUrl:cracks[0].url;
            var url=value.replace("%s",(iqiyi?location.href.replace(/#.*/,""):location.href));
            if(!vipVideoCrackEmbed || !embedCrack(url)){
                GM_openInTab(url,false);
                if(video.parentNode)video.parentNode.replaceChild(placeholder,video);
            }
        }
    }
    function embedCrack(url){
        var canEmbed=false;
        if(/^https/.test(url)){
            url=location.protocol+url.slice(6);
            canEmbed=true;
        }else if(location.protocol=="http:"){
            canEmbed=true;
        }
        var htmlVideo=document.querySelector("video");
        if(htmlVideo){
            var vi=setInterval(function(){
                if(htmlVideo.src){
                     setTimeout(function() {
                         htmlVideo.click();
                     },1000);
                    clearInterval(vi);
                }
            },500);
        }
        if(canEmbed){
            iframe.width=videoWidth;
            iframe.height=videoHeight;
            iframe.src=url;
            if(!iframe.parentNode){
                if(video.parentNode){
                    video.parentNode.replaceChild(iframe,video);
                }else{
                    placeholder.parentNode.replaceChild(iframe,placeholder);
                }
                video=iframe;
            }
        }
        return canEmbed;
    }
    if(isMobile){
        crackArea.style.position="fixed";
        document.body.appendChild(crackArea);
    }else{
        var si=setInterval(function(){
            [].every.call(document.querySelectorAll("object,embed,video"),function(item){
                var style=unsafeWindow.getComputedStyle(item, null);
                if(style.width.replace("px","")>100 && style.height.replace("px","")>100){
                    video=item;
                    return false;
                }
                return true;
            });
            if(video){
                clearInterval(si);
                var videoStyle=unsafeWindow.getComputedStyle(video, null);
                videoWidth=videoStyle.width;
                videoHeight=videoStyle.height;
                var videoParent=video.parentNode;
                videoParent.appendChild(crackArea);
                placeholder.style.lineHeight=unsafeWindow.getComputedStyle(videoParent).height;
                if(location.hostname.indexOf("v.yinyuetai.com")!=-1){
                    if (!/^https?:\/\/v\.yinyuetai\.com\/video\/h5\//.test(location.href)) {
                        unsafeWindow.location.href = unsafeWindow.location.href.replace(/^https?:\/\/v\.yinyuetai\.com\/video\//,"http://v.yinyuetai.com/video/h5/");
                    }else{
                        videoParent.parentNode.style.position="absolute";
                        setTimeout(function(){
                            videoStyle=unsafeWindow.getComputedStyle(video, null);
                            videoWidth=videoStyle.width;
                            videoHeight=videoStyle.height;
                        },1000);
                    }
                }else if(location.hostname.indexOf("v.youku.com")!=-1){
                    if(vipVideoCrackEmbed)videoHeight="580px";
                }else if(iqiyi){
                    var plgcontainer=document.querySelector('[data-player-hook=plgcontainer]');
                    var videoLoading=document.querySelector('[data-player-hook=videoLoading]');
                    var isi=setInterval(function(){
                        var jplayUnderFrame=document.querySelector('.J_play-underFrame');
                        if(jplayUnderFrame){
                            clearInterval(isi);
                            var flashArea_paypop=document.querySelector('#flashArea_paypop');
                            if(flashArea_paypop)flashArea_paypop.parentNode.parentNode.removeChild(flashArea_paypop.parentNode);
                            jplayUnderFrame.parentNode.removeChild(jplayUnderFrame);
                        }
                    },500);
                    if(plgcontainer)plgcontainer.parentNode.removeChild(plgcontainer);
                    if(videoLoading)videoLoading.parentNode.removeChild(videoLoading);
                    document.querySelector('#widget-dramaseries').addEventListener('click', function(e){
                        var target=e.target.parentNode.tagName=="LI"?e.target.parentNode:(e.target.parentNode.parentNode.tagName=="LI"?e.target.parentNode.parentNode:e.target.parentNode.parentNode.parentNode);
                        if(target.tagName!="LI")return;
                        GM_xmlhttpRequest({
                            method: 'GET',
                            url: "http://cache.video.qiyi.com/jp/vi/"+target.dataset.videolistTvid+"/"+target.dataset.videolistVid+"/?callback=crackIqiyi",
                            onload: function(result) {
                                var crackIqiyi=function(d){
                                    location.href=d.vu;
                                };
                                eval(result.responseText);
                            }
                        });
                    });
                    unsafeWindow.addEventListener("hashchange",function(){
                        crackJump();
                    });
                }
                if(vipVideoCrackJump){
                    jumpCheck.checked=true;
                }
                if(vipVideoCrackEmbed){
                    embedCheck.checked=true;
                }
                crackJump();
                unsafeWindow.eval(`
                var pushState = window.history.pushState;
                window.history.pushState=function(a){
                    window.postMessage("pushState","*");
                    return pushState.apply(history, arguments);
                };
                var replaceState = window.history.pushState;
                window.history.replaceState=function(a){
                    window.postMessage("replaceState","*");
                    return pushState.apply(history, arguments);
                };`);
                unsafeWindow.addEventListener('message',function(e) {
                    if(e.data=="pushState" || e.data=="replaceState"){
                        setTimeout(function(){crackJump();},1);
                    }
                });
            }
        },500);
        setTimeout(function(){
            clearInterval(si);
        },20000);
    }
})();
function FindProxyForURL(url, host){

    /********************************************
    *                                           *
    *            关于 “mode = ” 的说明            *
    *                                           *
    *  0: 不使用代理 (仅屏蔽广告)                  *
    *  1: 使用http代理 (请在下方设置服务器和端口)    *
    *  2: 使用pac规则代理 (使用方法请看文件底部注释)  *
    *                                           *
    ********************************************/

    var mode = 0;

    //【以下http代理设置仅在 “mode = 1” 时有效】
    var domain = "127.0.0.1";
    var port = "8080";

    var hosts = [
//=========域名Start=========
//<ad.js_test>
"sc.cdce.cf",
//<youku>
"ad.api.3g.youku.com",
"statis.api.3g.youku.com",
"atm.youku.com",
"stat.youku.com",


//=========域名End=========
//【在分界线上面可以追加域名，两边加上双引号，使用逗号分隔。】
    ]
    var ips = [
//=========IP地址Start=========
//<iqiyi>
"101.227.14.80",
"101.227.14.81",
"101.227.14.82",
"101.227.14.83",
"101.227.14.84",
"101.227.14.85",
"101.227.14.86"
//=========IP地址End=========
//【在分界线上面可以追加IP地址，两边加上双引号，使用逗号分隔。】
    ]
    var rules = [
//【iOS 9.3.2 以上的系统由于系统限制，无法享受URL规则功能。】
//=========URL规则Start=========
"*pg.dmclock.com:8011/ec54.html*",
"*pg.dmclock.com/ec54.html*",
"http://x.jd.com/exsites?spread_type=*",
"http://ope.tanx.com/wap?i=*",
"http://mjs.sinaimg.cn/wap/cms/ad/*.js",
"*sdkapp.mobile.sina.cn/interface/sdk/sdkad.php",
"http://lives.l.qq.com/*&live=*",
"*/advert-sdk/*",
"*/?op=adv&*",
"*?adslot=*",
"*&product=adpublish&*",
"*/ad/getAd.*",
"*/AdvertList.xml",
"*/getads?*",
"*/getadsmetadata?*",
"*/ashx/Ad/*",
"*/MobileAdServer/*",
"*.adsense.*.js",
"*/advertise/*",
"*/adsense/*",
"*/baidustatic/cpro/ui/cm.js*",
"*/advertclient/*",
"*/api/advertising/*",
"*/resource/advert/*",
"*/advertisements?*",
"*/ad?service=getad&*",
"*/advert/list?*",
"*/json/ad/*",
"*/adv/list/*",
"*/mobileads/adsconf?*",
"*/ad_list.php?*",
"*.com/advert/*",
"*/api/advert/*",
"*.com/ad-bucket/*",
"*/get_ads.json?*",
"*/pushad/html/*",
"*/api/getNewAdInfo?*",
"*.com/i.js",
"*/ad_footer.js*",
"*.com/ad.js",
"*/stickyad.js",
"*/js/ad.*.js",
"*/js/ads_*.js",
"*.popunder.js",
"*/popunder/*.js",
"*.js?advertid=*",
"*/ad_show.js",
"*/cache/ad_js/*.js",
"http://guanggao.*.js",
"*/advert/*.js",
"*/advert.js",
"*/adv3.js",
"*/adv2.js",
"*/adv1.js",
"*/ads1.js",
"*/ads2.js",
"*/ads3.js",
"*/ads4.js",
"*/ads_images/*.js",
"*_advert.js",
"*.com/ads.js",
"*.com/advt/*.js",
"*/google_ads.js",
"*/doubleclick.js",
"*/js/tc.js",
"*/showad.js",
"*/guanggao.js",
"*.net/ad/*.js",
"*.com/ad/*.js",
"*/floatad.js",
"*/duilian.js",
"*/adfile/*.js",
"*/adbox.asp*",
"*/adshow.asp*",
"*/js/ads.*",
"*/ad/files/*",
"*.cn/adv/ad/*",
"*/advertising/*&id=*",
"*/adShow.*?id=*",
"http://adtag.*",
"*/html/ad/*",
"*/www/delivery/*",
"*.com/ads_*",
"*/main/s?*&local=yes",
"*.com/adsys/*",
"http://adv2.*",
"*/ad/index/*",
"*.php?ad_pos=*",
"*/advertpro/servlet/*",
"http://us-ads.*",
"*.cn/js/ads/*",
"*/json/advertise_list.*",
"*/getAdList.*",
"*/getad?*",
"*service/advertising/*",
"*cc/js/ads/*",
"*.com/js/ads/*",
"http://gg.*.js",
"*/page/s.php?s=*&w=*&h=*",
"*/public/ads/*",
"*.com/ads/adm.*",
"http://ad.*.js",
"*/static/adsview/*.js",
"*/plus/ad_*.js",
"*/d/js/acmsd/*",
"http://adserver.*",
"*/ad1.js",
"*/ad2.js",
"*/ad3.js",
"*/adscpv/i.*",
"*/ad/AdSale/*",
"*/ad/Adv/*",
"*_advertise_list.*",
"*_advertise_native_*",
"*_advertise_cpc_*",
"http://ads.*.js",
"*/getAds.php?*",
"http://i.ifeng.com/showjs?apids=*",
"http://cdn.tanx.com/t/m/m.js",
"*/wapAdversApi?*",
"*bid.adview.cn/agent/getAd*",
"*mi.gdt.qq.com/gdt_mview.fcg*",
"*googleads.g.doubleclick.net:80/mads/gma*",
"*api2.adsmogo.mobi/ad*",
"*api2.adsmogo.net/ad*",
"*r3.adwo.com/adweb*",
"*pub.funshion.com/interface/deliver*",
"*livew.l.qq.com/livemsg*",
"*lives.l.qq.com/livemsg*",
"*api.mobile.dianru.com/ads*",
"*service.cocounion.com/core/ssp/bid/chance*",
"*api2.adsmogo.com/ad*",
"*api2.adsmogo.org/ad*",
"*googleads.g.doubleclick.net*",
"*i.w.inmobi.com/showad.asm*",
"*api.24kidea.com/hqzs/getnewadsystemappad*",
"*mads/gma*",
"*news.l.qq.com/app*",
"*g1.163.com/madr*",
"*sdkapp.mobile.sina.cn/interface/sdk/sdkad.php",
"*pgdt.gtimg.cn/gdt*",
"*ad.api.3g.tudou.com/adv.*",
"*.domob.cn/a",
"*.snssdk.com/service/13/app_ad*",
"*lf.snssdk.com/2/article/information*",
"*iface.iqiyi.com/api/get2UserInfo*",
"*passport.iqiyi.com/apis/user/info.action*",
"*passport.qiyi.com/apis/user/info.action*",
"*staticimg.yidianzixun.com/s/ad*",
"*a1.go2yd.com/Website/contents/recommend-ads*",
"*pagead2.googlesyndication.com/pagead*",
"*ads.service.kugou.com/v1/mobile*",
"*mvads.kugou.com/mobile*",
"*appsrv4.mdn2.net/cs3*",
"*appsrv4.madserving.c*/cs3*",
"*ads.mopub.com/m/ad*",
"*.domob*/a",
"*.duomeng*/a",
"*adv.madserving.com/material*",
"*.gameloft.com/un/index*ad*",
"*ads.mopub.com/m/ad*",
"*ios.bayimob.com/ad/getAdList*",
"*bayilaoye.oss-cn-hangzhou.aliyuncs.com/iosAdv*",
"*basead.wifigo.cn/3/ad/ad*",
"*g.163.com/ur*",
"*sax.sina.cn/wap/impress*",
"*api.jxedt.com/api/guide*",
"*api.jxedt.com/api/ad*",
"*sandbox.adapter.opendsp.tanx.com",
"*mp4ba.qucaigg.com:8080/960X90.js",
"*img.twcczhu.com/js/rr/rich_m.js",
"*img.fd7c.com/html/click.*",
"*afp.csbew.com/s.htm",
"*adsdk.gao7.com*Ad*",
"*8112d.365xs.org/*",
"*.doubleclick.net*",
"*googlesyndication.com*",
"*ggs.myzaker.com/zk_article_ad.php*",
"*ggs.myzaker.com/zk_ggs.php*ads*",
"*ad*.ximalaya.com/subapp*",
"*7pulxu.com2.z0.glb.qiniucdn.com*",
"*admgr.qingting.fm/adxconfig*",
"*ad.qingting.fm/api/ad*",
"*js.users.51.la/*js",
"*cpro.baidustatic.com/cpro/ui*",
"*njs.myhx120.com/cpv/v.php*",
"*w.m.taobao.com/sdk/*banner*",
"*m2.qiushibaike.com/banner*",
"*init.startappexchange.com/*ads*",
"http://ios.ijinshan.com/kbatterydoctor/displayad.json",
"http://api.vungle.com/api/v3/requestAd",
"*pos.baidu.com*dai*",
"*ssl.google-analytics.com*",
"*e.crashlytics.com*",
"*med.heyzap.com*",
"*a.applovin.com*",
"*req.startappservice.com*",
"*filelx.gao7.com/g1*",
"*ads.mopub.com/m/open",
"http://iface.iqiyi.com/api/initLogin*",
"http://i.play.api.3g.youku.com/common/v3/hasadv/play*",
"*cache.m.iqiyi.com/dc/amdt*",
"*.cupid.iqiyi.com/show2*",
"*www.xwctw.com:8888/lxmService/lxmPosition*",
"*mobads.baidu.com/ads*",
"*api.weibo.cn/2/cardlist*siminfo*",
"*cdn.moogos.com/js/_jssdk.js*",
"*img-wifi2.poco.cn*Recommend*",
"*img-wifi2.poco*Ad*",
"*ios.win007.com*JsonAd.txt*",
"*www.sf-express.com/app/cn/sc*",
"*app.9nali.com/1315/check*set*",
"*jt.rsscc.com/trainnet/advertisement*",
"*mobads.baidu.com/cpro/ui*",
"*dl.smilingwhitebear.com/as/config*",
"*mrobot.pcauto.com.cn/v3/ad_py*",
"*www.wyxokokok.com/pub/readpubxml*",
"http://pomelocdn.beautyplus.com/iphone*",
"*config.mobile.kukuplay.com:8080/MobileConfig*"
//=========URL规则End=========
//【在分界线上面可以追加URL规则，两边加上双引号，使用逗号分隔。】
    ]

    dnsResolve("sc.cdce.cf");
    var IS_AD = "PROXY example.com:443";
    switch (mode){
      case 0:
          IS_NOT_AD = "DIRECT";
          break;
      case 1:
          IS_NOT_AD = "PROXY " + domain + ":" + port;
          break;
      case 2:
          IS_NOT_AD = FindUserProxyForURL(url, host);
          break;
    }
    for (var n = 0; n < hosts.length; n++){
        if (dnsDomainIs(host, hosts[n])){
            return IS_AD;
        }
    }
    for (var n = 0; n < ips.length; n++){
        if (isInNet(host, ips[n], "225.225.225.225")){
            return IS_AD;
        }
    }
    for (var n = 0; n < rules.length; n++){
        if (shExpMatch(url, rules[n])){
            return IS_AD;
        }
    }
    return IS_NOT_AD;
}

/*********************************************
*                                             *
*            使用pac规则代理的方法               *
*                                             *
*  1. 设置“mode = 2”。                         *
*  2. 打开pac文件，将里面的“FindProxyForURL”替换  *
*     为“FindUserProxyForURL“后粘贴在下方即可。  *
*                                             *
**********************************************/
