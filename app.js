const _0x4a2b = (() => {
    let _0x1a, _0x1b, _0x1c, _0x1d = false, _0x1e = '', _0x1f, _0x20;
    let isIframePlayer = false;
    let lastStateUpdate = 0;
    let lastKnownState = '';
    let syncInProgress = false;

    const _0x5e8a = () => {
        return 'user_' + Math.random().toString(36).substring(2, 15);
    };

    const _0x4c2d = () => {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
    };

    _0x1f = _0x5e8a();

    const createNameChangeModal = () => {
        const modalHTML = `
            <div id="nameChangeModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 10000; backdrop-filter: blur(10px); align-items: center; justify-content: center;">
                <div style="background: linear-gradient(135deg, rgba(102, 126, 234, 0.95), rgba(118, 75, 162, 0.95)); padding: 40px; border-radius: 20px; max-width: 400px; width: 90%; box-shadow: 0 20px 60px rgba(0,0,0,0.5); animation: modalSlide 0.3s ease;">
                    <h2 style="color: white; margin-bottom: 20px; font-size: 1.5em; text-align: center;">İsim Değiştir</h2>
                    <input type="text" id="newNameInput" placeholder="Yeni ismini gir..." style="width: 100%; padding: 15px; border: 2px solid rgba(255,255,255,0.3); border-radius: 12px; font-size: 16px; background: rgba(255,255,255,0.1); color: white; margin-bottom: 20px;" maxlength="20">
                    <div style="display: flex; gap: 10px;">
                        <button onclick="_0x4a2b.cancelNameChange()" style="flex: 1; padding: 12px; background: rgba(255,255,255,0.2); color: white; border: none; border-radius: 10px; font-weight: 600; cursor: pointer;">İptal</button>
                        <button onclick="_0x4a2b.confirmNameChange()" style="flex: 1; padding: 12px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 10px; font-weight: 600; cursor: pointer;">Değiştir</button>
                    </div>
                </div>
            </div>
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes modalSlide {
                from { opacity: 0; transform: scale(0.8); }
                to { opacity: 1; transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    };

    const createVideoChangeModal = () => {
        const modalHTML = `
            <div id="videoChangeModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 10000; backdrop-filter: blur(10px); align-items: center; justify-content: center;">
                <div style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.95), rgba(124, 58, 237, 0.95)); padding: 40px; border-radius: 20px; max-width: 500px; width: 90%; box-shadow: 0 20px 60px rgba(0,0,0,0.5); animation: modalSlide 0.3s ease;">
                    <h2 style="color: white; margin-bottom: 20px; font-size: 1.5em; text-align: center;">Video Değiştir</h2>
                    <input type="text" id="newVideoInput" placeholder="Yeni video URL'si (YouTube veya iframe)..." style="width: 100%; padding: 15px; border: 2px solid rgba(255,255,255,0.3); border-radius: 12px; font-size: 16px; background: rgba(255,255,255,0.1); color: white; margin-bottom: 20px;">
                    <div style="display: flex; gap: 10px;">
                        <button onclick="_0x4a2b.cancelVideoChange()" style="flex: 1; padding: 12px; background: rgba(255,255,255,0.2); color: white; border: none; border-radius: 10px; font-weight: 600; cursor: pointer;">İptal</button>
                        <button onclick="_0x4a2b.confirmVideoChange()" style="flex: 1; padding: 12px; background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white; border: none; border-radius: 10px; font-weight: 600; cursor: pointer;">Değiştir</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    };

    const _0x3b9c = () => {
        try {
            firebase.initializeApp(_0x2c7d());
            _0x20 = firebase.database();
            console.log('baglanti basarili');
            _0x20.ref('.info/connected').on('value', (_0x2a) => {
                if (_0x2a.val() === true) {
                    console.log('baglanti aktif');
                    _0xf4c1('Baglandi', true);
                } else {
                    console.log('baglanti kesildi');
                    _0xf4c1('Baglanti Kesildi', false);
                }
            });
        } catch (_0x2b) {
            console.error('baglanti hatasi:', _0x2b);
            alert('sayfayı yenile bağlantı kurulmadı.');
        }
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

    const updateControlButtons = () => {
        const controlsDiv = document.querySelector('.controls');
        
        if (_0x1c) {
            controlsDiv.innerHTML = `
                <button class="btn-primary" onclick="_0x4a2b.changeVideo()" style="background: linear-gradient(135deg, #8b5cf6, #7c3aed);">Video Değiştir</button>
                <button class="btn-secondary" onclick="_0x4a2b.changeName()">İsim Değiştir</button>
                <button class="btn-leave" onclick="_0x4a2b.leaveRoom()">Odadan Çık</button>
            `;
        } else {
            controlsDiv.innerHTML = `
                <button class="btn-secondary" onclick="_0x4a2b.changeName()">İsim Değiştir</button>
                <button class="btn-leave" onclick="_0x4a2b.leaveRoom()">Odadan Çık</button>
            `;
        }
    };

    const addVideoBlocker = () => {
        if (!_0x1c && !isIframePlayer) {
            const blocker = document.createElement('div');
            blocker.id = 'videoBlocker';
            blocker.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 100;
                cursor: not-allowed;
                background: transparent;
            `;
            blocker.title = 'Sadece HOST kontrol edebilir';
            
            const container = document.getElementById('playerContainer');
            container.style.position = 'relative';
            container.appendChild(blocker);
            
            console.log('Video engelleyici eklendi (HOST değilsiniz)');
        }
    };

    const _0x7d4e = async () => {
        console.log('createRoom cagirildi');
        
        _0x1e = document.getElementById('usernameInput').value.trim();
        console.log('nick :', _0x1e);
        
        if (!_0x1e) {
            alert('lütfen isim giriniz');
            return;
        }

        const _0x4a = document.getElementById('videoUrl').value;
        console.log('Video URL:', _0x4a);
        
        let _0x4b = _0x6f3b(_0x4a);
        console.log('Video Info:', _0x4b);

        if (!_0x4b) {
            alert('girilen değer geçerli değil');
            return;
        }

        if (_0x4b.type === 'needs_iframe') {
            const _0x4c = prompt(
                'Bu siteden otomatik video cekme desteklenmiyor.\n\nIframe URL girin:'
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
            console.log('kayit ediliyor...');
            await _0x20.ref('rooms/' + _0x1b).set({
                videoType: _0x4b.type,
                videoId: _0x4b.id || '',
                videoUrl: _0x4b.url || '',
                state: 'paused',
                time: 0,
                timestamp: Date.now(),
                stateVersion: 0
            });
            console.log('kayit basarili');

            _0x8e5f();
            _0x9f6a(_0x4b);
            _0xa07b();
            updateControlButtons();
        } catch (_0x4d) {
            console.error('hata oluşturulamadı:', _0x4d);
            alert('hata oluşturulamadı: ' + _0x4d.message);
        }
    };

    const _0xb18c = () => {
        _0x1e = document.getElementById('usernameInput').value.trim();
        if (!_0x1e) {
            alert('isim alın lütfen');
            return;
        }

        const _0x5a = document.getElementById('roomCodeInput').value.toUpperCase();
        if (!_0x5a) {
            alert('oda kodu girmelisin');
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
                updateControlButtons();
            } else {
                alert('boyle bir oda yok');
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

        _0xd29e(_0x1e + ' hoşgeldin');
    };

    const _0x9f6a = (_0x6a) => {
        const _0x6b = document.getElementById('welcomeScreen');
        _0x6b.classList.remove('active');
        
        document.getElementById('watchScreen').classList.add('active');
        document.getElementById('displayRoomCode').textContent = _0x1b;

        const _0x6c = document.getElementById('playerContainer');
        _0x6c.innerHTML = '';

        if (_0x6a.type === 'youtube') {
            isIframePlayer = false;
            const _0x6d = document.createElement('div');
            _0x6d.id = 'player';
            _0x6c.appendChild(_0x6d);

            _0x1a = new YT.Player('player', {
                height: '100%',
                width: '100%',
                videoId: _0x6a.id,
                playerVars: { 
                    'playsinline': 1, 
                    'controls': _0x1c ? 1 : 0,
                    'disablekb': _0x1c ? 0 : 1,
                    'fs': _0x1c ? 1 : 0,
                    'modestbranding': 1
                },
                events: {
                    'onReady': _0xc2af,
                    'onStateChange': _0xe3b0
                }
            });

            setTimeout(() => {
                addVideoBlocker();
            }, 1000);
        } else if (_0x6a.type === 'iframe') {
    isIframePlayer = true;
    const _0x6e = document.createElement('iframe');
    _0x6e.src = _0x6a.url;
    _0x6e.width = '100%';
    _0x6e.height = '100%';
    _0x6e.style.border = 'none';
    _0x6e.frameBorder = '0';
    _0x6e.scrolling = 'no';
    _0x6e.allowFullscreen = true;
    _0x6e.setAttribute('allowfullscreen', '');
    _0x6e.setAttribute('webkitallowfullscreen', '');
    _0x6e.setAttribute('mozallowfullscreen', '');
    _0x6e.referrerPolicy = 'no-referrer';
    _0x6e.sandbox = 'allow-same-origin allow-scripts allow-forms allow-popups allow-presentation allow-popups-to-escape-sandbox';
    _0x6e.allow = 'autoplay; fullscreen; encrypted-media; picture-in-picture; accelerometer; gyroscope';
            
            _0x6e.onerror = function(_0x6f) {
                console.error('hata:', _0x6f);
                _0xd29e('video yüklenemedi site engeli');
            };
            
            _0x6e.onload = function() {
                console.log('Iframe yuklendi');
                _0xf4c1('Baglandi', true);
            };
            
            _0x6c.appendChild(_0x6e);

            _0x1a = {
                iframe: _0x6e,
                isIframe: true
            };
        }
    };

    const _0xc2af = (_0x7a) => {
        _0xf4c1('Baglandi', true);
        console.log('YouTube player hazır');
    };

    const _0xe3b0 = (_0x8a) => {
        if (syncInProgress || !_0x1c) return;

        const now = Date.now();
        if (now - lastStateUpdate < 500) return;
        lastStateUpdate = now;

        const _0x8b = _0x8a.data === YT.PlayerState.PLAYING ? 'playing' : 
                     _0x8a.data === YT.PlayerState.PAUSED ? 'paused' : '';
        
        if (!_0x8b) return;

        if (_0x8b !== lastKnownState) {
            lastKnownState = _0x8b;
            const _0x8c = _0x1a.getCurrentTime();

            console.log('HOST durum değişikliği:', _0x8b, 'Zaman:', _0x8c);

            _0x20.ref('rooms/' + _0x1b).once('value', (snapshot) => {
                const currentData = snapshot.val();
                const newVersion = (currentData.stateVersion || 0) + 1;
                
                _0x20.ref('rooms/' + _0x1b).update({
                    state: _0x8b,
                    time: _0x8c,
                    timestamp: Date.now(),
                    stateVersion: newVersion
                });
            });
        }
    };

    const _0xa07b = () => {
        let lastSeenVersion = -1;
        let lastVideoId = '';

        _0x20.ref('rooms/' + _0x1b).on('value', (_0x9a) => {
            if (!_0x9a.exists()) return;
            const _0x9b = _0x9a.val();

            const currentVideoId = _0x9b.videoId || _0x9b.videoUrl || '';
            if (lastVideoId && lastVideoId !== currentVideoId) {
                console.log('Video değişti, sayfa yenileniyor...');
                location.reload();
                return;
            }
            lastVideoId = currentVideoId;

            console.log('Oda durumu güncellendi:', _0x9b);

            if (!isIframePlayer && !_0x1c && _0x1a && _0x1a.seekTo && typeof _0x1a.getCurrentTime === 'function') {
                
                const currentVersion = _0x9b.stateVersion || 0;
                if (currentVersion <= lastSeenVersion) {
                    return;
                }
                lastSeenVersion = currentVersion;

                syncInProgress = true;
                
                const currentTime = _0x1a.getCurrentTime();
                const targetTime = _0x9b.time || 0;
                const timeDiff = Math.abs(currentTime - targetTime);
                const currentPlayerState = _0x1a.getPlayerState();
                
                console.log('Senkronizasyon:', {
                    hedefDurum: _0x9b.state,
                    hedefZaman: targetTime,
                    mevcutZaman: currentTime,
                    fark: timeDiff,
                    mevcutDurum: currentPlayerState
                });
                
                if (_0x9b.state === 'playing') {
                    if (timeDiff > 2) {
                        console.log('Zaman atlanıyor:', targetTime);
                        _0x1a.seekTo(targetTime, true);
                    }
                    
                    if (currentPlayerState !== YT.PlayerState.PLAYING && 
                        currentPlayerState !== YT.PlayerState.BUFFERING) {
                        console.log('Video başlatılıyor');
                        _0x1a.playVideo();
                    }
                } else if (_0x9b.state === 'paused') {
                    if (currentPlayerState === YT.PlayerState.PLAYING || 
                        currentPlayerState === YT.PlayerState.BUFFERING) {
                        console.log('Video duraklatılıyor');
                        _0x1a.pauseVideo();
                    }
                    
                    if (timeDiff > 0.5) {
                        console.log('Duraklama zamanı ayarlanıyor:', targetTime);
                        _0x1a.seekTo(targetTime, true);
                    }
                }
                
                setTimeout(() => { 
                    syncInProgress = false; 
                }, 1000);
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
    const _0xad_mobile = document.getElementById('mobileUsersList');
    const _0xae_mobile = document.getElementById('mobileUserCount');
    
    _0xab.innerHTML = '';
    if (_0xad_mobile) _0xad_mobile.innerHTML = '';

    const _0xad = Object.entries(_0xaa);
    _0xac.textContent = _0xad.length;
    if (_0xae_mobile) _0xae_mobile.textContent = _0xad.length;

    _0xad.forEach(([_0xae, _0xaf]) => {
        const _0xb0 = document.createElement('div');
        _0xb0.className = 'user-item';
        _0xb0.innerHTML = `
            <div class="user-avatar">${_0xaf.username.charAt(0).toUpperCase()}</div>
            <div>${_0xaf.username}</div>
            ${_0xaf.isHost ? '<span class="user-badge">HOST</span>' : ''}
        `;
        _0xab.appendChild(_0xb0);
        
        // Mobil listeye de ekle
        if (_0xad_mobile) {
            const mobileUserItem = _0xb0.cloneNode(true);
            _0xad_mobile.appendChild(mobileUserItem);
        }
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

    const _0x1849 = () => {
        const modal = document.getElementById('nameChangeModal');
        if (!modal) {
            createNameChangeModal();
        }
        
        const modal2 = document.getElementById('nameChangeModal');
        const input = document.getElementById('newNameInput');
        input.value = _0x1e;
        modal2.style.display = 'flex';
        input.focus();
        
        input.onkeypress = (e) => {
            if (e.key === 'Enter') {
                _0x195a();
            }
        };
    };

    const _0x195a = () => {
        const modal = document.getElementById('nameChangeModal');
        const input = document.getElementById('newNameInput');
        const newName = input.value.trim();
        
        if (newName && newName !== _0x1e) {
            const oldName = _0x1e;
            _0x1e = newName;
            
            _0x20.ref('rooms/' + _0x1b + '/users/' + _0x1f).update({
                username: _0x1e
            });
            
            _0xd29e(oldName + ' ismini ' + _0x1e + ' olarak değiştirdi');
        }
        
        modal.style.display = 'none';
    };

    const _0x1a6b = () => {
        const modal = document.getElementById('nameChangeModal');
        modal.style.display = 'none';
    };

    const _0x1738 = () => {
        if (_0x1b) {
            _0x20.ref('rooms/' + _0x1b + '/users/' + _0x1f).remove();
            _0xd29e(_0x1e + ' odadan ayrıldı');
        }
        location.reload();
    };

    const _0x2a4f = () => {
        if (!_0x1c) {
            alert('Sadece HOST video değiştirebilir!');
            return;
        }

        const modal = document.getElementById('videoChangeModal');
        if (!modal) {
            createVideoChangeModal();
        }
        
        const modal2 = document.getElementById('videoChangeModal');
        const input = document.getElementById('newVideoInput');
        input.value = '';
        modal2.style.display = 'flex';
        input.focus();
        
        input.onkeypress = (e) => {
            if (e.key === 'Enter') {
                _0x3b5g();
            }
        };
    };

    const _0x3b5g = async () => {
        const modal = document.getElementById('videoChangeModal');
        const input = document.getElementById('newVideoInput');
        const newUrl = input.value.trim();
        
        if (!newUrl) {
            alert('Lütfen bir URL girin!');
            return;
        }

        let videoInfo = _0x6f3b(newUrl);
        
        if (!videoInfo) {
            alert('Geçersiz URL! YouTube veya iframe linki girin.');
            return;
        }

        if (videoInfo.type === 'needs_iframe') {
            const iframeUrl = prompt('Bu siteden otomatik video çekme desteklenmiyor.\n\nIframe URL girin:');
            if (!iframeUrl) return;
            videoInfo = { type: 'iframe', url: iframeUrl };
        }

        try {
            await _0x20.ref('rooms/' + _0x1b).update({
                videoType: videoInfo.type,
                videoId: videoInfo.id || '',
                videoUrl: videoInfo.url || '',
                state: 'paused',
                time: 0,
                timestamp: Date.now(),
                stateVersion: 0
            });

            _0xd29e('HOST videoyu değiştirdi');
            modal.style.display = 'none';
            
            // Sayfayı yenile (tüm izleyiciler için)
            location.reload();
        } catch (error) {
            console.error('Video değiştirme hatası:', error);
            alert('Video değiştirilemedi: ' + error.message);
        }
    };

    const _0x4c6h = () => {
        const modal = document.getElementById('videoChangeModal');
        modal.style.display = 'none';
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
        changeName: _0x1849,
        confirmNameChange: _0x195a,
        cancelNameChange: _0x1a6b,
        leaveRoom: _0x1738,
        changeVideo: _0x2a4f,
        confirmVideoChange: _0x3b5g,
        cancelVideoChange: _0x4c6h
    };
})();
