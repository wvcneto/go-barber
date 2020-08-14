import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';
import MonthAvailabilityController from '@modules/appointments/infra/http/controllers/MonthAvailabilityController';
import DayAvailabilityController from '@modules/appointments/infra/http/controllers/DayAvailabilityController';

const providersRouter = Router();
const providersController = new ProvidersController();
const monthAvailabilityController = new MonthAvailabilityController();
const dayAvailabilityController = new DayAvailabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:provider_id/month-availability',
  monthAvailabilityController.index,
);
providersRouter.get(
  '/:provider_id/day-availability',
  dayAvailabilityController.index,
);

export default providersRouter;
