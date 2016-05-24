{
        "componentId": "wapIdentityList",
        "identityList": [{
            "componentId": "wapIdentity",
            "identityURL": "",
            "identityDescription": "透明理赔"
        }, {
            "componentId": "wapIdentity",
            "identityURL": "",
            "identityDescription": "超值低价"
        }, {
            "componentId": "wapIdentity",
            "identityURL": "",
            "identityDescription": "热销爆款"
        }]
}

<div id='wapIdentityList'>
for identityList
    <div id='wapIdentity'>
        <img src='$identityList[i].identityURL' /><span>$identityList[i].identityDescription</span>
    </div>
endfor
</div>


#foreach($wapIdentity in $identityList)
	<div id=wapIdentity>< img src='$!wapIdentity.identityURL' /><span>$!wapIdentity.identityDescription</span></div>
#end
