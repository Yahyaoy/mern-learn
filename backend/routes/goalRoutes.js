const express = require('express')
const router = express.Router()
const {getGoals,setGoal,updateGoal,deleteGoal} = require('../controllers/goalController')

const {protect} = require('..//middleware/authMiddleware')
// router.get('/', getGoals)
// router.post('/',setGoal)
// we can replace this two line with this line :
router.route('/').get(protect,getGoals).post(protect,setGoal)

// router.put('/:id',updateGoal)
// router.delete('/:id',deleteGoal)
// and to this lines because the url is the same
router.route('/:id').put(protect,updateGoal).delete(protect,deleteGoal)

module.exports = router