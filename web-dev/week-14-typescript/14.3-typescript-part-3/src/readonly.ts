interface Config {
  readonly endpoint: string;
  readonly apiKey: string;
}

interface Employee {
  empID: number;
  firstname: string;
  experience: number;
}

const config: Config = {
  endpoint: "/admin",
  apiKey: "eqaiy56sgq",
};

const employee: Readonly<Employee> = {
  empID: 2141664,
  firstname: "keshav",
  experience: 3,
};

console.log(config, employee);
