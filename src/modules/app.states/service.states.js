/**
 * @memberOf app.states
 */
(function (module) {
  'use strict';

  function StatesService($q,httpService,i18nService,API_IMAGS_URL,API_KEY) {
    var service = this;
//service ->funvtion httpSer,....1）在其中写函数

 /**
     * Build a movie image url given a path and a width.
     * @param {String|null} path - Should be part a other TMDB API calls.
     * @param {Number} width - Valid image width.
     *   See https://developers.themoviedb.org/3/configuration.
     * @return {String|null}
     */
    service.getImageUrl = function (path, width) {
      return path && 'http://image.tmdb.org/t/p/w' + width + path;
    };

    /**
     * Get search results matching a given query.
     * @param {String} query
     * @return {Promise} Passing an array of results, may be empty.
     */
    service.search =function(query){
      //console.log(query);//montrez
      return httpService.get('3/search/movie',{
        language : i18nService.getLocale(),
        api_key: API_KEY,
        query: query
      }).then(function (data){//objet-?result
          return data.results;
        });
      /*$q.resolve([
      {titre: 'Jaws?!',id :1},
      {titre: 'Jaw2', id :2}
      ]);*///list javascript->table   {},{}
      //http.enqute->promese
    };

    service.getMovie = function (id){//id from url !
      return httpService.get('3/movie/' + id, {
        language : i18nService.getLocale(),
        api_key: API_KEY
      });//no then directement
      /*$q.resolve(
        { titre: 'Jaw2', id: id}
        );*/
    };
    //lts:less than 3 mois prochaines; gte plus grande ou = today;si sample rien || rejet
    service.discoverMovie = function (){
      return httpService.get('3/discover/movie',{
        'release_date.lte': moment().add(3,'months').format('YYYY-MM-DD'),
        'release_date.gte': moment().format('YYYY-MM-DD'),
          language: i18nService.getLocale(),
          api_key: API_KEY
          }).then(function (data){
          return _.sample(results)||$q.reject();
        });
      };
    /**
     * Resolve states data.
     * @return {Promise} Passing an object.
     */
    service.resolveStatesData = function () {
      return httpService.all({
        // Force loading of dynamic locale using the determined one.
        locale: i18nService.setLocale()
      });
    };
  }

  module.service('statesService', [
    'httpService',
    'i18nService',
    'API_IMAGS_URL',
    'API_KEY',
    StatesService
  ]);

}(angular.module('app.states')));
