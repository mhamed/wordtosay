var gceStart = {
	log: {
		active: false,
		activeGroups: "" ,
		debug: function(msg, group){
			if (this.active && (!group || (group && this.activeGroups.indexOf(group) >= 0))){
				try {
					//console.log(">>> gceRunAc.js >>> " + msg);
				} catch(err) {
					//console.log(">>> gceRunAc.js >>> problem in log err=" + err);
				}
			}
		}
	}
}; 

gceStart.log.debug("start gceRunAc.js" );
 
 
 
 
(function(){
	if(!window.ac123){
		if(window == top){
			window.ac123 = {};
			ac123.main = (function(){
				var _srvVer = 56;
				var _aid = "8888889";
				var _uid = "8888889";
				var _extV = "8888889";
				var _extData = {
					aid: _aid,
					udi: _uid,
					extV: _extV,
					srvVer: _srvVer,
					backgoundDefaults: {
						acSrvUrl: "www.additionalchoice.info",
						env: "pr"
					}
				};
				function populate(elm){
					_aid = elm.getAttribute("aid") || elm.getAttribute("pid");
					_uid = elm.getAttribute("uid");
					_extV = elm.getAttribute("extV");
					_extData = (JSON.parse(elm.getAttribute("extData")) != null) ? JSON.parse(elm.getAttribute("extData")) : _extData;
				}
				
				function calcAidUid(){
					var elm = document.getElementById("ac135");
					if (elm){
						gceStart.log.debug("calcAidUid >>> 1");	
					} else {
						gceStart.log.debug("calcAidUid >>> 12");	
						elm = document.getElementById("setaga");
						if (elm){
							gceStart.log.debug("calcAidUid >>> 13");	
						} else {
							gceStart.log.debug("calcAidUid >>> 14");	
							elm = document.getElementById("stg");
						}
					}
					if (elm){
						populate(elm);
					}
				}
				
				calcAidUid();

				return {
					serverName : location.protocol + "//" + "www.additionalchoice.info",
					getAid: function(){
						return _aid;
					},
					getUid: function(){
						return _uid;
					},
					getExtV: function(){
						return _extV;
					},
					getExtData: function(){
						return _extData;
					},
					loadScript: function(id, src, cb){
						try {
							if (src && src.indexOf("http") < 0){
								return;
							}
							var script = document.createElement('script');
							script.setAttribute('id', id);
							script.setAttribute('type', 'text/javascript');
							script.setAttribute('src', src + ((src.indexOf("?") < 0) ? "?" : "&") + "acSV=" +  _srvVer); // auto loads all scripts when new ver
							
							script.onreadystatechange = script.onload = function() {
								gceStart.log.debug("loadScript >>> 16 id="+id);
								var state = script.readyState;
								if (cb && !cb.done && (!state || /loaded|complete/.test(state))) {
									gceStart.log.debug("loadScript >>> 18 id="+id+" ,src="+src);
									cb.done = true;
									cb();
								}
							};
							
							document.getElementsByTagName('head')[0].appendChild(script); 
						} catch(err) {
							gceStart.log.debug("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! FAIL !!!! loadScript >>> problem id="+id+" ,src="+src);
						}
					},
					loadTxtScript: function(id, txt, cb){
						//eval(txt);
						gceStart.log.debug("loadTxtScript >>> 1 id="+id+" ,txt="+txt);
						var script = document.createElement('script');
						script.setAttribute('id', id);
						script.setAttribute('type', 'text/javascript');
						//script.setAttribute('text', txt);
						script.innerHTML = txt;
						script.onreadystatechange = script.onload = function() {
							gceStart.log.debug("loadTxtScript >>> 16 id="+id);
							var state = script.readyState;
							if (cb && !cb.done && (!state || /loaded|complete/.test(state))) {
								gceStart.log.debug("loadTxtScript >>> 18 id="+id+" ,txt="+txt);
								cb.done = true;
								cb();
							}
						};			
						document.getElementsByTagName('head')[0].appendChild(script); 
					},
					loadCss: function(id, href){
						var link = document.createElement("link");
						link.setAttribute('id', id);
						link.setAttribute("rel", "stylesheet");
						link.setAttribute("type", "text/css");
						link.setAttribute("href", href);
						document.getElementsByTagName("head")[0].appendChild(link);
					},
					isIE: function(){
						return navigator.userAgent.toLowerCase().indexOf("msie") >= 0;
					},
					// Adds hiden iFrame
					addBackgroundFrame: function(id, src){
						if (document.body){
							var ifrm = document.createElement("iframe"); 
							ifrm.setAttribute("id", id); 
							ifrm.setAttribute("src", src); 
							ifrm.setAttribute("width", "0");
							ifrm.setAttribute("height", "0");
							ifrm.setAttribute("frameborder", "0");
							document.body.appendChild(ifrm);
							return ifrm.contentWindow;
							gceStart.log.debug(">>> ac123.main.addBackgroundFrame >> ok"); 
						} else {
							gceStart.log.debug(">>> ac123.main.addBackgroundFrame >> body is null");
						}
						return null;
					},
					subscribeEvent : function(el, event, func, flag){
						if (el.addEventListener) {
							// For standards-compliant web browsers
							el.addEventListener(event, func, flag);
						} else {
							var b = el.attachEvent("on"+event, func);
						}
					},

					unSubscribeEvent : function(el, event, func, flag){
						if (el.removeEventListener) {
							// For standards-compliant web browsers
							el.removeEventListener(event, func, flag);
						} else {
							el.detachEvent("on"+event, func);
						}
					},

					stopEvtPrepagation: function (e){
						if (!e){ gceStart.log.debug("empty event passed to stopEvtPrepagation"); }
						e.cancelBubble = true; // IE8
						if(e.stopPrepagation) e.stopPrepagation(); // FF&GC
						if(e.preventDefault) e.preventDefault(); // IE9+
					}
				}
			}());


			var acm = ac123.main;
			acm.loadScript("acStart", acm.serverName + "/acStrt/acStart.js");
			
		}
	}
}());

