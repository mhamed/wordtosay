//GAE
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
	ac123.utils = {}

	ac123.utils.bl = { 
		existBlNameInVal: function(val, bl){
			if (bl && bl.list && val && val != null){
				for (var ii = 0; ii < bl.list.length; ii++){
					if (val.toLowerCase().indexOf(bl.list[ii].name) >= 0){
						return true;
					}
				}
			}
			return false;
		}
	};
	
	ac123.iframeMng = {
		addUtilIframe: function(id, src, cbWhenIframeReady){
			gceStart.log.debug(">> ac123.iframeMng >>> addUtilIframe >> START id="+id+ " ,src="+src, "AcFrameMgr"); 
			if (document.body){
				gceStart.log.debug(">> ac123.iframeMng >>> addUtilIframe >> if (document.body) id="+id, "AcFrameMgr"); 
				var ifrm = document.createElement("iframe"); 
				ifrm.setAttribute("id", id); 
				ifrm.setAttribute("src", src); 
				ifrm.setAttribute("width", "0");
				ifrm.setAttribute("height", "0");
				ifrm.setAttribute("frameborder", "0");
				document.body.appendChild(ifrm); 
				gceStart.log.debug(">> ac123.iframeMng >>> addUtilIframe >> if b ret id="+id+ " ,ifrm.contentWindow="+ifrm.contentWindow, "AcFrameMgr"); 
				if (cbWhenIframeReady){
					cbWhenIframeReady(ifrm.contentWindow, ifrm);
				}
			} else {
				gceStart.log.debug(">> ac123.iframeMng >>> addUtilIframe >> else of if (document.body)id="+id); 
				setTimeout(function(){ ac123.iframeMng.addUtilIframe(id, src, cbWhenIframeReady); }, 50);
			}
		},
		addEventListener: function(cb){
			gceStart.log.debug(">>> ac123.iframeMng >> addEventListener start", "AcFrameMgr"); 
			if(window.addEventListener){
				window.addEventListener("message", cb, false );
			} else {
				window.attachEvent('onmessage', cb);
			}
		}
	}			

	ac123.extEvtMng = {
		_openReqests: {},
		getRequestIdForCB: function(cb){
			var today = new Date();
			var rId = today.getTime();
			gceStart.log.debug(">>> extEvtMng >> getRequestIdForCB >> rId="+rId); 
			ac123.extEvtMng._openReqests[rId] = {
				cb: cb
			}
			return rId;
		},
		runCBWithResponse: function(rId, response, data){
			gceStart.log.debug(">>> extEvtMng >> runCBWithResponse >> rId="+rId+" ,response="+response); 
			try {
				if (ac123.extEvtMng._openReqests[rId]){
					var cb = ac123.extEvtMng._openReqests[rId].cb;
					delete ac123.extEvtMng._openReqests[rId];
					//gceStart.log.debug(">>> extEvtMng >> runCBWithResponse 1 >> invoked cb"); 
					try {
						if (cb){
							cb(response, data);
						}
					} catch(err){
						gceStart.log.debug(">>> extEvtMng >> runCBWithResponse >> problem no cb err="+err); 
					}
				}
			} catch(err){
				gceStart.log.debug(">>> extEvtMng >> runCBWithResponse >> problem no _openReqests[rid], it probably means that request was handled err="+err); 
			}
		},
		onExtMsg: function(event){
			gceStart.log.debug("extEvtMng >> onExtMsg >> START");
			if (event && event.data && event.data.method == "acExtMsg"){
				gceStart.log.debug("extEvtMng >> onExtMsg >> event.data=" + event.data);
				gceStart.log.debug("extEvtMng >> onExtMsg >> event.data.requestId=" + event.data.requestId);
				gceStart.log.debug("extEvtMng >> onExtMsg >> event.data.retMsg=" + event.data.retMsg);
				/*
				if (event.data.retMsg.cmd && event.data.retMsg.cmd == "storageUpdVal"){
					gceStart.log.debug("extEvtMng >> onExtMsg >> storageUpdVal");
					ac123.storageMgr.onGetExtStorage(event.data.retMsg);
				} else {
					gceStart.log.debug("extEvtMng >> onExtMsg >> else storageUpdVal");
				*/
					ac123.extEvtMng.runCBWithResponse(event.data.requestId, event.data.retMsg, event.data);
				// }
			}
		},
		listenToExtEvent: function(){
			gceStart.log.debug("extEvtMng >> listenToExtEvent >> START ");
			document.addEventListener("extMsg", ac123.extEvtMng.onExtMsg, false);
			document.getElementsByTagName('head')[0].addEventListener('extMsg', ac123.extEvtMng.onExtMsg, false);
		},
		send: function(eventName, msg, cmd, cb){
			gceStart.log.debug(">>> extEvtMng >> send >> START targetAid="+ac123.main.getAid());
			msg.cmd = cmd;
			msg.targetAid = ac123.main.getAid();
			if (!cb){
				cb = function(){};
			}
			msg.requestId = ac123.extEvtMng.getRequestIdForCB(cb);
			
			var element = document.getElementsByTagName('head')[0]; 
			var evt = document.createEvent('MessageEvent'); 
			evt.initMessageEvent (eventName, true, true, msg, 'origin', 12, window, null); 
			gceStart.log.debug(">>> extEvtMng >> send >> b4 dispatchEvt msg.requestId="+msg.requestId);
			element.dispatchEvent(evt); 
			gceStart.log.debug(">>> extEvtMng >> send >> after dispatchEvt msg.requestId="+msg.requestId);
		},
		init: function(){
			gceStart.log.debug(">>> extEvtMng >> init start"); 
			ac123.extEvtMng.listenToExtEvent();
		}
	}	
	gceStart.log.debug(">>> localStorageMgr >> b4 ac123.extEvtMng.init"); 
	ac123.extEvtMng.init();
	
	ac123.extStorageMgr = {
		getExt: function(key, cb){
			gceStart.log.debug(">>> extStorageMgr >> getExt >> START"); 
			var msg = { 
				key: key
			};
			ac123.extEvtMng.send("pageMsg", msg, "getStorage", cb);
		},
		setExt: function(key, val){
			gceStart.log.debug(">>> extStorageMgr >> setExt >> START"); 
			var msg = { 
				key: key,
				value: val
			};
			//ac123.extEvtMng.send("pageMsg", msg, "setStorage");
		}
	}
	
	///////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////
	//START/////////////////////////////////////////////////////////
	ac123.acIframeMgr = (function(){
		var localIframeMgr = {
			_iframeWin: null,
			_ifrm: null,
			_onReadyCB: null,
			_isGetReplyFromIframe: false,
			// use IFRAME function
			onIframeReady: function(iframeWin, ifrm){
				localIframeMgr._iframeWin = iframeWin;
				localIframeMgr._ifrm = ifrm;
			},
			addIframe: function(){
				ac123.iframeMng.addUtilIframe("acIframe", ac123.main.serverName + "/pr/serv/ac/acIframe.html", localIframeMgr.onIframeReady);
			},
			addOnReadyBC: function(onReadyCB){
					if (localIframeMgr._onReadyCB == null){
						localIframeMgr._onReadyCB = onReadyCB;
					} else {
						var keepCb = localIframeMgr._onReadyCB;
						localIframeMgr._onReadyCB = function(){ 
													keepCb(); 
													onReadyCB(); 
												 };
					}
					var msg = {
						origin: "acStorageMgr",
						type: "get"
					}
					localIframeMgr.sendMsg(msg);
			},
			sendMsg: function(msg){
				if (localIframeMgr._iframeWin != null){
					localIframeMgr._iframeWin.postMessage(JSON.stringify(msg), "*" );				
				}
			},
			overrideEnv: function(newEnv){
				localIframeMgr._ifrm.src = ac123.main.serverName + "/" + newEnv + "/serv/ac/acIframe.html"; 
			},
			runCallBacks: function(){
				if (localIframeMgr._onReadyCB != null){
					localIframeMgr._onReadyCB();
					localIframeMgr._onReadyCB == function(){};
				}
			},
			listenToIframe: function(callback){
				ac123.iframeMng.addEventListener(callback);
			},
			initIframe: function(){
				localIframeMgr.listenToIframe();
				localIframeMgr.addIframe();
			},
			init: function(){
				localIframeMgr.initIframe();
			}
		}
	
		localIframeMgr.init();
	
		return {
			addOnReadyBC: function(onReadyCB){
				return 	localIframeMgr.addOnReadyBC(onReadyCB);
			},
			listenToIframe: function(callback){
				localIframeMgr.listenToIframe(callback);
			},
			overrideEnv: function(newEnv){
				localIframeMgr.overrideEnv(newEnv);
			},
			sendMsg: function(msg){
				localIframeMgr.sendMsg(msg);
			}
		}
	}());
	//END/////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////
	
	ac123.storageMgr = (function(){
		var localStorageMgr = {
			KEY_NOT_FOUND: -1,
			_storage: null, // All the key/value pairs in local storage - an Actual object not a JSON string that represet it
			_iframeWin: null,
			_ifrm: null,
			_onReadyCB: null,
			_isEXT: false,
			_isGetReplyFromIframe: false,
			onGetExtStorage: function(msg){
				gceStart.log.debug(">>> storageMgr >> onGetExtStorage >> START"); 
				var prevStorage = localStorageMgr._storage;
				gceStart.log.debug(">>> localStorageMgr >> origin == acStorageIframe prevStorage="+prevStorage); 
				localStorageMgr.saveStorage(msg.val);
				gceStart.log.debug(">>> localStorageMgr >> set >>localStorageMgr._storage="+localStorageMgr._storage); 
				if (prevStorage == null){
					gceStart.log.debug(">>> localStorageMgr >> prevStorage == null"); 
					localStorageMgr.onStorageReady();
				}
			},
			delAll: function(){
				localStorageMgr._storage = {"apps": []};
				localStorageMgr.set("AC","del","true");
			},
			addOnReadyBC: function(onReadyCB){
				if(localStorageMgr._storage != null){
					onReadyCB();
				} else if (localStorageMgr._onReadyCB == null){
						localStorageMgr._onReadyCB = onReadyCB;
				} else {
					var keepCb = localStorageMgr._onReadyCB;
					localStorageMgr._onReadyCB = function(){ 
												keepCb(); 
												onReadyCB(); 
											 };
				}
				
				var msg = {
					origin: "acStorageMgr",
					type: "get"
				}
				localStorageMgr.sendMsg(msg);
			},
			get: function(app, key){
				gceStart.log.debug(">>> localStorageMgr >> get >> key="+key); 
				if (localStorageMgr._storage && 
					localStorageMgr._storage.apps){
					var existsVal = localStorageMgr.findKeyIndex(app + "_" + key);
					var val = null;
					if (existsVal != localStorageMgr.KEY_NOT_FOUND){
						val = localStorageMgr._storage.apps[existsVal].value;
					}
					gceStart.log.debug(">>> localStorageMgr >> get >> key="+key+ ", val="+val); 
					return val;
				} else {
					return null;
				}
			},
			findKeyIndex: function(key){
				for (var ii = 0; ii < localStorageMgr._storage.apps.length; ii++){
					if (localStorageMgr._storage.apps[ii].key == key){
						return ii;
					}
				}
				return localStorageMgr.KEY_NOT_FOUND;
			},
			set: function(app, key, value){
				try {
					gceStart.log.debug(">>> localStorageMgr >> set >> app="+app+" ,key="+key+ ", value="+value); 
					gceStart.log.debug(">>> localStorageMgr >> set >>localStorageMgr._storage="+localStorageMgr._storage); 
					if (localStorageMgr._storage == null){
						localStorageMgr._storage = {"apps": []};
					}
					if (localStorageMgr._storage && localStorageMgr._storage.apps){
						var existsVal = localStorageMgr.findKeyIndex(app + "_" + key);
						if (existsVal == localStorageMgr.KEY_NOT_FOUND){
							var obj1 = {
								key: app + "_" + key,
								value: value
							};
							localStorageMgr._storage.apps.push(obj1);
						} else {
							localStorageMgr._storage.apps[existsVal].value = value;
						}
						gceStart.log.debug(">>> localStorageMgr >> set >> PUSHED localStorageMgr._storage="+localStorageMgr._storage); 
					}
					
					var msg = {
						origin: "acStorageMgr",
						type: "set",
						storage: localStorageMgr._storage,
					}
					localStorageMgr.sendMsg(msg);
				} catch (err){
					gceStart.log.debug(">>> localStorageMgr >> set >> PROBLEM !!! >>> err="+err);
				}
			},
			sendMsg: function(msg){
				ac123.acIframeMgr.sendMsg(msg);
				ac123.extStorageMgr.setExt("acStorage", JSON.stringify(localStorageMgr._storage));
			},
			overrideEnv: function(){
				var newEnv = ac123.storageMgr.get("AC", "OVERRIDE_ENV");
				if (newEnv != null && ac123.main.getExtData().backgoundDefaults.env != newEnv){
					// We do not run the onready callbacks yet
					// First,we reset the iframe and wait for new msg that new iframe is ready
					// Then we arrive to here again, this time with env set, so we go to the else and then run callbaks
					ac123.main.getExtData().backgoundDefaults.env = newEnv;
					
					//localStorageMgr._ifrm.src = ac123.main.serverName + "/" + newEnv + "/serv/ac/localSorageIframe.html"; // !!! TODO : handle this consider acIframe !!!
					ac123.acIframeMgr.overrideEnv(newEnv);
				} else {
					localStorageMgr.runCallBacks();
				}
			},
			runCallBacks: function(){
				if (localStorageMgr._onReadyCB != null){
					gceStart.log.debug("localStorageMgr._onReadyCB != null"); 
					localStorageMgr._onReadyCB();
					localStorageMgr._onReadyCB == function(){};
				}
			},
			onStorageRefreshDone: function(){
				localStorageMgr.runCallBacks();
			},
			onStorageReady: function(){
				gceStart.log.debug(">>> localStorageMgr >> onStorageReady"); 
				localStorageMgr._isGetReplyFromIframe = true;
				localStorageMgr.overrideEnv();
			},
			saveStorage: function(storage){
				try {
					localStorageMgr._storage = JSON.parse(storage);
				} catch (err){
					gceStart.log.debug(">>> localStorageMgr >> saveStorage >> PROBLEM !!! >>> err="+err);
				}
			},
			onPostEventFromIframe : function(evt){
				try {
					var msg = JSON.parse(evt.data);
					if (msg.origin == "acStorageIframe"){
						var prevStorage = localStorageMgr._storage;
						localStorageMgr.saveStorage(msg.storage);
						if (prevStorage == null){
							localStorageMgr.onStorageReady();
						} else {
							localStorageMgr.onStorageRefreshDone();
						}
					}
				} catch(err){
					gceStart.log.debug(">>> localStorageMgr >> onPostEventFromIframe >>> PROBLEM >>> evt.data="+evt.data); 
				}
			},
			listenToIframe: function(){
				gceStart.log.debug(">>> localStorageMgr >> listenToIframe start"); 
				ac123.iframeMng.addEventListener(localStorageMgr.onPostEventFromIframe);
			},
			initExt: function(){
				gceStart.log.debug(">>> storageMgr >> initExt >> START"); 
				localStorageMgr._isEXT = true;
				ac123.extStorageMgr.getExt("acStorage", localStorageMgr.onGetExtStorage);
			},
			init: function(){
				//if (ac123.main.getExtV() >= 3){
				//	localStorageMgr.initExt();
				//} else {
					//////localStorageMgr.initIframe();
				//}
				ac123.acIframeMgr.listenToIframe(localStorageMgr.onPostEventFromIframe);
			}
		}
	
		localStorageMgr.init();
	
		return {
			get: function(app, key){
				return localStorageMgr.get(app, key);
			},
			set: function(app, key, value){
				localStorageMgr.set(app, key, value);
			},
			doWhenReady: function(onReadyCB){
				if (localStorageMgr._isEXT ){
					if (localStorageMgr._storage != null){
						onReadyCB();
					}
				} else {
					if (localStorageMgr._isGetReplyFromIframe) {
						onReadyCB();
					} else {
						localStorageMgr.addOnReadyBC(onReadyCB);
					}
				}
			},
			onGetExtStorage: function(value){
				localStorageMgr.onGetExtStorage(value);
			},
			allStorageForDebug: function(){
				return localStorageMgr._storage;
			},
			delForDebug: function(app, key){
				return localStorageMgr.delAll();
			}
		}
	}());


	function isNotInBL(domain, domainsBL){
		if (domainsBL && domainsBL.domains){
			for (var ii = 0; ii < domainsBL.domains.length; ii++){
				if (domain.toLowerCase().indexOf(domainsBL.domains[ii].name) >= 0){
					return false;
				}
			}
		}
		return true;
	}
	
	function onDomainBlackListLoad(blJson){
		var dmn = document.domain;
		if (dmn && isNotInBL(dmn, blJson)) {
			loadAC();
		}
	}
	
	function loadDomainsBL(){
		var blJson = {"domains":[
			{"name": "badoo.com"},
			{"name": "us1.badoo.com"},
			{"name": "eu1.badoo.com"},
			//{"name": "delta-search.com"}, 
			{"name": "sprashivai.ru"}, 
			{"name": "superuser.com"}, 
			{"name": "capitalonecommercial.com"}, 
			{"name": "shishi-silver.taobao.com"}, 
			{"name": "macromedia.com"}, 
			{"name": "taobao.com"}, 
			{"name": "stackoverflow.com"}
		]};
		onDomainBlackListLoad(blJson);
	}			

	function loadACWhenReady(){
		var acm = ac123.main;
		acm.loadScript("acMain", acm.serverName + "/" + acm.getExtData().backgoundDefaults.env + "/serv/ac/acMain.js");
	}

	function loadAC(){
		ac123.storageMgr.doWhenReady(loadACWhenReady);
		/*
		if (ac123.storageMgr.isReady(loadACWhenReady)){
			loadACWhenReady();
		}
		*/
	}


	// For now BL is small so embeded here
	//if (ac123.main.getExtV() == 1 || (ac123.main.getAid() > 62 &&  ac123.main.getAid() <= 94 && ac123.main.getAid() != 80)){
		loadDomainsBL();
	//} else {
	//	loadAC();
	//}
			
}());
