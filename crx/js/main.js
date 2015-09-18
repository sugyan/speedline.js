setInterval(function() {
    var images = document.getElementsByTagName("img");
    for (var i = 0; i < images.length; i++) {
        SpeedLine(images[i]);
    }
}, 500);
