// Create Promises
function getToDoList() {
    // Ham  fetch() trả về 1 đối tượng Promise(onFullFilled, onRejected)
    fetch("https://jsonplaceholder.typicode.com/users/1/todos")
    .then(response => response.json())
    .then(data => console.log(data.map(item => item.title)))
    .catch(error => console.log(error));
}

getToDoList();