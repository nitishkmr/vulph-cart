import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@vulph.com',
    password: bcrypt.hashSync('qwerty', 10),
    isAdmin: true,
  },
  {
    name: 'Bruce Wayne',
    email: 'bruce@email.com',
    password: bcrypt.hashSync('qwerty', 10),
  },
  {
    name: 'Tony Stark',
    email: 'tony69@vulph.com',
    password: bcrypt.hashSync('qwerty', 10),
  },
];

export default users;
