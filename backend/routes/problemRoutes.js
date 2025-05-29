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
router.put('/:id', protect, updateProblem);
router.delete('/:id', protect, deleteProblem);
router.get('/bookmarked', protect, getBookmarkedProblems);

module.exports = router;