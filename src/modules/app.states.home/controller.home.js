/**
 * @memberOf app.states.home
 */
(function (module) {
  'use strict';

  function HomeController($scope,statesService,shakeService,popupService) {
    var controller = this;

    $scope.search = { query: 'auto', results: []};//init ,texte default
//2）调用函数 去 服务

    controller.search = function (){//after  cliclk button
      statesService.search($scope.search.query).then(function (results){//when not ,show in Chorme info(alaways 2048?)
        $scope.search.results = results;
      });
    };

    //$scope.results = statesService.search('Jaw?!2048').then(function (results){
    //  $scope.search.results = results;
    //});

    //debugger zuihouyewujiaguoxianshi(synchone)

  controller.discoverMovie = function(){
    if (popupService.isOpen()){return;}
    statesService.discoverMovie().then(function (movie){
      popupService.open(module,'smartphone/popup.discover',movie);
    });
  }

  $scope.$on('$ionicView.entre',function(){
    shakeService.listen(controller.discoverMovie);
  });

  $scope.$on('$ionicView.leave',function(){
    shakeService.stopListening();
  });


}
  module.controller('homeController', [
    '$scope',
    'statesService',//2）->3)pug网页如何显示
    'shakeService',
    'popupService',
    HomeController
  ]);

}(angular.module('app.states.home')));
/*
ion-header.bar-subheader Header
  ion-content.has-subheader
    ion-list
      ion-item(ng-if="search.results.length < 1")
        | no nono
      ion-item.item-icon-right(
        ng-repeat="results in search.results",
        ui-state="STATE_DETATILS"
      )
        | {{ result.titre}}
        i.icon.ion-ios-arrow-forward
*/
