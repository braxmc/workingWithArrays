'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////

const displayMovements = function(movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function(mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>
    `

    containerMovements.insertAdjacentHTML('afterbegin', html);
  })
};

const calcDisplayBalance = function(acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function(acc) {
  const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements.filter(mov => mov > 0).map(deposit => (deposit * acc.interestRate) / 100).filter((int, i, arr) => {
    // console.log(arr);
    return int >= 1;
  }).reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
}

const createUsernames = function(accs) {
  accs.forEach(function(acc) {
    acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('');
  })
}

createUsernames(accounts);

const updateUI = function(acc) {
      // Display movements
      displayMovements(acc.movements);
    
      // Display balance
      calcDisplayBalance(currentAccount);
      
      //Display summary
      calcDisplaySummary(currentAccount);
}


// Event handler
let currentAccount;

btnLogin.addEventListener('click', function(e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);

  if(currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(' ')[0]}`
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function(e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const recieverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  inputTransferAmount.value = inputTransferTo.value = '';

  if(amount > 0 && recieverAcc && currentAccount.balance >= amount && recieverAcc?.username !== currentAccount.username) {
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);
    updateUI(currentAccount);
  }
  
});

btnLoan.addEventListener('click', function(e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if(amount > 0 && currentAccount.movements.some(mov => mov >= amount / 10)){
    // Add movement
    currentAccount.movements.push(amount);

    // update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.textContent = '';
})

btnClose.addEventListener('click', function(e) {
  e.preventDefault();
  
  if(inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === Number(currentAccount.pin)) {
    const index = accounts.findIndex(acc => acc.username === currentAccount.username)
    
    // Delete Acc
    accounts.splice(index, 1);
  
    // Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function(e) {
  e.preventDefault;
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
})

/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// Lecture 1

// basic array methods

// let arr = ['a', 'b', 'c', 'd', 'e'];


// // Slice method
// console.log(arr.slice(2));
// console.log(arr.slice(2, 4)); // second value/index wont show in log
// console.log(arr.slice(-2)); // pulls from the end of the array
// console.log(arr.slice(1, -2));
// console.log(arr.slice());
// console.log([...arr]); // this does the same as the above

// // Splice method
// console.log(arr.splice(2)); // this alters original arr, deletes values extracted
// console.log(arr);
// arr.splice(-1); // this will delete the last element of array
// console.log(arr);

// arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['j', 'i', 'h', 'g', 'f']

// console.log(arr);
// console.log(arr.splice(1, 2)); // splice 1st arg is starting index, 2nd arg is how many deletions from that point
// console.log(arr);

// // Reverse method
// console.log(arr2);
// console.log(arr2.reverse()); // reverse mutates the original array

// // Concat method
// arr = ['a', 'b', 'c', 'd', 'e']; // Concat does not mutate original array
// const letters = arr.concat(arr2); // this will add the 2 arrays together
// console.log(letters);
// console.log([...arr, ...arr2]); // this does the same thing as concat

// // Join method
// console.log(letters.join(' - ')); // creates a string of elements with chosen separator

/////////////////////////////////////////////////

// Lecture 2

// looping arrays: forEach

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for(const [i, movement] of movements.entries()) {
//   if(movement > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${movement}`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
//   }
// }

// console.log('---------------forEach-------------------');

// // The order of forEach arguments must always be in order of current element, then index, and then entire array that we are looping over
// // forEach has no stopping/breaks it must loop over the entire array
// movements.forEach(function(mov, i, arr) {
//   if(mov > 0) {
//     console.log(`Movement ${i}: You deposited ${mov}`);
//   } else {
//     console.log(`Movement ${i}: You withdrew ${Math.abs(mov)}`);
//   }
//   console.log(arr); // this will show the entire array
// });

/////////////////////////////////////////////////

// Lecture 3

// looping set and maps: forEach


// // Map
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// // has 3 arguements, value, key: key for value, map: entire map
// currencies.forEach(function(value, key, map) {
//   console.log(`${key}: ${value}`);
// });

// // Set
// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// console.log(currenciesUnique);

// // has 3 arguements, value, key: is the same as value, Set: entire set
// // using underscore as arguement is a throw away value
// currenciesUnique.forEach(function(value, _, set) {
//   console.log(`${_}: ${value}`);
// })

/////////////////////////////////////////////////

// Lecture 4

// Coding Challenge 1

// // test data 1
// let arr1 = [3, 5, 2, 12, 7];
// const arr2 = [4, 1, 15, 8, 3];

// // test data 2
// let arr3 = [9, 16, 6, 8, 3];
// const arr4 = [10, 5, 6, 1, 4];


// function checkDogs(arr1, arr2) {
//   arr1 = arr1.slice(1, -2);
//   const combinedArr = arr1.concat(arr2);
//   console.log(combinedArr);
//   combinedArr.forEach(function(value, index, _) {
//     const stage = value > 3 ? 'adult' : 'puppy';
//     if(value >= 3) {
//       console.log(`Dog number ${index + 1} is an ${stage}, and is ${value} years old`);
//     } else {
//       console.log(`Dog number ${index + 1} is an ${stage}, and is ${value} years old`);
//     }
//   })
// };

// checkDogs(arr1, arr2);
// console.log('-------------------');
// checkDogs(arr3, arr4);

///////////////////////////////////////////

// Lecture 5

// Map method

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const eurToUsd = 1.1;

// const movementsUSD = movements.map(function(mov) {
//   return mov * eurToUsd;
// });

// const movementsUSDarrow = movements.map(mov => 
//   mov * eurToUsd
//   )

// console.log(movements);
// console.log(movementsUSD);
// console.log(movementsUSDarrow);

// const movementsUSDfor = [];
// for(const mov of movements) {
//   movementsUSDfor.push(mov * eurToUsd);
// }
// console.log(movementsUSDfor);

// const movementsDescription = movements.map((mov, i, arr) => {
//   if(mov > 0) {
//     return `Movement ${i + 1}: You deposited ${mov}`
//   } else {
//     return `Movement ${i + 1}: You withdrew ${Math.abs(mov)}`
//   }
// });

// console.log(movementsDescription);

///////////////////////////////////////////

// Lecture 6

// Computing Usernames

// const user = 'Braxton Douglas McClellan';

// // REGULAR FUNCTION
// // const username = user.toLowerCase().split(' ').map(function(name) {
// //   return name[0]
// // }).join('');

// ARROW FUNCTION
// const createUsernames = function(accs) {
//   accs.forEach(function(acc) {
//     acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('');
//   })
// }

// createUsernames(accounts)
// console.log(accounts);

///////////////////////////////////////////

// Lecture 7

// Filter Method

// // has access to all 3 args but normally only use value arg
// const deposits = movements.filter(function(mov, index, arr) {
//   return mov > 0
// });

// const depositFor = [];
// for(const dep of movements) {
//   if(dep > 0) {
//     depositFor.push(dep)
//   }
// };

// const withdrawals = movements.filter(mov => mov < 0);

// console.log(movements);
// console.log(deposits);
// console.log(depositFor);
// console.log(withdrawals);

///////////////////////////////////////////

// Lecture 5

// Reduce Method

// console.log(movements);


// // accumulator -> SNOWBALL
// const balance = movements.reduce(function(accumulator, current, index, arr) {
//   console.log(`Iteration ${index}: ${accumulator}`);
//   return accumulator + current
// }, 0); // the 0 is the inital/starting value of the accumulator 

// // let balanceFor = 0;
// // for(const bal of movements) {
// //   balanceFor += bal
// // };
// // console.log(balanceFor);

// const balance2 = movements.reduce((acc, cur) => acc + cur, 0);

// console.log(balance);
// console.log(balance2);

// const calcDisplayBalance = function(movements) {
//   const balance = movements.reduce((acc, mov) => acc + mov, 0);
//   labelBalance.textContent = `${balance} EUR`;
// };

// calcDisplayBalance(account1.movements);

// console.log(movements);

// // Maximum value of arr
// const max = movements.reduce((acc, mov) => {
//   if(acc > mov) {
//     return acc;
//   } else {
//     return mov;
//   }
// }, movements[0]);
// console.log(max);

// // Minimum value of arr
// const min = movements.reduce((acc, mov) => acc < mov ? acc : mov);
// console.log(min);

/////////////////////////////////////////////////

// Lecture 8

// Coding Challenge 2

// using regular functions

// const ages = [5, 2, 4, 1, 15, 8, 3];

// const ages2 = [16, 6, 10, 5, 6, 1, 4];

// const calcAverageHumanAge = function(ages) {

//   const humanAges = ages.map(function(age) {
//     if(age <= 2) {
//       return age * 2
//     } else {
//       return 16 + age * 4
//     }
//   });
//   console.log(humanAges);

//   const adults = humanAges.filter(function(age) {
//     return age >= 18
//   });
//   console.log(adults);

//   const averageAge = adults.reduce(function(acc, age) {
//     return acc + age / adults.length
//   }, 0);
//   console.log(averageAge);
// }

// calcAverageHumanAge(ages);
// calcAverageHumanAge(ages2);

// // using arrow functions

// const ages3 = [5, 2, 4, 1, 15, 8, 3];

// const ages4 = [16, 6, 10, 5, 6, 1, 4];

// const calcAverageHumanAge1 = function (ages) {

//   const humanAges = ages.map(age => age <= 2 ? age * 2 : 16 + age * 4);
//   console.log(humanAges);

//   const adults = humanAges.filter(age => age >= 18);
//   console.log(adults);

//   const averageAge = adults.reduce((acc, age) => acc + age, 0) / adults.length;
//   console.log(averageAge);
// }

// calcAverageHumanAge1(ages3);
// calcAverageHumanAge1(ages4);

/////////////////////////////////////////////////

// Lecture 9

// The magic of chaining methods

// const eurToUsd = 1.1;
// const totalDepositsUSD = movements.filter(mov => mov > 0).map(mov => mov * eurToUsd).reduce((acc, mov) => acc + mov, 0);
// console.log(totalDepositsUSD);

// const calcDisplaySummary = function(movements) {
//   const incomes = movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
//   labelSumIn.textContent = `${incomes}€`;

//   const out = movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
//   labelSumIn.textContent = `${Math.abs(out)}€`;

//   const interest = movements.filter(mov => mov > 0).map(deposit => deposit * 1.2/100).filter((int, i, arr) => {
//     console.log(arr);
//     return int >= 1;
//   }).reduce((acc, int) => acc + int, 0);
//   labelSumInterest.textContent = `${interest}€`;
// }
// calcDisplaySummary(account1.movements);

/////////////////////////////////////////////////

// Lecture 10

// Coding Challenge 23

// using arrow functions and chaining

// const ages = [5, 2, 4, 1, 15, 8, 3];

// const ages2 = [16, 6, 10, 5, 6, 1, 4];

// const calcAverageHumanAge = ages => 
//   ages
//     .map(age => (age <= 2 ? age * 2 : 16 + age * 4))
//     .filter(age => age >= 18)
//     .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

// const avg1 = calcAverageHumanAge(ages);
// const avg2 = calcAverageHumanAge(ages2)

// console.log(avg1, avg2);

/////////////////////////////////////////////////

// Lecture 10

// Find Method

// // will only return first value that meets requirements
// const firstWithdrawal = movements.find(mov => mov < 0);

// console.log(movements);
// console.log(firstWithdrawal);

// console.log(accounts);

// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

// // getting same result with For Of loop
// let accountFor = '';
// for(const acc of accounts) {
//   if(acc.owner === 'Jessica Davis') {
//    accountFor = acc
//   }
// }
// console.log(accountFor);

/////////////////////////////////////////////////

// Lecture 11

// Implementing login 

// // Event handler
// let currentAccount;

// btnLogin.addEventListener('click', function(e) {
//   // Prevent form from submitting
//   e.preventDefault();

//   currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
//   console.log(currentAccount);

//   if(currentAccount?.pin === Number(inputLoginPin.value)) {
//     // Display UI and message
//     labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(' ')[0]}`
//     containerApp.style.opacity = 100;

//     // Clear input fields
//     inputLoginUsername.value = inputLoginPin.value = '';
//     inputLoginPin.blur();

//     // Display movements
//     displayMovements(currentAccount.movements);
    
//     // Display balance
//     calcDisplayBalance(currentAccount.movements);
    
//     //Display summary
//     calcDisplaySummary(currentAccount);
//   }
// });

/////////////////////////////////////////////////

// Lecture 12

// Implementing transfers

// btnTransfer.addEventListener('click', function(e) {
//   e.preventDefault();

//   const amount = Number(inputTransferAmount.value);
//   const recieverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
//   inputTransferAmount.value = inputTransferTo.value = '';

//   if(amount > 0 && recieverAcc && currentAccount.balance >= amount && recieverAcc?.username !== currentAccount.username) {
//     currentAccount.movements.push(-amount);
//     recieverAcc.movements.push(amount);
//     updateUI(currentAccount);
//   }
  

// });

/////////////////////////////////////////////////

// Lecture 13

// findIndex method

// btnClose.addEventListener('click', function(e) {
//   e.preventDefault();
  
//   if(inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === Number(currentAccount.pin)) {
//     const index = accounts.findIndex(acc => acc.username === currentAccount.username)
    
//     // Delete Acc
//     accounts.splice(index, 1);
  
//     // Hide UI
//     containerApp.style.opacity = 0;
//   }
//   inputCloseUsername.value = inputClosePin.value = '';
// });

/////////////////////////////////////////////////

// Lecture 13

// Some and Every methods

// console.log(movements);

// // ---SOME METHOD---

// // EQUALITY
// console.log(movements.includes(-130));

// // CONDITION
// console.log(movements.some(mov => mov === -130));

// // checking to see if there is a deposit greater than 5000
// const anyDeposits = movements.some(mov => mov > 5000);
// console.log(anyDeposits);

// // ---EVERY METHOD---

// // checkint to see if every movement is positive/above 0
// console.log(movements.every(mov => mov > 0));
// console.log(account4.movements.every(mov => mov > 0));

// // separate callback
// const deposit = mov => mov > 0;
// console.log(movements.some(deposit));
// console.log(movements.every(deposit));
// console.log(movements.filter(deposit));

/////////////////////////////////////////////////

// Lecture 14

// Flat and FlatMap

// const arr = [[1, 2, 3], [4, 5, 6], 78];
// console.log(arr.flat());

// const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// console.log(arrDeep.flat(2));

// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);

// const allMovements = accountMovements.flat();
// console.log(allMovements);

// const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance);

// this is the same as above with chaining
// const overallBalance = 
// accounts.flatMap(acc => acc.movements)
// .reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance);

/////////////////////////////////////////////////

// Lecture 15

// Sorting Arrays

// Strings
// const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
// console.log(owners);
// console.log(owners.sort());
// console.log(owners);

// Numbers
// console.log(movements);
// console.log(movements.sort());
// [-130, -400, -650, 1300, 200, 3000, 450, 70] this is the result
// does them like strings first the - then the number

// console.log(movements);

// return < 0 ... A, B (keep order)
// return > 0 ... B, A (switch order)

// Ascending
// movements.sort((a, b) => {
//   if(a > b) {
//     return 1;
//   }
//   if(b > a) {
//     return -1;
//   }
// });

// same thing as above but improved
// movements.sort((a, b) => a - b)

// console.log('ascending', movements);

// Descending 
// movements.sort((a, b) => {
//   if(a > b) {
//     return -1;
//   }
//   if(b > a) {
//     return 1;
//   }
// });

// same thing as above but improved
// movements.sort((a, b) => b - a)

// console.log('descending', movements);

/////////////////////////////////////////////////

// Lecture 16

// Creating and Filling arrays

// console.log([1, 2, 3, 4, 5, 6, 7]);
// console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// // Empty arrays + fill method
// const x = new Array(7); // with only 1 arg is creates empty array w/length of 7
// console.log(x); 

// x.fill(4); // fills entire array with single value
// console.log(x);

// x.fill(1, 3); // second arg is where it starts filling from ie: index 3-7
// console.log(x);

// x.fill(2, 0, 3); // second arg is where it stops, third is where it ends
// console.log(x);

// // --- Array.from ----

// // Doesn't create an empty array
// const y = Array.from({length: 7}, () => 1);
// console.log(y);

// // can use _ instead of 'cur'
// const z = Array.from({length: 7}, (_, i) => i + 1);
// console.log(z);

// // mini challange, 100 random dice rolls
// const diceRolls = Array.from({length: 100}, (_, i) => i = Math.trunc(Math.random() * 6) + 1);
// console.log(diceRolls);

// labelBalance.addEventListener('click', function() {
//   const movementsUI = Array.from(
//     document.querySelectorAll('.movements__value'),
//     el => Number(el.textContent.replace('€', '')))

//   // gets values of the .movements
//   // console.log(movementsUI.map(el => el.textContent.replace('€', '')));
//   console.log(movementsUI);
// });

/////////////////////////////////////////////////

// Lecture 17

// Which array methods to use

// // METHODS THAT MUTATE ORIGINAL ARRAY

//   // add to original
//   .push (adds to end)
//   .unshift (adds to beginning)

//   // remove from original
//   .pop (removes from end)
//   .shift (removes from beginning)
//   .splice (removes any)

//   // others
//   .reverse
//   .sort
//   .fill

// // METHODS THAT MUTATE NEW ARRAY
//   .map (loop)

//   .filter
  
//   .slice

//   .concat

//   .flat
//   .flatMap

// // AN ARRAY INDEX
//   .indexOf

//   .findIndex

// // AN ARRAY ELEMENT
//   .find

// // KNOW IF ARRAY INCLUDES
//   .includes

//   .some
//   .every

// // A NEW STRING
//   .join

// // TO TRANSFORM TO VALUE
//   .reduce // boil down array to a single value of any type: number, string, boolean, or even a new array or object

// //  TO JUST LOOP ARRAY
//   .forEach // does not create new array just loops over existing

/////////////////////////////////////////////////

// Lecture 18

// Array Method Practice

// 1.
const bankDepositSum = accounts.flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((acc, num) => acc + num, 0);

console.log(bankDepositSum);

// 2.
// different ways to find length of array with params
const numDeposits1000 = accounts.flatMap(acc => acc.movements)
  .filter(mov => mov >= 1000).length;

console.log(numDeposits1000);

const numDeposits1000Two = accounts.flatMap(acc => acc.movements)
  .reduce((count, num) => num >= 1000 ? count + 1 : count ,0);

console.log(numDeposits1000Two);

// -------
let a = 10;
console.log(a++); // returns old value
console.log(a); // shows incremented/updated value

// 3.
const {deposits, withdrawals} = accounts.flatMap(acc => acc.movements)
  .reduce((sums, cur) => {
    cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
    return sums;
  }, {deposits: 0, withdrawals: 0});

console.log(deposits, withdrawals);

// another way to do it
const {deposit, withdrawal} = accounts.flatMap(acc => acc.movements)
  .reduce((sums, cur) => {
    sums[cur > 0 ? 'deposit' : 'withdrawal'] += cur;
    return sums;
  }, {deposit: 0, withdrawal: 0});

  console.log(deposit, withdrawal);

// 4.
// Ex: this is a nice title --> This Is a Nice Title
const convertTitleCase = function(title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with', 'and'];

  const titleCase = title.toLowerCase().split(' ')
    .map(word => exceptions.includes(word) ? word : word[0]
    .toUpperCase() + word.slice(1))
    .join(' ')
  return capitalize(titleCase);
};
console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('this is another TITLE with an EXAMPLE'));
console.log(convertTitleCase('And this is another TITLE with an EXAMPLE'));