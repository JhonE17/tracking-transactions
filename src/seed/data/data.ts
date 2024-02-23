interface SeedData {
  users: SeedUser[];
}

interface SeedUser {
  email: string;
  name: string;
  lastName: string;
  password: string;
  roles: string;
  lng: number;
  lat: number;
  id_token_card?: string;
}

export const initialData: SeedData = {
  users: [
    {
      email: 'carlos@test.com',
      name: 'Carlos',
      lastName: 'Putumayo',
      password: 'Je12345678.',
      roles: 'driver',
      lng: -75.59774249978858,
      lat: 6.2429971752273286,
      id_token_card: '',
    },
    {
      email: 'darwin@test.com',
      name: 'Darwin',
      lastName: 'Serna',
      password: 'Je12345678.',
      roles: 'rider',
      lng: -75.58829401825149,
      lat: 6.248469149617193,
      id_token_card: '',
    },
    {
      email: 'stiwar@test.com',
      name: 'Stiwar',
      lastName: 'Asprilla',
      password: 'Je12345678.',
      roles: 'driver',
      lng: -75.59655857669296,
      lat: 6.236367761428345,
      id_token_card: '',
    },
    {
      email: 'miguel@test.com',
      name: 'Miguel',
      lastName: 'Casas',
      password: 'Je12345678.',
      roles: 'rider',
      lng: -75.56389492601065,
      lat: 6.258002694380637,
      id_token_card: '',
    },
    {
      email: 'jackson@test.com',
      name: 'Jackson',
      lastName: 'Jimenez',
      password: 'Je12345678.',
      roles: 'driver',
      lng: -75.58997116272583,
      lat: 6.193107888722056,
      id_token_card: '',
    },
  ],
};
