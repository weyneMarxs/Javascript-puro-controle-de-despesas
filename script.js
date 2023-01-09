const transactionsUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
console.log({ incomeDisplay, expenseDisplay, balanceDisplay })
const dummyTransactions = [
  {
    id: 1,
    name: 'bolo',
    amount: -20
  },
  {
    id: 2,
    name: 'salário',
    amount: 300
  },
  {
    id: 3,
    name: 'torta de frango',
    amount: -10
  },
  {
    id: 4,
    name: 'violão',
    amount: 150
  }
]
const addTransactionIntoDOM = transaction => {
  const operator = transaction.amount < 0 ? '-' : '+'
  const cssClass = transaction.amount < 0 ? 'minus' : 'plus'
  const amountWithoutOperator = Math.abs(transaction.amount)
  const li = document.createElement('li')

  li.classList.add(cssClass)
  li.innerHTML = `${transaction.name} <span>${operator} R$${amountWithoutOperator}</span><button class="delete-btn">x</button>`
  transactionsUl.append(li)
}
const updateBalanceValues = () => {
  const transactionsAmount = dummyTransactions.map(
    transaction => transaction.amount
  )
  const total = transactionsAmount
    .reduce((accumulator, transaction) => accumulator + transaction, 0)
    .toFixed(2)
  const income = transactionsAmount
    .filter(value => value > 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2)

  const expense = transactionsAmount
    .filter(value => value < 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2)
  console.log(income)
  console.log(expense)
}
const init = () => {
  dummyTransactions.forEach(addTransactionIntoDOM)
  updateBalanceValues()
}

init()
