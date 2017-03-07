this["JST"] = this["JST"] || {};

this["JST"]["src/app/templates/check_location.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="map-location">\r\n    <img id="map">\r\n</div>';

}
return __p
};

this["JST"]["src/app/templates/confirm_information.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="initial_location">\r\n    <label class="strong translatable">KEY_INITIAL_LOCATION</label>\r\n    <label>' +
((__t = ( actual )) == null ? '' : __t) +
'</label>\r\n</div>\r\n<div class="destination">\r\n    <label class="strong translatable">KEY_DESTINATION</label>\r\n    <label>' +
((__t = ( destination )) == null ? '' : __t) +
'</%></label>\r\n</div>\r\n<div class="fare">\r\n    <label class="strong translatable">KEY_FARE</label>\r\n    <label class="moneyValue">' +
((__t = ( value )) == null ? '' : __t) +
'</label>\r\n</div>\r\n<div class="departure_time">\r\n    <label class="strong translatable">KEY_DERATTURE_TIME</label>\r\n    <label id="timeChooser" ></label>\r\n    <span class="clock"></span>\r\n</div>';

}
return __p
};

this["JST"]["src/app/templates/home.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<!--\r\n<span class="pin-home"></span>\r\n-->\r\n<span class="field-pin-home"></span>\r\n<label class="location marginTop">' +
((__t = ( address )) == null ? '' : __t) +
'</label>\r\n<img id="map">';

}
return __p
};

this["JST"]["src/app/templates/location_item.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<li class="location-item">\r\n    <label class="location-address">' +
((__t = ( address )) == null ? '' : __t) +
'</label>\r\n</li>';

}
return __p
};

this["JST"]["src/app/templates/receipt.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="logo_and_reservation">\r\n    <img class="receipt_logo" src="img/receipt-taxilogo.png">\r\n    <div class="reservation">\r\n        <p class="strong translatable">KEY_RESERVATION_NUMBER</p>\r\n        <p class="reservation_number">' +
((__t = ( reservationNumber )) == null ? '' : __t) +
'</p>\r\n\r\n        <div class="fare">\r\n            <label class="strong translatable">KEY_DERATTURE_TIME</label>\r\n            <label>' +
((__t = ( time )) == null ? '' : __t) +
'</label>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div class="initial_location">\r\n    <label class="strong translatable">KEY_INITIAL_LOCATION</label>\r\n    <label>' +
((__t = ( actual )) == null ? '' : __t) +
'</label>\r\n</div>\r\n<div class="destination">\r\n    <label class="strong translatable">KEY_DESTINATION</label>\r\n    <label>' +
((__t = ( destination )) == null ? '' : __t) +
'</%></label>\r\n</div>\r\n<div class="fare">\r\n    <label class="strong translatable">KEY_FARE</label>\r\n    <label class="moneyValue">' +
((__t = ( value )) == null ? '' : __t) +
'</label>\r\n</div>\r\n<p class="enjoy_message translatable">KEY_ENJOY_YOUR_RIDE</div>';

}
return __p
};

this["JST"]["src/app/templates/search_location.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="input">\r\n    <span class="img-search"></span>\r\n    <input id="textSearch" type="text" placeholder="" />\r\n</div>\r\n<ul class="location-container" ></ul>';

}
return __p
};

this["JST"]["src/app/templates/searching.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="searching translatable">KEY_TEXT_SEARCHING</div>';

}
return __p
};