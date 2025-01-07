
const calcForm = document.getElementById('calc-form'),
      loanAmount = document.getElementById('loan-amount'),
      interestRate = document.getElementById('interest-rate'),
      noOfMonth = document.getElementById('no-of-month'),
      calcBtn = document.getElementById('calc-btn'),
      clearBtn = document.getElementById('clear-btn'),
      paymentInfoList = document.querySelectorAll('.payment-info div span');

calcForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showPaymentInfo();
});

clearBtn.addEventListener('click', clearInputAndResult);


// show payment info
function showPaymentInfo(){
    let monthlyPayment = calcMonthlyPayment(loanAmount.value, interestRate.value, noOfMonth.value);
    let yearPayment = calcYearPayment(loanAmount.value, interestRate.value, noOfMonth.value);
    paymentInfoList[0].innerHTML = `$${loanAmount.value.toLocaleString()}`;
    paymentInfoList[1] .innerHTML = `$${interestRate.value}%`;
    paymentInfoList[2].innerHTML = noOfMonth.value;
    //paymentInfoList[3].innerHTML = `$${parseFloat(monthlyPayment).toLocaleString()}`;
    paymentInfoList[3].innerHTML = `$${parseFloat(yearPayment).toLocaleString()}`;

}

function calcMonthlyPayment(amount, i, months){
    interest = (i/100) / 12;
    let monthlyPayment = (amount * interest * Math.pow(1 + interest, months)) / (Math.pow(1 + interest, months) - 1);
    return monthlyPayment.toFixed(2);
}

function calcYearPayment(amount, i, year){
    interest = (i/100) ;
    let monthlyPayment = (amount * interest * year);
    return monthlyPayment.toFixed(2);
}

function clearInputAndResult(){
    calcForm.reset();
    paymentInfoList.forEach(item => {
        item.innerHTML = "&mdash;";
    });
}