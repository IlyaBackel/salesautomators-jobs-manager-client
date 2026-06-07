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
        email: 'ilya.batskell@gmail.com',
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
        email: 'ilya.batskell@bk.ru',
        address: 'пр-т Мира, 25',
        city: 'Москва',
        problem: 'Засорился унитаз',
        status: 'New Lead',
    },
    {
        id: 3,
        firstName: 'Алексей',
        lastName: 'Кузнецов',
        phone: '+7 915 345-67-89',
        email: 'ilya.batskell@bk.ru',
        address: 'ул. Арбат, 15',
        city: 'Москва',
        problem: 'Нет горячей воды во всём доме',
        status: 'New Lead',
    },
    {
        id: 4,
        firstName: 'Елена',
        lastName: 'Михайлова',
        phone: '+7 925 456-78-90',
        email: 'ilya.batskell@bk.ru',
        address: 'Ленинградский пр-т, 50',
        city: 'Москва',
        problem: 'Сломалась стиральная машина, подтекает вода',
        status: 'New Lead',
    },
    {
        id: 5,
        firstName: 'Дмитрий',
        lastName: 'Соколов',
        phone: '+7 909 567-89-01',
        email: 'ilya.batskell@bk.ru',
        address: 'ул. Покровка, 7',
        city: 'Москва',
        problem: 'Плохой напор воды из крана на кухне',
        status: 'New Lead',
    },
    {
        id: 6,
        firstName: 'Анна',
        lastName: 'Иванова',
        phone: '+7 999 678-90-12',
        email: 'ilya.batskell@bk.ru',
        address: 'Кутузовский пр-т, 32',
        city: 'Москва',
        problem: 'Радиатор отопления течёт в спальне',
        status: 'New Lead',
    },
];