App = window.App || {};
App.Main = (function Main() {
    var logger = App.Logger.create({
        loggerEl: document.querySelector('.logsContainer'),
        loggerName: 'Main',
        logLevel: App.Logger.logLevels.ALL
    });

    // Manifest files with extension required by Shaka Player (.mpd)
    var playerConfig = [
        {
            manifest: 'http://livesim.dashif.org/livesim/testpic_2s/Manifest.mpd',
            description: 'No DRM'
        },
        {
            manifest: 'https://storage.googleapis.com/shaka-demo-assets/angel-one-clearkey/dash.mpd',
            description: 'ClearKey DRM',
            drmServers: {
                'org.w3.clearkey': 'https://cwip-shaka-proxy.appspot.com/clearkey?_u3wDe7erb7v8Lqt8A3QDQ=ABEiM0RVZneImaq7zN3u_w' // eslint-disable-line max-len
            }
        },
        {
            manifest: 'https://storage.googleapis.com/shaka-demo-assets/sintel-widevine/dash.mpd',
            description: 'Widevine DRM',
            drmServers: {
                'com.widevine.alpha': 'https://cwip-shaka-proxy.appspot.com/no_auth'
            }
        },
        {
            manifest: 'https://amssamples.streaming.mediaservices.windows.net/622b189f-ec39-43f2-93a2-201ac4e31ce1/BigBuckBunny.ism/manifest(format=mpd-time-csf)', // eslint-disable-line max-len
            description: 'PlayReady and Widevine DRMs',
            drmServers: {
                'com.microsoft.playready': 'https://amssamples.keydelivery.mediaservices.windows.net/PlayReady/',
                'com.widevine.alpha': 'https://amssamples.keydelivery.mediaservices.windows.net/Widevine/?KID=1ab45440-532c-4399-94dc-5c5ad9584bac' // eslint-disable-line max-len
            }
        }
    ];

    var currentIndex = 0;
    var skipStep = 5;

    var AutoPlayMode = {
        PLAY: 'play',
        PAUSE: 'pause'
    };

    var playPauseEl = document.querySelector('.playpause');
    var videoEl = document.querySelector('#video');
    var descriptionEl = document.querySelector('#description');
    var buttonsEl = document.querySelector('.buttons');
    var backgroundEl = document.querySelector('.background');

    var player;

    function initApp() {
        if (window.shaka && window.shaka.Player.isBrowserSupported()) {
            initPlayer();
        } else {
            logger.error('Shaka player is not supported or not found on the device');
        }
    }

    function initPlayer() {
        player = new window.shaka.Player(videoEl);

        player.addEventListener('error', onErrorEvent);

        player.configure({
            drm: {
                servers: playerConfig[0].drmServers
            }
        });

        player.load(playerConfig[0].manifest).then(function () {
            logger.log('Video has been loaded');
            descriptionEl.innerText = playerConfig[0].description;
        }).catch(onError);

        videoEl.addEventListener('ended', onEnded);
    }

    // Player needs to be reloaded after 'stop' or movie change
    function reloadPlayer(playMode) {
        player.unload()
            .then(player.configure({
                drm: {
                    servers: playerConfig[currentIndex].drmServers
                }
            }))
            .then(player.load(playerConfig[currentIndex].manifest))
            .then(function () {
                logger.log('Video has been reloaded');
                descriptionEl.innerText = playerConfig[currentIndex].description;
                if (playMode === AutoPlayMode.PLAY) {
                    videoEl.play();
                    playPauseEl.innerText = 'Pause';
                } else if (playMode === AutoPlayMode.PAUSE) {
                    videoEl.pause();
                    playPauseEl.innerText = 'Play';
                }
            })
            .catch(onError);
    }

    function onEnded() {
        reloadPlayer(AutoPlayMode.PAUSE);
    }

    function onErrorEvent(event) {
        onError(event.detail);
    }

    function onError(e) {
        logger.error('Error code: ', e.code, ', Object: ', e);
    }

    function onTogglePlayPause() {
        if (videoEl.paused || videoEl.ended) {
            playPauseEl.innerText = 'Pause';
            videoEl.play();
        } else {
            playPauseEl.innerText = 'Play';
            videoEl.pause();
        }
    }

    function onStop() {
        reloadPlayer(AutoPlayMode.PAUSE);
    }

    function onNext() {
        currentIndex = currentIndex < playerConfig.length - 1 ? currentIndex + 1 : 0;
        reloadPlayer(AutoPlayMode.PLAY);
    }

    function onPrevious() {
        currentIndex = currentIndex > 0 ? currentIndex - 1 : playerConfig.length - 1;
        reloadPlayer(AutoPlayMode.PLAY);
    }

    function onFastForward() {
        videoEl.currentTime += skipStep;
        logger.log('Skipped ' + skipStep + 's');
    }

    function onRewind() {
        videoEl.currentTime -= skipStep;
        logger.log('Rewinded ' + skipStep + 's');
    }

    function onFullscreen() {
        var fullscreenClass = 'fullscreenMode';

        videoEl.classList.toggle(fullscreenClass);
        buttonsEl.classList.toggle(fullscreenClass);
        backgroundEl.classList.toggle(fullscreenClass);
    }

    function addButtonsHandlers() {
        var buttonsWithHandlers = [
            { elementSelector: '.playpause', handler: onTogglePlayPause },
            { elementSelector: '.stop', handler: onStop },
            { elementSelector: '.next', handler: onNext },
            { elementSelector: '.previous', handler: onPrevious },
            { elementSelector: '.ff', handler: onFastForward },
            { elementSelector: '.rw', handler: onRewind },
            { elementSelector: '.togglefullscreen', handler: onFullscreen }
        ];

        App.KeyHandler.addHandlersForButtons(buttonsWithHandlers);
    }

    App.Navigation.registerMenu({
        name: 'Basic',
        domEl: document.querySelector('#buttons')
    });

    window.onload = function () {
        addButtonsHandlers();
        initApp();
    };
}());
