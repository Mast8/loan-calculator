
const calcForm = document.getElementById('calc-form'),
      loanAmount = document.getElementById('loan-amount'),
      interestRate = document.getElementById('interest-rate'),
      noOfMonth = document.getElementById('no-of-month'),
      calcBtn = document.getElementById('calc-btn'),
      clearBtn = document.getElementById('clear-btn'),
      paymentInfoList = document.querySelectorAll('.payment-info div span');





calcForm.addEventListener('submit', (e) => {
    if(validate(loanAmount,"loan amount") && validate(interestRate, "interest") 
        && validate(noOfMonth,"years")){
       
        showPaymentInfo();
    }
    e.preventDefault();
});



clearBtn.addEventListener('click', clearInputAndResult);

function validate(input,text){
    inputValue = input.value;
    res = false;
    if(inputValue.trim() === "")

      alert( text +" is blank");
    else if(inputValue.trim() == 0 ){
      alert(text +" is 0");
    } else res = true;
    return res;
  }

// show payment info
function showPaymentInfo(){
   

    let monthlyPayment = calcMonthlyPayment(loanAmount.value, interestRate.value, noOfMonth.value);
    numberPayments = noOfMonth.value * 12;
    let total = numberPayments*monthlyPayment;
    paymentInfoList[0].innerHTML = `$${loanAmount.value.toLocaleString()}`;
    paymentInfoList[1] .innerHTML = `${interestRate.value}%`;
    paymentInfoList[2].innerHTML = numberPayments;
    paymentInfoList[3].innerHTML = `$${parseFloat(monthlyPayment).toLocaleString()}`;
    paymentInfoList[4].innerHTML = total.toFixed(2);


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