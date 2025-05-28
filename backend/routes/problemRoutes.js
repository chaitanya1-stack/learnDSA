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
router.post('/', protect, updateProblem);
router.get('/', protect, deleteProblem);
router.get('/', protect, getBookmarkedProblems);

module.exports = router;