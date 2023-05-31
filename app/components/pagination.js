import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class PaginationComponent extends Component {
  @service errorHandler;
  get checkNextPage() {
    return this.args.checkNextPage;
  }

  get checkPreviousPage() {
    return this.args.checkPreviousPage;
  }

  @action
  handleNextPage() {
    this.args.handleNextPage();
    this.errorHandler.clearError();
  }

  @action
  handlePreviousPage() {
    this.args.handlePreviousPage();
    this.errorHandler.clearError();
  }
}
