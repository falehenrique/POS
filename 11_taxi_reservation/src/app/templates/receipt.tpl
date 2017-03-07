<div class="logo_and_reservation">
    <img class="receipt_logo" src="img/receipt-taxilogo.png">
    <div class="reservation">
        <p class="strong translatable">KEY_RESERVATION_NUMBER</p>
        <p class="reservation_number"><%= reservationNumber %></p>

        <div class="fare">
            <label class="strong translatable">KEY_DERATTURE_TIME</label>
            <label><%= time %></label>
        </div>
    </div>
</div>
<div class="initial_location">
    <label class="strong translatable">KEY_INITIAL_LOCATION</label>
    <label><%= actual %></label>
</div>
<div class="destination">
    <label class="strong translatable">KEY_DESTINATION</label>
    <label><%= destination %></%></label>
</div>
<div class="fare">
    <label class="strong translatable">KEY_FARE</label>
    <label class="moneyValue"><%= value %></label>
</div>
<p class="enjoy_message translatable">KEY_ENJOY_YOUR_RIDE</div>