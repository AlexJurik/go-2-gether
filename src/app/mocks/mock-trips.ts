import { Trip } from '../models/trip';
import { DateTime } from 'luxon';

export const TRIPS: Trip[] = [
  {
    id: 1,
    userId: 1,
    name: 'Work',
    radius: 3000,
    point: {
      start: {
        center:
          [21.2183436, 48.7169856],
        place_name: 'Wuppertálska, 040 23 Košice, Košický kraj, Slovensko',
        id: 'address.8018556228298610'
      },
      end: {
        center: [21.2613315, 48.6996548],
        place_name: 'Južná Trieda, 040 01 Košice, Košický kraj, Slovensko',
        id: 'address.6498702996247400'
      }
    },
    timeWindow: {start: DateTime.now().set({'hour': 8, 'minute': 0}), end: DateTime.now().set({'hour': 9, 'minute': 0})}
  },
  {
    id: 1,
    userId: 1,
    name: 'Lunch',
    radius: 3000,
    point: {
      start: {
        center: [21.2613315, 48.6996548],
        place_name: 'Južná Trieda, 040 01 Košice, Košický kraj, Slovensko',
        id: 'address.6498702996247400'
      },
      end: {
        center: [21.2578017, 48.7220588],
        place_name: 'Hlavná, 040 01 Košice, Košický kraj, Slovensko',
        id: 'address.1511016409254546'
      }
    },
    timeWindow: {
      start: DateTime.now().set({'hour': 12, 'minute': 0}),
      end: DateTime.now().set({'hour': 12, 'minute': 30})
    }
  },
  {
    id: 2,
    userId: 2,
    name: 'Coworking',
    radius: 1000,
    point: {
      start: {
        center:
          [21.2166434, 48.7190322],
        place_name: 'Titogradská, 040 23 Košice, Košický kraj, Slovensko',
        id: 'address.3374191653842648'
      }, end: {
        center: [21.2613315, 48.6996548],
        place_name: 'Južná Trieda, 040 01 Košice, Košický kraj, Slovensko',
        id: 'address.6498702996247400'
      }
    },
    timeWindow: {
      start: DateTime.now().set({'hour': 8, 'minute': 30}),
      end: DateTime.now().set({'hour': 9, 'minute': 0})
    }
  }
];
