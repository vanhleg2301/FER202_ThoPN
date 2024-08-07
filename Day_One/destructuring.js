const student = {
    firstName: 'Duong',
    lastName: 'Hoang Tuan',
    age: "20"
}

// Array in JS <=> Java, C#
const score = [10, 9 ,8.5];

// Destructuring Object
const {firstName: f, lastName: l, age} = student;
console.log(`Name: ${f} ${l} - Age: ${age}`);

// Destructuring Array
const [a, b, c] = score;
console.log(`Score: ${a}, ${b}, ${c}`);


// truyền đối tượng cho function -> Áp dụng cho việc truyền dữ liệu cho component trong react

function printStudent({firstName, lastName, age}){
    console.log(`From function: Name: ${firstName} ${lastName} - Age: ${age}`);
}

printStudent(student);