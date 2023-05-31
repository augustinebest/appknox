import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import query from 'appknox/gql/queries/paginate-states';
import { inject as service } from '@ember/service';
import ApolloQueryManager from '../utils/apollo';

export default class CountryDetailsController extends Controller {
  @service apollo;
  @service router;
  @service errorHandler;

  @tracked details = {};
  @tracked states = [];
  @tracked pageInfo = {};
  count = 20;

  queryManager = new ApolloQueryManager(this.apollo);

  headers = ['id', 'name', 'state_code', 'latitude', 'longitude'];

  @action
  transitionToRouteWithCount() {
    this.router.transitionTo('country-details', {
      queryParams: { count: this.count },
    });
  }

  @action
  resetController() {
    this.details = {};
    this.states = [];
    this.pageInfo = {};
  }

  get checkNextPage() {
    return this.pageInfo?.hasNextPage;
  }

  get checkPreviousPage() {
    return this.pageInfo?.hasPreviousPage;
  }

  get checkErrorMessage() {
    return this.errorHandler.errorMessage;
  }

  @action
  async loadStates(variables) {
    try {
      const result = await this.queryManager.query({
        query,
        variables,
        operationName: 'PaginateStates',
      });
      const { edges, pageInfo } = result.states;
      this.states = edges;
      this.pageInfo = pageInfo;
    } catch (error) {
      console.error('Error loading countries:', error);
      throw error;
    }
  }

  @action
  async handlePreviousPage() {
    const { hasPreviousPage, startCursor } = this.pageInfo;
    const { id } = this.details;
    try {
      if (hasPreviousPage) {
        const variables = {
          id,
          first: null,
          after: null,
          last: this.count,
          before: startCursor,
        };
        await this.loadStates(variables);
      }
    } catch (error) {
      console.error('Error fetching previous page:', error);
    }
  }

  @action
  async handleNextPage() {
    const { hasNextPage, endCursor } = this.pageInfo;
    const { id } = this.details;
    try {
      if (hasNextPage) {
        const variables = {
          id,
          first: this.count,
          after: endCursor,
          last: null,
          before: null,
        };
        await this.loadStates(variables);
      }
    } catch (error) {
      console.error('Error fetching next page:', error);
    }
  }
}
