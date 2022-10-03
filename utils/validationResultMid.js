import {validationResult} from 'express-validator'

const validationResultMid = (req, res, next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.errors);
    }
    next();
}

export default validationResultMid;