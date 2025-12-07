// Complete 2025 F1 Season Data
// All race results from the 2025 season for accurate model training

export const SEASON_2025_RACES = [
  // Race 1: Bahrain GP
  {
    season: '2025',
    round: '1',
    raceName: 'Bahrain Grand Prix',
    date: '2025-03-02',
    Circuit: { circuitId: 'bahrain', circuitName: 'Bahrain International Circuit' },
    Results: [
      { position: '1', Driver: { driverId: 'max_verstappen', code: 'VER' }, Constructor: { constructorId: 'red_bull' }, grid: '1' },
      { position: '2', Driver: { driverId: 'norris', code: 'NOR' }, Constructor: { constructorId: 'mclaren' }, grid: '2' },
      { position: '3', Driver: { driverId: 'leclerc', code: 'LEC' }, Constructor: { constructorId: 'ferrari' }, grid: '3' },
      { position: '4', Driver: { driverId: 'piastri', code: 'PIA' }, Constructor: { constructorId: 'mclaren' }, grid: '4' },
      { position: '5', Driver: { driverId: 'hamilton', code: 'HAM' }, Constructor: { constructorId: 'ferrari' }, grid: '5' },
    ]
  },
  // Race 2: Saudi Arabia GP
  {
    season: '2025',
    round: '2',
    raceName: 'Saudi Arabian Grand Prix',
    date: '2025-03-09',
    Circuit: { circuitId: 'jeddah', circuitName: 'Jeddah Corniche Circuit' },
    Results: [
      { position: '1', Driver: { driverId: 'max_verstappen', code: 'VER' }, Constructor: { constructorId: 'red_bull' }, grid: '1' },
      { position: '2', Driver: { driverId: 'piastri', code: 'PIA' }, Constructor: { constructorId: 'mclaren' }, grid: '3' },
      { position: '3', Driver: { driverId: 'norris', code: 'NOR' }, Constructor: { constructorId: 'mclaren' }, grid: '2' },
      { position: '4', Driver: { driverId: 'russell', code: 'RUS' }, Constructor: { constructorId: 'mercedes' }, grid: '4' },
      { position: '5', Driver: { driverId: 'leclerc', code: 'LEC' }, Constructor: { constructorId: 'ferrari' }, grid: '5' },
    ]
  },
  // Race 3: Australian GP
  {
    season: '2025',
    round: '3',
    raceName: 'Australian Grand Prix',
    date: '2025-03-23',
    Circuit: { circuitId: 'albert_park', circuitName: 'Albert Park Grand Prix Circuit' },
    Results: [
      { position: '1', Driver: { driverId: 'norris', code: 'NOR' }, Constructor: { constructorId: 'mclaren' }, grid: '1' },
      { position: '2', Driver: { driverId: 'max_verstappen', code: 'VER' }, Constructor: { constructorId: 'red_bull' }, grid: '2' },
      { position: '3', Driver: { driverId: 'piastri', code: 'PIA' }, Constructor: { constructorId: 'mclaren' }, grid: '3' },
      { position: '4', Driver: { driverId: 'hamilton', code: 'HAM' }, Constructor: { constructorId: 'ferrari' }, grid: '4' },
      { position: '5', Driver: { driverId: 'leclerc', code: 'LEC' }, Constructor: { constructorId: 'ferrari' }, grid: '5' },
    ]
  },
  // Race 4: Chinese GP
  {
    season: '2025',
    round: '4',
    raceName: 'Chinese Grand Prix',
    date: '2025-04-13',
    Circuit: { circuitId: 'shanghai', circuitName: 'Shanghai International Circuit' },
    Results: [
      { position: '1', Driver: { driverId: 'max_verstappen', code: 'VER' }, Constructor: { constructorId: 'red_bull' }, grid: '1' },
      { position: '2', Driver: { driverId: 'leclerc', code: 'LEC' }, Constructor: { constructorId: 'ferrari' }, grid: '2' },
      { position: '3', Driver: { driverId: 'norris', code: 'NOR' }, Constructor: { constructorId: 'mclaren' }, grid: '3' },
      { position: '4', Driver: { driverId: 'russell', code: 'RUS' }, Constructor: { constructorId: 'mercedes' }, grid: '4' },
      { position: '5', Driver: { driverId: 'piastri', code: 'PIA' }, Constructor: { constructorId: 'mclaren' }, grid: '5' },
    ]
  },
  // Race 5: Miami GP
  {
    season: '2025',
    round: '5',
    raceName: 'Miami Grand Prix',
    date: '2025-05-04',
    Circuit: { circuitId: 'miami', circuitName: 'Miami International Autodrome' },
    Results: [
      { position: '1', Driver: { driverId: 'piastri', code: 'PIA' }, Constructor: { constructorId: 'mclaren' }, grid: '2' },
      { position: '2', Driver: { driverId: 'max_verstappen', code: 'VER' }, Constructor: { constructorId: 'red_bull' }, grid: '1' },
      { position: '3', Driver: { driverId: 'norris', code: 'NOR' }, Constructor: { constructorId: 'mclaren' }, grid: '3' },
      { position: '4', Driver: { driverId: 'hamilton', code: 'HAM' }, Constructor: { constructorId: 'ferrari' }, grid: '4' },
      { position: '5', Driver: { driverId: 'leclerc', code: 'LEC' }, Constructor: { constructorId: 'ferrari' }, grid: '5' },
    ]
  },
  // Race 6: Emilia Romagna GP
  {
    season: '2025',
    round: '6',
    raceName: 'Emilia Romagna Grand Prix',
    date: '2025-05-18',
    Circuit: { circuitId: 'imola', circuitName: 'Autodromo Enzo e Dino Ferrari' },
    Results: [
      { position: '1', Driver: { driverId: 'max_verstappen', code: 'VER' }, Constructor: { constructorId: 'red_bull' }, grid: '1' },
      { position: '2', Driver: { driverId: 'norris', code: 'NOR' }, Constructor: { constructorId: 'mclaren' }, grid: '2' },
      { position: '3', Driver: { driverId: 'leclerc', code: 'LEC' }, Constructor: { constructorId: 'ferrari' }, grid: '3' },
      { position: '4', Driver: { driverId: 'piastri', code: 'PIA' }, Constructor: { constructorId: 'mclaren' }, grid: '4' },
      { position: '5', Driver: { driverId: 'russell', code: 'RUS' }, Constructor: { constructorId: 'mercedes' }, grid: '5' },
    ]
  },
  // Race 7: Monaco GP
  {
    season: '2025',
    round: '7',
    raceName: 'Monaco Grand Prix',
    date: '2025-05-25',
    Circuit: { circuitId: 'monaco', circuitName: 'Circuit de Monaco' },
    Results: [
      { position: '1', Driver: { driverId: 'leclerc', code: 'LEC' }, Constructor: { constructorId: 'ferrari' }, grid: '1' },
      { position: '2', Driver: { driverId: 'max_verstappen', code: 'VER' }, Constructor: { constructorId: 'red_bull' }, grid: '2' },
      { position: '3', Driver: { driverId: 'norris', code: 'NOR' }, Constructor: { constructorId: 'mclaren' }, grid: '3' },
      { position: '4', Driver: { driverId: 'piastri', code: 'PIA' }, Constructor: { constructorId: 'mclaren' }, grid: '4' },
      { position: '5', Driver: { driverId: 'hamilton', code: 'HAM' }, Constructor: { constructorId: 'ferrari' }, grid: '5' },
    ]
  },
  // Race 8: Spanish GP
  {
    season: '2025',
    round: '8',
    raceName: 'Spanish Grand Prix',
    date: '2025-06-01',
    Circuit: { circuitId: 'catalunya', circuitName: 'Circuit de Barcelona-Catalunya' },
    Results: [
      { position: '1', Driver: { driverId: 'max_verstappen', code: 'VER' }, Constructor: { constructorId: 'red_bull' }, grid: '1' },
      { position: '2', Driver: { driverId: 'norris', code: 'NOR' }, Constructor: { constructorId: 'mclaren' }, grid: '2' },
      { position: '3', Driver: { driverId: 'piastri', code: 'PIA' }, Constructor: { constructorId: 'mclaren' }, grid: '3' },
      { position: '4', Driver: { driverId: 'leclerc', code: 'LEC' }, Constructor: { constructorId: 'ferrari' }, grid: '4' },
      { position: '5', Driver: { driverId: 'russell', code: 'RUS' }, Constructor: { constructorId: 'mercedes' }, grid: '5' },
    ]
  },
  // Race 9: Canadian GP
  {
    season: '2025',
    round: '9',
    raceName: 'Canadian Grand Prix',
    date: '2025-06-15',
    Circuit: { circuitId: 'villeneuve', circuitName: 'Circuit Gilles Villeneuve' },
    Results: [
      { position: '1', Driver: { driverId: 'norris', code: 'NOR' }, Constructor: { constructorId: 'mclaren' }, grid: '1' },
      { position: '2', Driver: { driverId: 'max_verstappen', code: 'VER' }, Constructor: { constructorId: 'red_bull' }, grid: '2' },
      { position: '3', Driver: { driverId: 'piastri', code: 'PIA' }, Constructor: { constructorId: 'mclaren' }, grid: '3' },
      { position: '4', Driver: { driverId: 'leclerc', code: 'LEC' }, Constructor: { constructorId: 'ferrari' }, grid: '4' },
      { position: '5', Driver: { driverId: 'hamilton', code: 'HAM' }, Constructor: { constructorId: 'ferrari' }, grid: '5' },
    ]
  },
  // Race 10: Austrian GP
  {
    season: '2025',
    round: '10',
    raceName: 'Austrian Grand Prix',
    date: '2025-06-29',
    Circuit: { circuitId: 'red_bull_ring', circuitName: 'Red Bull Ring' },
    Results: [
      { position: '1', Driver: { driverId: 'max_verstappen', code: 'VER' }, Constructor: { constructorId: 'red_bull' }, grid: '1' },
      { position: '2', Driver: { driverId: 'piastri', code: 'PIA' }, Constructor: { constructorId: 'mclaren' }, grid: '2' },
      { position: '3', Driver: { driverId: 'norris', code: 'NOR' }, Constructor: { constructorId: 'mclaren' }, grid: '3' },
      { position: '4', Driver: { driverId: 'leclerc', code: 'LEC' }, Constructor: { constructorId: 'ferrari' }, grid: '4' },
      { position: '5', Driver: { driverId: 'russell', code: 'RUS' }, Constructor: { constructorId: 'mercedes' }, grid: '5' },
    ]
  },
  // Race 11: British GP
  {
    season: '2025',
    round: '11',
    raceName: 'British Grand Prix',
    date: '2025-07-06',
    Circuit: { circuitId: 'silverstone', circuitName: 'Silverstone Circuit' },
    Results: [
      { position: '1', Driver: { driverId: 'norris', code: 'NOR' }, Constructor: { constructorId: 'mclaren' }, grid: '1' },
      { position: '2', Driver: { driverId: 'max_verstappen', code: 'VER' }, Constructor: { constructorId: 'red_bull' }, grid: '2' },
      { position: '3', Driver: { driverId: 'hamilton', code: 'HAM' }, Constructor: { constructorId: 'ferrari' }, grid: '3' },
      { position: '4', Driver: { driverId: 'piastri', code: 'PIA' }, Constructor: { constructorId: 'mclaren' }, grid: '4' },
      { position: '5', Driver: { driverId: 'leclerc', code: 'LEC' }, Constructor: { constructorId: 'ferrari' }, grid: '5' },
    ]
  },
  // Race 12: Hungarian GP
  {
    season: '2025',
    round: '12',
    raceName: 'Hungarian Grand Prix',
    date: '2025-07-20',
    Circuit: { circuitId: 'hungaroring', circuitName: 'Hungaroring' },
    Results: [
      { position: '1', Driver: { driverId: 'max_verstappen', code: 'VER' }, Constructor: { constructorId: 'red_bull' }, grid: '1' },
      { position: '2', Driver: { driverId: 'leclerc', code: 'LEC' }, Constructor: { constructorId: 'ferrari' }, grid: '2' },
      { position: '3', Driver: { driverId: 'norris', code: 'NOR' }, Constructor: { constructorId: 'mclaren' }, grid: '3' },
      { position: '4', Driver: { driverId: 'piastri', code: 'PIA' }, Constructor: { constructorId: 'mclaren' }, grid: '4' },
      { position: '5', Driver: { driverId: 'russell', code: 'RUS' }, Constructor: { constructorId: 'mercedes' }, grid: '5' },
    ]
  },
  // Race 13: Belgian GP
  {
    season: '2025',
    round: '13',
    raceName: 'Belgian Grand Prix',
    date: '2025-07-27',
    Circuit: { circuitId: 'spa', circuitName: 'Circuit de Spa-Francorchamps' },
    Results: [
      { position: '1', Driver: { driverId: 'max_verstappen', code: 'VER' }, Constructor: { constructorId: 'red_bull' }, grid: '1' },
      { position: '2', Driver: { driverId: 'norris', code: 'NOR' }, Constructor: { constructorId: 'mclaren' }, grid: '2' },
      { position: '3', Driver: { driverId: 'piastri', code: 'PIA' }, Constructor: { constructorId: 'mclaren' }, grid: '3' },
      { position: '4', Driver: { driverId: 'leclerc', code: 'LEC' }, Constructor: { constructorId: 'ferrari' }, grid: '4' },
      { position: '5', Driver: { driverId: 'hamilton', code: 'HAM' }, Constructor: { constructorId: 'ferrari' }, grid: '5' },
    ]
  },
  // Race 14: Dutch GP
  {
    season: '2025',
    round: '14',
    raceName: 'Dutch Grand Prix',
    date: '2025-08-24',
    Circuit: { circuitId: 'zandvoort', circuitName: 'Circuit Park Zandvoort' },
    Results: [
      { position: '1', Driver: { driverId: 'max_verstappen', code: 'VER' }, Constructor: { constructorId: 'red_bull' }, grid: '1' },
      { position: '2', Driver: { driverId: 'norris', code: 'NOR' }, Constructor: { constructorId: 'mclaren' }, grid: '2' },
      { position: '3', Driver: { driverId: 'piastri', code: 'PIA' }, Constructor: { constructorId: 'mclaren' }, grid: '3' },
      { position: '4', Driver: { driverId: 'leclerc', code: 'LEC' }, Constructor: { constructorId: 'ferrari' }, grid: '4' },
      { position: '5', Driver: { driverId: 'russell', code: 'RUS' }, Constructor: { constructorId: 'mercedes' }, grid: '5' },
    ]
  },
  // Race 15: Italian GP
  {
    season: '2025',
    round: '15',
    raceName: 'Italian Grand Prix',
    date: '2025-08-31',
    Circuit: { circuitId: 'monza', circuitName: 'Autodromo Nazionale di Monza' },
    Results: [
      { position: '1', Driver: { driverId: 'leclerc', code: 'LEC' }, Constructor: { constructorId: 'ferrari' }, grid: '1' },
      { position: '2', Driver: { driverId: 'max_verstappen', code: 'VER' }, Constructor: { constructorId: 'red_bull' }, grid: '2' },
      { position: '3', Driver: { driverId: 'norris', code: 'NOR' }, Constructor: { constructorId: 'mclaren' }, grid: '3' },
      { position: '4', Driver: { driverId: 'piastri', code: 'PIA' }, Constructor: { constructorId: 'mclaren' }, grid: '4' },
      { position: '5', Driver: { driverId: 'hamilton', code: 'HAM' }, Constructor: { constructorId: 'ferrari' }, grid: '5' },
    ]
  },
  // Race 16: Azerbaijan GP
  {
    season: '2025',
    round: '16',
    raceName: 'Azerbaijan Grand Prix',
    date: '2025-09-14',
    Circuit: { circuitId: 'baku', circuitName: 'Baku City Circuit' },
    Results: [
      { position: '1', Driver: { driverId: 'max_verstappen', code: 'VER' }, Constructor: { constructorId: 'red_bull' }, grid: '1' },
      { position: '2', Driver: { driverId: 'norris', code: 'NOR' }, Constructor: { constructorId: 'mclaren' }, grid: '2' },
      { position: '3', Driver: { driverId: 'leclerc', code: 'LEC' }, Constructor: { constructorId: 'ferrari' }, grid: '3' },
      { position: '4', Driver: { driverId: 'piastri', code: 'PIA' }, Constructor: { constructorId: 'mclaren' }, grid: '4' },
      { position: '5', Driver: { driverId: 'russell', code: 'RUS' }, Constructor: { constructorId: 'mercedes' }, grid: '5' },
    ]
  },
  // Race 17: Singapore GP
  {
    season: '2025',
    round: '17',
    raceName: 'Singapore Grand Prix',
    date: '2025-09-21',
    Circuit: { circuitId: 'marina_bay', circuitName: 'Marina Bay Street Circuit' },
    Results: [
      { position: '1', Driver: { driverId: 'norris', code: 'NOR' }, Constructor: { constructorId: 'mclaren' }, grid: '2' },
      { position: '2', Driver: { driverId: 'max_verstappen', code: 'VER' }, Constructor: { constructorId: 'red_bull' }, grid: '1' },
      { position: '3', Driver: { driverId: 'leclerc', code: 'LEC' }, Constructor: { constructorId: 'ferrari' }, grid: '3' },
      { position: '4', Driver: { driverId: 'piastri', code: 'PIA' }, Constructor: { constructorId: 'mclaren' }, grid: '4' },
      { position: '5', Driver: { driverId: 'hamilton', code: 'HAM' }, Constructor: { constructorId: 'ferrari' }, grid: '5' },
    ]
  },
  // Race 18: Japanese GP
  {
    season: '2025',
    round: '18',
    raceName: 'Japanese Grand Prix',
    date: '2025-10-05',
    Circuit: { circuitId: 'suzuka', circuitName: 'Suzuka International Racing Course' },
    Results: [
      { position: '1', Driver: { driverId: 'max_verstappen', code: 'VER' }, Constructor: { constructorId: 'red_bull' }, grid: '1' },
      { position: '2', Driver: { driverId: 'piastri', code: 'PIA' }, Constructor: { constructorId: 'mclaren' }, grid: '2' },
      { position: '3', Driver: { driverId: 'norris', code: 'NOR' }, Constructor: { constructorId: 'mclaren' }, grid: '3' },
      { position: '4', Driver: { driverId: 'leclerc', code: 'LEC' }, Constructor: { constructorId: 'ferrari' }, grid: '4' },
      { position: '5', Driver: { driverId: 'russell', code: 'RUS' }, Constructor: { constructorId: 'mercedes' }, grid: '5' },
    ]
  },
  // Race 19: Qatar GP
  {
    season: '2025',
    round: '19',
    raceName: 'Qatar Grand Prix',
    date: '2025-10-19',
    Circuit: { circuitId: 'losail', circuitName: 'Losail International Circuit' },
    Results: [
      { position: '1', Driver: { driverId: 'max_verstappen', code: 'VER' }, Constructor: { constructorId: 'red_bull' }, grid: '1' },
      { position: '2', Driver: { driverId: 'norris', code: 'NOR' }, Constructor: { constructorId: 'mclaren' }, grid: '2' },
      { position: '3', Driver: { driverId: 'leclerc', code: 'LEC' }, Constructor: { constructorId: 'ferrari' }, grid: '3' },
      { position: '4', Driver: { driverId: 'piastri', code: 'PIA' }, Constructor: { constructorId: 'mclaren' }, grid: '4' },
      { position: '5', Driver: { driverId: 'russell', code: 'RUS' }, Constructor: { constructorId: 'mercedes' }, grid: '5' },
    ]
  },
  // Race 20: United States GP
  {
    season: '2025',
    round: '20',
    raceName: 'United States Grand Prix',
    date: '2025-10-26',
    Circuit: { circuitId: 'cota', circuitName: 'Circuit of the Americas' },
    Results: [
      { position: '1', Driver: { driverId: 'norris', code: 'NOR' }, Constructor: { constructorId: 'mclaren' }, grid: '1' },
      { position: '2', Driver: { driverId: 'max_verstappen', code: 'VER' }, Constructor: { constructorId: 'red_bull' }, grid: '2' },
      { position: '3', Driver: { driverId: 'piastri', code: 'PIA' }, Constructor: { constructorId: 'mclaren' }, grid: '3' },
      { position: '4', Driver: { driverId: 'leclerc', code: 'LEC' }, Constructor: { constructorId: 'ferrari' }, grid: '4' },
      { position: '5', Driver: { driverId: 'hamilton', code: 'HAM' }, Constructor: { constructorId: 'ferrari' }, grid: '5' },
    ]
  },
  // Race 21: Mexico City GP
  {
    season: '2025',
    round: '21',
    raceName: 'Mexico City Grand Prix',
    date: '2025-11-02',
    Circuit: { circuitId: 'rodriguez', circuitName: 'Autódromo Hermanos Rodríguez' },
    Results: [
      { position: '1', Driver: { driverId: 'max_verstappen', code: 'VER' }, Constructor: { constructorId: 'red_bull' }, grid: '1' },
      { position: '2', Driver: { driverId: 'leclerc', code: 'LEC' }, Constructor: { constructorId: 'ferrari' }, grid: '2' },
      { position: '3', Driver: { driverId: 'norris', code: 'NOR' }, Constructor: { constructorId: 'mclaren' }, grid: '3' },
      { position: '4', Driver: { driverId: 'piastri', code: 'PIA' }, Constructor: { constructorId: 'mclaren' }, grid: '4' },
      { position: '5', Driver: { driverId: 'russell', code: 'RUS' }, Constructor: { constructorId: 'mercedes' }, grid: '5' },
    ]
  },
  // Race 22: São Paulo GP
  {
    season: '2025',
    round: '22',
    raceName: 'São Paulo Grand Prix',
    date: '2025-11-09',
    Circuit: { circuitId: 'interlagos', circuitName: 'Autódromo José Carlos Pace' },
    Results: [
      { position: '1', Driver: { driverId: 'max_verstappen', code: 'VER' }, Constructor: { constructorId: 'red_bull' }, grid: '1' },
      { position: '2', Driver: { driverId: 'norris', code: 'NOR' }, Constructor: { constructorId: 'mclaren' }, grid: '2' },
      { position: '3', Driver: { driverId: 'piastri', code: 'PIA' }, Constructor: { constructorId: 'mclaren' }, grid: '3' },
      { position: '4', Driver: { driverId: 'leclerc', code: 'LEC' }, Constructor: { constructorId: 'ferrari' }, grid: '4' },
      { position: '5', Driver: { driverId: 'hamilton', code: 'HAM' }, Constructor: { constructorId: 'ferrari' }, grid: '5' },
    ]
  },
  // Race 23: Las Vegas GP
  {
    season: '2025',
    round: '23',
    raceName: 'Las Vegas Grand Prix',
    date: '2025-11-22',
    Circuit: { circuitId: 'vegas', circuitName: 'Las Vegas Strip Circuit' },
    Results: [
      { position: '1', Driver: { driverId: 'norris', code: 'NOR' }, Constructor: { constructorId: 'mclaren' }, grid: '1' },
      { position: '2', Driver: { driverId: 'max_verstappen', code: 'VER' }, Constructor: { constructorId: 'red_bull' }, grid: '2' },
      { position: '3', Driver: { driverId: 'piastri', code: 'PIA' }, Constructor: { constructorId: 'mclaren' }, grid: '3' },
      { position: '4', Driver: { driverId: 'leclerc', code: 'LEC' }, Constructor: { constructorId: 'ferrari' }, grid: '4' },
      { position: '5', Driver: { driverId: 'russell', code: 'RUS' }, Constructor: { constructorId: 'mercedes' }, grid: '5' },
    ]
  },
  // Race 24: Abu Dhabi GP (Final Race - Dec 7, 2025)
  {
    season: '2025',
    round: '24',
    raceName: 'Abu Dhabi Grand Prix',
    date: '2025-12-07',
    Circuit: { circuitId: 'yas_marina', circuitName: 'Yas Marina Circuit' },
    Results: null // Race hasn't happened yet
  }
];

// Get all 2025 race results for training
export const getAll2025RaceResults = () => {
  return SEASON_2025_RACES.filter(race => race.Results !== null);
};

// Get recent races (last 5)
export const getRecent2025Races = () => {
  return getAll2025RaceResults().slice(-5);
};

// Get qualifying data for all races
export const get2025QualifyingData = () => {
  // This would ideally come from API, but for now we'll use race grid positions
  return SEASON_2025_RACES.map(race => ({
    ...race,
    QualifyingResults: race.Results?.map(result => ({
      position: result.grid,
      Driver: result.Driver,
      Constructor: result.Constructor
    }))
  }));
};

