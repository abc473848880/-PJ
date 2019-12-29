var size      = 64;
var printszie = 40;
var height = $('#box').height();
var width = $('#box').width();
var canvasHeight;
var canvasWidth;
var canvas    = document.createElement("canvas");
var ctx       = canvas.getContext("2d");
var line;
var dots      = [];
$('#box').append(canvas);



var scene=new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
render = new THREE.WebGLRenderer({antialias: true});
render.setSize(width, height);

clock = new THREE.Clock();
    
  



var mv = new MusicVisualizer({
    size: size,
    visualizer: draw,
    scene:scene,
    camera:camera,
    clock:clock

})





$("#list").on("click", "li", function() {
    $(this).siblings().removeClass('selected');
    $(this).addClass('selected');
    mv.play('media/' + $(this).attr('title'));
})



function random(min, max) {
        min = min || 0;
        max = max || 1;
        return max >= min ? Math.round(Math.random()*(max - min) + min) : 0;
}


function getDots() {
    dots = []
    for (var i = 0; i < printszie; i++) {
        dots.push({
            cap:0,
			v:0,
			startime:0,
        });
    }
}

function boom(h, w , e){
	var t=random(2,5);
	var ee=e/10;
	var maxe=25;
	for (var i=0;i<t;i++){
		var hh=h+random(0,7)*ee,ww=w+random(0,6)*ee;
		ctx.beginPath();
		ctx.moveTo(hh+70*ee/maxe,ww+30*ee/maxe);
		ctx.lineTo(hh+30*ee/maxe,ww+140*ee/maxe);
		ctx.lineTo(hh+127*ee/maxe,ww+70*ee/maxe);
		ctx.lineTo(hh+10*ee/maxe,ww+70*ee/maxe);
		ctx.lineTo(hh+101*ee/maxe,ww+140*ee/maxe);
		
		ctx.fillStyle="gold";
		ctx.fill()
		ctx.closePath();
		
	}
		
}

function draw(arr) {
    ctx.clearRect(0, 0, width, height);
     
	line.addColorStop(0, "gold");
	line.addColorStop(0.4, "cyan");
	line.addColorStop(0.8, "magenta");
	line.addColorStop(1, "black");
	ctx.fillStyle = line;
	ctx.shadowBlur = 0;
	var w = width / printszie;
	var cw=w*0.8;
	for (var i = 0; i < printszie; i++) {
		ctx.beginPath();
		var h = Math.exp(Math.log(arr[i]/256)*0.75) * (height - 2.5*cw);
		var o = dots[i];
		ctx.fillStyle = line;
		ctx.fillRect(w * i, height - h, cw, h);
		ctx.fillRect(w * i, height - o.cap, cw, cw);
		ctx.closePath();
		o.v+=0.002 / Math.sqrt(Math.sqrt(i+1));
		o.cap-=o.v;
		if (o.startime>0){
			o.startime-=0.03;
			boom(w*i,height - o.cap-cw,cw);
		}
		if(o.cap<=0){
			o.cap=0;
			o.v=0;
		}
		if (h>0&&o.cap<(h+2*cw)){
			if (o.v>0.05)
				o.startime=1;
			o.cap=h+2.5*cw;
			o.v=0;
		}
		
	}

}


function reSize() {
    height = $('#box').height();
    width = $('#box').width();
    canvas.height = height;
    canvas.width = width;
    line = ctx.createLinearGradient(0, 0, 0, height);

    getDots();
};
reSize()

