import { Router } from 'express';
import costumersRouter from '@modules/costumers/infra/http/routes/costumers.routes';
import realtorsRouter from '@modules/realtors/infra/http/routes/realtors.routes';
import propertiesRouter from '@modules/properties/infra/http/routes/properties.routes';
import sessionsCostumerRouter from '@modules/costumers/infra/http/routes/sessions.routes';
import sessionsRealtorRouter from '@modules/realtors/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/realtors', realtorsRouter);
routes.use('/costumers', costumersRouter);
routes.use('/properties', propertiesRouter);
routes.use('/sessions/costumer', sessionsCostumerRouter);
routes.use('/sessions/realtor', sessionsRealtorRouter);

export default routes;
