var people = [
  { name: "Jack", age: 50 },
  { name: "Michael", age: 9 },
  { name: "John", age: 40 },
  { name: "Ann", age: 19 },
  { name: "Elisabeth", age: 16 },
];

// Find the first person in the people array who is a teenager (age >= 10 and age <= 20)
var firstTeenager = people.find(
  (person) => person.age >= 10 && person.age <= 20
);
console.log(firstTeenager); // { name: 'Ann', age: 19 }

// Find all people in the people array who are teenagers (age >=10 and age <=20)
var allTeenagers = people.filter(
  (person) => person.age >= 10 && person.age <= 20
);
console.log(allTeenagers); // [ { name: 'Ann', age: 19 }, { name: 'Elisabeth', age: 16 } ]

// Check if every person in the people array is a teenager (age >=10 and age <=20), which should return true or false
var allTeenagersCheck = people.every(
  (person) => person.age >= 10 && person.age <= 20
);
console.log(allTeenagersCheck); // false

// Check if any person in the people array is a teenager (age >=10 and age <=20), which should return true or false
var anyTeenagerCheck = people.some(
  (person) => person.age >= 10 && person.age <= 20
);
console.log(anyTeenagerCheck); // true
