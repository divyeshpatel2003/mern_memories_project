import jwt from "jsonwebtoken"

const secret = "test"

const auth = async (req,res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const is_custom_auth = token.length < 500;

        let decoded_data;
        if(token && is_custom_auth){

            decoded_data = jwt.verify(token, secret);
           req.userId = decoded_data?.id 

        }else{
            
            decoded_data = jwt.decode(token)
            req.userId = decoded_data?.sub 

        }
        next();

    } catch (error) {
        console.log(error)
    }
}

export default auth