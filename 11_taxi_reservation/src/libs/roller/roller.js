/**
 * Developed by Rafael Rabelo (rafael.rabelo.it@gmail.com), under GNU License
 */

 
!function (Object) {

  // (C) WebReflection - Mit Style License

  var // private scope shortcuts
    BOUND_TO = "boundTo", // or maybe "asContextOf" ?
    defineProperty = Object.defineProperty,
    bind = defineProperty.bind || function (self) {
      // simple partial shim for "not there yet" ES5 browsers
      var callback = this;
      return function bound() {
        return callback.apply(self, arguments);
      };
    }
  ;

  defineProperty(
    Object.prototype,
    BOUND_TO, {
      value: function (callback, remove) {
        // only the very first time
        // two private stacks are created
        // and related to the current object
        var
          cbStack = [],
          boundStack = [],
          self = this
        ;
        // overwrite the inherited BOUND_TO method
        // with the one we actually need
        defineProperty(
          self,
          BOUND_TO, {
            value: function boundTo(callback, remove) {
              var
                i = cbStack.indexOf(callback),
                callback = i < 0 ?
                  boundStack[
                    i = cbStack.push(callback) - 1
                  ] = bind.call(callback, self)
                  :
                  boundStack[i]
              ;
              // falsy values accepted
              // except null or undefined
              // so it's true by default
              if (remove == false) {
                cbStack.splice(i, 1);
                boundStack.splice(i, 1);
              }
              // returns bound callback in any case
              // handy to remove listeners and clean stacks
              // in one single operation
              return callback;
            }
          }
        );
        // only the first time, invoe the overwritten method
        // use directly latter one every other time
        return self[BOUND_TO](callback, remove);
      }
    }
  );
}(Object);


/**
 * TimePick constructor
 */
TimePick = function(configuration){
    
    var date = new Date();
    var actualHours = date.getHours();
    var actualMinutes = date.getMinutes();
    var ampm = actualHours >= 12 ? 'PM' : 'AM';
    actualHours = actualHours % 12;
    actualHours = actualHours ? actualHours : 12; // the hour '0' should be '12'
    actualMinutes = actualMinutes < 10 ? '0'+actualMinutes : actualMinutes;
    actualHours = actualHours < 10 ? '0'+actualHours : actualHours;
    
    if(!configuration.minSelected)
        configuration.minSelected = actualMinutes;
    if(!configuration.hourSelected)
        configuration.hourSelected = actualHours;
    if(!configuration.indicatorSelected)
        configuration.indicatorSelected = ampm;
        
    this.minutes = [];
    this.selectedMinIndex = -1;
    
    this.hours = [];
    this.selectedHourIndex = -1;
    
    this.indicators = ['AM', 'PM'];
    this.indicatorSelectedIndex = -1;
        
    this.setConfiguration(configuration);
    
    // :)
    this.makeTime();
}

TimePick.prototype.setConfiguration = function(configuration){
    
    this.target = document.getElementById(configuration.target);
    if(configuration.onSelected && typeof(configuration.onSelected)=='function') this.onSelected = configuration.onSelected;
    
    if(this.target.textContent != null && this.target.textContent.trim() != ''){
        var actualHours = this.target.textContent.substring(0, 2);
        var actualMinutes = this.target.textContent.substring(3, 5);
        var ampm = this.target.textContent.substring(6, 8);
        
        configuration.minSelected = actualMinutes;
        configuration.hourSelected = actualHours;
        configuration.indicatorSelected = ampm;
        
    }
    
    for(var i = 0; i < 60; i++){
        var m = i;
        
        if( i < 10) m = '0' + i;
        else        m = i.toString();
        
        if( m == configuration.minSelected || i == configuration.minSelected){
            this.selectedMinIndex = i;
        }
        
        this.minutes.push(m);
    }
    
    for(var i = 0; i < 12; i++){
        var h = i;
        
        if( i == 0)      h = '12';
        else if( i < 10) h = '0' + i;
        else             h = i.toString();
        
        if( i == configuration.hourSelected || i == configuration.hourSelected){
            this.selectedHourIndex = i;
        }
        
        this.hours.push(h);
    }
    
    if( configuration.indicatorSelected == 'PM' || configuration.indicatorSelected == 'pm' )
        this.indicatorSelectedIndex = 1;
    else if( configuration.indicatorSelected == 'AM' || configuration.indicatorSelected == 'am' )
        this.indicatorSelectedIndex = 0;
    
};

TimePick.prototype.close = function(e){    
    var background = document.getElementById("backgroundDiv");
    background.style.display = "none";
    
    this.target.textContent = this.hours[this.hour.selectedIndex] + ":" + this.minutes[this.minute.selectedIndex] + " " + this.indicators[this.indicator.selectedIndex];
    
    if(this.onSelected && typeof(this.onSelected)=='function') this.onSelected();
    
    e.stopPropagation();
};

TimePick.prototype.show = function(e){    
    var background = document.getElementById("backgroundDiv");
    background.style.display = "block";
};

TimePick.prototype.makeTime = function(){

    var background = document.createElement("div");
    background.id = "backgroundDiv";
    background.style.display = "none";
    document.body.appendChild(background);
    
    //this.showBind = this.show.bind(this);
    this.target.addEventListener('click', this.boundTo(this.show) );
    this.target.addEventListener('focus', this.boundTo(this.show) );
    
    //this.closeBind = this.close.bind(this);
    background.addEventListener('mousedown', this.boundTo(this.close) );
    
    this.container = document.createElement("div");
    this.container.className = "timeContainer";
    this.container.style.marginTop = -( 5*(20+2*5) + 2*20)/2 + "px";
    this.container.style.marginLeft = -(3*60 + 2*20)/2 + "px";
    this.container.onmousedown = function(e) { e.stopPropagation(); };
    background.appendChild(this.container);
    
    this.hour = new Roller( { values: this.hours, selectedIndex: this.selectedHourIndex, addTo: ".timeContainer"} );
    this.minute = new Roller( { values: this.minutes, selectedIndex: this.selectedMinIndex, addTo: ".timeContainer" } );
    this.indicator = new Roller( { values: this.indicators, selectedIndex: this.indicatorSelectedIndex, addTo: ".timeContainer"} );

};

TimePick.prototype.destroy = function(){
    this.minute.destroy();
    this.hour.destroy();
    this.indicator.destroy();
    
    var background = document.getElementById("backgroundDiv");

    this.target.removeEventListener('click', this.boundTo(this.show) );
    this.target.removeEventListener('focus', this.boundTo(this.show) );
    
    background.removeEventListener('mousedown', this.boundTo(this.close) );
    
    this.container.onmousedown = null;

    background.parentNode.removeChild(background);
    
};

/**
 * SelectRoller constructor
 */
SelectRoller = function(configuration){
    
    this.setConfiguration(configuration);
    
    // :)
    this.makeSelect();
}

SelectRoller.prototype.destroy = function(){
    
    this.select.destroy();

    var background = document.getElementById("backgroundDiv");
    
    for(var i=0; i<this.targets.length; i++){
        this.targets[i].removeEventListener('click', this.boundTo(this.show) );
        this.targets[i].removeEventListener('focus', this.boundTo(this.show) );
    }
    
    background.removeEventListener('mousedown', this.boundTo(this.close) );
    background.parentNode.removeChild(background);
    
};

SelectRoller.prototype.setConfiguration = function(configuration){
    
    this.targets = document.getElementsByClassName(configuration.targets);
    this.width                            = (configuration["width"] != null && configuration["width"] >= 0) ? configuration["width"] : 80;
    this.values                            = (configuration["values"] != null) ? configuration["values"] : [];
    
    if(configuration.onSelected && typeof(configuration.onSelected)=='function') this.onSelected = configuration.onSelected;
};

SelectRoller.prototype.close = function(e){    
    var background = document.getElementById("backgroundDiv");
    background.style.display = "none";
    
    this.actualTarget.textContent = this.values[this.select.selectedIndex];
    
    if(this.onSelected && typeof(this.onSelected)=='function') this.onSelected();
    
    e.stopPropagation();
};

SelectRoller.prototype.show = function(e){    
    var background = document.getElementById("backgroundDiv");
    background.style.display = "block";
    
    this.actualTarget = e.currentTarget;
    
    for(var i=0; i<this.values.length; i++){
        if(this.actualTarget.textContent == this.values[i]) this.select.selectIndex(i);
    }
};

SelectRoller.prototype.makeSelect = function(){

    var background = document.createElement("div");
    background.id = "backgroundDiv";
    background.style.display = "none";
    document.body.appendChild(background);
    
    //this.closeBind = this.close.bind(this);
    background.addEventListener('mousedown', this.boundTo(this.close) );
    
    var container = document.createElement("div");
    container.className = "selectContainer";
    container.style.marginTop = -( 5*(20+2*5) + 2*20)/2 + "px";
    container.style.marginLeft = -(this.width + 2*20)/2 + "px";
    container.onmousedown = function(e) { e.stopPropagation(); };
    background.appendChild(container);
    
    //this.showBind = this.show.bind(this);
    
    for(var i=0; i < this.targets.length; i++){
        this.targets[i].addEventListener('click', this.boundTo(this.show) );
        this.targets[i].addEventListener('focus', this.boundTo(this.show) );
    }
    
    this.select = new Roller( { values: this.values, addTo: ".selectContainer", width: this.width} );
    
};


/**
 * Roller constructor
 */
Roller = function(configuration){

    this.configuration = {};
    
    this.setConfiguration(configuration);
    this.makeRoller();
};

/**
 * Clear and set a css class to the object
 */
Roller.setClass = function(element, className){
    element.className = className;
};

/**
 * Add a css class to the object
 */
Roller.addClass = function(element, className){
    element.className += " " + className;
};

/**
 * Remove a css class from the object
 */
Roller.removeClass = function(element, className) {
    var reg = new RegExp('(\\s|^)'+className+'(\\s|$)');
    element.className = element.className.replace(reg,' ').trim();
};

Roller.hasClass = function(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
}

Roller.prototype.selectedIndex = 0;

Roller.prototype.destroy = function(){

    /*
    document.removeEventListener('mousemove', this.boundTo(this.onMouseMove) );    
    document.removeEventListener('mouseup', this.boundTo(this.onMouseUp) );
    */

    this.rollerContainer.removeEventListener('mousedown', this.boundTo(this.onMouseDown) );
    this.rollerContainer.removeEventListener('mousedown', this.boundTo(this.onClick) );

    this.rollerContainer.parentNode.removeChild(this.rollerContainer);
};

Roller.prototype.makeRoller = function(){
    var parent = null;
    var identif = this.configuration.addTo;
    
    if( identif[0] === '#')
        parent = document.getElementById( identif.substr(1, identif.length-1) );
    else if(identif[0] === '.')
        parent = document.getElementsByClassName( identif.substr(1, identif.length-1) )[0];
    else
        parent = document.getElementsByTagName( identif )[0];
    
    //console.log("adding roller to " + identif);
    
    this.rollerContainer = document.createElement("div");
    this.roller = document.createElement("div");
    var effect = document.createElement("div");
    var indicator = document.createElement("div");
    
    this.rollerContainer.className = "rollerContainer";
    this.rollerContainer.style.height = ((this.factor + this.padding*2) * this.visible) + "px";
    this.rollerContainer.style.maxHeight = ((this.factor + this.padding*2) * this.visible) + "px";
    this.rollerContainer.style.fontSize = 30 + "px";
    parent.appendChild(this.rollerContainer);
    
    this.roller.className = "roller";    
    for(var i = 0; i < this.configuration.values.length; i++){
        var element = document.createElement("span");
        
        element.className = 'item-' + (i+1);
        element.textContent = this.configuration.values[i];
        element.style.padding = this.padding + "px";
        
        if( i+1 === this.configuration.selectedIndex)
            Roller.addClass(element, "selected");
        
        element.style.height = (this.factor + this.padding*2) + "px";
        element.style.maxHeight = (this.factor + this.padding*2) + "px";
        element.style.lineHeight = (this.factor + this.padding*2) + "px";
        
        this.roller.appendChild(element);
    }
    this.roller.style.transition = 'all 0s ease-out';
    this.roller.style.webkitTransition = 'all 0s ease-out';
    this.roller.style.webkitTransform = 'translate3d(0px, '+ this.actualTop +'px, 0px)';
    this.roller.style.marginTop = (-this.padding) + "px";
    this.rollerContainer.appendChild(this.roller);
    
    effect.className = "effect";
    this.rollerContainer.appendChild(effect);
    
    indicator.className = "indicator";
    indicator.style.height = (this.factor + this.padding*2) + "px";
    indicator.style.maxHeight = (this.factor + this.padding*2) + "px";
    indicator.style.lineHeight = (this.factor + this.padding*2) + "px";
    indicator.style.top = ((this.factor + this.padding*2) * Math.floor(this.visible/2) ) + "px";
    this.rollerContainer.appendChild(indicator);
    
    this.rollerContainer.style.width = this.width + "px";
    
    this.rollerContainer.addEventListener('mousedown', this.boundTo(this.onMouseDown) );    
    this.rollerContainer.addEventListener('click', this.boundTo(this.onClick) );
    
    this.clearSelected();
};

/**
 *
 */
Roller.prototype.setConfiguration = function(configuration){

    this.configuration.addTo            = (configuration["addTo"] != null) ? configuration["addTo"] : "body";
    this.selectedIndex                    = (configuration["selectedIndex"] != null && configuration["selectedIndex"] >= 0) ? configuration["selectedIndex"] : 0;
    this.width                            = (configuration["width"] != null && configuration["width"] >= 0) ? configuration["width"] : 60;
    this.configuration.values            = (configuration["values"] != null) ? configuration["values"] : [];
    
    this.factor = 30;    // size of one element
    this.visible = 5;    // amount of elements visibles at one time
    this.padding = 5;    // amount of elements visibles at one time
    
    this.tempo = 30;    // milliseconds
    this.ac = 0.0005;    // pixels / milliseconds²
    
    this.initialY = 0;
    this.actualTop = ((this.selectedIndex)*-1 + 2)*((this.factor + this.padding*2));
    this.deslc = 0;
    
    this.lastmousey = -1;
    this.lastmousetime = -1;
    this.sentido = 1;
    
};

Roller.prototype.selectIndex = function(index){
    this.selectedIndex = index;
    
    this.actualTop = ((index+1)*-1 + 3)*((this.factor + this.padding*2));
    
    this.roller.style.transition = 'all 0.0s ease-out';
    this.roller.style.webkitTransition = 'all 0.0s ease-out';
    this.roller.style.webkitTransform = 'translate3d(0px, '+ this.actualTop  +'px, 0px)';
    
    this.clearSelected();    
};

Roller.prototype.clearSelected = function(){

    //console.log("the initial selected is " + "item-"+ (this.selectedIndex+1) + " of " + this.configuration.values + " on position " + this.actualTop + "px");
    
    var toClear = this.roller.getElementsByClassName("selected");
    for( var s = 0; s < toClear.length; s++)
        Roller.removeClass(toClear[s], "selected");
    
    Roller.addClass( this.roller.getElementsByClassName("item-"+(this.selectedIndex+1) )[0], "selected");
};

/**
 * 
 */
Roller.prototype.onClick = function(e){    
    
    e.stopPropagation();
};

/**
 * 
 */
Roller.prototype.onMouseDown = function(e){    
    this.initialY = e.clientY;
    
    this.vel = 0;
    this.deslc = 0;
    
    //console.log("starting in " + this.initialY);
    
    this.roller.style.transition = 'all 0.001s ease-out';
    this.roller.style.webkitTransition = 'all 0.001s ease-out';
    //this.roller.style.webkitTransform = 'translate3d(0px, '+ (this.actualTop + e.clientY ) +'px, 0px)';

    document.addEventListener('mousemove', this.boundTo(this.onMouseMove) );    
    document.addEventListener('mouseup', this.boundTo(this.onMouseUp) );
    
    e.stopPropagation();
};

/**
 * 
 */
Roller.prototype.onMouseUp = function(e){    
    
    //click
    if( this.deslc==0 ){
        var rect = this.rollerContainer.getBoundingClientRect();
        
        this.deslc = -(( this.initialY - rect.top) - ((this.factor + this.padding*2)*this.visible)/2);
        
        this.sentido = this.deslc > 0 ? 1 : -1;
        this.vel = 0.06 * this.sentido;
        
    }
    
    this.actualTop += this.deslc;
    
    this.endMove();
    
    document.removeEventListener('mousemove', this.boundTo(this.onMouseMove) );    
    document.removeEventListener('mouseup', this.boundTo(this.onMouseUp) );
};

/**
 * 
 */
Roller.prototype.onMouseMove = function(e){    
    if( (this.actualTop + (e.clientY - this.initialY)) <  (this.factor + this.padding*2)*Math.ceil(this.visible/2) && 
        (this.actualTop + (e.clientY - this.initialY)) > (this.roller.clientHeight - (this.factor + this.padding*2)*Math.floor(this.visible/2))*-1  ) {
        
        var mousey = e.clientY;
        
        var md = new Date();
        var timenow = md.getTime();
        
        if ( this.lastmousetime && this.lastmousetime != timenow  ) {
            //V = (S - So) / (t - to)
            this.vel = (mousey - this.lastmousey ) / (timenow - this.lastmousetime);
            
            //sentido
            this.sentido = this.vel > 0 ? 1 : -1;
        }            
    
        this.lastmousey = mousey;
        this.lastmousetime = timenow;
        
        this.roller.style.transition = 'all 0s ease-out';
        this.roller.style.webkitTransition = 'all 0s ease-out';
        this.roller.style.webkitTransform = 'translate3d(0px, '+ (this.actualTop + e.clientY - this.initialY) +'px, 0px)';
        this.deslc = (e.clientY - this.initialY);
        
        //console.log("moving");
    }
    
    e.stopPropagation();
};

/**
 * 
 */
Roller.prototype.endMove = function(){    
    var t = 500;
    
    if( this.actualTop > (this.factor + this.padding*2)*Math.floor(this.visible/2) ) {
        this.sentido = -1;
        this.vel = -0.06;
        //console.log("boucing back on top");
    } else if( this.actualTop < (this.roller.clientHeight - (this.factor + this.padding*2)*Math.ceil(this.visible/2))*-1  ){
        this.sentido = 1;
        this.vel = 0.06;
        //console.log("boucing back on bottom");
    } 
    
    //t = | V/a |, from V = Vo + at, with V = 0
    t = Math.abs(this.vel / this.ac); //time in milliseconds
    //console.log("t =  " + this.vel + "px/s / " + this.ac + "px/s^2");    
    
    //S = So + (a*t^2)/2
    this.actualTop = this.actualTop + (this.ac*this.sentido)*(t*t)/2; //distance em px deslocaded using that velocitiy
    
    var item = 1;        
    item = Math.round( this.actualTop / (this.factor + this.padding*2));
    item = (item - 3)*(-1);
    
    if(item < 1 ) item = 1;
    if(item > this.configuration.values.length) item = this.configuration.values.length;
    
    //console.log("selected item-" + item);
    
    this.selectedIndex = item-1;    
    this.actualTop = (item*-1 + 3)*((this.factor + this.padding*2));
    
    this.roller.style.transition = 'all ' + t + 'ms ease-out';
    this.roller.style.webkitTransition = 'all ' + t + 'ms ease-out';
    this.roller.style.webkitTransform = 'translate3d(0px, '+ this.actualTop +'px, 0px)';
    
    this.clearSelected();
};