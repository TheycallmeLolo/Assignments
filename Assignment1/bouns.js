// // https://leetcode.com/problems/counter-ii/description/?source=submission-ac
// let createCounter = function (init) {
//     let count = init;
//     function increment() {
//         return ++count;
//     }
//     function decrement() {
//         return --count;
//     }
//     function reset() {
//         count = init;
//         return count;
//     }
//     return { increment, decrement, reset };
// }
// let counter = createCounter(5);
// console.log(counter.increment());
// console.log(counter.decrement());
// console.log(counter.reset()); 