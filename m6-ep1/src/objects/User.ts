interface IUser {
    id: number; // Or number if your IDs are numbers
    email: string;
    role: 'admin' | 'user'; // Use a union type for roles
    name: string; // Make optional properties explicit
    // ... other properties
  }

export class User implements IUser {
  id: number;
  email: string;
  role: 'admin' | 'user';
  name: string; 

  /*
  constructor(user: IUser) {
    this.id = user.id;
    this.email = user.email;
    this.role = user.role;
    this.name = user.name;

  }
  */
 
  constructor(id: number, email: string, role: 'admin' | 'user', name: string) {
    this.id = id;
    this.email = email;
    this.role = role;
    this.name = name;
  }

  getId(): number {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }

  getRole(): string {
    return this.role;
  }

  getName(): string {
    return this.name;
  }

}