(function ($, window, document, undefined) {
    var Socials,
        SocialButtons;

    Socials = {
        fb: {
            url: "https://graph.facebook.com/?id=",
            callback: function (data) {
                console.log('fb', data);
                if (data && data.shares) {
                    this.count = data.shares;
                } else {
                    this.count = 0;
                }
            },
            share: "http://www.facebook.com/sharer/sharer.php?u="
        },
        vk: {
            url: "https://vk.com/share.php?act=count&url=",
            callback: function (data) {
                // VK.com doesn't support callback parametr for JSONP
                // This callback will never be called
            },
            share: "https://vk.com/share.php?url="
        },
        tw: {
            url: "https://cdn.api.twitter.com/1/urls/count.json?url=",
            callback: function (data) {
                console.log('tw', data);
                if (data && data.count) {
                    this.count = data.count;
                } else {
                    this.count = 0;
                }
            },
            share: "https://twitter.com/intent/tweet?url="
        },
        ln: {
            url: "https://www.linkedin.com/countserv/count/share?format=jsonp&url=",
            callback: function (data) {
                console.log('ln', data);
                if (data && data.count) {
                    this.count = data.count;
                } else {
                    this.count = 0;
                }
            },
            share: "https://www.linkedin.com/cws/share?url="
        },
        pt: {
            url: "http://api.pinterest.com/v1/urls/count.json?url=",
            callback: function (data) {
                console.log('pt', data);
                if (data && data.count) {
                    this.count = data.count;
                } else {
                    this.count = 0;
                }
            },
            // Have some trouble with this
            share: "https://www.pinterest.com/pin/create/bookmarklet/?description=&url="
        }
    };

    SocialButtons = {
        init: function (options, el) {
            var self = this,
                $el = $(el),
                network = $el.data("social"),
                oSocial = Socials[network];


            if (oSocial) {
                /**
                * VK.com doesn't support callback parameter for JSONP
                * VK.com wanna call VK.Share.count()
                */
                if (network === "vk") {
                    window.VK = window.VK || {};
                    window.VK.Share = VK.Share || {};
                    window.VK.Share.count = function (index, count) {
                        Socials["vk"].count = count;
                    }
                }

                options = options || {};

                if (options.url) {
                    self.shareUrl = options.url;
                } else {
                    self.shareUrl = window.location.href;
                }

                if (oSocial.url) {
                    $.getScript(
                        oSocial.url + self.shareUrl + "&callback=jQuery.fn.socialButtons." + network + "SetCount",
                        function(data, textStatus, jqxhr) {
                            $el.attr("data-count", oSocial.count);
                        }
                    );
                }

                if (oSocial.share) {
                    $el.on("click.socialButtons", function () {
                        window.open(
                            oSocial.share + self.shareUrl, 
                            '', 
                            'menubar=no,toolbar=no,resizable=yes' + 
                            ',scrollbars=yes' +
                            ',height=300,width=600'
                        );
                    });
                }
            }
        },
        setCount: function (network, count) {
            
        },
        getCount: function () {
            
        }
    };

    $.fn.socialButtons = function(options) {
        return this.each(function () {
            var socialButtons = Object.create(SocialButtons);

            if (SocialButtons[options]) {
                return SocialButtons[options].apply(this, Array.prototype.slice.call(arguments, 1));
            } else if (typeof options === 'object' || typeof options === 'undefined') {
                return socialButtons.init(options, this);
            } else {
                $.error('"' + options + '" method does not exist in jQuery.switcher');
            }
        });
    };

    for (var network in Socials) {
        if (Socials.hasOwnProperty(network)) {
            $.fn.socialButtons[network + "SetCount"] = Socials[network].callback.bind(Socials[network]);
        }
    }

}(jQuery, window, document));