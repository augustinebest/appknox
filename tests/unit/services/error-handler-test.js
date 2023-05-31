import { module, test } from 'qunit';
import { setupTest } from 'appknox/tests/helpers';

module('Unit | Service | error-handler', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:error-handler');
    assert.ok(service);
  });
});
