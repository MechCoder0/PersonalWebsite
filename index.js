var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
context.beginPath();
context.arc(75,75,35,0,Math.PI);
context.stroke();