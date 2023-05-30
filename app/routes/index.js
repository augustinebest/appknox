import Route from '@ember/routing/route';
import query from 'appknox/gql/queries/country';
import { inject as service } from '@ember/service';
import ApolloQueryManager from '../utils/apollo';

export default class IndexRoute extends Route {
  @service apollo;
  queryManager = new ApolloQueryManager(this.apollo);

  queryParams = {
    count: {
      refreshModel: true,
    },
  };

  async model(params) {
    const count = params.count;
    const result = await this.queryManager.query({
      query,
      variables: { first: count },
      operationName: 'CountriesQuery',
    });
    return result.countries;
  }

  setupController(controller, model) {
    super.setupController(...arguments);
    controller.countries = model.edges;
    controller.pageInfo = model.pageInfo;
  }

  // cleanup
  resetController(controller, isExiting) {
    if (isExiting) {
      controller.send('resetController');
    }
  }
}
