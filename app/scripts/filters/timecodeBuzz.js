(function() {
    function timecodeBuzz() {
        return function(seconds) {
            var output = buzz.toTimer(seconds);
            return output;
        };
    }
    
    angular
        .module('blocJams')
        .filter('timecodeBuzz', timecodeBuzz]);
})();