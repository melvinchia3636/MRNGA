/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const array = ['apple', 'orange', 'grapes'];
const array2 = ['watermelon', 'honeymelon'];
const array3 = ['starfruit', 'peach'];

const object1 = {
  name: 'John Doe',
  age: 36,
  hobbies: [
    'drawings',
    'playing basketballs',
  ],
};

// concat = join two of more list together
// Array.concat(array1[,array2,[array3,...]])
const array1plus2plus3 = array.concat(array2, array3);

// spread operator
// [...array[,...array2[,...array3]]]
const joinedArrayWithSpreadOperator = [...array, ...array2, ...array3];

// entries with objects
const entriesOfObject = Object.entries(object1);

// entries with array
// return : an iterator with key (index of element in list) value pair of each element in list
const entriesOfArray = array.entries();

// every
// returns true if the function return true for EVERY SINGLE element passed into it, returns false otherwise
// return ONLY TRUE OR FALSE
// let isEverythingInArrayIsNice = true;

// for (x of arrayOfBoolean) {
//   if (Boolean(x) === false) {
//     isEverythingInArrayIsNice = false;
//     break;
//   }
// }

const arrayOfBoolean = ['fefre', null, ['fefef'], 'Something', 'Some morething'];

arrayOfBoolean.every((e) => Boolean(e));

// fill
// array.fill(value, start, end): Fill the array with element from start index to stop index - 1, replace everything in array if start and stop index isn't specified
const arrayWithNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
// array -> [0, 8, 8, 8, 8, 8, 8, 8, 8, 9]
const arrayHuat = arrayWithNumber.fill(8);

// filter
// Filter out all the elements that does not meet the criteria (the function in filter() returns false)
const inputArray = ['value1', '', 'value2', '', 'value3', null, ['jfieiwfj'], undefined, { name: 'john doe' }, ''];

const filteredArray = inputArray.filter((e) => typeof e === 'string' && e !== '');

// find
// Find the first element in the array that met the criteria (function returns true), returns undefined if nothing in the array met it.
// array = ["apple", "orange", "grapes"]
const fruitsWithGInName = array.find((cur) => cur.includes('g'));

// findIndex
// Find the index first element in the array that met the criteria (function returns true), returns -1 if nothing in the array met it.
// array = ["apple", "orange", "grapes"]
const indexOfFruitsWithGInName = array.findIndex((cur) => cur.includes('g'));

// forEach
// another way of expressing for loop

// array = ["apple", "orange", "grapes"]

const something = array.forEach((e) => 'console.log(e)');

// from
// split each character in a string into an array or
// turn an iterator into an array
const string = 'apple is tasty';
const arrayFromString = Array.from(string);

// includes
// return true if value is in the array and false otherwise, case sensitive

// array = ["apple", "orange", "grapes"]
const appleInArray = array.includes('apple');

// indexOf
// find the element in the list and return the corresponding index, return -1 if element isn't presented in the list

// array = ["apple", "orange", "grapes"]
const indexOfGrapes = array.indexOf('mango');

// isArray
// return true if the variable is an array, return false otherwise
const somevar = [1, 2, 3];
const isThisAnArray = Array.isArray(somevar);

// join
// join the element in an array into a string with a specific delimiter (default to ",")

// array = ["apple", "orange", "grapes"]
const fruitString = array.join();

// keys
// return list of indices of each element in an array

// array = ["apple", "orange", "grapes"]
const indexOfFruits = array.keys();

// length
// return the length of the array
const lengthOfFruitsArray = array.length;

// lastIndexOf
// return the index of last occurence of an element in the list
const fruitsArrayWithDuplicate = ['apple', 'mango', 'orange', 'apple', 'grapes', 'apple'];

const lastOccurenceOfAppleInArray = fruitsArrayWithDuplicate.lastIndexOf('apple');

// map
// loop through the whole array, pass the element into a function, and replace the element with the thing that returns by the function

// array = ["apple", "orange", "grapes"]

const iLoveEatingFruits = array.map((element) => `I love ${element} 💖`);

// pop
// removes the last element in the list and returns it

// array = ["apple", "orange", "grapes"]
const lastElementInArray = array;// .pop()

// push
// add an element (or more) into the array

array.push('mango', 'watermelon');

// reduce
const numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const sum = numArr.reduce((sum, x) => sum += x);

// reduceRight
// reduce function but starting from the end of the array

// reverse
// revervse the array

array.reverse();

// removes the first element in the array and returns it

const firstElementInArray = array;// .shift()

// returns the array from the given starting index to the given stopping index

const numArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const slicedArray = numArray.slice(0, 7);

// some
// returns true if the functions return true if ANY element passed into it returns true, return false otherwise

const susArray = [1, 2, 3, 4, '5', 6, 7, 8, 9];
const isThisSUS = susArray.some((e) => typeof e !== 'number');

// sort
// sort the array in alphabetically and numerically order
// number -> uppercase alphabet (A-Z) -> lowercase alphabet (a-z)

const messyArray = [4, 'S', 5, 3, 'a', 6, 'f', 7, 's', 2, 9, 1, 'B', 8];
messyArray.sort();

// toString
// convert the raw array into string
const arrayString = array.toString();

// unshift
// add new elements to the beginning of an array
array.unshift('honeymelon', 'avocado');

// valueOf
// returns the array itself
const theExactSameArray = array.valueOf();

// console.log(theExactSameArray)

// Object destructuring

// Array descructuring
const numArrForDestructuring = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const [firstElement, secondElement, ...otherElement] = numArrForDestructuring;
console.log(firstElement, secondElement, otherElement);
// const [value, setValue] = useState(init_value) -> [value, (new_value) => void]

const nestedObject = {
  layer1: {
    layer2: {
      layer3: {
        layer4: {
          layer5: 'lol',
          layer5_2: 'lol2',
        },
      },
      layer3_2: 'lol3',
    },
  },
};

const { layer1: { layer2: { layer3: { layer4: { layer5, layer5_2 } }, layer3_2 } } } = nestedObject;
console.log(layer5, layer5_2, layer3_2);

const examResult = 70;

// if (exam_reuslt >= 60) {
//   is_passing = "You've passed the exam"
// } else {
//   is_passing = "You've failed the exam"
// }

const isPassing = examResult >= 60 ? "You've passed the exam nice" : "You've failed the exam lol";

// console.log(is_passing)

// short curcuit
// execute the right hand side of the "&&" sign only if the left hand side is valid (returns true)

1 + 2 === 2 && console.log('the left hand side is true');
