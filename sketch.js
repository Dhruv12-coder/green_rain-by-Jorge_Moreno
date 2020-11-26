var w = 940;
var h = 760;

var emoji;
var emojiSize = 12;
var streams = [];

function setup() {

	background(0);
	pixelDensity(2);
	createCanvas(w,h);
	textSize(emojiSize);

	var x = 0;
	var y = 0;
	for (var i = 0; i <= width/emojiSize; i++) {

		stream = new Stream();
		stream.init(x, round(random(-400, 0)) );
		streams.push(stream);
		x += emojiSize;
	}
}

function draw() {

	fill(0);
	rect(0, 0, w, h);

	streams.forEach(function(stream) { stream.render(); });
}

function Emoji(x, y, speed) {
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.value;
	this.switchInterval = round(random(5, 30));
	this.setRandomEmoji = function() {

		if ( frameCount % this.switchInterval == 0 ) {
			this.value = String.fromCodePoint(
				'0x1F' + floor(random(1536, 1616)).toString(16)
			);
		}
	}

	this.rain = function() {

		this.y = ( stop == true )
			? this.y += this.speed
			: (( this.y >= (height + emojiSize) ) ? -emojiSize : this.y += this.speed);
	}
}

function Stream() {
	this.emojis = [];
	this.totalEmojis = round(random(12, 28)); // 8, 24
	this.speed = round(random(4, 10)); // 2, 8

	this.init = function(x, y) {

		for ( var i=0; i<=this.totalEmojis; i++) {
			emoji = new Emoji(x, y, this.speed);
			emoji.setRandomEmoji();
			this.emojis.push(emoji);
			y -= emojiSize;
		}
	}

	this.render = function() {
		this.emojis.forEach(function(emoji, i, all) {

			fill(0);
			text( emoji.value, emoji.x, emoji.y );

			fill(0, 0, 0, (i*floor(255/(all.length-1))) );
			rect( emoji.x, emoji.y - emojiSize, emojiSize, emojiSize );

			emoji.rain();
			emoji.setRandomEmoji();
		});
	}
}