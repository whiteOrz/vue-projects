/*
登录页面弹框 目前没有使用
 
 * */
var shield;
var alertFram;

function sAlertsumbet(d) {
	shield = document.createElement("DIV");
	alertFram = document.createElement("DIV");
	shield.id = "shield";
	shield.style.position = "absolute";
	shield.style.left = "0px";
	shield.style.top = "0px";
	shield.style.width = "100%";
	shield.style.height = ((document.documentElement.clientHeight > document.documentElement.scrollHeight) ? document.documentElement.clientHeight : document.documentElement.scrollHeight) + "px";
	shield.style.background = "#333";
	shield.style.textAlign = "center";
	shield.style.zIndex = "10000";
	shield.style.filter = "alpha(opacity=0)";
	shield.style.opacity = 0;
	alertFram.id = "alertFram";
	alertFram.style.position = "absolute";
	alertFram.style.opacity = "1";
	alertFram.style.left = "50%";
	alertFram.style.top = "50%";
	alertFram.style.marginLeft = "-150px";
	alertFram.style.marginTop = -120 + document.documentElement.scrollTop + "px";
	alertFram.style.width = "300px";
	alertFram.style.height = "50px";
	alertFram.style.textAlign = "center";
	alertFram.style.lineHeight = "20px";
	alertFram.style.zIndex = "10001";
	alertFram.innerHTML = d;
	document.body.appendChild(alertFram);
	document.body.appendChild(shield);
	this.setOpacity = function(f, g) {
		if (g >= 1) {
			g = g / 100
		}
		try {
			f.style.opacity = g
		} catch (c) {}
		try {
			if (f.filters.length > 0 && f.filters("alpha")) {
				f.filters("alpha").opacity = g * 100
			} else {
				f.style.filter = 'alpha(opacity="' + (g * 100) + '")'
			}
		} catch (c) {}
	};
	var b = 0;
	this.doAlpha = function() {
		if (++b > 20) {
			clearInterval(a);
			return 0
		}
		setOpacity(shield, b)
	};
	var a = setInterval("doAlpha()", 1);
	document.body.onselectstart = function() {
		return true
	};
	document.body.oncontextmenu = function() {
		return true
	}
}

function sumbet(b, a, c) {
	document.body.removeChild(a);
	document.body.removeChild(c);
	document.body.onselectstart = function() {
		return false
	};
	document.body.oncontextmenu = function() {
		return false
	};
	a.style.display = "none";
	c.style.display = "none"
}
var missshield = null;
var missalertFram = null;

function sAlert(g, f, d) {
	missshield = document.createElement("DIV");
	missalertFram = document.createElement("DIV");
	missshield.id = "shield";
	missshield.style.position = "absolute";
	missshield.style.left = "0px";
	missshield.style.top = "0px";
	missshield.style.width = "100%";
	missshield.style.height = ((document.documentElement.clientHeight > document.documentElement.scrollHeight) ? document.documentElement.clientHeight : document.documentElement.scrollHeight) + "px";
	missshield.style.background = "#BBB";
	missshield.style.textAlign = "center";
	missshield.style.zIndex = "10000";
	missshield.style.filter = "alpha(opacity=0)";
	missshield.style.opacity = 0;
	missalertFram.id = "alertFram";
	missalertFram.style.position = "absolute";
	missalertFram.style.left = "50%";
	missalertFram.style.top = "50%";
	missalertFram.style.marginLeft = "-150px";
	missalertFram.style.marginTop = -120 + document.documentElement.scrollTop + "px";
	missalertFram.style.width = "300px";
	missalertFram.style.height = "120px";
	missalertFram.style.textAlign = "center";
	missalertFram.style.lineHeight = "20px";
	missalertFram.style.zIndex = "10001";
	var e = '<ul style="list-style:none;margin:0px;padding:0px;width:100%;opacity: 1;">\n';
	e += ' <li style="background:#AAA;text-align:center;font-size:25px;height:120px;line-height:' + d + 'px;border-left:1px solid #F9CADE;border-radius: 5px;border-right:1px solid #F9CADE;font-style:inherit;color: white;">' + g + "</li>\n";
	e += "</ul>\n";
	missalertFram.innerHTML = e;
	document.body.appendChild(missalertFram);
	document.body.appendChild(missshield);
	this.setOpacity = function(h, i) {
		if (i >= 1) {
			i = i / 100
		}
		try {
			h.style.opacity = i
		} catch (c) {}
		try {
			if (h.filters.length > 0 && h.filters("alpha")) {
				h.filters("alpha").opacity = i * 100
			} else {
				h.style.filter = 'alpha(opacity="' + (i * 100) + '")'
			}
		} catch (c) {}
	};
	var b = 0;
	this.doAlpha = function() {
		if (++b > 20) {
			clearInterval(a);
			return 0
		}
		setOpacity(shield, b)
	};
	var a = setInterval("doAlpha()", 1);
	document.body.onselectstart = function() {
		return true
	};
	document.body.oncontextmenu = function() {
		return true
	};
	setTimeout("hide(missalertFram,missshield)", f)
}

function hide(a, b) {
	document.body.removeChild(a);
	document.body.removeChild(b);
	document.body.onselectstart = function() {
		return false
	};
	document.body.oncontextmenu = function() {
		return false
	};
	a.style.display = "none";
	b.style.display = "none"
};