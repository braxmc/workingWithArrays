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
const createUsernames = function(accs) {
  accs.forEach(function(acc) {
    acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('');
  })
}

createUsernames(accounts)
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

const calcDisplayBalance = function(movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance} EUR`;
};

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

// will only return first value that meets requirements
const firstWithdrawal = movements.find(mov => mov < 0);

console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

// getting same result with For Of loop
let accountFor = '';
for(const acc of accounts) {
  if(acc.owner === 'Jessica Davis') {
   accountFor = acc
  }
}
console.log(accountFor);