import { module, test } from 'qunit';
import { setupTest } from 'appknox/tests/helpers';

module('Unit | Controller | countries-list', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:countries-list');
    assert.ok(controller);
  });
});
