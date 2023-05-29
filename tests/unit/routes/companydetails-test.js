import { module, test } from 'qunit';
import { setupTest } from 'appknox/tests/helpers';

module('Unit | Route | companydetails', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:companydetails');
    assert.ok(route);
  });
});
