import EmberRouter from '@ember/routing/router';
import config from 'appknox/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('country-details', { path: '/country-details/:id' });
  this.route('not-found', { path: '/*path' });
});
