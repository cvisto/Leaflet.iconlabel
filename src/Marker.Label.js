L.Marker.Label = L.Marker.extend({
	updateLabel: function (text) {
		this.options.icon.updateLabel(this._icon, text);
	},

	_initIcon: function () {
		if (!(this.options.icon instanceof L.Icon.Label)) {
			throw new Error('Icon must be an instance of L.Icon.Label.');
		}

		L.Marker.prototype._initIcon.call(this);

        this.options.icon.marker = this;
	},

	showLabel: function () {
		this.options.icon.showLabel(this._icon);
	},

	hideLabel: function () {
		this.options.icon.hideLabel(this._icon);
	}
});