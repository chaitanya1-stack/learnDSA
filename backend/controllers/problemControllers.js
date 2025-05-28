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



    const updateProblem = async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Problem.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { status },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Problem not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};




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

        
           
         

        
    





