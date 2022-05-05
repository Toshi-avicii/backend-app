const Plan = require('../models/planModel');

const getAllPlans = async(req, res) => {
    try {
        let plans = await Plan.find();
        if(plans) {
            res.status(200).json({
                msg: 'all plans retrieved',
                data: plans
            })
        } else {
            res.json({
                msg: 'plans not found'
            });
        }
    } catch(err) {
        res.status(500).json({
            msg: err.message
        })
    }
}

const getPlan = async(req, res) => {
    try {
        const { id } = req.params;
        const plan = await Plan.findById(id);

        if(plan) {
            res.status(200).json({
                msg: 'plan retrieved',
                data: plan
            });
        } else {
            res.status(200).json({
                msg: 'plan not found'
            })
        }
    } catch(err) {
        res.status(400).json({

        })
    }
}

const createPlan = async(req, res) => {
    try {
        let planData = req.body;
        let createdPlan = await Plan.create(planData);
        res.status(201).json({
            msg: 'plan created successfully',
            data: createdPlan
        })
    } catch(err) {
        res.status(400).json({
            msg: "Could not create plan"
        })
    }
}

const deletePlan = async(req, res) => {
    try {
        let { id } = req.params;
        const user = await Plan.findById(id);

        if(user) {
            let deletedPlan = await Plan.findByIdAndDelete(id);
            res.status(201).json({
                msg: 'plan deleted successfully',
                data: deletedPlan
            })
        } else {
            res.status(400).json({
                msg: 'Plan does not exist'
            })
        }
    } catch(err) {
        res.status(400).json({
            msg: "Could not delete plan"
        })
    }
}

const updatePlan = async(req, res) => {
    try {
        const { id } = req.params;
        const plan = await Plan.findById(id);
        if(plan) {
            let updatedPlan = await Plan.findByIdAndUpdate(id, req.body, { new: true });
            res.status(201).json({
                msg: 'data updated successfully',
                data: updatedPlan
            });
        } else {
            res.status(400).json({
                msg: "Plan does not exist"
            })
        }
    } catch(err) {
        res.status(400).json({
            msg: "Could not update plan"
        })
    }
}

const top3Plans = async(req, res) => {
    try {   
        console.log('route hit');
        const top3Plans = await Plan.find().sort({
            ratingAverage: -1
        }).limit(3);

        res.status(200).json({
            msg: 'top 3 plans',
            data: top3Plans
        });


    } catch(err) {
        res.status(500).json({
            msg: err.message
        }) 
    }
}

module.exports = {
    getAllPlans,
    getPlan,
    createPlan,
    deletePlan,
    updatePlan,
    top3Plans
}