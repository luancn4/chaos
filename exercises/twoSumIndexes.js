// must return a array of indexes of the two numbers that add up to the target

const getIndexes = (arr, target) => {
  const map = new Map();

  for (let i = 0; i < arr.length; i++) {
    // so, if the map has the current number, it means that we have already seen a number that can be added to the current number to get the target
    // for example:
    // if the target is 9 and the current number is 2, we will store in the map that we need a number 7 to get the target
    // so, if we see the number 7 later, we will know that we have already seen a number that can be added to 7 to get the target, which is 2
    // this is a O(n) solution, because we are iterating through the array once and doing constant time operations for each element 
    // map: { 7: 0, -2: 1, 0: 2, 2: 3, -9: 4 }
    if (map.has(arr[i])) {
      return [map.get(arr[i]), i];
    }

    map.set(target - arr[i], i);
  }
};

console.log(getIndexes([2, 11, 9, 7, 18], 9));
