//importing jsonwebtoken 
const jwt = require("jsonwebtoken")

userDetails = {
      1000: { accno: 1000, uname: "arun", password: "1234", balance: 0 ,transations:[]},
      1001: { accno: 1001, uname: "anu", password: "1234", balance: 0  ,transations:[]},
      1002: { accno: 1002, uname: "raju", password: "1234", balance: 0 ,transations:[] },
      1003: { accno: 1003, uname: "ram", password: "1234", balance: 0  ,transations:[]}
    }







register = (accname, accno ,pass) => {
    if (accno in userDetails) {
      return {
        status:false,
        message:'user already present',
        statusCode:401
      }
    }
    else {
      userDetails[accno] = { accno, uname: accname, password: pass, balance: 0,transations:[] }
      

      return {
        status:true,
        message:'Registerd...',
        statusCode:200
      }
    }

  }

  //login methode
  login = (accno, pass) => {
   
    if (accno in userDetails) {
      if (pass == userDetails[accno]["password"]) {
        userName = userDetails[accno]["uname"]
        userAcc = accno

        //creating token for the login users
        const token = jwt.sign({userAcc},'secretkey')
       
        return {
            status:true,
            message:'login success',
            statusCode:200,
            userName,
            userAcc,
            token

          }

      }
      else {
        return{
            status:false,
            message:'wrong password',
            statusCode:401
          }
      }

    }
    else {
      return {
        status:false,
        message:'wrong account number',
        statusCode:401
      }
    }

  }

  
  Credit = (accnoCredit, passCredit, amountCredit) => {
    //converting string to int
    let creditAmt = parseInt(amountCredit)
    if (accnoCredit in userDetails) {
      if (passCredit == userDetails[accnoCredit]["password"]) {
        userDetails[accnoCredit]["balance"] += creditAmt
        //transation details
        userDetails[accnoCredit]["transations"].push({type:"CREDIT",amount:creditAmt})
        bal =userDetails[accnoCredit]["balance"] 
        return {
            status:true,
            message:`An amount of ${creditAmt} is credited to your account ,current balance is ${bal}`,
            statusCode:200,
        }

      }
      else {
        return {
            status:false,
            message:'wrong password',
            statusCode:401
          }
        }
    }
    else {
      return {
        status:false,
        message:'wrong account number',
        statusCode:401
      }
    }



  }
  Debit = (accnoDebit,passDebit,amountDabit) => {
    //converting string to int
    let debitAmt = parseInt(amountDabit)
    if(accnoDebit in userDetails){
      if (passDebit == userDetails[accnoDebit]["password"]) {
        if(debitAmt <= userDetails[accnoDebit]["balance"]){
          userDetails[accnoDebit]["balance"] -= debitAmt
          userDetails[accnoDebit]["transations"].push({type:"DEBIT",amount:debitAmt})
          bal = userDetails[accnoDebit]["balance"]
          return {
            status:true,
            message:`An amount of ${debitAmt} is debited from your bank account ,current balance is ${bal}`,
            statusCode:200,
        }

        }
        else{
          return {
            status:false,
            message:'insufficient fund',
            statusCode:401
          }

        }
       

      }
      else {
        
        return  {
            status:false,
            message:'wrong passowprd',
            statusCode:401
          }
      }
      

    }
    else{
     
      return {
        status:false,
        message:'wrong account number',
        statusCode:401
      }
    }
      
  }
  getTranstion = (accountNo) =>{
    if(accountNo in userDetails){
        trans = userDetails[accountNo]["transations"]
        return {
            status:true,
            message:'login success',
            statusCode:200,
            transations:trans
            
        }
    }
    else{
       return {
            status:false,
            message:'wrong account number',
            statusCode:401
          }
  }

  }
// exporting functons
  module.exports = {
    register,login,Credit,Debit, getTranstion
  }