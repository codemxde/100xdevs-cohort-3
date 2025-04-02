interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

type UpdateUser = Pick<User, "name" | "email">;
type PartialUpdate = Partial<UpdateUser>;

const displayUserProfile = (user: UpdateUser) => {
  console.log(`Updating ${user.name} and ${user.email}`);
};

const partiallyUpdateUser = (user: PartialUpdate) => {
  console.log(`Will update:`, user);
};

displayUserProfile({
  name: "keshav",
  email: "codemxde23@gmail.com",
});

partiallyUpdateUser({ email: "hello@test.com" });
