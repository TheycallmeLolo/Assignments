// Part 1: Coding Questions(7.5 Grade):
// 1. Convert the string "123" to a number and add 7.(0.5 Grade)
// • Output Example: 130

// let number = "123"
// let newNumber = Number(number)
// console.log(newNumber + 7);


// 2. Check if the given variable is falsy and return "Invalid" if it is. (0.5 Grade)
// • Input Example: 0
// •  Output Example: "Invalid"

// let value = 0
// if (!value) {
//     console.log("Invalid");
// }

// 3. Use for loop to print all numbers between 1 and 10, skipping even numbers using continue (0.5 Grade)
// • Output Example: 1, 3, 5, 7, 9

// for (let index = 1; index < 11; index++) {
//     if (index % 2 == 0) {
//         continue
//     } else {
//         console.log(index);
//     }
// }

// 4. Create an array of numbers and return only the even numbers using filter method. (0.5 Grade)
// • Input Example: [1, 2, 3, 4, 5]
// • Output Example: [2, 4]

// let arr = [1, 2, 3, 4, 5]
// console.log(arr.filter((element) => {
//     return element % 2 == 0
// }));

// 5. Use the spread operator to merge two arrays, then return the merged array. (0.5 Grade)
// • Input Example: [1, 2, 3], [4, 5, 6]
// • Output Example: [1, 2, 3, 4, 5, 6]

// let firstArray = [1, 2, 3]
// let secondArray = [4, 5, 6]
// let mergedArray = [...firstArray,...secondArray]
// console.log(mergedArray);

// 6. Use a switch statement to return the day of the week given a number(1 = Sunday …., 7 = Saturday). (0.5 Grade)
// • Input Example: 2
// • Output Example: “Monday”

// let key = 2
// let day = ''
// switch (key) {
//     case 1:
//         console.log(day = "Sunday");
//         break;
//     case 2:
//         console.log(day = "Monday");
//         break;
//         //etc
//     default:
//         break;
// }

// 7. Create an array of strings and return their lengths using map method (0.5 Grade)
// • Input: ["a", "ab", "abc"]
// • Output Example: [1, 2, 3]

// let array = ["a", "ab", "abc"]
// let mappedArray = array.map((element) => {
//     return element.length
// })
// console.log(mappedArray);


// 8. Write a function that checks if a number is divisible by 3 and 5.(0.5 Grade)
// • Input Example: 15
// • Output Example: “Divisible by both”

// let number = 15
// if (number / 3 && number / 5) {      // or / 15
//     console.log("Divisible by both");
// }

// 9. Write a function using arrow syntax to return the square of a number(0.5 Grade)
// • Input Example: 5
// • Output Example: 25

// let square = (number) => {
//     console.log(number ** 2);
// }
// square(5)

// 10. Write a function that destructure an object to extract values and returns a formatted string. (0.5 Grade)
// • Input Example: const person = { name: 'John', age: 25 }
// • Output Example: 'John is 25 years old'

// const person = { name: 'John', age: 25 }
// function destructure(obj){
// console.log(`${obj.name} is ${obj.age} years old`);
// }
// destructure(person)

// 11. Write a function that accepts multiple parameters(two or more) and returns their sum. (0.5 Grade)
// • Input Example: 1, 2, 3, 4, 5
// • Output Example: 15

// function summ(...params) {
//     let sum = 0
//     for (let index = 0; index < params.length; index++) {
//         sum += params[index]
//     }
//     console.log(sum);
// }
// summ(1, 2, 3, 4, 5)

// 12. Write a function that returns a promise which resolves after 3 seconds with a 'Success' message. (0.5 Grade)
// • Output Example: “Success”

// function delay() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve("Success")
//         }, 3000)
//     })
// }
// delay().then((mes) => {
//     console.log(mes)
// })

// 13. Write a function to find the largest number in an array. (0.5 Grade)
// •  Input Example: [1, 3, 7, 2, 4]
// • Output Example: 7

////-----------------------------Solution 1----------------------------------//
// const numbers = [1, 3, 7, 2, 4];
// const maxNumber = Math.max(...numbers);
// console.log(maxNumber);

////-----------------------------Solution 2----------------------------------//
// let arr = [1, 3, 7, 2, 4]
// function largestNumber(array) {
//     let Max = array[0]
//     for (let i = 0; i < array.length; i++) {
//         for (let z = 0; z < array.length; z++) {
//             if (array[z] > Max) {
//                 Max = array[z]
//             }
//         }
//     }
//     console.log(Max)
// }
// largestNumber(arr)

// 14. Write a function that takes an object and returns an array containing only its keys. (0.5 Grade)
// •  Input Example: name: "John", age: 30}
// •  Output Example: ["name", "age"]

// //-----------------------------Solution 1----------------------------------//
// let objj = { name: "John", age: 30 }
// function keyObject(obj) {
//     let keysArray = []
// for (let i = 0; i < Object.keys(obj).length; i++) {
//     keysArray.push(Object.keys(obj)[i])
//     }
//     console.log(keysArray)
// }
// keyObject(objj)

// //-----------------------------Solution 2----------------------------------//
// const obj = { name: "John", age: 30 }
// const arrKeys = Object.keys(obj)
// console.log(arrKeys);



// 15. Write a function that splits a string into an array of words based on spaces. (0.5 Grade)
// • Input: "The quick brown fox"
// • Output: ["The", "quick", "brown", "fox"]

// let string = "The quick brown fox"
// function splitArray(str) {
//     let arr = str.split(" ")
//     console.log(arr)
// }
// splitArray(string)
