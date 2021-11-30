import { GeneralError } from "../utils/error"

export const handelErrors = (err, req, res, next) => {
    if(err instanceof GeneralError) {
        const code = err.getCode()
        return res.status(code).json({
            name: err.name,
            message: err.message
        });
    }      
    //if error is unknown
    return res.status(500).json({
        name: 'Internal Server Error!',
        message: err.message
    })
}