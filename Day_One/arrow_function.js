// Truyền thống

function Sum(a, b){
    return a +b;
}

// arrow function 

const Sum1 = (a, b) => a +b;

const Sum2 = (a, b) => {
    return a +b;
}

// Goi Ham

console.log("Sum 10 + 20 = "+Sum(10, 20));

console.log("Sum 5 + 10 = "+Sum1(5, 10));

console.log("Sum 20 + 30 = "+Sum2(20, 30));