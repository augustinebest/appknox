import { QueryManager } from 'ember-apollo-client';
import { inject as service } from '@ember/service';

export default class ApolloQueryManager extends QueryManager {
  @service apollo; // Inject the Apollo service
}
