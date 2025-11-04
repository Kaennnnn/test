const _0x4a2b = (() => {
    let _0x1a, _0x1b, _0x1c, _0x1d = false, _0x1e = '', _0x1f = _0x5e8a(), _0x20;

    const _0x3b9c = () => {
        try {
            firebase.initializeApp(_0x2c7d());
            _0x20 = firebase.database();
            console.log('Firebase baglanti basarili');
            _0x20.ref('.info/connected').on('value', (_0x2a) => {
                if (_0x2a.val() === true) {
                    console.log('Firebase Realtime Database baglantisi aktif');
                } else {
                    console.log('Firebase baglantisi kesildi');
                }
            });
        } catch (_0x2b) {
            console.error('Firebase baglanti hatasi:', _0x2b);
            alert('Baglanti hatasi! Lutfen sayfayi yenileyin.');
        }
    };

    const _0x4c2d = () => {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
    };

    const _0x5e8a = () => {
        return 'user_' + Math.random().toString(36).substring(2, 15);
    };

    const _0x6f3b = (_0x3a) => {
        if (_0x3a.includes('vidrame.pro') || _0x3a.includes('filemoon') || _0x3a.includes('doodstream')) {
            return { type: 'iframe', url: _0x3a };
        }

        let _0x3b = _0x3a.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
        if (_0x3b) {
            return { type: 'youtube', id: _0x3b[1] };
        }

        _0x3b = _0x3a.match(/vidrame\.pro\/vr\/(\d+)/);
        if (_0x3b) {
            return { type: 'iframe', url: `https://vidrame.pro/vr/${_0x3b[1]}?ap=1` };
        }

        if (_0x3a.includes('embed') || _0x3a.includes('/e/') || _0x3a.includes('/v/')) {
            return { type: 'iframe', url: _0x3a };
        }

        if (_0x3a.includes('hdfilmizle') || _0x3a.includes('dizipal') || _0x3a.includes('dizigom')) {
            return { type: 'needs_iframe', originalUrl: _0x3a };
        }

        return null;
    };

    const _0x7d4e = async () => {
        console.log('createRoom cagirildi');
        
        _0x1e = document.getElementById('usernameInput').value.trim();
        console.log('Kullanici adi:', _0x1e);
        
        if (!_0x1e) {
            alert('Lutfen kullanici adi gir!');
            return;
        }

        const _0x4a = document.getElementById('videoUrl').value;
        console.log('Video URL:', _0x4a);
        
        let _0x4b = _0x6f3b(_0x4a);
        console.log('Video Info:', _0x4b);

        if (!_0x4b) {
            alert('Gecerli bir video URL\'si girin!\n\nDesteklenen formatlar:\n- YouTube: https://youtube.com/watch?v=...\n- Vidrame: https://vidrame.pro/vr/12345\n- Direkt iframe URL\'si');
            return;
        }

        if (_0x4b.type === 'needs_iframe') {
            const _0x4c = prompt(
                'Bu siteden otomatik video cekme desteklenmiyor.\n\n' +
                'Cozum: Videonun IFRAME URL\'sini yapistirin\n\n' +
                'Nasil bulunur?\n' +
                '1. Sayfada sag tikla -> Ogeyi Incele\n' +
                '2. <iframe src="..."> icindeki URL\'yi kopyala\n' +
                '3. Buraya yapistir\n\n' +
                'Ornek: https://vidrame.pro/vr/57346267\n\n' +
                'Iframe URL:'
            );
            
            if (!_0x4c) {
                console.log('Iframe URL girilmedi');
                return;
            }
            
            _0x4b = { type: 'iframe', url: _0x4c };
            console.log('Yeni Video Info:', _0x4b);
        }

        _0x1b = _0x4c2d();
        console.log('Oda kodu:', _0x1b);
        
        _0x1c = true;

        try {
            console.log('Firebase\'e kayit ediliyor...');
            await _0x20.ref('rooms/' + _0x1b).set({
                videoType: _0x4b.type,
                videoId: _0x4b.id || '',
                videoUrl: _0x4b.url || '',
                state: 'paused',
                time: 0,
                timestamp: Date.now()
            });
            console.log('Firebase kaydi basarili');

            _0x8e5f();
            _0x9f6a(_0x4b);
            _0xa07b();
        } catch (_0x4d) {
            console.error('Oda olusturma hatasi:', _0x4d);
            alert('Oda olusturulamadi! Hata: ' + _0x4d.message);
        }
    };

    const _0xb18c = () => {
        _0x1e = document.getElementById('usernameInput').value.trim();
        if (!_0x1e) {
            alert('Lutfen kullanici adi gir!');
            return;
        }

        const _0x5a = document.getElementById('roomCodeInput').value.toUpperCase();
        if (!_0x5a) {
            alert('Oda kodu girin!');
            return;
        }

        _0x1b = _0x5a;
        _0x1c = false;

        _0x20.ref('rooms/' + _0x1b).once('value', (_0x5b) => {
            if (_0x5b.exists()) {
                const _0x5c = _0x5b.val();
                const _0x5d = {
                    type: _0x5c.videoType,
                    id: _0x5c.videoId,
                    url: _0x5c.videoUrl
                };

                _0x8e5f();
                _0x9f6a(_0x5d);
                _0xa07b();
            } else {
                alert('Oda bulunamadi!');
            }
        });
    };

    const _0x8e5f = () => {
        _0x20.ref('rooms/' + _0x1b + '/users/' + _0x1f).set({
            username: _0x1e,
            isHost: _0x1c,
            joinedAt: Date.now()
        });

        _0x20.ref('rooms/' + _0x1b + '/users/' + _0x1f).onDisconnect().remove();

        _0xd29e(_0x1e + ' odaya katildi');
    };

    const _0x9f6a = (_0x6a) => {
        const _0x6b = document.getElementById('welcomeScreen');
        _0x6b.classList.remove('active');
        
        document.getElementById('watchScreen').classList.add('active');
        document.getElementById('displayRoomCode').textContent = _0x1b;

        const _0x6c = document.getElementById('playerContainer');
        _0x6c.innerHTML = '';

        if (_0x6a.type === 'youtube') {
            const _0x6d = document.createElement('div');
            _0x6d.id = 'player';
            _0x6c.appendChild(_0x6d);

            _0x1a = new YT.Player('player', {
                height: '100%',
                width: '100%',
                videoId: _0x6a.id,
                playerVars: { 'playsinline': 1, 'controls': 1 },
                events: {
                    'onReady': _0xc2af,
                    'onStateChange': _0xe3b0
                }
            });
        } else if (_0x6a.type === 'iframe') {
            const _0x6e = document.createElement('iframe');
            _0x6e.src = _0x6a.url;
            _0x6e.width = '100%';
            _0x6e.height = '100%';
            _0x6e.style.border = 'none';
            _0x6e.frameBorder = '0';
            _0x6e.scrolling = 'no';
            _0x6e.allowFullscreen = true;
            _0x6e.referrerPolicy = 'no-referrer';
            _0x6e.sandbox = 'allow-same-origin allow-scripts allow-forms allow-popups allow-presentation';
            _0x6e.allow = 'autoplay; fullscreen; encrypted-media; picture-in-picture';
            
            _0x6e.onerror = function(_0x6f) {
                console.error('Iframe yukleme hatasi:', _0x6f);
                _0xd29e('Video yuklenemedi - Site iframe\'e izin vermiyor olabilir');
            };
            
            _0x6e.onload = function() {
                console.log('Iframe yuklendi');
                try {
                    const _0x70 = _0x6e.contentDocument;
                    console.log('CORS yok, tam erisim var');
                } catch(_0x71) {
                    console.warn('CORS var ama video oynatiliyor olabilir:', _0x71.message);
                }
            };
            
            _0x6c.appendChild(_0x6e);

            _0x1a = {
                iframe: _0x6e,
                playVideo: function() { 
                    console.log('Oynat - iframe icin desteklenmiyor');
                },
                pauseVideo: function() { 
                    console.log('Duraklat - iframe icin desteklenmiyor');
                },
                seekTo: function(_0x72) { 
                    console.log('Zaman atla - iframe icin desteklenmiyor');
                },
                getCurrentTime: function() { return 0; },
                getPlayerState: function() { return 1; }
            };

            setTimeout(() => {
                _0xf4c1('Baglandi', true);
                _0xd29e('Video oynatici yuklendi! Not: Bu video icin oynat/duraklat butonlari calismayabilir.');
            }, 1500);
        }
    };

    const _0xc2af = (_0x7a) => {
        _0xf4c1('Baglandi', true);
    };

    const _0xe3b0 = (_0x8a) => {
        if (_0x1d || !_0x1c) return;

        const _0x8b = _0x8a.data === YT.PlayerState.PLAYING ? 'playing' : 'paused';
        const _0x8c = _0x1a.getCurrentTime();

        _0x20.ref('rooms/' + _0x1b).update({
            state: _0x8b,
            time: _0x8c,
            timestamp: Date.now()
        });
    };

    const _0xa07b = () => {
        _0x20.ref('rooms/' + _0x1b).on('value', (_0x9a) => {
            if (!_0x9a.exists()) return;
            const _0x9b = _0x9a.val();

            if (!_0x1c && _0x1a && _0x1a.seekTo) {
                _0x1d = true;
                if (_0x9b.state === 'playing') {
                    const _0x9c = Math.abs(_0x1a.getCurrentTime() - _0x9b.time);
                    if (_0x9c > 2) _0x1a.seekTo(_0x9b.time, true);
                    if (_0x1a.getPlayerState() !== YT.PlayerState.PLAYING) _0x1a.playVideo();
                } else {
                    if (_0x1a.getPlayerState() === YT.PlayerState.PLAYING) _0x1a.pauseVideo();
                }
                setTimeout(() => { _0x1d = false; }, 500);
            }
        });

        _0x20.ref('rooms/' + _0x1b + '/users').on('value', (_0x9d) => {
            _0x10d2(_0x9d.val() || {});
        });

        _0x20.ref('rooms/' + _0x1b + '/chat').limitToLast(50).on('child_added', (_0x9e) => {
            const _0x9f = _0x9e.val();
            if (_0x9f.userId !== _0x1f || _0x9f.type === 'system') {
                _0x11e3(_0x9f);
            }
        });
    };

    const _0x10d2 = (_0xaa) => {
        const _0xab = document.getElementById('usersList');
        const _0xac = document.getElementById('userCount');
        _0xab.innerHTML = '';

        const _0xad = Object.entries(_0xaa);
        _0xac.textContent = _0xad.length;

        _0xad.forEach(([_0xae, _0xaf]) => {
            const _0xb0 = document.createElement('div');
            _0xb0.className = 'user-item';
            _0xb0.innerHTML = `
                <div class="user-avatar">${_0xaf.username.charAt(0).toUpperCase()}</div>
                <div>${_0xaf.username}</div>
                ${_0xaf.isHost ? '<span class="user-badge">HOST</span>' : ''}
            `;
            _0xab.appendChild(_0xb0);
        });
    };

    const _0x12f4 = () => {
        const _0xba = document.getElementById('chatInput');
        const _0xbb = _0xba.value.trim();
        if (!_0xbb) return;

        const _0xbc = {
            userId: _0x1f,
            username: _0x1e,
            message: _0xbb,
            timestamp: Date.now(),
            type: 'user'
        };

        _0x20.ref('rooms/' + _0x1b + '/chat').push(_0xbc);
        _0x11e3(_0xbc);
        _0xba.value = '';
    };

    const _0xd29e = (_0xca) => {
        _0x20.ref('rooms/' + _0x1b + '/chat').push({
            message: _0xca,
            timestamp: Date.now(),
            type: 'system'
        });
    };

    const _0x11e3 = (_0xda) => {
        const _0xdb = document.getElementById('chatMessages');
        const _0xdc = document.createElement('div');
        _0xdc.className = 'chat-message' + (_0xda.type === 'system' ? ' system' : '');

        if (_0xda.type === 'system') {
            _0xdc.textContent = _0xda.message;
        } else {
            _0xdc.innerHTML = `<span class="username">${_0xda.username}:</span>${_0xda.message}`;
        }

        _0xdb.appendChild(_0xdc);
        _0xdb.scrollTop = _0xdb.scrollHeight;
    };

    const _0x1405 = () => {
        if (!_0x1a) return;
        if (_0x1a.playVideo) _0x1a.playVideo();
        if (_0x1c) {
            _0x20.ref('rooms/' + _0x1b).update({
                state: 'playing',
                time: _0x1a.getCurrentTime ? _0x1a.getCurrentTime() : 0,
                timestamp: Date.now()
            });
        }
    };

    const _0x1516 = () => {
        if (!_0x1a) return;
        if (_0x1a.pauseVideo) _0x1a.pauseVideo();
        if (_0x1c) {
            _0x20.ref('rooms/' + _0x1b).update({
                state: 'paused',
                time: _0x1a.getCurrentTime ? _0x1a.getCurrentTime() : 0,
                timestamp: Date.now()
            });
        }
    };

    const _0x1627 = () => {
        if (!_0x1a) return;
        if (_0x1a.seekTo) _0x1a.seekTo(0);
        if (_0x1c) {
            _0x20.ref('rooms/' + _0x1b).update({
                time: 0,
                timestamp: Date.now()
            });
        }
    };

    const _0x1738 = () => {
        if (_0x1b) {
            _0x20.ref('rooms/' + _0x1b + '/users/' + _0x1f).remove();
            _0xd29e(_0x1e + ' odadan ayrildi');
        }
        location.reload();
    };

    const _0xf4c1 = (_0xea, _0xeb) => {
        const _0xec = document.getElementById('statusBadge');
        const _0xed = document.getElementById('statusText');
        _0xed.textContent = _0xea;
        _0xec.className = 'status-badge ' + (_0xeb ? 'connected' : 'disconnected');
    };

    document.addEventListener('DOMContentLoaded', () => {
        _0x3b9c();

        document.getElementById('chatInput').addEventListener('keypress', (_0xfa) => {
            if (_0xfa.key === 'Enter') {
                _0x12f4();
            }
        });

        window.addEventListener('beforeunload', () => {
            if (_0x1b) {
                _0x20.ref('rooms/' + _0x1b + '/users/' + _0x1f).remove();
            }
        });
    });

    return {
        createRoom: _0x7d4e,
        joinRoom: _0xb18c,
        sendMessage: _0x12f4,
        syncPlay: _0x1405,
        syncPause: _0x1516,
        syncRestart: _0x1627,
        leaveRoom: _0x1738
    };
})();
