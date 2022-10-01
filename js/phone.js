jQuery(function($){
  var dClass = ".phone";
  var borderRoundness = 8;
  var borderR;
  var getDeviceSize;
  var getViewport;
  var getDepth = [];
  var device = [];
  var viewport = [];
  // Always width the first and height the second. Depth the last
  $(dClass).each(function() {
    
    getDeviceSize = $(this).attr("device").split(" ");
    getViewport = $(this).attr("viewport").split(" ");
    device.w = getDeviceSize[0];//width
    device.h = getDeviceSize[1];//height
    device.d = getDeviceSize[2];//depth
    viewport.w = getViewport[0];//width
    viewport.h = getViewport[1];//height
    viewport.r = parseInt( $(this).attr("viewport-border") );
    //console.log(device);
    if( $(this).attr("border").length ){
      borderR = $(this).attr("border");
    }else{
      borderR = 0;
    }

    $(this).find(".front .layerZero").css({
      width : device.w,
      height: device.h,
      'border-radius': borderR + 'px',
    }).find(".screen").css({
      width : viewport.w,
      height: viewport.h,
      'border-radius': viewport.r,
    });
    $(this).find(".leftSide").css({
      width : device.d,
      height: device.h,
      'padding-top': borderR + 'px',
      'padding-bottom': borderR + 'px'
    });
    $(this).find(".bottom").css({
      width : device.w,
      height: device.d,
      'padding-left': borderR + 'px',
      'padding-right': borderR + 'px'
    });
    $(this).parent().css("min-height", parseInt( $(this).find(".front")[0].getBoundingClientRect().height ) + parseInt( device.d ) );
    
    if( $(this).attr("depth").length && $(this).attr("depth-layers").length ){
    
      getDepth.layers = parseInt( $(this).attr("depth-layers") );
      getDepth.h = parseInt( $(this).attr("depth") );

      var calcDepth;
      var addLine = '';
      for (var i = getDepth.layers - 1; i >= 0; i--) {
        calcDepth = ( getDepth.h / getDepth.layers ) * ( i + 1 );
        
        addLine = '<div id="depth' + i + '" class="depthLayer" style="top: '+calcDepth+'px;left: -'+calcDepth+'px; border-radius: '+borderR+'px;"></div>';
        $(this).find(".front .back").append( addLine );
      }
    }
  });
  
  var td = getDepth.layers; // total diameter
  var tr = td / 2; // total radio
  
  var ga = Math.round( ( tr * 5.26 )/100 );
  var gb = Math.round( ( tr * 15.79 )/100 );
  var gc = Math.round( ( tr * 15.79 )/100 );
  var gd = Math.round( ( tr * 31.58 )/100 );
  var ge = Math.round( ( tr * 31.58 )/100 );
  
  if( (ga + gb + gc + gd + ge) < tr ){ ++gd; }
  if( (ga + gb + gc + gd + ge) > tr ){ --ge; }
  
  var x = 1;
  var w = 0;

  //Grupo A
  addRadio( $(this), ga, 31.58 );

  //Grupo B
  addRadio( $(this), gb, 31.58 );

  //Grupo C
  addRadio( $(this), gc, 15.79 );

  //Grupo D
  addRadio( $(this), gd, 21.05 );

  //Grupo E
  addRadio( $(this), ge, 5.56 );

  function addRadio( selector, thisGroup, percent ){
    for (var i = 0; i < thisGroup; i++) {
      //console.log( x+" - "+w );
      w = w + ( ( ( tr * percent )/100 )/thisGroup );
      console.log(  );
      $( "#depth"+x ).css({
        padding: (w/borderRoundness),
        'margin-left': -(w/borderRoundness),
        'margin-top': -(w/borderRoundness)
      });
      $("#depth"+ (td-(x-1)) ).css({
        padding: (w/borderRoundness),
        'margin-left': -(w/borderRoundness),
        'margin-top': -(w/borderRoundness)
      });
      x++;
    }
  }

  
});
