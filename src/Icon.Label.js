L.Icon.Label = L.Icon.extend({
	options: {
		/*
		labelAnchor: (Point) (top left position of the label within the wrapper, default is right)
		wrapperAnchor: (Point) (position of icon and label relative to Lat/Lng)
		iconAnchor: (Point) (top left position of icon within wrapper)
		labelText: (String) (label's text component, if this is null the element will not be created)
		*/
		/* Icon options:
		iconUrl: (String) (required)
		iconSize: (Point) (can be set through CSS)
		iconAnchor: (Point) (centered by default if size is specified, can be set in CSS with negative margins)
		popupAnchor: (Point) (if not specified, popup opens in the anchor point)
		shadowUrl: (Point) (no shadow by default)
		shadowSize: (Point)
		*/
		labelClassName: '',
        closeButtonClassName: ''
	},
	
	initialize: function (options) {
		L.Util.setOptions(this, options);
		L.Icon.prototype.initialize.call(this, this.options);
	},

	createIcon: function () {
		return this._createLabel(L.Icon.prototype.createIcon.call(this));
	},
	
	createShadow: function () {
		if (!this.options.shadowUrl) {
			return null;
		}
		var shadow = L.Icon.prototype.createShadow.call(this);
		//need to reposition the shadow
		if (shadow) {
			shadow.style.marginLeft = (-this.options.wrapperAnchor.x) + 'px';
			shadow.style.marginTop = (-this.options.wrapperAnchor.y) + 'px';
		}
		return shadow;
	},

	updateLabel: function (icon, text) {
        text = L.Util.trim((text || "") + "") || this.options.labelText;

        this.options.labelText = text;

        if (!this._labelTextIsSet()) {
            this.hideLabel(icon);
            return;
        }

        //set value of label text div only if it's shown
        if (this._labelIsVisible(icon)) {
		    icon.childNodes[1].childNodes[0].innerHTML = text;
        }
	},

	showLabel: function (icon) {
		if (!this._labelTextIsSet() || this._labelIsVisible(icon)) {
			return;
		}

        icon.childNodes[1].childNodes[0].innerHTML = this.options.labelText;

		icon.childNodes[1].style.display = 'block';
	},

	hideLabel: function (icon) {
		icon.childNodes[1].style.display = 'none';
	},

    setIconText: function (icon, text) {
        this.options.iconText = L.Util.trim(text + "");

        if (icon) {
            icon.childNodes[0].childNodes[0].innerHTML = this.options.iconText;
        }
    },

	_createLabel: function (img) {
        var iconText = L.DomUtil.create('div', 'leaflet-marker-icon-text', img);

        iconText.innerHTML = L.Util.trim((this.options.iconText || "") + "");

		var iconWrapper = document.createElement('div');
        iconWrapper.appendChild(img);

        iconWrapper.className = 'leaflet-marker-icon-wrapper leaflet-zoom-animated';

        var labelWrapper = L.DomUtil.create('div', '', iconWrapper),
            label = L.DomUtil.create('div', '', labelWrapper);

        labelWrapper.className = 'leaflet-marker-iconlabel ' + this.options.labelClassName;

        //do not show label if there is no text
        if (this._labelTextIsSet()) {
            label.innerHTML = this.options.labelText;
        } else {
            labelWrapper.style.display = 'none';
        }

        //show close button and bind handler
        if (this.options.closeButton) {
            var fn = this.options.onCloseButtonClick,
                closeButton = L.DomUtil.create('div', 'leaflet-marker-iconlabel-closebutton ' + this.options.closeButtonClassName, labelWrapper),
                that = this;

            L.DomEvent.addListener(closeButton, 'click', function (e) {
                L.DomEvent.stop(e);
                if (fn && typeof fn === 'function') {
                    fn(that.marker);
                } else {
                    this.parentNode.style.display = 'none';
                }
            });
        }

		//set up label's styles
		labelWrapper.style.marginLeft = this.options.labelAnchor.x + 'px';
		labelWrapper.style.marginTop = this.options.labelAnchor.y + 'px';

		//set up wrapper anchor
		iconWrapper.style.marginLeft = (-this.options.wrapperAnchor.x) + 'px';
		iconWrapper.style.marginTop = (-this.options.wrapperAnchor.y) + 'px';

        //do not show icon wrapper div
        iconWrapper.style.overflow = 'visible';
        iconWrapper.style.height = '0';

		//reset icons margins (as super makes them -ve)
		img.style.marginLeft = this.options.iconAnchor.x + 'px';
		img.style.marginTop = this.options.iconAnchor.y + 'px';

		return iconWrapper;
	},
	
	_labelTextIsSet: function () {
		return typeof this.options.labelText !== 'undefined' && this.options.labelText !== null;
	},

    _labelIsVisible: function (icon) {
        return icon.childNodes[1].style.display !== 'none';
    }
});