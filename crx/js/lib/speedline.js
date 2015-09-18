var SpeedLine = function (image) {
    if (!image) {
        console.error('no image');
        return;
    }
    // too small
    if (image.width < 50 || image.height < 50) {
        return;
    }
    // already speedlined
    if (image.parentNode.tagName === 'DIV' && image.parentNode.className === 'speedline') {
        return;
    }

    var rect = image.getBoundingClientRect();
    var div = document.createElement('div');
    div.className = 'speedline';
    // adjust styles
    div.style.margin = window.getComputedStyle(image).getPropertyValue('margin');
    image.style.margin = 0;
    image.style.left = 0;
    image.style.top = 0;
    div.style.position = 'relative';
    div.style.display = 'inline-block';
    // create canvas
    var canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.left = '0px';
    canvas.style.top = '0px';
    canvas.style.zIndex = image.style.zIndex + 1;
    canvas.width = rect.width;
    canvas.height = rect.height;
    // replace nodes
    image.parentNode.insertBefore(div, image.nextSibling);
    image.parentNode.removeChild(image);
    div.appendChild(image);
    div.appendChild(canvas);
    // draw speedlines
    var ctx = canvas.getContext('2d');
    var center = [rect.width / 2, rect.height / 2];
    var radius_center = 0.75;
    var step = 0.02;
    var bold = 1.1;
    var lastDrawn = new Date().getTime();
    var draw = function() {
        var now = new Date().getTime();
        if (now - lastDrawn > 100) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            var theeta = 0.0;
            while (theeta < Math.PI * 2) {
                var step_noise = Math.random() + 0.5;
                theeta += step * step_noise;
                var radius_center_noise = Math.random() * 0.3 + 1.0;
                var bold_noise = Math.random() * 0.7 + 0.3;
                var line_center = [Math.sin(theeta) * center[0] * radius_center * radius_center_noise + center[0], Math.cos(theeta) * center[1] *radius_center * radius_center_noise + center[1]];
                var point1 = [Math.sin(theeta) * center[0] * 2 + center[0], Math.cos(theeta) * center[1] * 2 + center[1]];
                var point2 = [Math.sin(theeta + step * bold * bold_noise) * center[0] * 2 + center[0], Math.cos(theeta + step * bold * bold_noise) * center[1] * 2 + center[1]];

                ctx.beginPath();
                ctx.moveTo(line_center[0], line_center[1]);
                ctx.lineTo(point1[0], point1[1]);
                ctx.lineTo(point2[0], point2[1]);
                ctx.fill();
            }
            lastDrawn = now;
        }
        window.requestAnimationFrame(draw);
    };
    window.requestAnimationFrame(draw);
};

window.SpeedLine = SpeedLine;
