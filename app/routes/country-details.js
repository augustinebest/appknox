import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ApolloQueryManager from '../utils/apollo';
import CountryDetailsQuery from 'appknox/gql/queries/country-details';

export default class CountryDetailsRoute extends Route {
  @service apollo;
  @service errorHandler;

  queryManager = new ApolloQueryManager(this.apollo);

  queryParams = {
    count: {
      refreshModel: true,
    },
  };

  async model(params) {
    try {
      const result = await this.queryManager.query({
        query: CountryDetailsQuery,
        variables: { id: Number(params.id), first: params.count },
        operationName: 'GetCountryDeetail',
      });

      if (!result.country) {
        throw new Error('Country not found.');
      }
      return result.country;
    } catch (error) {
      this.errorHandler.handle(error);
      return null;
    }
  }

  setupController(controller, model) {
    super.setupController(...arguments);
    controller.details = {
      ...model,
      currency: model?.currency,
      symbol: model?.currency_symbol,
      phone_code: model?.phone_code,
    };
    controller.states = model?.states.edges;
    controller.pageInfo = model?.states.pageInfo;
  }

  // cleanup
  resetController(controller, isExiting) {
    if (isExiting) {
      controller.send('resetController');
    }
  }
}
