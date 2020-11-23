import { Router } from 'express';
import costumersRouter from './costumers.routes';
import realtorsRouter from './realtors.routes';
import propertiesRouter from './properties.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/realtors', realtorsRouter);
routes.use('/costumers', costumersRouter);
routes.use('/properties', propertiesRouter);
routes.use('/sessions', sessionsRouter);

export default routes;