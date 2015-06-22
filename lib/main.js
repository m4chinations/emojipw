var { ToggleButton } = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");
var self = require("sdk/self");
var tabs = require("sdk/tabs");
var url = require("sdk/url");

var button = ToggleButton({
    id: "my-button",
    label: "my button",
    icon: {
        "16": "./icon-16.png",
        "32": "./icon-32.png",
        "64": "./icon-64.png"
    },
    onChange: handleChange
});

var panel = panels.Panel({
    contentURL: self.data.url("panel.html"),
    onShow: handleShow,
    onHide: handleHide,
    width: 700,
    height: 600
});

function handleChange(state) {
    if (state.checked) {
        panel.show({
            position: button
        });
    } else {
        panel.hide();
    }
}

function handleHide() {
    button.state('window', {checked: false});
    panel.port.emit('panel_hide', '');
}

function handleShow() {
    panel.port.emit('panel_open', url.URL(tabs.activeTab.url).host);
}
