/*!
 * Start Bootstrap - Agnecy Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

$('div.modal').on('show.bs.modal', function() {
	var modal = this;
	var hash = modal.id;
	window.location.hash = hash;
	window.onhashchange = function() {
		if (!location.hash){
			$(modal).modal('hide');
		}
	}
});

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

/* BACKGROUND */
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

function resize() {
    var box = c.getBoundingClientRect();
    c.width = window.innerWidth;
    c.height = window.innerHeight;
}

var light = {
    x: 160,
    y: 200
}

var colors = ["#f5c156", "#e6616b", "#5cd3ad"];

function drawLight() {
    // ctx.beginPath();
    // ctx.arc(light.x, light.y, 1000, 0, 2 * Math.PI);
    // var gradient = ctx.createRadialGradient(light.x, light.y, 0, light.x, light.y, 1000);
    // gradient.addColorStop(0, "#3b4654");
    // gradient.addColorStop(1, "#2c343f");
    // ctx.fillStyle = gradient;
    // ctx.fill();

    // ctx.beginPath();
    // ctx.arc(light.x, light.y, 20, 0, 2 * Math.PI);
    // gradient = ctx.createRadialGradient(light.x, light.y, 0, light.x, light.y, 5);
    // gradient.addColorStop(0, "#fff");
    // gradient.addColorStop(1, "#3b4654");
    // ctx.fillStyle = gradient;
    // ctx.fill();
}

function Box() {
    this.half_size = Math.floor((Math.random() * 20) + 1);
    this.x = Math.floor((Math.random() * c.width) + 1);
    this.y = Math.floor((Math.random() * c.height) + 1);
    this.r = Math.random() * Math.PI;
    this.shadow_length = 2000;
    this.color = colors[Math.floor((Math.random() * colors.length))];
  
    this.getDots = function() {

        var full = (Math.PI * 2) / 4;


        var p1 = {
            x: this.x + this.half_size * Math.sin(this.r),
            y: this.y + this.half_size * Math.cos(this.r)
        };
        var p2 = {
            x: this.x + this.half_size * Math.sin(this.r + full),
            y: this.y + this.half_size * Math.cos(this.r + full)
        };
        var p3 = {
            x: this.x + this.half_size * Math.sin(this.r + full * 2),
            y: this.y + this.half_size * Math.cos(this.r + full * 2)
        };
        var p4 = {
            x: this.x + this.half_size * Math.sin(this.r + full * 3),
            y: this.y + this.half_size * Math.cos(this.r + full * 3)
        };

        return {
            p1: p1,
            p2: p2,
            p3: p3,
            p4: p4
        };
    }
    this.rotate = function() {
        var speed = (60 - this.half_size) / 20;
        this.r += speed * 0.002;
        this.x += speed;
        this.y += speed;
    }
    this.draw = function() {
        var dots = this.getDots();
        ctx.beginPath();
        ctx.moveTo(dots.p1.x, dots.p1.y);
        ctx.lineTo(dots.p2.x, dots.p2.y);
        ctx.lineTo(dots.p3.x, dots.p3.y);
        ctx.lineTo(dots.p4.x, dots.p4.y);
        ctx.fillStyle = this.color;
        ctx.fill();


        if (this.y - this.half_size > c.height) {
            this.y -= c.height + 100;
        }
        if (this.x - this.half_size > c.width) {
            this.x -= c.width + 100;
        }
    }
    this.drawShadow = function() {
        var dots = this.getDots();
        var angles = [];
        var points = [];

        for (dot in dots) {
            var angle = Math.atan2(light.y - dots[dot].y, light.x - dots[dot].x);
            var endX = dots[dot].x + this.shadow_length * Math.sin(-angle - Math.PI / 2);
            var endY = dots[dot].y + this.shadow_length * Math.cos(-angle - Math.PI / 2);
            angles.push(angle);
            points.push({
                endX: endX,
                endY: endY,
                startX: dots[dot].x,
                startY: dots[dot].y
            });
        };

        for (var i = points.length - 1; i >= 0; i--) {
            var n = i == 3 ? 0 : i + 1;
            ctx.beginPath();
            ctx.moveTo(points[i].startX, points[i].startY);
            ctx.lineTo(points[n].startX, points[n].startY);
            ctx.lineTo(points[n].endX, points[n].endY);
            ctx.lineTo(points[i].endX, points[i].endY);
            ctx.fillStyle = "rgba(13,15,26, 0)";
            ctx.fill();
        };
    }
}

var boxes = [];

function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    drawLight();

    for (var i = 0; i < boxes.length; i++) {
        boxes[i].rotate();
        boxes[i].drawShadow();
    };
    for (var i = 0; i < boxes.length; i++) {
        collisionDetection(i)
        boxes[i].draw();
    };
    requestAnimationFrame(draw);
}

resize();
draw();

while (boxes.length < 14) {
    boxes.push(new Box());
}

window.onresize = resize;
c.onmousemove = function(e) {
    light.x = e.offsetX == undefined ? e.layerX : e.offsetX;
    light.y = e.offsetY == undefined ? e.layerY : e.offsetY;
}


function collisionDetection(b){
	for (var i = boxes.length - 1; i >= 0; i--) {
		if(i != b){	
			var dx = (boxes[b].x + boxes[b].half_size) - (boxes[i].x + boxes[i].half_size);
			var dy = (boxes[b].y + boxes[b].half_size) - (boxes[i].y + boxes[i].half_size);
			var d = Math.sqrt(dx * dx + dy * dy);
			if (d < boxes[b].half_size + boxes[i].half_size) {
			    boxes[b].half_size = boxes[b].half_size > 1 ? boxes[b].half_size-=1 : 1;
			    boxes[i].half_size = boxes[i].half_size > 1 ? boxes[i].half_size-=1 : 1;
			}
		}
	}
}


/****************************************************/
/* PHOTO SLIDE                                      */
/****************************************************/


$(function() {
    var sliding = startClientX = startPixelOffset = pixelOffset = currentSlide = 0;
    slideCount = $('.slide').length;
    
    $('.slide').on('mousedown touchstart', slideStart);
    $('.slide').on('mouseup touchend', slideEnd);
    $('.slide').on('mousemove touchmove', slide);
    
    /**
    / Triggers when slide event started
    */
    function slideStart(event) {
      // If it is mobile device redefine event to first touch point
      if (event.originalEvent.touches)
        event = event.originalEvent.touches[0];
      // If sliding not started yet store current touch position to calculate distance in future.
      if (sliding == 0) {
        sliding = 1; // Status 1 = slide started.
        startClientX = event.clientX;
      }
    }
    
    /** Occurs when image is being slid.
    */
    function slide(event) {
    //   event.preventDefault();
      if (event.originalEvent.touches)
        event = event.originalEvent.touches[0];
      // Distance of slide.
      var deltaSlide = event.clientX - startClientX;
      // If sliding started first time and there was a distance.
      if (sliding == 1 && deltaSlide != 0) {
        sliding = 2; // Set status to 'actually moving'
        startPixelOffset = pixelOffset; // Store current offset
      }
      
      //  When user move image
      if (sliding == 2) {
        // Means that user slide 1 pixel for every 1 pixel of mouse movement.
        var touchPixelRatio = 1;
        // Check for user doesn't slide out of boundaries
        if ((currentSlide == 0 && event.clientX > startClientX) ||
           (currentSlide == slideCount - 1 && event.clientX < startClientX))
          // Set ratio to 3 means image will be moving by 3 pixels each time user moves it's pointer by 1 pixel. (Rubber-band effect)
          touchPixelRatio = 3;
        // Calculate move distance.
        pixelOffset = startPixelOffset + deltaSlide / touchPixelRatio;
        // Apply moving and remove animation class
        $('#slides').css('transform', 'translateX(' + pixelOffset + 'px').removeClass();
      }
    }
    
    /** When user release pointer finish slide moving.
    */
    function slideEnd(event) {
      if (sliding == 2){
        // Reset sliding.
        sliding = 0;
        // Calculate which slide need to be in view.
        currentSlide = pixelOffset < startPixelOffset ? currentSlide + 1 : currentSlide -1;
        // Make sure that unexisting slides weren't selected.
        currentSlide = Math.min(Math.max(currentSlide, 0), slideCount - 1);
        // Since in this example slide is full viewport width offset can be calculated according to it.
        pixelOffset = currentSlide * -$('body').width();
        // Remove style from DOM (look below)
        $('#temp').remove();
        // Add a translate rule dynamically and asign id to it
        $('<style id="temp">#slides.animate{transform:translateX(' + pixelOffset + 'px)}</style>').appendTo('head');
        // Add animate class to slider and reset transform prop of this class.
        $('#slides').addClass('animate').css('transform', '');
      }
    }
    
  });