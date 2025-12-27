// https://leetcode.com/problems/kth-missing-positive-number/description/

function findKthPositive(arr, k) {
    let missingCount = 0;
    let current = 1;
    let index = 0;

    while (missingCount < k) {
        if (index < arr.length && arr[index] === current) {
            index++;
        } else {
            missingCount++;
            if (missingCount === k) return current;
        }
        current++;
    }
}
console.log(findKthPositive([2, 3, 4, 7, 11], 5)); 