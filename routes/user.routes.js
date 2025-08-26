const userController= require("../controller/user.controller")
const { googleTokenVerification } = require("../middleware/googleTokenVerification")
const verifyToken = require("../middleware/verifyToken")
module.exports=(app)=>{
    app.post('/bloggingApplication/api/v1/user/generateOtp',userController.generateOtp)
    app.post('/bloggingApplication/api/v1/user/verifyOtp',userController.verifyOtp)
    app.post('/bloggingApplication/api/v1/user/signUp',userController.signUp)
    app.post('/bloggingApplication/api/v1/user/signIn',userController.signIn)
    app.post('/bloggingApplication/api/v1/user/googleLogin',[googleTokenVerification],userController.googleLogin)
    app.get('/bloggingApplication/api/v1/user/autoLogin',[verifyToken],userController.autoLogin)
    app.get("/bloggingApplication/api/v1/user/:userId", userController.getUserDetails)
    
}