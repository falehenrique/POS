/*global app: false, Backbone: false, JST: false, $: false, require: false, TimePick: false, _: false */

(function () {
    "use strict";

    // if the module does not exist
    app.mod.search_location = app.mod.search || {};

    // Creates the Home view
    app.mod.search_location.View = Backbone.View.extend({

        // page class name 
        className: 'search_location page',

        // Mehtod fired when the view is initialized
        initialize: function () {
            app.mediator.fire('viewchangeheader', ['KEY_SEARCH_LOCATION_TTL', true]);

            /* configure footer buttons */
            app.mediator.fire('viewchangefooter', [true, {
                keyLabel: "KEY_CONFIRM",
                keySubLabel: "KEY_LOCATION",
                callback: function () {
                    var $item = $(".location-item:first-child");
                    if ($item.length) {
                        localStorage.setItem("actualAddress", $item.text().trim());
                    }

                },
                nextPage: "#home",
                buttonIcon: "btn-checkicon"
            }]);
        },

        // function that renders the veiw
        render: function () {
            this.$el.html(JST["src/app/templates/search_location.tpl"]());

            $("#textSearch", this.$el[0]).attr("placeholder", app.strings.labelList.KEY_TEXT_SEARCH_LOCATION);

            return this.$el[0];
        },

        // function fired when the DOM is rendered
        load: function () {
            $("#textSearch").focus();

            $(".input").on("mouseup", function () {
                $("#textSearch").focus();
            });

            $(".search_location").on("mouseup", ".location-item", function () {
                var $container = $(".location-container"),
                    $this = $(this);
                $container.empty();
                $container.html($this);
                $("#textSearch").val($this.text().trim());
            });

            var len = -1,
                isexec = false,
                toexec = null,
                func = function (response) {
                    if (response.status !== "OK" && response.status !== "ZERO_RESULTS") {
                        app.mediator.fire('modal', [response.status, 'alert-danger']);
                    } else {
                        var $container = $(".location-container");
                        $container.empty();
                        _.each(response.results, function (result) {
                            $container.append(JST["src/app/templates/location_item.tpl"]({
                                address: result.formatted_address
                            }));
                        });
                    }

                    //check if the is something to execute...
                    if (toexec) {
                        toexec();
                        toexec = null;
                    } else {
                        isexec = false;
                    }
                };

            $("#textSearch").on("keyup", function () {
                var $this = $(this);

                if (len !== $this.val().length) {
                    len = $this.val().length;

                    //Check if there nothing executing...
                    if (!isexec) {
                        isexec = true;
                        app.client.getAddress($this.val(), navigator.language, func);
                    } else {
                        //if is already executing something, put a call on hold
                        //ATTENTION, this will execute only the LAST call
                        toexec = function () {
                            app.client.getAddress($this.val(), navigator.language, func);
                        };
                    }
                }
            });

        },

        // Function called when the view is destroyed
        destroy: function () {
            $("#textSearch").off();
            $(".search_location").off();
            $(".input").off();
        }
    });

}());