export interface Lead {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  problem: string;
  status: 'New Lead';
}

export const mockLeads: Lead[] = [
  {
    id: 1,
    firstName: 'Иван',
    lastName: 'Петров',
    phone: '+7 999 123-45-67',
    email: 'ivan@example.com',
    address: 'ул. Тверская, 10',
    city: 'Москва',
    problem: 'Течёт труба под раковиной',
    status: 'New Lead',
  },
  {
    id: 2,
    firstName: 'Мария',
    lastName: 'Сидорова',
    phone: '+7 916 234-56-78',
    email: 'maria@example.com',
    address: 'пр-т Мира, 25',
    city: 'Москва',
    problem: 'Засорился унитаз',
    status: 'New Lead',
  },
  // Добавь ещё 3-6 лидов аналогично
];