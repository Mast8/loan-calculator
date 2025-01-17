
const calcForm = document.getElementById('calc-form'),
      loanAmount = document.getElementById('loan-amount'),
      interestRate = document.getElementById('interest-rate'),
      noOfMonth = document.getElementById('no-of-month'),
      calcBtn = document.getElementById('calc-btn'),
      clearBtn = document.getElementById('clear-btn'),
      paymentInfoList = document.querySelectorAll('.payment-info div span');


let message = document.getElementById('message');



calcForm.addEventListener('submit', (e) => {
    if(validate(loanAmount,"Loan amount") && validate(interestRate, "Interest rate") 
        && validate(noOfMonth,"Years")){
       
        showPaymentInfo();
    }
    e.preventDefault();
});



clearBtn.addEventListener('click', clearInputAndResult);

function validate(input,text){
    inputValue = input.value;
    res = false;

    if(inputValue.trim() === "")
      message.innerHTML = text +" is blank";
    else if(inputValue.trim() == 0 ){
      message.innerHTML = text +" is 0";
    } else if(inputValue.trim() <= 0 )
            message.innerHTML = text +" is Negative";
        else{
            message.innerHTML = "";
            res = true;
        }
    return res;
  }

// show payment info
function showPaymentInfo(){
   

    let monthlyPayment = calcMonthlyPayment(loanAmount.value, interestRate.value, noOfMonth.value);
    numberPayments = noOfMonth.value * 12;
    let total = numberPayments*monthlyPayment;
    paymentInfoList[0].innerHTML = thousandformat(loanAmount.value);
    paymentInfoList[1] .innerHTML = `${interestRate.value}%`;
    paymentInfoList[2].innerHTML = numberPayments;
    paymentInfoList[3].innerHTML = thousandformat(monthlyPayment);
    paymentInfoList[4].innerHTML = thousandformat(total);
}

function thousandformat(amount){
    return parseFloat(amount).toLocaleString();
}

function calcMonthlyPayment(amount, i, months){
    interest = (i/100) / 12;
    let monthlyPayment = (amount * interest * Math.pow(1 + interest, (12*months))) / (Math.pow(1 + interest, (12*months)) - 1);
    return monthlyPayment.toFixed(2);
}


function clearInputAndResult(){
    calcForm.reset();
    paymentInfoList.forEach(item => {
        item.innerHTML = "&mdash;";
    });
}