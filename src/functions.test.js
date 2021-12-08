import { createEvent } from './functions'

const realTime = Date.now();
const today = new Date(realTime);
today.setDate(today.getDate() - 1);// Se da formato a la fecha actual para quitar segundos
const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
const weekday = "mon";
const week = 1;
const openHour = 8;
const closeHour = 14;
const result = createEvent(weekday, week, openHour, closeHour);

test('Validation a event title and content basic', () => {
    expect(result.title).toBe("[SOFKA U] Meeting Room")
    expect(result.description).toBe("Mentoring and Practice")
    expect(result.duration).toEqual([6, 'hour']);
});

test('Validation start date', () => {
    expect(result.start).toStrictEqual(today);
});

test('Validation date', () => {
    const start = new Date(today).toLocaleDateString('es-ES', options)
    expect(result.date).toStrictEqual(start)
});


describe('Validation illegal arguments', () => {
    test('(closeHour - openHour) < 0', () => {
        const error = () => {
            createEvent(weekday, week, 14, 8);
        };
        expect(error).toThrow(Error);
    });

    test('week < 0', () => {
        const error = () => {
            createEvent(weekday, -2, openHour, closeHour);
        };
        expect(error).toThrow(Error);
    });

    test('weekday = null', () => {
        const error = () => {
            createEvent(null, 1, openHour, closeHour);
        };
        expect(error).toThrow(Error);
    })
});


test('create an event list of at least 10 events', () => {
    const eventList = [
        {
            weekday: 'mon',
            week: 2,
            openHour: 8,
            closeHour: 17
        },
        {
            weekday: 'tue',
            week: 4,
            openHour: 7,
            closeHour: 17
        },
        {
            weekday: 'wed',
            week: 5,
            openHour: 9,
            closeHour: 14
        },
        {
            weekday: 'thu',
            week: 8,
            openHour: 7,
            closeHour: 12
        },
        {
            weekday: 'fri',
            week: 10,
            openHour: 8,
            closeHour: 17
        },
        {
            weekday: 'sat',
            week: 7,
            openHour: 7,
            closeHour: 18
        },
        {
            weekday: 'sun',
            week: 6,
            openHour: 10,
            closeHour: 19
        },
        {
            weekday: 'mon',
            week: 5,
            openHour: 9,
            closeHour: 16
        },
        {
            weekday: 'tue',
            week: 3,
            openHour: 9,
            closeHour: 15
        },
        {
            weekday: 'wed',
            week: 2,
            openHour: 8,
            closeHour: 17
        },
        {
            weekday: 'fri',
            week: 4,
            openHour: 7,
            closeHour: 18
        }
    ]

    eventList.map(data => {
        const duration = [data.closeHour - data.openHour, "hour"]
        const result = createEvent(data.weekday, data.week, data.openHour, data.closeHour)
        expect(result.title).toBe("[SOFKA U] Meeting Room");
        expect(result.description).toBe("Mentoring and Practice");
        expect(result.duration).toEqual(duration);
    })
});