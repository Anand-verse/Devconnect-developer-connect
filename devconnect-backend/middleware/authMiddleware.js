import jwt from 'jsonwebtoken';

const authMiddleware = (req,res,next) => {

    //1. get token from header
    const authHeader = req.headers.authorization;

    //2. check if token exists and starts with "Bearer"
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({message:"Unauthorized token"});

    }
    
    //3. extract the token
    const token = authHeader.split(' ')[1];

    try {
        //4. verify token
     const decoded = jwt.verify(token , process.env.JWT_SECRET);

        // 5. add user ID to request
        req.userId = decoded.userId;
        
        // 6. pass control to next handler
        next();
        
    } catch (err) {
        return  res.status(401).json({message:'Unauthorized :Invalid token'});
        
    }
};

export default authMiddleware;