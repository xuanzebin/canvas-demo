var canvas=document.getElementById('canvasBoard')
var context=canvas.getContext('2d')
var pageWidth,pageHeight
var eraserEnabled=false
autoSetCanvasSize(canvas)
listenToUser(canvas)
buttonOnclick()

//以下为工具函数
function autoSetCanvasSize(canvas) {
    setCanvasSize()
    window.onresize=function() {
        setCanvasSize()
    }
    function setCanvasSize() {
        pageWidth=document.documentElement.clientWidth
        pageHeight=document.documentElement.clientHeight
        canvas.width=pageWidth
        canvas.height=pageHeight    
    }
}
function color(cx,c1,c2,c3,c4) {
    cx.classList.add('active')
    c1.classList.remove('active')
    c2.classList.remove('active')
    c3.classList.remove('active')
    c4.classList.remove('active')
}
function buttonOnclick() {
    clearCanvas.onclick=function() {
        context.clearRect(0,0,pageWidth,pageHeight)
        if (eraserEnabled) {
            pen.classList.add('active')
            eraser.classList.remove('active')
            eraserEnabled=!eraserEnabled
            actions.classList.add="x"
        } else { 
            return
        }
    }
    pen.onclick=function() {
        if (eraserEnabled) {
            pen.classList.add('active')
            eraser.classList.remove('active')
            eraserEnabled=!eraserEnabled
            actions.classList.add="x"
        } else { 
            return
        }
    }
    eraser.onclick=function() {
        if (!eraserEnabled) {
            pen.classList.remove('active')
            eraser.classList.add('active')
            eraserEnabled=!eraserEnabled
            actions.classList.remove="x"
        } else {
            return
        }
    }
    red.onclick=function() {
        context.strokeStyle="red"
        color(red,blue,black,yellow,pink)
    }
    blue.onclick=function() {
        context.strokeStyle='blue'
        color(blue,red,black,yellow,pink) 
    }
    black.onclick=function() {
        context.strokeStyle='black'
        color(black,blue,red,yellow,pink) 
    }
    yellow.onclick=function() {
        context.strokeStyle='yellow'
        color(yellow,black,blue,red,pink) 
    }
    pink.onclick=function() {
        context.strokeStyle='pink'
        color(pink,yellow,black,blue,red) 
    }
}
function drawLine(x1,y1,x2,y2) {
    context.beginPath()
    context.moveTo(x1,y1)
    context.lineTo(x2,y2)
    context.lineWidth=3
    context.stroke()
    context.closePath()
}
function listenToUser(canvas) {
    var lastPoint={x:undefined,y:undefined}
    var using=false
    if ('ontouchstart' in document.body) {
        canvas.ontouchstart=function(touchDown) {
            var x=touchDown.touches[0].clientX
            var y=touchDown.touches[0].clientY
            using=true
            if (eraserEnabled) {
                context.clearRect(x-15,y-15,30,30)
            } else {
                lastPoint={x:x,y:y}
            }         
        }
        eraserCir.ontouchdown=function(cirDown) {
            var x=touchDown.touches[0].clientX
            var y=touchDown.touches[0].clientY
            using=true
            context.clearRect(x-15,y-15,30,30)  
        }
        canvas.ontouchmove=function(touchMove) {
            var x=touchMove.touches[0].clientX
            var y=touchMove.touches[0].clientY
            var eraserX=x-15,eraserY=y-15
            if (using) {
                if (eraserEnabled) {
                    eraserCir.style="left:"+eraserX+"px;top:"+eraserY+"px;display:block;"
                    context.clearRect(x-15,y-15,30,30)
                } else {
                    var newPoint={x:x,y:y}
                    drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
                    lastPoint=newPoint
                }
            }else {
                return
            }  
        }
        eraserCir.ontouchend=function(cirUp) {
            using=false
            eraserCir.style="display:none;"
        }
        canvas.ontouchend=function(mouseUp) {
            using=false
            eraserCir.style="display:none;"
        }
    } else {
        canvas.onmousedown=function(mouseDown) {
            var x=mouseDown.clientX
            var y=mouseDown.clientY
            using=true
            if (eraserEnabled) {
                context.clearRect(x-15,y-15,30,30)
            } else {
                lastPoint={x:x,y:y}
            }
        }
        eraserCir.onmousedown=function(cirDown) {
            var x=cirDown.clientX
            var y=cirDown.clientY
            using=true
            context.clearRect(x-15,y-15,30,30)
        }
        canvas.onmousemove=function(mouseMove) {
            var x=mouseMove.clientX
            var y=mouseMove.clientY
            var eraserX=x-15,eraserY=y-15
            if (using) {
                if (eraserEnabled) {
                    eraserCir.style="left:"+eraserX+"px;top:"+eraserY+"px;display:block;"
                    context.clearRect(x-15,y-15,30,30)
                } else {
                    var newPoint={x:x,y:y}
                    drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
                    lastPoint=newPoint
                }
            }else {
                return
            }
        }
        eraserCir.onmouseup=function(cirUp) {
            using=false
            eraserCir.style="display:none;"
        }
        canvas.onmouseup=function(mouseUp) {
            using=false
            eraserCir.style="display:none;"
        }
    }

}
