import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ErrorHandlerService extends Service {
  @service router;
  @tracked errorMessage = null;

  async handle(error) {
    if (error?.graphQLErrors?.length > 0) {
      this.handleGraphQLErrors(error.graphQLErrors);
    } else if (error instanceof Error) {
      this.handleGeneralError(error);
    } else {
      this.handleUnknownError(error);
    }
    if (this.errorMessage) {
      this.router.transitionTo('/');
    }
  }

  handleGraphQLErrors(graphQLErrors) {
    graphQLErrors.forEach((graphQLError) => {
      const { message } = graphQLError;
      this.errorMessage = message;
    });
  }

  handleGeneralError(error) {
    this.errorMessage = error.message;
  }

  handleUnknownError(error) {
    console.error('Unknown Error:', error);
    this.errorMessage = 'An unknown error occurred.';
  }

  clearError() {
    // Clear the error message
    this.errorMessage = null;
  }
}
