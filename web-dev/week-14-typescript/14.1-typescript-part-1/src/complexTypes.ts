interface User {
  firstname: string;
  lastname: string;
  age: number;
}

function greetings(person: User): void {
  console.log(`hello ${person.firstname}`);
}

greetings({
  firstname: "keshav",
  lastname: "kaushik",
  age: 24,
});

type StringOrNumber = string | number;

type Fwaeh = string | number;

interface Manager {
  name: string;
  age: number;
}

interface Employee {
  name: string;
  department: string;
}

type TeamLead = Manager & Employee;

type deathrow = {
  rapper: string;
  age: number;
};

const obj = {
  rapper: "Snoop Dogg",
  age: 44,
  albums: 10,
};

const snoop: deathrow = obj;
