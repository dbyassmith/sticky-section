/*!
 * stickySection v1.0.4
 * by David Byas-Smith
 * MIT license
 */


;( function(window ) {

'use strict';

  var StickySection = function(e,options){

    var _options = options;

    var scroll, wrapper, wrapperHeight, wrapperTop, element, elementHeight, elementTopMargin, state;

    var reset = function(){

      wrapper.height(0);
      wrapper.height(wrapper.parent().height());
      wrapperTop = wrapper.offset().top;
      wrapperHeight = wrapper.height();
      elementHeight = element.outerHeight();
      if(scroll > wrapperTop - elementTopMargin && state == "static"){
        positionFixed();
      } else if( scroll < wrapperTop - elementTopMargin && state == "fixed"){
        positionStatic();
      } else if(element.offset().top < wrapperTop && state=="static"){
        positionStatic();
      }else if(scroll + elementHeight + elementTopMargin > wrapperTop + wrapperHeight){
        positionAbsolute();
      } else if(scroll > wrapperTop && state=="fixed"){
          positionFixed();
      } else if(scroll < wrapperTop + wrapperHeight - elementHeight && state =="absolute"){
        positionFixed();
      }
    }

    var setupEnquire = function(){
      enquire.register('screen and (max-width: 768px)', {
        match: function() {
          console.log("match - destroy");
          destroyScrollEvent();
        }
      }).register('(min-width: 769px) and (max-width: 991px)', {
        match: function() {
          console.log("match - setup");
          setupScrollEvent();
          reset();
        }
      }).register('(min-width: 992px) and (max-width: 1199px)', {
        match: function() {
          reset();
        }
      }).register('screen and (min-width: 1200px)', {
        match: function() {
          reset();
        }
      });

    }

    var positionFixed = function(){
      element.css({
        "position": "fixed",
        "bottom": "auto",
        "top": elementTopMargin + "px",
        "width": element.parent().width()
      });
      state = "fixed";
    }
    var positionStatic = function(){
      element.css({
        "position": "static",
        "width": "auto"
      });
      state = "static";
    }
    var positionAbsolute = function(){
      element.css({
        "position": "absolute",
        "bottom": "0",
        "top": "auto",
        "margin": "0",
        "width": element.parent().width()
      });
      state = "absolute";
    }

    var setupScrollEvent = function(){
      if(scroll < wrapper.offset().top){
        state = "static";
      } else if(scroll > wrapper.offset().top && scroll < wrapper.offset().top + wrapper.height() ) {
        state = "absolute";
      } else {
        state = "fixed";
      }
      $(document).scroll(function(){
        scroll = $(document).scrollTop();
        elementHeight = element.outerHeight();
        if(scroll > wrapperTop - elementTopMargin && state == "static"){  
          positionFixed();
        } else if( scroll < wrapperTop - elementTopMargin && state == "fixed"){  
          positionStatic();
        } else if(scroll + elementHeight + elementTopMargin > wrapperTop + wrapperHeight){  
          positionAbsolute();
        } else if(scroll > wrapperTop && state=="fixed"){  
          positionFixed();
        } else if(scroll < wrapperTop + wrapperHeight - elementHeight  && state =="absolute"){  
          positionFixed();
        }
      });
    }
    var destroyScrollEvent = function(){
      $(document).unbind('scroll');
      wrapper.css('height','auto');
      element.css('width','auto');
      positionStatic();
    }

    var init = function(w){
      wrapper = $(w).parent();
      console.log(wrapper);
      element = wrapper.find('.sticky-section');
      elementTopMargin = 25;

      scroll = $(document).scrollTop();
      if(scroll < wrapper.offset().top){
        state = "static";
      } else if(scroll > wrapper.offset().top && scroll < wrapper.offset().top + wrapper.height() ) {
        state = "absolute";
      } else {
        state = "fixed";
      }
      reset();
      setupScrollEvent();
      setupEnquire();

    }

    var debug = function(){
      console.log("scroll:" + scroll);
      console.log("wrapperTop:" + wrapperTop);
      console.log("wrapperHeight:" + wrapperHeight);
      console.log("elementHeight:" + elementHeight);
      console.log("elementTop:" + element.offset().top);
      var elementBottom = scroll + elementHeight;
      var wrapperBottom = wrapperTop + wrapperHeight;
      console.log("elementBottom:" + elementBottom);
      console.log("wrapperBottom:" + wrapperBottom);
      console.log("state:" + state);
    }


    init(e);
    debug();

    return {
      debug:debug
    }
  }


  window.StickySection = StickySection;


})( window );
