import { helper } from '@ember/component/helper';
import { isEmpty } from '@ember/utils';

export default helper(function ([value]) {
  return isEmpty(value);
});
