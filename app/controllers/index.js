import Controller from '@ember/controller';
import { action } from '@ember/object';
import query from 'appknox/gql/queries/paginate-countries';
import ApolloQueryManager from 'appknox/utils/apollo';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class CountriesListController extends Controller {
  @service apollo;
  @service router;

  @tracked countries = [];
  @tracked pageInfo = {};
  count = 20;

  queryManager = new ApolloQueryManager(this.apollo);

  get checkNextPage() {
    return this.pageInfo.hasNextPage;
  }

  get checkPreviousPage() {
    return this.pageInfo.hasPreviousPage;
  }

  @action
  transitionToRouteWithCount() {
    this.router.transitionTo('index-route', {
      queryParams: { count: this.count },
    });
  }

  @action
  transitionToRoute(country) {
    this.router.transitionTo('country-details', country.node.id);
  }

  @action
  resetController() {
    this.countries = [];
    this.pageInfo = {};
  }

  @action
  async loadCountries(variables) {
    try {
      const result = await this.queryManager.query({
        query,
        variables,
        operationName: 'GetCountries',
      });
      const { edges, pageInfo } = result.countries;
      this.countries = edges;
      this.pageInfo = pageInfo;
    } catch (error) {
      console.error('Error loading countries:', error);
      throw error;
    }
  }

  @action
  async handlePreviousPage() {
    const { hasPreviousPage, startCursor } = this.pageInfo;
    try {
      if (hasPreviousPage) {
        const variables = {
          first: null,
          after: null,
          last: this.count,
          before: startCursor,
        };
        await this.loadCountries(variables);
      }
    } catch (error) {
      console.error('Error fetching next page:', error);
    }
  }

  @action
  async handleNextPage() {
    const { hasNextPage, endCursor } = this.pageInfo;
    try {
      if (hasNextPage) {
        const variables = {
          first: this.count,
          after: endCursor,
          last: null,
          before: null,
        };
        await this.loadCountries(variables);
      }
    } catch (error) {
      console.error('Error fetching next page:', error);
    }
  }
}
