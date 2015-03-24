angular.module('GUIOPFG').factory('Utility', ['store', function(store) {
  var factory = {};

  factory.backupSearchQuery = function(se_query){
      store.set("_searchQuery", se_query);
  };

  factory.getSearchQuery = function(){
      return store.get("_searchQuery");
  };


  return factory;

}]);
