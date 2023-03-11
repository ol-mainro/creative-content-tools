// const splitLines = str => str.split(/\r?\n/);

function mySplitLines(str) {
    return str.split(/\r?\n/);
}

function msToTime(duration) {
    var milliseconds = parseInt((duration%1000)/100)
        , seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24);

    hours = (hours < 10) ? hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}



const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

var text = urlParams.get('comment');
var font = urlParams.get('font');
var bpm = urlParams.get('tempo');
var fontsize = urlParams.get('fontsize');

if(!text) text = '\r\n\r\n1er vers\r\n2ème vers\r\n3ème vers\r\n\r\n4eme vers\r\n5ème vers\r\n6ème vers';
if(!font) font = 'Geneva';
if(!bpm) bpm = 80;
if(!fontsize) fontsize = 10;

document.getElementById('comment').value = text;
document.getElementById('tempo').value = bpm;
document.getElementById('font').value = font;
document.getElementById('fontsize').value = fontsize;

console.log(mySplitLines(text));
var textarray = mySplitLines(text);

var intro = '[Script Info]\r\n[V4+ Styles]\r\nFormat: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding\r\nStyle: Default,' + font + ',' + fontsize + ',&H00FFFFFF,&H000000FF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,4,2,2,5,10,10,10,1\r\n\r\n[Events]\r\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text'

console.log(intro);

const app = document.getElementById('app');
const header = document.createElement('textarea');
app.appendChild(header);
header.appendChild(document.createTextNode(intro+ '\r\n'));

var i;
var delay = (60/bpm)*4;
var until = 600;
var l = 0;
// l = l.toFixed(2);

i = delay

textarray.forEach(function(entry) {
  n = i*1000;
  console.log('Dialogue: 0,' + msToTime(l) + '0,' + msToTime(n) + '0,Default,,0,0,0,,' + entry);
  header.appendChild(document.createTextNode('Dialogue: 0,' + msToTime(l) + '0,' + msToTime(n) + '0,Default,,0,0,0,,' + entry + '\r\n'));
  i = i+delay
  l = n;
});
