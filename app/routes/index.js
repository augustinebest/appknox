/* eslint-disable ember/no-get */
/* eslint-disable ember/no-classic-classes */
import Route from '@ember/routing/route';
import { queryManager } from 'ember-apollo-client';
import query from 'appknox/gql/queries/country';
// import gql from 'graphql-tag';

// const query = gql`
//   query countries {
//     countries {
//       id
//     }
//   }
// `;

// console.log('heree', query);

// export default class IndexRoute extends Route {}
export default Route.extend({
  apollo: queryManager(),

  async model() {
    // const variables = { id: params.id };
    // const result = this.apollo.watchQuery({ query, variables }, 'countries');
    // console.log('resultxx', result);
    // return result;
    const res = await this.get('apollo').query({ query }, 'countries');
    console.log('resultssss', res);
    return res;
  },
});
