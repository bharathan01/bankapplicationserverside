// import js file
const dataService  = require("./service/dataservice")
//importing jsonwebtoken 
const jwt = require("jsonwebtoken")


// importing express
const express = require("express")

//creating an app to access express
const app = express()

//to parse json data from req body
app.use(express.json())
//middlewere
const jwsMiddlare = (req,res,next) =>{
  try { 
    // to access data in header-  const token = req.headers['key']
    const token = req.body.token
    //verifing token in the request body
    const data = jwt.verify(token,'secretkey')
    // give next methode then only the function will exit after the token verification
    next()
}
catch{
    res.status(400).json({
        statusCode:400,
        status:false,
        message:'please login first'
    }) 

}

}

// register request 
app.post('/register',(req,res) =>{
    const result = dataService.register(req.body.accname,req.body.accno, req.body.pass)
    //convert js to json here result is js type object its converted to json,--want to change the status code use status(result.stauscode)methode

    res.status(result.statusCode).json(result)
})

//log in request
 app.get('/login',(req ,res) =>{
    const result = dataService.login(req.body.accno,req.body.pass)
    res.status(result.statusCode).json(result)


 })
// deposit
app.get('/deposit',jwsMiddlare,(req,res) =>{
    const result = dataService.Credit(req.body.accnoCredit, req.body.passCredit, req.body.amountCredit)
    res.status(result.statusCode).json(result)
})
//withdrew
app.get('/withdrew',jwsMiddlare,(req,res) =>{
    const result = dataService.Debit(req.body.accnoDebit, req.body.passDebit, req.body.amountDabit)
    res.status(result.statusCode).json(result)
})

//transation 
app.get('/transation',jwsMiddlare,(req,res) => {
    const result = dataService. getTranstion(req.body.accountNo)
    res.status(result.statusCode).json(result)

})







// creating a port for the sever run using listen methode.3000 is the port number created 
app.listen(3000,()=>{
    console.log("server started...");
})

