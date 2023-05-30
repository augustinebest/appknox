import { module, test } from 'qunit';
import { setupTest } from 'appknox/tests/helpers';

module('Unit | Route | country-details', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:country-details');
    assert.ok(route);
  });
});
