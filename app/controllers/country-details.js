import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class CountryDetailsController extends Controller {
  @tracked details = {};
  @tracked states = [];

  @action
  resetController() {
    this.details = {};
    this.states = [];
  }

  @action
  loadDetails() {
    console.log('loadDetails');
  }
}
