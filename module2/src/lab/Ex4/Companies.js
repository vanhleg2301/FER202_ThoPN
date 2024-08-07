import React from "react";
import { companies } from "./data/companies";
import { ages } from "./data/ages";
import { person } from "./data/person";

export default function Companies() {
  //Print the name of each company that started after 1987
  // const filteredCompanies = companies.filter(company => company.start > 1987);

  //Get only the companies that have category Retail, increment their start by 1 and append in the DOM a div that has the name, the category, the start and the end in paragraphs elements
  // const companiesRetail = companies.filter(company => company.category === 'Retail');

  // Sort the companies based on their end date in ascending order
  // const sortedCompaniesByEndDate = [...companies].sort((a, b) => a.end - b.end);
  // console.log("Companies sorted by end date:", sortedCompaniesByEndDate);

  // Sort the ages array in descending order
  const sortedAgesDescending = [...ages].sort((a, b) => b - a);
  console.log("Ages sorted in descending order:", sortedAgesDescending);

  // 1. Sum of ages
  const totalAges = ages.reduce((total, age) => total + age, 0);
  console.log("Total ages:", totalAges);

  // 2. New object with name and category from companies[0]
  const { name, category } = companies[0];
  const newObject = {
    name,
    category,
    print() {
      console.log(this.name);
    },
  };
  newObject.print();

  // 3. Sum numbers
  function sumNumbers(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
  }
  console.log(sumNumbers(1, 2, 3, 4)); // Output: 10

  // 4. Add to array
  function addToArray(...args) {
    const result = [];
    args.forEach((arg) => {
      if (Array.isArray(arg)) {
        result.push(...arg);
      } else {
        result.push(arg);
      }
    });
    return result;
  }
  console.log(addToArray(1, 2, [3, 4], 5, [6, 7])); // Output: [1, 2, 3, 4, 5, 6, 7]

  // 5. Destructure street
  const {
    address: { street },
  } = person;
  console.log(street); // Output: Lalaland 12

  // 6. Counter function
  function createCounter() {
    let count = 0;
    return function () {
      return count++;
    };
  }
  const counter = createCounter();
  console.log(counter()); // Output: 0
  console.log(counter()); // Output: 1
  console.log(counter()); // Output: 2

  // 7. Parse query parameters
  function parseQueryParams(url) {
    const queryParams = {};
    const urlParts = url.split("?");

    if (urlParts.length > 1) {
      const params = urlParts[1].split("&");
      params.forEach((param) => {
        const [key, value] = param.split("=");
        queryParams[key] = decodeURIComponent(value);
      });
    }

    return queryParams;
  }
  const url = "http://example.com/page?name=John&age=30";
  console.log(parseQueryParams(url)); // Output: { name: "John", age: "30" }

  // 8. 5.Promises
  function getRandomNumber() {
    return new Promise((resolve, reject) => {
      // Generate a random number between 1 and 10
      const number = Math.floor(Math.random() * 10) + 1;

      // Check if the number is greater than 5
      if (number > 5) {
        resolve(number);
      } else {
        reject("Error: Number is less than or equal to 5");
      }
    });
  }

  // Usage example
  getRandomNumber()
    .then((result) => {
      console.log(`Random number greater than 5: ${result}`);
    })
    .catch((error) => {
      console.log(error);
    });

    // 9.sort category abc
    const sortedCompaniesByCategory = [...companies].sort((a, b) => a.category.localeCompare(b.category));
    console.log("Companies sorted by category:", sortedCompaniesByCategory);
  return (
    <>
      <h1 className='text-center'>Companies</h1>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Category</th>
            <th>Start</th>
            <th>End</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{company.name}</td>
              <td>{company.category}</td>
              <td>{company.start}</td>
              <td>{company.end}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
