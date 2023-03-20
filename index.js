// import js file
const dataService  = require("./service/dataservice")
//importing jsonwebtoken 
const jwt = require("jsonwebtoken")
//importing cors for connection to front-end
const cors = require('cors')


// importing express
const express = require("express")

//creating an app to access express
const app = express()

//connection to front-end 
app.use(cors({origin:'http://localhost:4200'}))

//to parse json data from req body
app.use(express.json())
//middlewere
const jwsMiddlare = (req,res,next) =>{
  try { 
    // to access data in header-  const token = req.headers['key']
    const token = req.headers['access_key']
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
   dataService.register(req.body.accname,req.body.accno, req.body.pass).then(result =>{
    //convert js to json here result is js type object its converted to json,--want to change the status code use status(result.stauscode)methode

    res.status(result.statusCode).json(result)

   })
    
})

//log in request
 app.post('/login',(req ,res) =>{
     dataService.login(req.body.accno,req.body.pass).then(result => {
        res.status(result.statusCode).json(result) 

     })
   


 })
// deposit
app.post('/deposit',jwsMiddlare,(req,res) =>{
    dataService.Credit(req.body.accnoCredit, req.body.passCredit, req.body.amountCredit).then(result =>{
        res.status(result.statusCode).json(result)

    })
    
})
//withdrew
app.post('/withdrew',jwsMiddlare,(req,res) =>{
     dataService.Debit(req.body.accnoDebit, req.body.passDebit, req.body.amountDabit).then(result => {
        res.status(result.statusCode).json(result)

     })
    
})

//transation 
app.post('/transation',jwsMiddlare,(req,res) => {
    dataService. getTranstion(req.body.accountNo).then(result => {
        res.status(result.statusCode).json(result)

    })
   

})

//delete

app.delete('/delete/:acno',jwsMiddlare,(req,res) => {
    dataService.Delete(req.params.acno).then(result =>{
        res.status(result.statusCode).json(result)
    })
})







// creating a port for the sever run using listen methode.3000 is the port number created 
app.listen(3000,()=>{
    console.log("server started...");
})

