import express from 'express';
import userAuth from '../middleware/userAuth.js';
import {getUserData} from '../controllers/getUserData.js';
import {participateInEvent} from '../controllers/participateInEvent.js'
import {getEventData} from '../controllers/getEventData.js';
import {deleteEventData} from '../controllers/deleteEventData.js';
import {registerTeam} from '../controllers/registerTeam.js';

const userRouter = express.Router();

userRouter.get('/data', userAuth, getUserData);
userRouter.post('/team',registerTeam);
userRouter.post("/events/:eventId/participate", participateInEvent);
userRouter.get("/:userId/dashboard", getEventData);
userRouter.delete("/:userId/event/:eventId", deleteEventData);

export default userRouter;