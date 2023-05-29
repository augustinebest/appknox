import Route from '@ember/routing/route';

export default class CompanydetailsRoute extends Route {
  model(params) {
    const { comp_id } = params;
    return comp_id;
  }
}
