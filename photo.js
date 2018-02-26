
/**
 * Created by User on 1/19/2018.
 */

(function () {
    var video=document.getElementById('video'),
        canvas=document.getElementById('canvas'),
        context=canvas.getContext('2d'),
        photo=document.getElementById('photo'),
        loc="",
        vendorUrl=window.URL || window.webkitURL;

    navigator.getMedia=navigator.getUserMedia||
            navigator.webkitGetUserMedia||
            navigator.mozGetUserMedia||
            navigator.msGetUserMedia;

    navigator.getMedia({
        video:true,
        audio:false
        }, function (stream) {
            video.src=vendorUrl.createObjectURL(stream);
            video.play();
        
        },function (error) {

        });

    


})();

