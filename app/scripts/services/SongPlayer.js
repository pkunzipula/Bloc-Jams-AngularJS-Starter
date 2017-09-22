(function() {
    function SongPlayer(Fixtures) {
        var SongPlayer = {};
        
        var currentAlbum = Fixtures.getAlbum();
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;
        
        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true   
            });
            
            currentSong = song;
        };
        
        /**
        * @function playSong
        * @desc Plays currently playing song or loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        }
        
        /**
        * @function pauseSong
        * @desc Pauses currently playing song
        * @param {Object} song
        */
        
        var pauseSong = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        }
        
        var stopSong = function(song) {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
        }
        
        var getSongIndex = function(song) {
            return currentAlbum.song.indexOf(song);
        };
        
        SongPlayer.currentSong = null;
        
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (currentSong !== song) {
                setSong(song);
                playSong(song);
                
            } else if (currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };
        
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            pauseSong(song);
        };
        
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            var song = currentAlbum.songs[currentSongIndex];
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                stopSong(song);
            } else {
                setSong(song);
                playSong(song);
            }
        };
        
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            var song = currentAlbum.songs[currentSongIndex];
            currentSongIndex++;
            
            if (currentSongIndex == currentAlbum.songs.length) {
                stopSong(song);
            } else {
                setSong(song);
                playSong(song);
            }
        };
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();