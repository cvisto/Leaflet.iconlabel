!function(e,t,o){L.Icon.Label=L.Icon.extend({options:{labelClassName:"",closeButtonClassName:""},initialize:function(e){L.Util.setOptions(this,e),L.Icon.prototype.initialize.call(this,this.options)},createIcon:function(){return this._createLabel(L.Icon.prototype.createIcon.call(this))},createShadow:function(){if(!this.options.shadowUrl)return null;var e=L.Icon.prototype.createShadow.call(this);return e&&(e.style.marginLeft=-this.options.wrapperAnchor.x+"px",e.style.marginTop=-this.options.wrapperAnchor.y+"px"),e},updateLabel:function(e,t){return t=$.trim(t)||this.options.labelText,this.options.labelText=t,this._labelTextIsSet()?(this._labelIsVisible(e)&&(e.childNodes[1].childNodes[0].innerHTML=t),void 0):(this.hideLabel(e),void 0)},showLabel:function(e){this._labelTextIsSet()&&!this._labelIsVisible(e)&&(e.childNodes[1].childNodes[0].innerHTML=this.options.labelText,e.childNodes[1].style.display="block")},hideLabel:function(e){e.childNodes[1].style.display="none"},_createLabel:function(e){var o=t.createElement("div");o.appendChild(e),o.className="leaflet-marker-icon-wrapper leaflet-zoom-animated";var i=L.DomUtil.create("div","",o),n=L.DomUtil.create("div","",i);if(i.className="leaflet-marker-iconlabel "+this.options.labelClassName,this._labelTextIsSet()?n.innerHTML=this.options.labelText:i.style.display="none",this.options.closeButton){var l=this.options.onCloseButtonClick,s=L.DomUtil.create("div","leaflet-marker-iconlabel-closebutton "+this.options.closeButtonClassName,i),a=this;L.DomEvent.addListener(s,"click",function(e){L.DomEvent.stop(e),l&&"function"==typeof l?l(a.marker):this.parentNode.style.display="none"})}return i.style.marginLeft=this.options.labelAnchor.x+"px",i.style.marginTop=this.options.labelAnchor.y+"px",o.style.marginLeft=-this.options.wrapperAnchor.x+"px",o.style.marginTop=-this.options.wrapperAnchor.y+"px",o.style.overflow="visible",o.style.height="0",e.style.marginLeft=this.options.iconAnchor.x+"px",e.style.marginTop=this.options.iconAnchor.y+"px",o},_labelTextIsSet:function(){return"undefined"!=typeof this.options.labelText&&null!==this.options.labelText},_labelIsVisible:function(e){return"none"!==e.childNodes[1].style.display}}),L.Icon.Label.Default=L.Icon.Label.extend({options:{labelAnchor:new L.Point(29,8),wrapperAnchor:new L.Point(13,41),iconAnchor:new L.Point(0,0),labelText:null,closeButton:!1,onCloseButtonClick:o,iconUrl:L.ROOT_URL+"images/marker.png",iconSize:new L.Point(25,41),popupAnchor:new L.Point(0,-33),shadowUrl:L.ROOT_URL+"images/marker-shadow.png",shadowSize:new L.Point(41,41)}}),L.Marker.Label=L.Marker.extend({updateLabel:function(e){this.options.icon.updateLabel(this._icon,e)},_initIcon:function(){if(!(this.options.icon instanceof L.Icon.Label))throw new Error("Icon must be an instance of L.Icon.Label.");L.Marker.prototype._initIcon.call(this),this.options.icon.marker=this},showLabel:function(){this.options.icon.showLabel(this._icon)},hideLabel:function(){this.options.icon.hideLabel(this._icon)}})}(window,document);