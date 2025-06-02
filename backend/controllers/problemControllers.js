const Problem = require('../models/Problem');
const User = require('../models/User'); 


// add a problem if user wants to
   const addProblem =async (req,res) =>{

    try{
      
        const problem =await
        Problem.create({...req.body,
            user: req.user.id
        });
        
           
      res.status(201).json(problem); 
  

        
    } catch (err){
        res.status(400).json({error: err.message});   
    }
    
};
// get the problems to solve # does not need try and catch because added probelem can be searched again
 const getProblems =async (req,res) =>{

    
        const problems =await
        Problem.find({
            user: req.user.id
        });

        res.json(problems);
    };


    //bookmarked 

    const getBookmarkedProblems =async (req,res) =>{

    
        const bookmarked =await
        Problem.find({
            user: req.user.id,
            status:'bookmark'
        });

        res.json(bookmarked);
    };



   // --------------  updateProblem -----------------
const updateProblem = async (req, res) => {
  try {
    let problem = await Problem.findOne({ _id: req.params.id, user: req.user.id });
    if (!problem) return res.status(404).json({ error: 'Problem not found' });

    // <-- changed from single "status" string to booleans solved and bookmarked
    const { solved, bookmarked } = req.body;

    if (typeof solved === 'boolean') {
      if (solved) {
        if (!problem.status.includes('solved')) problem.status.push('solved');
        problem.status = problem.status.filter(s => s !== 'unsolved');
      } else {
        if (!problem.status.includes('unsolved')) problem.status.push('unsolved');
        problem.status = problem.status.filter(s => s !== 'solved');
      }
    }

    if (typeof bookmarked === 'boolean') {
      if (bookmarked) {
        if (!problem.status.includes('bookmark')) problem.status.push('bookmark');
      } else {
        problem.status = problem.status.filter(s => s !== 'bookmark');
      }
    }

    await problem.save();
    res.json(problem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// --------------------------------------------------------







const deleteProblem = async (req, res) => {
  try {
    const deleted = await Problem.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!deleted) return res.status(404).json({ error: 'Problem not found' });
    res.json({ message: 'Problem deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



module.exports = {
  addProblem,
  getProblems,
  getBookmarkedProblems,
  updateProblem,
  deleteProblem,
};

        
           
         

        
    





