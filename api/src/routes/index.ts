import { Router } from 'express';
import Subscriptions from '../handlers/subscription';

const router = Router();

router.post(
  '/subscribe/:planId',
  async (req, res) => await Subscriptions.createSubscription(req, res),
);

export { router };
