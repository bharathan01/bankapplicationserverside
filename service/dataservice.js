//importing jsonwebtoken 
const jwt = require("jsonwebtoken")
// importing user methode
const db = require('./dbconnect')

// userDetails = {
//       1000: { accno: 1000, uname: "arun", password: "1234", balance: 0 ,transations:[]},
//       1001: { accno: 1001, uname: "anu", password: "1234", balance: 0  ,transations:[]},
//       1002: { accno: 1002, uname: "raju", password: "1234", balance: 0 ,transations:[] },
//       1003: { accno: 1003, uname: "ram", password: "1234", balance: 0  ,transations:[]}
//     }







register = (accname, accno, pass) => {
  // if (accno in userDetails) 
  // checking the user is already present in the database 
  return db.User.findOne({ acno: accno }).then(user => {
    if (user) {
      return {
        status: false,
        message: 'user already present',
        statusCode: 401
      }

    }
    // if the user is not present in the db then add new
    else {
      const newUser = new db.User({
        acno: accno,
        username: accname,
        password: pass,
        balance: 0,
        transation: []
      })
      // newUser containe data it save to database
      newUser.save()
      return {
        status: true,
        message: 'Registerd...',
        statusCode: 200
      }

    }
  })

}

//login methode
login = (accno, pass) => {

  // if (accno in userDetails)
  return db.User.findOne({ acno: accno, password: pass }).then(user => {
    if (user) {
      userName = user.username
      userAcc = user.accno
      //creating token for the login users
      const token = jwt.sign({ userAcc }, 'secretkey')
      return {
        status: true,
        message: 'login success',
        statusCode: 200,
        userName,
        userAcc,
        token

      }


    }
    else {
      return {
        status: false,
        message: 'incorrect account number or password',
        statusCode: 401
      }

    }
  })
}


Credit = (accnoCredit, passCredit, amountCredit) => {
  //converting string to int
  var creditAmt = parseInt(amountCredit)
  // if (accnoCredit in userDetails) 
  return db.User.findOne({ acno: accnoCredit, password: passCredit }).then(user => {
    if (user) {
      user.balance += creditAmt
      //transation details
      user.transation.push({ type: "CREDIT", amount: creditAmt })
      user.save()

      return {
        status: true,
        message: `An amount of ${creditAmt} is credited to your account ,current balance is ${user.balance}`,
        statusCode: 200
      }

    }

    else {
      return {
        status: false,
        message: 'wrong account number',
        statusCode: 401
      }

    }
  })




}
Debit = (accnoDebit, passDebit, amountDabit) => {
  //converting string to int
  let debitAmt = parseInt(amountDabit)
  // if (accnoDebit in userDetails) 
  return db.User.findOne({ acno: accnoDebit, password: passDebit }).then(user => {
    if (user) {
      if (debitAmt <= user.balance) {
        user.balance -= debitAmt
        user.transation.push({ type: "DEBIT", amount: debitAmt })

        user.save()

        return {
          status: true,
          message: `An amount of ${debitAmt} is debited from your bank account ,current balance is ${user.balance}`,
          statusCode: 200,
        }

      }
      else {
        return {
          status: false,
          message: 'insufficient fund',
          statusCode: 401
        }

      }

    }
    else {
      return {
        status: false,
        message: 'wrong account number',
        statusCode: 401
      }

    }
  })
}
getTranstion = (accountNo) => {
  // if (accountNo in userDetails) 
  return db.User.findOne({ acno: accountNo }).then(user => {
    if (user) {
      
      return {
        status: true,
        message: 'login success',
        statusCode: 200,
        transations: user.transation

      }

    }
    else {
      return {
        status: false,
        message: 'wrong account number',
        statusCode: 401
      }
    }


  })


}
// exporting functons
module.exports = {
  register, login, Credit, Debit, getTranstion
}