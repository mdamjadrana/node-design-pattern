import { GeneralError } from "../utils/error"

export const handelErrors = (err, req, res, next) => {
    let code = 500;
    if(err instanceof GeneralError) {
        code = err.getCode()
    }      
    
    const correlationId = req.headers['x-correlation-id'];
    return res.status(code).json({
        correlationId,
        message: err.message
    })
}