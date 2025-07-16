import { routeUtil } from 'utils';

import create from './actions/create';
import list from './actions/list';
import remove from './actions/remove';

const publicRoutes = routeUtil.getRoutes([]);

const privateRoutes = routeUtil.getRoutes([create, list, remove]);

export default {
  publicRoutes,
  privateRoutes,
};
