SAD.Popup = function(opts) {
    opts = opts || {};
    var self = this;

    var init = function() {
         self.apps = [];

        chrome.runtime.onMessage.addListener(function(msgObj) {
            if (msgObj.action == 'setApps') {
              self.apps = msgObj.apps;
              self.displayApps();
            }
         });

         chrome.runtime.sendMessage({ action: "getApps"});
    };

    self.displayApps = function() {
        var $table = $('#appsTable');
        var $body = $table.find('tbody');
        var $num = $('.num-detections');

        for (var i = 0; i < self.apps.length; i++) {
            var app = self.apps[i];
            $body.append(
                '<tr class="app-row">' +
                    '<td class="app-name">' + 
                      '<span class="app-num">' + (i + 1) + '. </span>' + app.name + '</div>' +
                    '</td>' +
                    '<td>' + app.short_description + '</td>' +
                    '<td>' +
                      '<div class="app-links">' + 
                        '<a href="' + app.website_url + '?ref=fera_ai_app_detector" target="website_' + i + '">website</a>' + 
                        '<a href="' + app.app_store_url + '?ref=fera_ai_app_detector" target="app_store_' + i + '">app store</a>' + 
                      '</div>' +
                    '</td>' +
                '</tr>'
            );
        }

        $num.html(self.apps.length);

        if (self.apps.length < 1) {
            $table.hide();
        } else {
            $table.show();
        }
    }

    init();
};

new SAD.Popup();
