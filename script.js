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

const displayMovements = function(movements) {
  containerMovements.innerHTML = '';

  movements.forEach(function(mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__value">${mov}</div>
    </div>
    `

    containerMovements.insertAdjacentHTML('afterbegin', html);
  })
}
displayMovements(account1.movements);

/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

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

// Lecture 2

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

// Lecture 2

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

// Lecture 2

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

// Lecture 3

// Computing Usernames

const user = 'Braxton Douglas McClellan';

// REGULAR FUNCTION
// const username = user.toLowerCase().split(' ').map(function(name) {
//   return name[0]
// }).join('');

// ARROW FUNCTION
const createUsernames = function(accs) {
  accs.forEach(function(acc) {
    acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('');
  })
}

createUsernames(accounts)
console.log(accounts);