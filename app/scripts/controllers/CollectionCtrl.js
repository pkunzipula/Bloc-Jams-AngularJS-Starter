(function() {
    function CollectionCtrl() {
        this.albums = [];
        for (var i=0; i < 13; i++) {
            this.albums.push(angular.copy(albumPicasso));
        }
    }
    
    angular
        .module('blocJams')
        .controller('CollectionCtrl', CollectionCtrl);
})();