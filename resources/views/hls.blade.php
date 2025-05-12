<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HLS Demo</title>
    <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
    <style>
        body {
            height: 100vh;
            margin: 0;
        }
        video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            background: gray;
        }
    </style>
</head>
<body>
    <video id="video" autoplay playsinline muted loop></video>
    <script>
        function isMobile() {
            return window.innerWidth <= 768;
        }

        if (Hls.isSupported()) {
            var video = document.getElementById('video');
            var hls = new Hls();

            hls.on(Hls.Events.MEDIA_ATTACHED, function () {
                console.log('video and hls.js are now bound together !');
            });
            hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
                console.log(
                    'manifest loaded, found ' + data.levels.length + ' quality level',
                );
            });

            var videoSource = isMobile()
                ? '/videos/hls/mobile/mobile_playlist.m3u8'
                : '/videos/hls/desktop/desktop_playlist.m3u8';
            hls.loadSource(videoSource);
            hls.attachMedia(video);
        }


    </script>
</body>
</html>
