const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { addProblem,
  getProblems,
  getBookmarkedProblems,
  updateProblem,
  deleteProblem, } = require('../controllers/problemControllers');

router.post('/', protect, addProblem);
router.get('/', protect, getProblems);
router.get('/bookmarked', protect, getBookmarkedProblems);
router.patch('/:id', protect, updateProblem);
router.delete('/:id', protect, deleteProblem);



module.exports = router;