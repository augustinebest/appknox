import ErrorHandlerService from 'appknox/services/error-handler';

export function initialize(application) {
  // Register the ErrorHandlerService with the desired name
  application.register('service:error-handler', ErrorHandlerService);
}

export default {
  initialize,
};
