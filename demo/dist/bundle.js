!function(t){var e={};function n(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(i,r,function(e){return t[e]}.bind(null,r));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=1)}([function(t,e,n){"use strict";n.r(e),n.d(e,"HazelineCanvas",function(){return i});var i=function(){function t(){this.canvasZIndex=2e3,this.currentElementZIndex=2001,this.canvasID="hazeline-canvas",this.currentElementOriginalZIndex=void 0,this.currentElementOriginalCSSPosition=void 0,this.currentElementCoordinates={x:null,y:null,w:null,h:null},this.initializeCanvas(),this.styleCanvas(),this.appendCanvasToBody()}return t.prototype.setCanvasBGColor=function(t){this.ctx.fillStyle=t},t.prototype.surroundElement=function(t){this.currentElement&&this.disposeCurrentElement(),this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.currentElement=t instanceof HTMLElement?t:this.fetchHTMLElementBySelector(),this.currentElement&&(this.getCoordinates(),this.bringElementToFront(),this.drawLeftSideRect(),this.drawRightSideRect(),this.drawTopSideRect(),this.drawBottomSideRect())},t.prototype.destroy=function(){this.ctx=null,this.canvas=null,document.querySelector("body").removeChild(document.getElementById(this.canvasID))},t.prototype.initializeCanvas=function(){this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d")},t.prototype.styleCanvas=function(){this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight,this.canvas.setAttribute("id",this.canvasID),this.canvas.style.top="0",this.canvas.style.left="0",this.canvas.style.position="absolute",this.canvas.style.zIndex=this.canvasZIndex.toString()},t.prototype.appendCanvasToBody=function(){document.querySelector("body").appendChild(this.canvas)},t.prototype.fetchHTMLElementBySelector=function(){return null},t.prototype.getCoordinates=function(){this.currentElementCoordinates.y=this.currentElement.offsetTop,this.currentElementCoordinates.x=this.currentElement.offsetLeft,this.currentElementCoordinates.w=this.currentElement.offsetWidth,this.currentElementCoordinates.h=this.currentElement.offsetHeight},t.prototype.bringElementToFront=function(){this.currentElementOriginalZIndex=this.currentElement.style.zIndex,this.currentElementOriginalCSSPosition=this.currentElement.style.position,this.currentElement.style.position="relative",this.currentElement.style.zIndex=this.currentElementZIndex.toString()},t.prototype.disposeCurrentElement=function(){this.currentElement.style.zIndex=this.currentElementOriginalZIndex,this.currentElement.style.position=this.currentElementOriginalCSSPosition},t.prototype.drawLeftSideRect=function(){this.ctx.fillRect(0,this.currentElementCoordinates.y,this.currentElementCoordinates.x,this.currentElementCoordinates.h)},t.prototype.drawRightSideRect=function(){var t=this.canvas.width-(this.currentElementCoordinates.x+this.currentElementCoordinates.w);this.ctx.fillRect(this.currentElementCoordinates.x+this.currentElementCoordinates.w,this.currentElementCoordinates.y,t,this.currentElementCoordinates.h)},t.prototype.drawTopSideRect=function(){this.ctx.fillRect(0,0,this.canvas.width,this.currentElementCoordinates.y)},t.prototype.drawBottomSideRect=function(){this.ctx.fillRect(0,this.currentElementCoordinates.y+this.currentElementCoordinates.h,this.canvas.width,this.canvas.height-(this.currentElementCoordinates.y+this.currentElementCoordinates.h))},t}()},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(0);window.onload=function(){var t=new i.HazelineCanvas;t.setCanvasBGColor("rgba(0,0,0,.8)");var e=[];e.push(document.getElementById("test-1")),e.push(document.getElementById("test-2")),e.push(document.getElementById("test-3")),t.surroundElement(e[0]),setTimeout(function(){t.surroundElement(e[1])},2e3),setTimeout(function(){t.surroundElement(e[2])},4e3),setTimeout(function(){t.destroy()},6e3)}}]);