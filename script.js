const transactionsUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
)
let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : []
const removeTransaction = ID => {
  transactions = transactions.filter(transaction => transaction.id !== ID)
  updateLocalStorage()
  init()
}
const addTransactionIntoDOM = ({ amount, name, id }) => {
  const operator = amount < 0 ? '-' : '+'
  const cssClass = amount < 0 ? 'minus' : 'plus'
  const amountWithoutOperator = Math.abs(amount)

  const li = document.createElement('li')

  li.classList.add(cssClass)
  li.innerHTML = `${name}
    <span>${operator} R$${amountWithoutOperator}</span>
    <button class="delete-btn" onClick="removeTransaction(${id})">x</button>`
  transactionsUl.append(li)
}
const getTotal = transactionsAmounts =>
  transactionsAmounts
    .reduce((accumulator, transaction) => accumulator + transaction, 0)
    .toFixed(2)
const getIncomes = transactionsAmounts =>
  transactionsAmounts
    .filter(value => value > 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2)
const getExpenses = transactionsAmounts =>
  Math.abs(
    transactionsAmounts
      .filter(value => value < 0)
      .reduce((accumulator, value) => accumulator + value, 0)
  ).toFixed(2)

const updateBalanceValues = () => {
  // const transactionsAmounts = transactions.map(
  //   transaction => transaction.amount
  // )
  const transactionsAmounts = transactions.map(({ amount }) => amount)

  const total = getTotal(transactionsAmounts)
  const income = getIncomes(transactionsAmounts)
  const expense = getExpenses(transactionsAmounts)

  balanceDisplay.textContent = `R$ ${total}`
  incomeDisplay.textContent = `R$ ${income}`
  expenseDisplay.textContent = `R$ ${expense}`
}
const init = () => {
  transactionsUl.innerHTML = ''
  transactions.forEach(addTransactionIntoDOM)
  updateBalanceValues()
}

init()
const updateLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions))
}
const generateID = () => Math.round(Math.random() * 1000)
const addToTransactionArray = (transactionName, transactionAmount) => {
  transactions.push({
    id: generateID(),
    name: transactionName,
    amount: Number(transactionAmount)
  })
}

const cleanInput = () => {
  inputTransactionAmount.value = ''
  inputTransactionName.value = ''
}
const handleFornmSubmit = event => {
  event.preventDefault()
  const transactionName = inputTransactionName.value.trim()
  const transactionAmount = inputTransactionAmount.value.trim()
  const isSomeInputEmpty = transactionName === '' || transactionAmount === ''
  if (isSomeInputEmpty) {
    alert('Por favor Preencha os campos !')
    return
  }
  addToTransactionArray(transactionName, transactionAmount)
  init()
  updateLocalStorage()
  cleanInput()
}
form.addEventListener('submit', handleFornmSubmit)
