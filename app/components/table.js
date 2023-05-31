import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class TableComponent extends Component {
  @service router;
  @service errorHandler;

  get columns() {
    return this.args.headers;
  }

  get params() {
    return this.router.currentRoute.params;
  }

  get transitionToRouteAvailable() {
    return !this.params.id;
  }

  @action
  handleTransitionRoute(row) {
    if (!this.params.id) {
      this.router.transitionTo('country-details', row.id);
      this.errorHandler.clearError();
    }
  }
}
