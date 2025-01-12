const userController= require("../controller/user.controller")
module.exports=(app)=>{
    app.post('/bloggingApplication/api/v1/user/generateOtp',userController.generateOtp)
    app.post('/bloggingApplication/api/v1/user/verifyOtp',userController.verifyOtp)
    app.post('/bloggingApplication/api/v1/user/signUp',userController.signUp)
}