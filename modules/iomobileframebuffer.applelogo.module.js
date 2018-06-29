//IOMobileFrameBuffer-like way of drawing an Apple Logo onto a canvas using pixel buffers and Mathematical operations.

function circle(context, x, y, radius) {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    context.fill();
    context.stroke();
}

function triangle(context, x1, y1, x2, y2, x3, y3) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(x3, y3);
    context.closePath();
    context.fill();
    context.stroke();
}

function applelogo(id = "applelogo") {
    document.body.innerHTML = "";
    document.body.setAttribute('style','background: black');
    var canvas = document.createElement('canvas');
    canvas.id = id;
    canvas.setAttribute('style', 'position: fixed;\
                        margin-top: calc(50vh - 6.250%);\
                        margin-left: calc(50vw - 12.5%);\
                        width: 25%;\
                        height: 25%;\
                        background: black;');
    var context = canvas.getContext("2d");
    var centreX, centreY;
    var baseSize = 3.5; //15
    var contextX, contextY, control1X, control1Y, control2X, control2Y, endX, endY;
    
    //cal central point
    centreX = canvas.width / 2;
    centreY = canvas.height / 2;
    
    //set properties of stroke and fill
    context.fillStyle = "white";
    context.lineWidth = 1;
    context.strokeStyle = "white";
    context.lineJoin = "round";
    
    //---- Draw body ----
    //draw 13 circle
    // circle(context, centreX, centreY, 13 * baseSize);
    context.beginPath();
    context.arc(centreX, centreY, 13 * baseSize, -Math.PI / 4, Math.PI + Math.PI / 4, false);
    context.closePath();
    context.fill();
    context.stroke();
    
    //draw 2 bottom 5 circles
    circle(context, centreX - 5.8 * baseSize, centreY + 9.7 * baseSize, 5 * baseSize);
    circle(context, centreX + 5.8 * baseSize, centreY + 9.7 * baseSize, 5 * baseSize);
    
    //draw bottom-cutting 8 circle
    triangle(context, centreX - 5.8 * baseSize, centreY + 9.7 * baseSize, centreX + 5.8 * baseSize, centreY + 9.7 * baseSize, centreX, centreY + 20.8 * baseSize);
    context.globalCompositeOperation = "destination-out";
    circle(context, centreX, centreY + 21.3 * baseSize, 8 * baseSize);
    
    //draw 2 top 8 circles
    context.globalCompositeOperation = "source-over";
    circle(context, centreX - 6.8 * baseSize, centreY - 5.0 * baseSize, 8 * baseSize);
    circle(context, centreX + 6.8 * baseSize, centreY - 5.0 * baseSize, 8 * baseSize);
    
    //draw top-cutting 8 circle
    contextX = centreX - 6.8 * baseSize + Math.sin(Math.PI / 4 / 1.5) * 8 * baseSize;
    contextY = centreY - 5.0 * baseSize - Math.cos(Math.PI / 4 / 1.5) * 8 * baseSize - 1;
    control1X = centreX;
    control1Y = centreY - 10 * baseSize;
    endX = centreX + 6.8 * baseSize - Math.sin(Math.PI / 4 / 1.5) * 8 * baseSize;
    endY = centreY - 5.0 * baseSize - Math.cos(Math.PI / 4 / 1.5) * 8 * baseSize - 1;
    
    context.globalCompositeOperation = "source-over";
    context.beginPath();
    context.moveTo(contextX, contextY);
    context.lineTo(centreX, centreY);
    context.lineTo(endX, endY);
    context.closePath();
    context.fill();
    context.stroke();
    
    // circle(context, centreX, centreY - 19.45 * baseSize, 8 * baseSize);
    context.globalCompositeOperation = "destination-out";
    context.beginPath();
    context.moveTo(contextX, contextY);
    context.quadraticCurveTo(control1X, control1Y, endX, endY);
    context.lineTo(centreX, centreY - 19.4 * baseSize);
    context.closePath();
    context.fill();
    context.stroke();
    
    //draw left and right 3 circle
    context.globalCompositeOperation = "source-over";
    circle(context, centreX - 11.6 * baseSize, centreY + 4.5 * baseSize, 3 * baseSize);
    circle(context, centreX + 11.6 * baseSize, centreY + 4.5 * baseSize, 3 * baseSize);
    
    //fill left - left 3-5-8 circle
    //left bottom 5 circle
    contextX = centreX - 5.8 * baseSize - Math.sin(Math.PI / 4) * (5 * baseSize) - 0.5;
    contextY = centreY + 9.7 * baseSize + Math.cos(Math.PI / 4) * (5 * baseSize);
    //left top 8 circle
    endX = centreX - 6.8 * baseSize - Math.cos(Math.PI / 4) * (8 * baseSize);
    endY = centreY - 5.0 * baseSize - Math.sin(Math.PI / 4) * (8 * baseSize);
    //left 3 circle
    control1X = contextX - 6.6 * baseSize;
    control1Y = contextY - 6.6 * baseSize;
    control2X = endX - 6.6 * baseSize;
    control2Y = endY + 6.6 * baseSize;
    
    context.globalCompositeOperation = "source-over";
    context.beginPath();
    context.moveTo(contextX, contextY);
    context.bezierCurveTo(control1X, control1Y, control2X, control2Y, endX, endY);
    context.lineTo(centreX, centreY);
    context.closePath();
    context.fill();
    context.stroke();
    
    //fill right - right 3-5-8 circle
    //right bottom 5 circle
    contextX = centreX + 5.8 * baseSize + Math.sin(Math.PI / 4) * (5 * baseSize) + 0.5;
    contextY = centreY + 9.7 * baseSize + Math.cos(Math.PI / 4) * (5 * baseSize);
    //right top 8 circle
    endX = centreX + 6.8 * baseSize + Math.cos(Math.PI / 4) * (8 * baseSize);
    endY = centreY - 5.0 * baseSize - Math.sin(Math.PI / 4) * (8 * baseSize);
    //left 3 circle
    control1X = contextX + 6.6 * baseSize;
    control1Y = contextY - 6.6 * baseSize;
    control2X = endX + 6.6 * baseSize;
    control2Y = endY + 6.6 * baseSize;
    
    context.globalCompositeOperation = "source-over";
    context.beginPath();
    context.moveTo(contextX, contextY);
    context.bezierCurveTo(control1X, control1Y, control2X, control2Y, endX, endY);
    context.lineTo(centreX, centreY);
    context.closePath();
    context.fill();
    context.stroke();
    
    //draw right-cutting 8 circle
    context.globalCompositeOperation = "destination-out";
    circle(context, centreX + 17.4 * baseSize, centreY - 2.3 * baseSize, 8 * baseSize);
    
    //---- Draw leaf ----
    //right curve
    contextX = centreX - 1.1 * baseSize;
    contextY = centreY - 12.4 * baseSize;
    endX = centreX + 6.3 * baseSize;
    endY = centreY - 21.1 * baseSize;
    control1X = centreX + 6.6 * baseSize - (4 / 7.5) * baseSize;
    control1Y = centreY - 13.3 * baseSize - (4 / 7.5) * baseSize;
    
    context.globalCompositeOperation = "source-over";
    context.beginPath();
    context.moveTo(contextX, contextY);
    context.quadraticCurveTo(control1X, control1Y, endX, endY);
    
    //left curve
    control1X = centreX - 1.5 * baseSize + (4 / 7.5) * baseSize;
    control1Y = centreY - 20.2 * baseSize + (4 / 7.5) * baseSize;
    
    context.moveTo(contextX, contextY);
    context.quadraticCurveTo(control1X, control1Y, endX, endY);
    context.closePath();
    context.fill();
    context.stroke();
    document.body.appendChild(canvas);
}
