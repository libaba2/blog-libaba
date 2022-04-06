// interface Person {
//   firstName: string;
//   lastName: string;
// }
// function greeter(person: Person) {
//   return "Hello, " + person.firstName + " " + person.lastName;
// }
// let user: Person = { firstName: "Jane", lastName: "User" };
// console.log(greeter(user));
// class Student {
//     fullName: string;
//     firstName: string;
//     lastName: string;
//     constructor( firstName,  middleInitial,  lastName) {
//         this.fullName = firstName + " " + middleInitial + " " + lastName;
//         this.firstName = firstName;
//         this.lastName = lastName;
//     }
// }
// interface Person {
//     firstName: string;
//     lastName: string;
// }
// function greeter(person : Person) {
//     console.log(person);
//     return "Hello, " + person.firstName + " " + person.lastName;
// }
// let user = new Student("Jane", "M.", "User");
// console.log(greeter(user));
// enum Direction {
//     NORTH,
//     SOUTH,
//     EAST,
//     WEST,
//   }
//   let dir: Direction = Direction.WEST;
//   console.log(dir);
var x;
initialize();
// Variable 'x' is used before being assigned.(2454)
console.log(2 * x); // Error
function initialize() {
    x = 10;
}
