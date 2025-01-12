const userController= require("../controller/user.controller")
module.exports=(app)=>{
    app.post('/bloggingApplication/api/v1/user/signUp',userController.signUp)
}