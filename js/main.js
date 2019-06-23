let start = document.getElementById('start'),
    budgetValue = document.querySelector('.budget-value'),
    daybudgetValue = document.querySelector('.daybudget-value'),
    levelValue = document.querySelector('.level-value'),
    expensesValue = document.querySelector('.expenses-value'),
    optionalexpensesValue = document.querySelector('.optionalexpenses-value'),
    incomeValue = document.querySelector('.income-value'),
    monthsavingsValue = document.querySelector('.monthsavings-value'),
    yearsavingsValue = document.querySelector('.yearsavings-value'),

    expensesItem = document.querySelectorAll('.expenses-item'),
    expensesItemBtn = document.getElementsByTagName('button')[0],
    optionalexpensesBtn = document.getElementsByTagName('button')[1],
    countBudgetBtn = document.getElementsByTagName ( 'button')[2],
    countBudgetExpBtn = document.getElementsByTagName ( 'button')[3],
    optionalexpensesItemNotImportant = document.querySelectorAll('.optionalexpenses-item'),
    chooseIncome = document.querySelector('.choose-income'),
    savings = document.querySelector('#savings'),
    chooseSum = document.querySelector('.choose-sum'),
    choosePercent = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');
    
    // expWrapper = document.querySelector('.expenses-wrapper'),
    // addItem = document.querySelector('.add-item-btn');

    let money,time,expvalue;
    
    // addItem.addEventListener('click', function(){
    //     let item = document.createElement('div');
    //     item.innerHTML = '<input class="expenses-item" type="text" id="expenses" placeholder="Наименование"> <input class="expenses-item" type="text" id="expenses" placeholder="Цена">';
    //     expWrapper.insertBefore(item, expensesItemBtn);
    //     return item;
    // });

    start.addEventListener('click', function(){
        time = prompt('Введите дату в формате YYYY-MM-DD', '');
        money = +prompt('Ваш бюджет на месяц?', '');
    
        while(isNaN(money) || money == "" || money == null ) {
            money = +prompt('Ваш бюджет на месяц?', '');
        }
        
        appData.budget = money;
        appData.timeData = time;
        budgetValue.textContent = money.toFixed();
        yearValue.value = new Date(Date.parse(time)).getFullYear();
        monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
        dayValue.value = new Date(Date.parse(time)).getDate();
        countBudgetBtn.removeAttribute('disabled');
        expensesItemBtn.removeAttribute('disabled');
        optionalexpensesBtn.removeAttribute('disabled');
        countBudgetExpBtn.removeAttribute('disabled');
    });

    expensesItemBtn.addEventListener('click', function(){
        let sum = 0;

        for ( let i = 0; i < expensesItem.length; i++) {
            let a = expensesItem[i].value,
                b = expensesItem[++i].value;
            
            if ((typeof(a)) === 'string' && (typeof(a)) != null &&  (typeof(b)) != null
                && a != '' && b != '' && a.length < 50) {
                appData.expenses[a] = b;
                sum += +b;
            } else {
                i = i - 1;
            }
        };
        expensesValue.textContent = sum;
        appData.expvaluesum = sum;
    });

    optionalexpensesBtn.addEventListener('click', function() {

            for ( let i = 0; i < optionalexpensesItemNotImportant.length; i ++) {
                let a = optionalexpensesItemNotImportant[i].value;
            appData.optionalExpenses[i]= a;
            optionalexpensesValue.textContent += appData.optionalExpenses[i] + ' ';
            }
            
    });

    countBudgetBtn.addEventListener('click', function(){

        if(appData.budget != undefined){
            if(appData.expvaluesum !=undefined){
                appData.moneyPerDay = ((appData.budget-appData.expvaluesum)/30).toFixed();
            }else {
                    appData.moneyPerDay = (appData.budget/30).toFixed();
            }
            
            daybudgetValue.textContent = appData.moneyPerDay;
    
            if(appData.moneyPerDay < 100 ) {
               levelValue.textContent = "Минимальный уровень достатка";
            } else if ( appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
                levelValue.textContent = "Средний уровень достатка";
            
            }else if ( appData.moneyPerDay > 2000){
                levelValue.textContent = "Высокий уровень достатка";
            }else {
                levelValue.textContent = "Произошла ошибка";
            }
        }else {
            daybudgetValue.textContent = "Произошла ошибка";
        }

    });

    chooseIncome.addEventListener('change', function(){
        let items = chooseIncome.value;
            appData.income = items.split( ', ');
        incomeValue.textContent = appData.income;
    });
    savings.addEventListener('click', function(){
        if (appData.savings == true) {
            appData.savings = false;
        }else {
            appData.savings = true;
        }
    });

    chooseSum.addEventListener('input' , function(){
        if (appData.savings == true){
            let sum = +chooseSum.value, 
                precent = +choosePercent.value;

            appData.monthIncome = sum/100/12*precent;
            appData.yearIncome = sum/100*precent;

            monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
            yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
        }
    })
    choosePercent.addEventListener('input' , function(){
        if (appData.savings == true){
            let sum = +chooseSum.value, 
                precent = +choosePercent.value;

            appData.monthIncome = sum/100/12*precent;
            appData.yearIncome = sum/100*precent;

            monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
            yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
        }
    })

    let appData = {
        budget: money,
        expvaluesum: undefined,
        expenses: {},
        optionalExpenses: {},
        income: [],
        timeData: time,
        savings: false,
    };