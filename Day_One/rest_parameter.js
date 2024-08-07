function rest(...numbers) {
  let sum = 0;
  for (const number of numbers) {
    sum += number;
  }
  return sum;
}

console.log(`Sum 1: ${rest(1, 2, 3, 4, 5)}`); // 15

// truyền 1 mảng làm đối số cho hàm có tham số rest
let arr = [1, 2, 3, 4, 5];
// Sử dụng toán tử spread để truyền mảng làm đối số cho hàm có tham số rest
console.log(`Sum 2: ${rest(...arr)}`);

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arr3 = [7, 8, 9];
const arr4 = [...arr1, ...arr2, ...arr3];
console.log(arr4);