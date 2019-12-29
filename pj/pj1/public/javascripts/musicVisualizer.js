window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame;
audioContext=new window.AudioContext();

function MusicVisualizer(obj){
    var source=null;
    this.count=0;
    this.analyser=audioContext.createAnalyser();
    this.size=obj.size;
    this.scene=obj.scene;
    this.camera=obj.camera;
    this.clock=obj.clock;
    this.analyser.fftSize=this.size*2;
    this.gainNode=audioContext[audioContext.createGain?"createGain":"createGainNode"](0);
    this.gainNode.connect(audioContext.destination);
    this.analyser.connect(this.gainNode);
    this.xhr = new XMLHttpRequest();
    this.visualizer=obj.visualizer;
   
}


MusicVisualizer.prototype.load = function(url,fun) {
    this.xhr.abort();
    this.xhr.open("GET", url);
    this.xhr.responseType = "arraybuffer";
    var self=this;

    this.xhr.onload = function() { 
        fun(self.xhr.response);
    }
    this.xhr.send();
}

MusicVisualizer.prototype.decode=function(arraybuffer,fun){
    audioContext.decodeAudioData(arraybuffer,function(buffer){
        fun(buffer);
    },function(err){
        console.log(err);
    })
}
MusicVisualizer.prototype.play=function(url){
     this.visualize();
    var n=++this.count;
    var self=this;
    this.source&&this.stop();
   
	this.load(url,function(arraybuffer){
		if(n != self.count){
				return;
			}
		self.decode(arraybuffer,function(buffer){
			var  bufferSource=audioContext.createBufferSource();
			bufferSource.buffer=buffer;
			bufferSource.connect(self.analyser);
			bufferSource[bufferSource.start?"start":"noteOn"](0);
			self.source=bufferSource;
		})
    })
    
}
MusicVisualizer.prototype.stop=function(){
    this.source[this.source.stop? "stop" : "noteOff"](0);
}
MusicVisualizer.prototype.visualize = function() {
    var arr = new Uint8Array(this.analyser.frequencyBinCount);
    var self = this;

    function show() {
        self.analyser.getByteFrequencyData(arr);
        self.visualizer(arr);
        window.requestAnimationFrame(show);
    };
    window.requestAnimationFrame(show);
}
