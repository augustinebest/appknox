'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const Funnel = require('broccoli-funnel');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    // Add options here
    sassOptions: {
      extension: 'scss',
    },
    emberApolloClient: {
      keepGraphqlFileExtension: false,
    },
    trees: {
      // Include the GraphQL files in the build
      gql: new Funnel('app/gql', { destDir: 'gql' }),
    },
  });

  return app.toTree();
};
