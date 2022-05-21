import { Role } from '@swiped-in/shared';

export const Hirer = {
  type: Role.Hirer.toString(),
  name: 'Microsoft',
  email: 'email_hirer@email.com',
  webSite: 'webSite.com',
  stack: ['Node.js', 'JS', 'TS', 'React', 'HTML', 'CSS'],
  salary: 100000,
  socials: {
    instagram: '',
    twitter: '',
    gitHub: '',
    linkedIn: '',
  },
};

export const Employee = {
  type: Role.Employee.toString(),
  name: {
    firstName: 'FirstName',
    lastName: 'LastName',
  },
  age: 21,
  email: 'email_employee@email.com',
  webSite: 'webSite.com',
  experience: {
    time: 2,
    companies: ['Apple', 'Google'],
    stack: ['Node.js', 'JS', 'TS', 'React', 'HTML', 'CSS'],
  },
  socials: {
    instagram: '',
    twitter: '',
    gitHub: '',
    linkedIn: '',
  },
};
