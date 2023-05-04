const express = require('express')
const router = express.Router()
const {getGoals,setGoal,updateGoal,deleteGoal} = require('../controllers/goalController')

// router.get('/', getGoals)
// router.post('/',setGoal)
// we can replace this two line with this line :
router.route('/').get(getGoals).post(setGoal)

// router.put('/:id',updateGoal)
// router.delete('/:id',deleteGoal)
// and to this lines because the url is the same
router.route('/:id').put(updateGoal).delete(deleteGoal)

module.exports = router