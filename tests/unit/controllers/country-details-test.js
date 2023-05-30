import { module, test } from 'qunit';
import { setupTest } from 'appknox/tests/helpers';

module('Unit | Controller | country-details', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:country-details');
    assert.ok(controller);
  });
});
