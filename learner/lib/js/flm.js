/************************************************************************************************************
FinPa New Media JavaScript Framework Base Library
version: 1.2.0
Copyright (c) 2007 - 2011 FinPa New Media. All rights reserved.

Naming Convention: Captial case for namespace, pascal lower Case for functions.
************************************************************************************************************/

// The FinPa global namespace object. Everything is under this to avoid any confliction with other frameworks.
if (typeof FinPa == "undefined") {var FinPa = {};};

/*
 * Returns the namespace specified and creates it if it doesn't exist.
 * All namespace will be under FinPa global namespace object.
 * Don't use reserved words in naming.
 */
FinPa.namespace = function() {
    var a=arguments, o=null, i, j, d;
    for (i=0; i<a.length; i=i+1) {
        d=a[i].split(".");
        o=FinPa;

        // FinPa is implied, so it is ignored if it is included
        for (j=(d[0] == "FinPa") ? 1 : 0; j<d.length; j=j+1) {
            o[d[j]]=o[d[j]] || {};
            o=o[d[j]];
        }
    }

    return o;
};

// Extend object properties, returns destination
FinPa.extendObject = function(dest, source, replace) {
	for(var prop in source) {
		if(replace == false && dest[prop] != null) { continue; }
		dest[prop] = source[prop];
	}
	return dest;
};

/*
 * Javascript Array extensions
 */
FinPa.extendObject(Array.prototype, {
    contains: function (value) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == value) {
                return true;
            }
        }
        return false;
    },
    add: function (value) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == value) {
                return;
            }
        }
        this.push(value);
    },
    remove: function (value) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == value) {
                this.splice(i, 1); 
                return; 
            }
        }
    }
}, true);

// Debugger wrapper
FinPa.Debug = new function() {

    var host = window.location.hostname.toLowerCase();
    var debugging = (host == "localhost" || host.slice(host.length - 13) == ".finpadev.com");

    this.on = function() { debugging = true; };
    this.off = function() { debugging = false; };

    this.log = function(msg) {
        if (!debugging) return;
        try { console.log(this.timestamp() + ": " + msg); } catch (e) {};
    };

    this.error = function(msg) {
        if (!debugging) return;
        try { console.error(this.timestamp() + ": " + msg); } catch (e) { };
    };

    // a time stamp of hour : minutes : seconds . milliseconds
    this.timestamp = function() {
        var d = new Date();
        return d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + "." + d.getMilliseconds();
    };

};

FinPa.addEvent = function(o, evType, f, capture) {
    if (o == null) { return false; }
    if (o.addEventListener) {
        o.addEventListener(evType, f, capture);
        return true;
    } else if (o.attachEvent) {
        var r = o.attachEvent("on" + evType, f);
        return r;
    } else {
        try { o["on" + evType] = f; } catch (e) { }
    };
};

FinPa.removeEvent = function(o, evType, f, capture) {
	if(o == null) { return false; }
	if(o.removeEventListener) {
		o.removeEventListener(evType, f, capture);
		return true;
	} else if (o.detachEvent) {
		o.detachEvent("on" + evType, f);
	} else {
	    try { o["on" + evType] = function() { }; }
		catch (e){}
	}
};
/************************************************************************************************************
End of FinPa New Media JavaScript Framework Base Library
************************************************************************************************************/

/************************************************************************************************************
FinPa New Media JavaScript Framework UI Library
version: 1.1.0
Copyright (c) 2008 FinPa New Media. All rights reserved.

Prerequiste: none
************************************************************************************************************/

if (typeof FinPa == "undefined") FinPa = {};
if (typeof FinPa.UI == "undefined") FinPa.UI = {};

FinPa.UI.Browser = new function () {
    // returns height of browser viewport
    this.windowInnerHeight = function () {
        if (typeof jQuery == 'undefined') {
            try { return self.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0; }
            catch (e) { return 0; }
            // Note: FF scrollbar size not reported well.
        }
        else
            return $(window).height();
    };

    // returns width of browser viewport
    this.windowInnerWidth = function () {
        if (typeof jQuery == 'undefined') {
            try { return self.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0; }
            catch (e) { return 0; }
            // Note: FF scrollbar size not reported well.
        }
        else
            return $(window).width();
    };

    // post back window usable height/width information (only post back at most once, won't cause loop)
    this.postbackWindowInnerHeightWidth = function () {
        if (window.location.href.search(/_height=\w*&_width=\w*/) == -1) {
            // add or append querystring		
            var punct = window.location.href.search(/\?/) > 0 ? "&" : "?";
            // call back and tell the server what the window parameters are
            window.location.href += punct + "_height=" + this.windowInnerHeight() + "&_width=" + this.windowInnerWidth();
        }
    };

    // resize textarea rows to show full content
    // Source: http://www.felgall.com/jstip45.htm
    // Note: this only works when the textarea control has columns defined.
    this.resizeTextarea = function (t) {
        a = t.value.split('\n');
        b = 1;
        for (x = 0; x < a.length; x++) {
            if (a[x].length >= t.cols)
                b += Math.floor(a[x].length / t.cols);
        }
        b += a.length;
        if (b > t.rows) t.rows = b;
    };

    // Resize textarea height to show full content. Works without having any columns attribute defined.
    // Textarea shrinks when content is removed if this method is attached to 'onkeyup'.
    // Source: http://stackoverflow.com/questions/995168/textarea-to-resize-based-on-content-length
    this.resizeTextareaNoColsDefined = function (t) {
        t.style.height = "1px";
        t.style.height = (25 + t.scrollHeight) + "px";
    };
};
/************************************************************************************************************
End of FinPa New Media JavaScript Framework UI Library
************************************************************************************************************/

/************************************************************************************************************
FinPa New Media JavaScript Framework Utility Library
version: 1.2.0
Copyright (c) 2007 - 2011 FinPa New Media. All rights reserved.

Prerequiste: none
************************************************************************************************************/

if (typeof FinPa == "undefined") FinPa = {};
if (typeof FinPa.Util == "undefined") FinPa.Util = {};

/*
* HTML input element utilities
*/
FinPa.Util.HtmlInputElement = new function() {

    // read any HTML input elements' value(s)
    this.getValue = function(elementName, delimiterString) {
        if (elementName.length <= 0) return null; // invalid name

        var elements = document.getElementsByName(elementName); // get the collection
        if (elements.length <= 0) return null; // no such element

        var returnValue = "";
        if (delimiterString == null) delimiterString = ","; // make sure valid delimiter

        for (var i = 0; i < elements.length; i++) {

            switch (elements[i].tagName.toLowerCase()) {

                case "input":
                    switch (elements[i].type.toLowerCase()) {
                        case "radio":
                        case "checkbox":
                            if (elements[i].checked) {
                                if (returnValue.length > 0) returnValue += delimiterString;
                                returnValue += elements[i].value;
                            }
                            break;

                        case "text":
                        case "hidden":
                            if (returnValue.length > 0) returnValue += delimiterString;
                            returnValue += elements[i].value;
                            break;

                        default: // other non-input elements such as button/file/password
                            returnValue = null; // we don't read their value
                            break;
                    }
                    break;

                case "select":
                    for (var j = 0; j < elements[i].options.length; j++) {
                        if (elements[i].options[j].selected) {
                            if (returnValue.length > 0) returnValue += delimiterString;
                            returnValue += elements[i].options[j].value;
                        }
                    }
                    break;

                case "textarea":
                    if (returnValue.length > 0) returnValue += delimiterString;
                    returnValue += elements[i].value;
                    break;

            }; // end switch

        }; // end for

        return returnValue;
    };

    // set any HTML input elements' value(s)
    this.setValue = function(elementName, elementValue, delimiterString) {
        if (elementName.length <= 0 || elementValue == null) return false; // invalid name, or no value

        var elements = document.getElementsByName(elementName); // get the collection
        if (elements.length == 0) return false; // no such element

        var elementValueArray = elementValue.split(delimiterString);

        for (var i = 0; i < elements.length; i++) {

            switch (elements[i].tagName.toLowerCase()) {

                case "input":
                    switch (elements[i].type.toLowerCase()) {
                        case "radio":
                        case "checkbox":
                            if (elementValueArray.contains(elements[i].value)) {
                                elements[i].checked = true;
                            }
                            break;

                        case "text":
                        case "hidden":
                            elements[i].value = elementValue;
                            break;

                        default: // other non-input elements such as button/file/password
                            break; // we don't set their value
                    }
                    break;

                case "select":
                    for (var j = 0; j < elements[i].options.length; j++) {
                        if (elementValueArray.contains(elements[i].options[j].value)) {
                            elements[i].options[j].selected = true;
                        }
                    }
                    break;

                case "textarea":
                    elements[i].value = elementValue;
                    break;

            }; // end switch

        }; // end for

        return true;
    };

};

/*
* Query string utility
*/
FinPa.Util.QueryString = new function() {

    var qs = window.location.search;

    if (qs.length > 1)
        qs = qs.substring(1, qs.length); // remove leading question mark
    else
        qs = null;

    this.keyValuePairs = new Array();

    if (qs) {
        for (var i = 0; i < qs.split("&").length; i++) {
            this.keyValuePairs[i] = qs.split("&")[i];
        }
    }

    this.getKeyValuePairs = function() {
        return this.keyValuePairs;
    };

    this.getValue = function(key) {
        for (var j = 0; j < this.keyValuePairs.length; j++) {
            if (this.keyValuePairs[j].split("=")[0].toLowerCase() == key.toLowerCase())
                return unescape(this.keyValuePairs[j].split("=")[1]);
        };
        return "";
    };

    this.getParameters = function() {
        var a = new Array(this.getLength());
        for (var j = 0; j < this.keyValuePairs.length; j++) {
            a[j] = this.keyValuePairs[j].split("=")[0];
        };
        return a;
    };

    this.getLength = function() {
        return this.keyValuePairs.length;
    };
};


/*
* Frame utility
*/
FinPa.Util.HtmlFrame = new function () {

    // load a page into a frame
    this.loadPage = function (frameid, url) {
        if (window.frames[frameid]) {
            window.frames[frameid].location = url;
            return true;
        }
        else
            return false;
    };

    // default resize Iframe height to fit its content, for avoiding scrollbar
    this.resizeIframe = function (frameid) {
        this.resizeIframeToContent(frameid, null, null);
    };

    // default resize Iframe height to fit its content, for avoiding scrollbar, with a minimum height
    this.resizeIframe = function (frameid, minimumHeight) {
        this.resizeIframeToContent(frameid, minimumHeight, null);
    };

    // resize Iframe height to fit its content, for avoiding scrollbar, with a minimum height
    this.resizeIframeToContent = function (frameid, minimumHeight, maximumHeight) {
        var fr = document.getElementById(frameid);
        if (!fr) return;
        var h = getContentDocumentHeight(fr, minimumHeight);
        if (minimumHeight != null && h < minimumHeight) h = minimumHeight;
        if (maximumHeight != null && h > maximumHeight) h = maximumHeight;
        if (fr.height != h && h > 0) fr.height = h;
    };

    // resize Iframe height to fit the window usable height, and leave a margin for other components
    this.resizeIframeToWindow = function (frameid, marginHeight) {
        var fr = document.getElementById(frameid);
        if (!fr) return;
        var h = FinPa.UI.Browser.windowInnerHeight();
        if (marginHeight != null) h -= marginHeight;
        if (fr.height != h && h > 0) fr.height = h;
    };

    // resize Iframe height to fit both its content and the window usable height, and leave a margin for other components
    this.resizeIframeToWindowAndContent = function (frameid, marginHeight) {
        var usableHeight = FinPa.UI.Browser.windowInnerHeight();
        if (marginHeight != null) usableHeight -= marginHeight;
        this.resizeIframeToContent(frameid, null, usableHeight);
    };

    // ====================================================	
    // Private Methods

    // get Iframe's content html document height (document needs to be in the the same domain)
    // ref: http://www.dynamicdrive.com/dynamicindex17/iframessi2.htm
    // improved: http://www.webdeveloper.com/forum/showthread.php?t=123808
    // fixed for browser versions: http://w3schools.invisionzone.com/index.php?showtopic=26417
	// workaround to accommodate absolute positioned elements: http://stackoverflow.com/questions/11646075/get-height-of-document-content-including-absolute-fixed-positioned-elements
    function getContentDocumentHeight(frameElement, minimumHeight) {
	
		// only use this method for course content
		if (frameElement.id == 'coursecontent') {		
			// ignore fancy box content as the height of this is set after this method is called and should be within dimensions of content
			var els = $(frameElement.contentWindow.document.body).find('*').not('#fancybox-content *');
			if(els.length > 0) {
				var max = els[0].scrollTop + $(els[0]).outerHeight(true);
				for (var i = 1; i < els.length; i++) {
				  max = Math.max(max, els[i].scrollTop + $(els[i]).outerHeight(true));
				}
				return max;
			}
			return minimumHeight;
		}
		
		// other wise, use scroll height
		if (frameElement.contentDocument) {
            return frameElement.contentDocument.documentElement.scrollHeight; //FF 3.0.11, Opera 9.63, and Chrome
        } else {
            return frameElement.contentWindow.document.body.scrollHeight; //IE6, IE7 and Chrome
        }
    };
};

/*
* Cookie utility
*/
FinPa.Util.Cookie = new function() {

    this.createCookie = function(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        }
        else var expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
    };

    this.readCookie = function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        };
        return null;
    };

    this.eraseCookie = function(name) {
        this.createCookie(name, "", -1);
    };
};

/*
* Safe Sliding Job Control
*/
FinPa.Util.JobControl = new function () {

    // Start job monitor, to support a sliding algorithm, and stop after a long time, to make sure no dead loop to repeat the job
    //      jobFunction: the real job function, must return boolean. True to indicate the completion of the job.
    //      onCompletedFunction: fucntion to call on job completion
    this.startMonitor = function (jobFunction, onCompletedFunction) {
        startJob(function () {
            if (jobFunction()) {
                stopJob();
                if (onCompletedFunction != null) onCompletedFunction();
            }
        });
    };

    // cancel job, and don't trigger onCompletedFunction
    this.cancelJob = function () {
        stopJob();
    };

    // Set maximum number of job repeats, default to 1000
    this.setMaxNumberOfRepeats = function (value) {
        maxNumberOfRepeats = value;
    };

    // Set starting interval in seconds, default to 1.5
    this.setStartingIntervalSeconds = function (value) {
        if (value > 0) startingIntervalSeconds = value;
    };

    // Set sliding definition - an array of objects. Set to null to turn off sliding
    this.setSlidingDefinition = function (value) {
        slidingDefinition = value;
    };

    // Private variables
    var jobControl_function = null;
    var counter = 0;
    var intervalId = 0;
    var currentInterval = -1;
    var maxNumberOfRepeats = 1000;   // default to 1000 times
    var startingIntervalSeconds = 3;    // default to 3 seconds
    var slidingDefinition = new Array(
        { "From": 0, "To": 20, "Seconds": 3 },
        { "From": 21, "To": 100, "Seconds": 5 },
        { "From": 101, "To": 200, "Seconds": 10 },
        { "From": 201, "To": 300, "Seconds": 20 },
        { "From": 301, "To": 400, "Seconds": 30 },
        { "From": 401, "To": 500, "Seconds": 40 },
        { "From": 501, "To": 1000, "Seconds": 60 }
    );

    function startJob(aFunction) {
        jobControl_function = aFunction;
        counter = 0;
        currentInterval = startingIntervalSeconds;
        intervalId = setInterval("FinPa.Util.JobControl.doPrivateJob();", currentInterval * 1000);
    };

    function stopJob() {
        clearInterval(intervalId);
        currentInterval = -1;
    };

    // don't call this by external, just for setInterval() to work, so expose it.
    this.doPrivateJob = function () {
        FinPa.Debug.log("FinPa.Util.JobControl.doPrivateJob - Counter: " + counter);

        if (jobControl_function == null) return;

        counter += 1;

        if (counter > maxNumberOfRepeats) {
            clearInterval(intervalId);
            currentInterval = -1;
            return;
        }

        if (slidingDefinition != null) {
            for (var i = 0; i < slidingDefinition.length; i++) {
                if (slidingDefinition[i].From <= counter && counter <= slidingDefinition[i].To) {
                    if (currentInterval != slidingDefinition[i].Seconds) {
                        FinPa.Debug.log("FinPa.Util.JobControl.doPrivateJob - Change to interval " + slidingDefinition[i].Seconds + " seconds");
                        clearInterval(intervalId);
                        currentInterval = slidingDefinition[i].Seconds;
                        intervalId = setInterval("FinPa.Util.JobControl.doPrivateJob();", currentInterval * 1000);
                    }
                    break;
                }
            }
        }

        jobControl_function();
    };
};
/************************************************************************************************************
End of FinPa New Media JavaScript Framework Utility Library
************************************************************************************************************/

/************************************************************************************************************
FinPa New Media LMS JavaScript Library
version: 1.1.0
Copyright (c) 2007 - 2011 FinPa New Media. All rights reserved.
************************************************************************************************************/

if (typeof FinPa == "undefined") FinPa = {};
if (typeof FinPa.LMS == "undefined") FinPa.LMS = {};

// Help System Library
FinPa.LMS.Help = new function () {

    var contentUrl;
    var HIDE_COOKIE_VALUE = 'h';

    // specify custom help file url, if not using convention
    this.specifyContentAddress = function (url) {
        contentUrl = FlmConfig.HelpRootUrl + url;
    };

    // indicate this page does have help
    this.activate = function () {
        // show the link
        $('#syshelp').css("visibility", "visible");

        // now show the help, if needed
        if (userNeedsHelp()) this.show();
    };

    // show the help, can be activated automatically, or clicked by the user
    this.show = function () {
        // determine help file url
        if (contentUrl == null) {
            var path = document.location.pathname;
            path = path.substr(1, path.length - 1); // remove leading /
            if (path.substr(path.length - 1, 1) == "/") path += "default.aspx"; // append default ASPX page, if ends with /
            contentUrl = FlmConfig.HelpRootUrl + path + ".htm";
        }

        var helpUrl = "/Common/Help.aspx?" + escape(contentUrl);

        // trigger help page
        FinPa.LMS.ClientLib.popupPage(helpUrl);
    };

    // close the help
    this.close = function () {
        parent.parent.$.fancybox.close();
    };

    // show user's choice
    this.showUserPreference = function () {
        document.getElementById('helpchoice').checked = !userNeedsHelp();
    };

    // save user's choice
    this.saveUserPreference = function () {
        // if checked, means to hide the help
        var pref = document.getElementById('helpchoice').checked ? HIDE_COOKIE_VALUE : null;
        var res = FinPa.LMS.Ajax.User.SaveHelpPreference(pref);

        if (res.error != null) {
            // error occurred
        }
        else {
            // update cookie too
            if (pref == null)
                FinPa.Util.Cookie.eraseCookie(FlmConfig.HelpPreferenceCookie);
            else
                FinPa.Util.Cookie.createCookie(FlmConfig.HelpPreferenceCookie, pref, 2);    // 2 days cookie to match our session timeout time
        }
    };

    // get whether the user wants auto displayed help
    function userNeedsHelp() {
        // read help preference from cookie (which came from database)
        var pref = FinPa.Util.Cookie.readCookie(FlmConfig.HelpPreferenceCookie);
        return !(pref != null && pref == HIDE_COOKIE_VALUE);
    };
};

// Discussion System Library
FinPa.LMS.Discussion = new function () {

    var HIDE_COOKIE_VALUE = 'h';

    // save user's choice
    this.saveUserPreference = function (pref) {
        // if checked, means to hide the help
        var res = FinPa.LMS.Ajax.User.SaveDiscussionPreference(pref);

        if (res.error != null) {
            // error occurred
        }
        else {
            // update cookie too
            if (pref == null)
                FinPa.Util.Cookie.eraseCookie(FlmConfig.DiscussionPreferenceCookie);
            else
                FinPa.Util.Cookie.createCookie(FlmConfig.DiscussionPreferenceCookie, pref, 2);    // 2 days cookie to match our session timeout time
        }
    };

    // get whether the user wants auto displayed help
    this.showDiscussionPanel = function () {
        // read help preference from cookie (which came from database)
        var pref = FinPa.Util.Cookie.readCookie(FlmConfig.DiscussionPreferenceCookie);
        return !(pref != null && pref == HIDE_COOKIE_VALUE);
    };
};

// Client library
FinPa.LMS.ClientLib = new function () {

    this.showInfoMessage = function (idMessageDiv, width, mainMessage, subMessage) {
        showMessageBox(idMessageDiv, "messagebox", width, mainMessage, subMessage);
    };

    this.showAlertMessage = function (idMessageDiv, width, mainMessage, subMessage) {
        showMessageBox(idMessageDiv, "alertbox", width, mainMessage, subMessage);
    };

    this.showQuestionMessage = function (idMessageDiv, width, mainMessage, subMessage) {
        showMessageBox(idMessageDiv, "questionbox", width, mainMessage, subMessage);
    };

    function showMessageBox(idMessageDiv, messageClass, width, mainMessage, subMessage) {
        if (typeof jQuery == 'undefined') return;

        var htm = "<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"><tr><td class=\"cnr1\"><img src=\"" + FlmConfig.Spacer + "\" width=\"1\" height=\"1\" alt=\"\" /></td><td class=\"bdr1\"><img src=\"" + FlmConfig.Spacer + "\" width=\"1\" height=\"1\" alt=\"\" /></td><td class=\"cnr2\"><img src=\"" + FlmConfig.Spacer + "\" width=\"1\" height=\"1\" alt=\"\" /></td></tr><tr><td class=\"bdr4\">&nbsp;</td><td><div class=\"content\"><div class=\"icon\">&nbsp;</div><div class=\"text\"><p class=\"main\">" + mainMessage + "</p><p>" + subMessage + "</p></div><div class=\"c\"></div></div></td><td class=\"bdr2\">&nbsp;</td></tr><tr><td class=\"cnr4\"><img src=\"" + FlmConfig.Spacer + "\" width=\"1\" height=\"1\" alt=\"\" /></td><td class=\"bdr3\"><img src=\"" + FlmConfig.Spacer + "\" width=\"1\" height=\"1\" alt=\"\" /></td><td class=\"cnr3\"><img src=\"" + FlmConfig.Spacer + "\" width=\"1\" height=\"1\" alt=\"\" /></td></tr></table>";
        $('#' + idMessageDiv).html(htm).addClass(messageClass).width(width);
    };

    // use fancybox to pop up a page, avoid pop-up window
    this.popupPage = function (url, hasScrolling) {
        if (typeof jQuery == 'undefined') return;

	    var opts = {
		    'width': '100%',
            'height': '100%',
            'transitionIn': 'elastic',
            'transitionOut': 'elastic',
            'type': 'iframe',
            'href': url		
	    };
	    if (hasScrolling === false) {
		    opts.scrolling = 'no';
	    }

        $("#fancy").fancybox(opts);
        $("#fancy").trigger('click');
    };

    this.showFlashMgmtMap = function (map, current, terms) {
        var flashvars = {
            current: current,
            courses: terms[0],
            classes: terms[1],
            certificates: terms[2],
            participants: terms[3],
            participantgroups: terms[4],
            coursesUrl: "Courses.aspx",
            classesUrl: "Classes.aspx",
            certificatesUrl: "Certificates.aspx",
            participantsUrl: "Participants.aspx",
            participantgroupsUrl: "ParticipantGroups.aspx"
        };
        var params = { wmode: "transparent" };
        var attributes = { id: "mmap_sml", align: "middle" };

        swfobject.embedSWF("/asset/mmap_sml.swf", map, "600", "180", "9.0.0", false, flashvars, params, attributes); // must use the same domain for this .swf file
    };

    this.embedListenSWF = function (id, audioFilePath) {
        swfobject.embedSWF(FlmConfig.ListenSwfFile, id, "25", "25", "8", false, { audioFile: audioFilePath }, { wmode: "transparent" }, false);
    };

    this.initialPage = function () {
        try {
			// Code removed, not needed for UI design
        }
        catch (e) {
            // do nothing
        }
    };
};
/************************************************************************************************************
End of FinPa New Media LMS JavaScript Library
************************************************************************************************************/
