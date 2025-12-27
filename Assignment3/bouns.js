// https://leetcode.com/problems/majority-element/description/?envType=study-plan-v2&envId=top-interview-150

var majorityElement = function (nums) {
    let candidate = null;
    let count = 0;
    for (const num of nums) {
        if (count === 0) {
            candidate = num;
            count = 1;
        } else if (num === candidate) {
            count++;
        } else {
            count--;
        }
    }
    return candidate;
};

// var majorityElement = function (array) {
//     let map = new Map();

//     for (let num of array) {
//         map.set(num, (map.get(num) || 0) + 1);
//     }

//     let mostCommon = null;
//     let highestCount = 0;

//     for (let [num, count] of map) {
//         if (count > highestCount) {
//             highestCount = count;
//             mostCommon = num;
//         }
//     }
//     return mostCommon

// }