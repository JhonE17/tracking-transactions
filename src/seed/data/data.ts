interface SeedData {
    users: SeedUser[];
  }
  

interface SeedUser {
  email: string;
  name: string;
  lastName: string;
  password: string;
  roles: string[];
}

export const initialData: SeedData = {
  users: [
    {
      email: 'carlos@test.com',
      name: 'Carlos',
      lastName: 'Putumayo',
      password: 'Je12345678.',
      roles: ['driver'],
    },
    {
      email: 'darwin@test.com',
      name: 'Darwin',
      lastName: 'Serna',
      password: 'Je12345678.',
      roles: ['rider'],
    },
    {
      email: 'stiwar@test.com',
      name: 'Stiwar',
      lastName: 'Asprilla',
      password: 'Je12345678.',
      roles: ['driver'],
    },
    {
      email: 'miguel@test.com',
      name: 'Miguel',
      lastName: 'Casas',
      password: 'Je12345678.',
      roles: ['rider'],
    },
    {
      email: 'jackson@test.com',
      name: 'Jacson',
      lastName: 'Jimenez',
      password: 'Je12345678.',
      roles: ['driver'],
    },
  ],
};
