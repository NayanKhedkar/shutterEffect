var handle, container, shutter, dragData = null;

function windowOnload() {
    container = document.getElementById("container");
    shutter = document.getElementById("shutter");
    handle = document.getElementById("handle");
    addEvtListener(handle, "mousedown", startDrag, false);
}

function startDrag(ev) {
    addEvtListener(container, 'mousemove', drag, false);
    addEvtListener(container, 'mouseup', stopDrag, false);
    if (!dragData) {
        ev = ev || event;
        var transYRegex = /\.*translateY\((.*)px\)/i;
        dragData = {
            //y: ev.clientY - shutter.offsetTop
            y: ev.clientY - transYRegex.exec(shutter.style.transform||"translateY(0px)")[1]
        };
    }
}

function drag(ev) {
    if (dragData) {
        ev = ev || event;
        var top = ev.clientY - dragData.y;
        var height = shutter.offsetHeight - handle.offsetHeight;
        if (top >= 0) {
            //touches to bottom
            return;
        }if(height <= Math.abs(top)){
           //touches to top
           addEvtListener(shutter, 'mouseover',mouseOver, false);
           addEvtListener(shutter, 'mouseout', mouseOut, false);
           return;
        }else{
           removeEvtListener(shutter, 'mouseover', mouseOver, false);
           removeEvtListener(shutter, 'mouseout', mouseOut, false);
        }
        shutter.style.transform = 'translateY('+(top)+'px)';
        //shutter.style.top = top + "px";
    }
}
function mouseOver(){
    if (shutter.classList.contains("display-none")){
       shutter.classList.remove("display-none");
       handle.classList.remove("display-none");
    }
}
function mouseOut(){
    if(!shutter.classList.contains("display-none")){
            shutter.className += " display-none ";
            handle.className += " display-none ";
    }
}
function stopDrag(ev) {
    removeEvtListener(container, 'mousemove', drag, false);
    removeEvtListener(container, 'mouseup', stopDrag, false);
    if (dragData) {
        dragData = null;
    }
}

function addEvtListener(target, type, listener, options) {
    if (window.addEventListener) {
        target.addEventListener(type, listener, options || false);
    } else if (window.attachEvent) {
        target.attachEvent('on' + type, listener);
    }
}

function removeEvtListener(target, type, listener, options) {
    if (window.removeEventListener) {
        target.removeEventListener(type, listener, options || false);
    } else if (window.detachEvent) {
        target.detachEvent('on' + type, listener);
    }
}