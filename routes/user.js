const UserController = require('../api/controllers/UserController');

module.exports=(app)=>{

app.post('/user', UserController.Create);
app.put('/user',UserController.Login);
app.get('/user',UserController.getUser);
app.delete('/user',UserController.Logout);
app.get('/user/checkemail/:email',UserController.checkemail);

}

