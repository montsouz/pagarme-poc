import { Router } from 'express';
import Subscriptions from '../handlers/subscription';

const router = Router();

router.post('/subscribe/:planId', (req, res) =>
  Subscriptions.createSubscription(req, res),
);

export { router };

//5502098478331776
//09/27
//475
