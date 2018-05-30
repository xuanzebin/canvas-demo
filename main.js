var canvas=document.getElementById('canvasBoard')
var context=canvas.getContext('2d')
var pageWidth,pageHeight
var eraserEnabled=false
var lineWidth=2;
autoSetCanvasSize(canvas)
fillWhite()
listenToUser(canvas)
buttonOnclick()

//以下为工具函数
function fillWhite() {
    context.fillStyle='white'
    context.fillRect(0,0,pageWidth,pageHeight)
}
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
function color(cx,c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11) {
    cx.classList.add('active')
    c1.classList.remove('active')
    c2.classList.remove('active')
    c3.classList.remove('active')
    c4.classList.remove('active')
    c5.classList.remove('active')
    c6.classList.remove('active')
    c7.classList.remove('active')
    c8.classList.remove('active')
    c9.classList.remove('active')
    c10.classList.remove('active')
    c11.classList.remove('active')
}
function buttonOnclick() {
    clearCanvas.onclick=function() {
        context.clearRect(0,0,pageWidth,pageHeight)
        fillWhite()
        pen.classList.add('active')
        lineWidth=2
        eraser.classList.remove('active')
        brush.classList.remove('active')
        if (eraserEnabled) {
            eraserEnabled=!eraserEnabled
        } else { 
            return
        }
    }
    pen.onclick=function() {
        pen.classList.add('active')
        eraser.classList.remove('active')
        brush.classList.remove('active')
        lineWidth=2
        if (eraserEnabled) {
            eraserEnabled=!eraserEnabled
        } else { 
            return
        }
    }
    brush.onclick=function() {
        brush.classList.add('active')
        eraser.classList.remove('active')
        pen.classList.remove('active')
        lineWidth=5
        if (eraserEnabled) {
            eraserEnabled=!eraserEnabled
        } else { 
            return
        }
    }
    eraser.onclick=function() {
        pen.classList.remove('active')
        eraser.classList.add('active')
        brush.classList.remove('active')
        if (!eraserEnabled) {
            eraserEnabled=!eraserEnabled
        } else {
            return
        }
    }
    download.onclick=function() {
        var url= canvas.toDataURL("image/png")
        var a=document.createElement('a')
        document.body.appendChild(a)
        a.href=url
        a.download="我的作品"
        a.target='_blank'
        a.click()
    }
    red.onclick=function() {
        context.strokeStyle="red"
        color(red,blue,black,yellow,pink,green,grey,purple,maroon,lawngreen,orange,aqua)
    }
    blue.onclick=function() {
        context.strokeStyle='blue'
        color(blue,red,black,yellow,pink,green,grey,purple,maroon,lawngreen,orange,aqua) 
    }
    black.onclick=function() {
        context.strokeStyle='black'
        color(black,blue,red,yellow,pink,green,grey,purple,maroon,lawngreen,orange,aqua) 
    }
    yellow.onclick=function() {
        context.strokeStyle='yellow'
        color(yellow,black,blue,red,pink,green,grey,purple,maroon,lawngreen,orange,aqua) 
    }
    pink.onclick=function() {
        context.strokeStyle='pink'
        color(pink,yellow,black,blue,red,green,grey,purple,maroon,lawngreen,orange,aqua) 
    }
    green.onclick=function() {
        context.strokeStyle='green'
        color(green,pink,yellow,black,blue,red,grey,purple,maroon,lawngreen,orange,aqua)
    }
    grey.onclick=function() {
        context.strokeStyle='grey'
        color(grey,purple,maroon,lawngreen,orange,aqua,green,pink,yellow,black,blue,red)
    }
    purple.onclick=function() {
        context.strokeStyle='purple'
        color(purple,grey,maroon,lawngreen,orange,aqua,green,pink,yellow,black,blue,red)
    }
    maroon.onclick=function() {
        context.strokeStyle='maroon'
        color(maroon,purple,grey,lawngreen,orange,aqua,green,pink,yellow,black,blue,red)
    }
    lawngreen.onclick=function() {
        context.strokeStyle='lawngreen'
        color(lawngreen,purple,maroon,grey,orange,aqua,green,pink,yellow,black,blue,red)
    }
    orange.onclick=function() {
        context.strokeStyle='orange'
        color(orange,purple,maroon,lawngreen,grey,aqua,green,pink,yellow,black,blue,red)
    }
    aqua.onclick=function() {
        context.strokeStyle='aqua'
        color(aqua,purple,maroon,lawngreen,orange,grey,green,pink,yellow,black,blue,red)
    }
    left.onclick=function() {
        left.style="display:none;"
        right.style="display:block;"
        colorOne.style="display:none;"
        colorTwo.style="display:none;"
        colorMask.style="width:16px;"
    }
    right.onclick=function() {
        left.style="display:block;"
        right.style="display:none;"
        colorMask.style="width:105px;"
        colorOne.style="display:block;"
        colorTwo.style="display:block;"
    }
}
function drawLine(x1,y1,x2,y2) {
    context.beginPath()
    context.moveTo(x1,y1)
    context.lineTo(x2,y2)
    context.lineWidth=lineWidth
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
