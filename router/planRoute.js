const express = require('express');
const isAuthorized = require('../middlewares/isAuthorized');
const protectRoute2 = require('../middlewares/protectRoute2');
const { getPlan, getAllPlans, createPlan, updatePlan, deletePlan, top3Plans } = require('../controllers/planController'); 
const planRouter = express.Router();

// all plans
planRouter.route('/allPlans').get(getAllPlans);
planRouter.route('/top-three').get(top3Plans);

// owned plan by the user
planRouter.route('/:id')
    .get(protectRoute2, getPlan)
    .patch(protectRoute2, isAuthorized(['admin', 'restaurant-owner']), updatePlan)
    .delete(protectRoute2, isAuthorized(['admin', 'restaurant-owner']), deletePlan)

// admin and restaurant owner routes
planRouter.route('/create-plan').post(protectRoute2, isAuthorized(['admin', 'restaurant-owner']), createPlan);

module.exports = planRouter;