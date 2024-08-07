// block scope let, const keyword 

function ex1(){
    let age = 20;
    if(age >= 18){
        let dob = "20/10/2003";
        let name = "David";
        console.log(`Name: ${name}, Age: ${age}, Date of birth: ${dob}`);
    }
    // console.log(`Name: ${name}, Age: ${age}, Date of birth: ${dob}`);
}

ex1();