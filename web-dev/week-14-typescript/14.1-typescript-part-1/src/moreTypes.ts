interface Address {
  pincode: number;
  city?: string;
  state?: string;
}

interface User {
  firstname: string;
  age: number;
  address?: Address;
}

class UserClass {
  #firstname: string;
  age: number;

  constructor(firstname: string, age: number) {
    this.#firstname = firstname;
    this.age = age;
  }

  getInfo(): string {
    return `Hi I am ${this.#firstname}, and am ${this.age} years old`;
  }
}

const user = new UserClass("keshav", 25);
console.log(user.getInfo());
