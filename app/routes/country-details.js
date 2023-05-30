import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ApolloQueryManager from '../utils/apollo';
import CountryDetailsQuery from 'appknox/gql/queries/country-details';

export default class CountryDetailsRoute extends Route {
  @service apollo;
  queryManager = new ApolloQueryManager(this.apollo);

  async model(params) {
    console.log('params', Number(params.id));
    const result = await this.queryManager.query({
      query: CountryDetailsQuery,
      variables: { id: Number(params.id) },
      operationName: 'GetCountryDeetail',
    });
    console.log('GetCountryDeetail', result.country);
    return result.country;
  }

  setupController(controller, model) {
    super.setupController(...arguments);
    controller.details = {
      ...model,
      currency: model.currency,
      symbol: model.currency_symbol,
      phone_code: model.phone_code,
    };
    controller.states = model.states;
  }

  // cleanup
  resetController(controller, isExiting) {
    if (isExiting) {
      controller.send('resetController');
    }
  }
}
