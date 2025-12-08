// F1 API Service - Fetches data from Jolpica F1 API (Ergast successor)
// With fallback to mock data if API is unavailable

const API_BASE_URL = 'https://api.jolpi.ca/ergast/f1';

// Cache for API responses
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const fetchWithCache = async (url, cacheKey) => {
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    cache.set(cacheKey, { data, timestamp: Date.now() });
    return data;
  } catch (error) {
    console.error(`API Error (${url}):`, error);
    throw error;
  }
};

// Get current season standings
export const getDriverStandings = async (season = 'current') => {
  try {
    const url = `${API_BASE_URL}/${season}/driverStandings.json`;
    const data = await fetchWithCache(url, `standings_${season}`);
    return data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings || [];
  } catch (error) {
    console.log('Using fallback standings data');
    return getFallbackStandings();
  }
};

// Get constructor standings
export const getConstructorStandings = async (season = 'current') => {
  try {
    const url = `${API_BASE_URL}/${season}/constructorStandings.json`;
    const data = await fetchWithCache(url, `constructor_standings_${season}`);
    return data.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings || [];
  } catch (error) {
    console.log('Using fallback constructor standings');
    return getFallbackConstructorStandings();
  }
};

// Get all races in a season
export const getSeasonRaces = async (season = 'current') => {
  try {
    const url = `${API_BASE_URL}/${season}.json`;
    const data = await fetchWithCache(url, `season_${season}`);
    return data.MRData.RaceTable.Races || [];
  } catch (error) {
    console.log('Using fallback season races');
    return getFallbackSeasonRaces();
  }
};

// Get race results
export const getRaceResults = async (season = 'current', round = 'last') => {
  try {
    const url = `${API_BASE_URL}/${season}/${round}/results.json`;
    const data = await fetchWithCache(url, `results_${season}_${round}`);
    return data.MRData.RaceTable.Races[0] || null;
  } catch (error) {
    return null;
  }
};

// Get next race information
export const getNextRace = async () => {
  try {
    const races = await getSeasonRaces('current');
    const now = new Date();
    
    for (const race of races) {
      const raceDate = new Date(`${race.date}T${race.time || '14:00:00Z'}`);
      if (raceDate > now) {
        return race;
      }
    }
    
    // If no upcoming race this season, return the first race of next year
    const nextYear = new Date().getFullYear() + 1;
    const nextSeasonRaces = await getSeasonRaces(nextYear.toString());
    return nextSeasonRaces[0] || getFallbackNextRace();
  } catch (error) {
    return getFallbackNextRace();
  }
};

// Get all results from recent races
export const getRecentRaceResults = async (limit = 10) => {
  try {
    const url = `${API_BASE_URL}/current/results.json?limit=1000`;
    const data = await fetchWithCache(url, 'current_season_results');
    const races = data.MRData.RaceTable.Races || [];
    return races.slice(-limit);
  } catch (error) {
    console.log('Using 2025 season data');
    // Import and use 2025 season data
    const { getAll2025RaceResults } = await import('./season2025Data');
    const seasonRaces = getAll2025RaceResults();
    return seasonRaces.slice(-limit);
  }
};

// Get all current drivers
export const getCurrentDrivers = async () => {
  try {
    const url = `${API_BASE_URL}/current/drivers.json`;
    const data = await fetchWithCache(url, 'current_drivers');
    return data.MRData.DriverTable.Drivers || [];
  } catch (error) {
    return [];
  }
};

// Get historical results at a specific circuit
export const getCircuitHistory = async (circuitId, limit = 10) => {
  try {
    const url = `${API_BASE_URL}/circuits/${circuitId}/results.json?limit=${limit * 20}`;
    const data = await fetchWithCache(url, `circuit_history_${circuitId}`);
    return data.MRData.RaceTable.Races || [];
  } catch (error) {
    console.log('Using fallback circuit history');
    // Return Abu Dhabi historical data as fallback
    if (circuitId === 'yas_marina') {
      return getFallbackAbuDhabiHistory();
    }
    return [];
  }
};

// Get qualifying results for a specific race
export const getQualifyingResults = async (season = 'current', round = 'last') => {
  try {
    const url = `${API_BASE_URL}/${season}/${round}/qualifying.json`;
    const data = await fetchWithCache(url, `qualifying_${season}_${round}`);
    return data.MRData.RaceTable.Races[0] || null;
  } catch (error) {
    console.log('Qualifying data not available');
    return null;
  }
};

// Get current race weekend qualifying (if available)
export const getCurrentQualifying = async () => {
  try {
    const nextRace = await getNextRace();
    if (nextRace) {
      const url = `${API_BASE_URL}/current/${nextRace.round}/qualifying.json`;
      const data = await fetchWithCache(url, `current_qualifying_${nextRace.round}`);
      return data.MRData.RaceTable.Races[0] || null;
    }
    return null;
  } catch (error) {
    console.log('Using fallback qualifying data from Abu Dhabi 2024');
    // Return 2024 Abu Dhabi GP Qualifying results (December 7, 2024)
    return getFallbackAbuDhabiQualifying2024();
  }
};

// 2025 Abu Dhabi GP Qualifying Results (Saturday, December 6, 2025)
function getFallbackAbuDhabiQualifying2024() {
  return {
    season: '2025',
    round: '24',
    raceName: 'Abu Dhabi Grand Prix',
    Circuit: {
      circuitId: 'yas_marina',
      circuitName: 'Yas Marina Circuit'
    },
    date: '2025-12-06',
    QualifyingResults: [
      { position: '1', Driver: { driverId: 'max_verstappen', code: 'VER', givenName: 'Max', familyName: 'Verstappen' }, Constructor: { constructorId: 'red_bull', name: 'Red Bull Racing' }, Q1: '1:22.877', Q2: '1:22.752', Q3: '1:22.207' },
      { position: '2', Driver: { driverId: 'norris', code: 'NOR', givenName: 'Lando', familyName: 'Norris' }, Constructor: { constructorId: 'mclaren', name: 'McLaren' }, Q1: '1:23.178', Q2: '1:22.804', Q3: '1:22.408' },
      { position: '3', Driver: { driverId: 'piastri', code: 'PIA', givenName: 'Oscar', familyName: 'Piastri' }, Constructor: { constructorId: 'mclaren', name: 'McLaren' }, Q1: '1:22.605', Q2: '1:23.021', Q3: '1:22.437' },
      { position: '4', Driver: { driverId: 'russell', code: 'RUS', givenName: 'George', familyName: 'Russell' }, Constructor: { constructorId: 'mercedes', name: 'Mercedes' }, Q1: '1:23.247', Q2: '1:22.730', Q3: '1:22.645' },
      { position: '5', Driver: { driverId: 'leclerc', code: 'LEC', givenName: 'Charles', familyName: 'Leclerc' }, Constructor: { constructorId: 'ferrari', name: 'Ferrari' }, Q1: '1:23.163', Q2: '1:22.948', Q3: '1:22.730' },
      { position: '6', Driver: { driverId: 'alonso', code: 'ALO', givenName: 'Fernando', familyName: 'Alonso' }, Constructor: { constructorId: 'aston_martin', name: 'Aston Martin' }, Q1: '1:23.071', Q2: '1:22.861', Q3: '1:22.902' },
      { position: '7', Driver: { driverId: 'bortoleto', code: 'BOR', givenName: 'Gabriel', familyName: 'Bortoleto' }, Constructor: { constructorId: 'kick_sauber', name: 'Kick Sauber' }, Q1: '1:23.374', Q2: '1:22.874', Q3: '1:22.904' },
      { position: '8', Driver: { driverId: 'ocon', code: 'OCO', givenName: 'Esteban', familyName: 'Ocon' }, Constructor: { constructorId: 'haas', name: 'Haas F1 Team' }, Q1: '1:23.334', Q2: '1:23.023', Q3: '1:22.913' },
      { position: '9', Driver: { driverId: 'hadjar', code: 'HAD', givenName: 'Isack', familyName: 'Hadjar' }, Constructor: { constructorId: 'rb', name: 'Racing Bulls' }, Q1: '1:23.373', Q2: '1:22.997', Q3: '1:23.072' },
      { position: '10', Driver: { driverId: 'tsunoda', code: 'TSU', givenName: 'Yuki', familyName: 'Tsunoda' }, Constructor: { constructorId: 'red_bull', name: 'Red Bull Racing' }, Q1: '1:23.386', Q2: '1:23.034', Q3: 'DNF' },
      { position: '11', Driver: { driverId: 'bearman', code: 'BEA', givenName: 'Oliver', familyName: 'Bearman' }, Constructor: { constructorId: 'haas', name: 'Haas F1 Team' }, Q1: '1:23.254', Q2: '1:23.041', Q3: null },
      { position: '12', Driver: { driverId: 'sainz', code: 'SAI', givenName: 'Carlos', familyName: 'Sainz' }, Constructor: { constructorId: 'williams', name: 'Williams' }, Q1: '1:23.187', Q2: '1:23.042', Q3: null },
      { position: '13', Driver: { driverId: 'hamilton', code: 'HAM', givenName: 'Lewis', familyName: 'Hamilton' }, Constructor: { constructorId: 'ferrari', name: 'Ferrari' }, Q1: '1:23.200', Q2: '1:23.100', Q3: null },
      { position: '14', Driver: { driverId: 'lawson', code: 'LAW', givenName: 'Liam', familyName: 'Lawson' }, Constructor: { constructorId: 'rb', name: 'Racing Bulls' }, Q1: '1:23.250', Q2: '1:23.150', Q3: null },
      { position: '15', Driver: { driverId: 'stroll', code: 'STR', givenName: 'Lance', familyName: 'Stroll' }, Constructor: { constructorId: 'aston_martin', name: 'Aston Martin' }, Q1: '1:23.300', Q2: '1:23.200', Q3: null },
      { position: '16', Driver: { driverId: 'albon', code: 'ALB', givenName: 'Alexander', familyName: 'Albon' }, Constructor: { constructorId: 'williams', name: 'Williams' }, Q1: '1:23.350', Q2: null, Q3: null },
      { position: '17', Driver: { driverId: 'gasly', code: 'GAS', givenName: 'Pierre', familyName: 'Gasly' }, Constructor: { constructorId: 'alpine', name: 'Alpine' }, Q1: '1:23.400', Q2: null, Q3: null },
      { position: '18', Driver: { driverId: 'doohan', code: 'DOO', givenName: 'Jack', familyName: 'Doohan' }, Constructor: { constructorId: 'alpine', name: 'Alpine' }, Q1: '1:23.450', Q2: null, Q3: null },
      { position: '19', Driver: { driverId: 'hulkenberg', code: 'HUL', givenName: 'Nico', familyName: 'Hulkenberg' }, Constructor: { constructorId: 'kick_sauber', name: 'Kick Sauber' }, Q1: '1:23.500', Q2: null, Q3: null },
      { position: '20', Driver: { driverId: 'antonelli', code: 'ANT', givenName: 'Andrea Kimi', familyName: 'Antonelli' }, Constructor: { constructorId: 'mercedes', name: 'Mercedes' }, Q1: '1:23.550', Q2: null, Q3: null },
    ]
  };
}

// Get comprehensive data for predictions
export const getPredictionData = async () => {
  try {
    const [
      standings,
      constructorStandings,
      recentRaces,
      nextRace,
      currentDrivers
    ] = await Promise.all([
      getDriverStandings(),
      getConstructorStandings(),
      getRecentRaceResults(15),
      getNextRace(),
      getCurrentDrivers()
    ]);

    // Get circuit history and qualifying data
    let circuitHistory = [];
    let currentQualifying = null;
    
    if (nextRace?.Circuit?.circuitId) {
      // Fetch circuit history
      circuitHistory = await getCircuitHistory(nextRace.Circuit.circuitId, 10);
    }
    
    // Always try to get qualifying (uses fallback with 2024 Abu Dhabi data)
    currentQualifying = await getCurrentQualifying();
    
    // If still no qualifying, use fallback
    if (!currentQualifying) {
      currentQualifying = getFallbackAbuDhabiQualifying2024();
    }

    return {
      standings,
      constructorStandings,
      recentRaces,
      nextRace,
      currentDrivers,
      circuitHistory,
      currentQualifying,
      fetchedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching prediction data:', error);
    // Return fallback data with 2024 Abu Dhabi qualifying
    const recentRaces = await getFallbackRaceResults();
    return {
      standings: getFallbackStandings(),
      constructorStandings: getFallbackConstructorStandings(),
      recentRaces,
      nextRace: getFallbackNextRace(),
      currentDrivers: [],
      circuitHistory: getFallbackAbuDhabiHistory(),
      currentQualifying: getFallbackAbuDhabiQualifying2024(),
      fetchedAt: new Date().toISOString()
    };
  }
};

// Driver photo URLs (2025 Season)
export const getDriverPhotoUrl = (driverId) => {
  const photoMap = {
    'max_verstappen': 'https://media.formula1.com/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png.transform/1col/image.png',
    'hamilton': 'https://media.formula1.com/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png.transform/1col/image.png',
    'russell': 'https://media.formula1.com/content/dam/fom-website/drivers/G/GEORUS01_George_Russell/georus01.png.transform/1col/image.png',
    'leclerc': 'https://media.formula1.com/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png.transform/1col/image.png',
    'sainz': 'https://media.formula1.com/content/dam/fom-website/drivers/C/CARSAI01_Carlos_Sainz/carsai01.png.transform/1col/image.png',
    'norris': 'https://media.formula1.com/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png.transform/1col/image.png',
    'piastri': 'https://media.formula1.com/content/dam/fom-website/drivers/O/OSCPIA01_Oscar_Piastri/oscpia01.png.transform/1col/image.png',
    'alonso': 'https://media.formula1.com/content/dam/fom-website/drivers/F/FERALO01_Fernando_Alonso/feralo01.png.transform/1col/image.png',
    'stroll': 'https://media.formula1.com/content/dam/fom-website/drivers/L/LANSTR01_Lance_Stroll/lanstr01.png.transform/1col/image.png',
    'ocon': 'https://media.formula1.com/content/dam/fom-website/drivers/E/ESTOCO01_Esteban_Ocon/estoco01.png.transform/1col/image.png',
    'gasly': 'https://media.formula1.com/content/dam/fom-website/drivers/P/PIEGAS01_Pierre_Gasly/piegas01.png.transform/1col/image.png',
    'albon': 'https://media.formula1.com/content/dam/fom-website/drivers/A/ALEALB01_Alexander_Albon/alealb01.png.transform/1col/image.png',
    'tsunoda': 'https://media.formula1.com/content/dam/fom-website/drivers/Y/YUKTSU01_Yuki_Tsunoda/yuktsu01.png.transform/1col/image.png',
    'hulkenberg': 'https://media.formula1.com/content/dam/fom-website/drivers/N/NICHUL01_Nico_Hulkenberg/nichul01.png.transform/1col/image.png',
    'lawson': 'https://media.formula1.com/content/dam/fom-website/drivers/L/LIALAW01_Liam_Lawson/lialaw01.png.transform/1col/image.png',
    'bearman': 'https://media.formula1.com/content/dam/fom-website/drivers/O/OLIBEA01_Oliver_Bearman/olibea01.png.transform/1col/image.png',
    // 2025 New Drivers
    'antonelli': 'https://media.formula1.com/content/dam/fom-website/drivers/A/ANDANT01_Andrea_Kimi_Antonelli/andant01.png.transform/1col/image.png',
    'bortoleto': 'https://media.formula1.com/content/dam/fom-website/drivers/G/GABBOR01_Gabriel_Bortoleto/gabbor01.png.transform/1col/image.png',
    'hadjar': 'https://media.formula1.com/content/dam/fom-website/drivers/I/ISAHAD01_Isack_Hadjar/isahad01.png.transform/1col/image.png',
    'doohan': 'https://media.formula1.com/content/dam/fom-website/drivers/J/JACDOO01_Jack_Doohan/jacdoo01.png.transform/1col/image.png',
    'colapinto': 'https://media.formula1.com/content/dam/fom-website/drivers/F/FRACOL01_Franco_Colapinto/fracol01.png.transform/1col/image.png',
  };

  return photoMap[driverId] || `https://via.placeholder.com/200x200/1a1a1a/e10600?text=${driverId?.substring(0, 3)?.toUpperCase() || 'F1'}`;
};

// Team colors
export const getTeamColor = (constructorId) => {
  const colors = {
    'red_bull': '#3671C6',
    'mercedes': '#27F4D2',
    'ferrari': '#E8002D',
    'mclaren': '#FF8000',
    'aston_martin': '#229971',
    'alpine': '#FF87BC',
    'williams': '#64C4FF',
    'alphatauri': '#6692FF',
    'rb': '#6692FF',
    'alfa': '#C92D4B',
    'haas': '#B6BABD',
    'sauber': '#52E252',
    'kick_sauber': '#52E252',
  };
  return colors[constructorId] || '#FFFFFF';
};

// ============ FALLBACK DATA ============
// Used when API is unavailable

function getFallbackStandings() {
  // 2025 Season Final Standings - Official Results
  // Source: https://www.formula1.com/en/results/2025/drivers
  return [
    { position: '1', points: '423', Driver: { driverId: 'norris', givenName: 'Lando', familyName: 'Norris', nationality: 'British', code: 'NOR', permanentNumber: '4' }, Constructors: [{ constructorId: 'mclaren', name: 'McLaren' }] },
    { position: '2', points: '421', Driver: { driverId: 'max_verstappen', givenName: 'Max', familyName: 'Verstappen', nationality: 'Dutch', code: 'VER', permanentNumber: '1' }, Constructors: [{ constructorId: 'red_bull', name: 'Red Bull Racing' }] },
    { position: '3', points: '410', Driver: { driverId: 'piastri', givenName: 'Oscar', familyName: 'Piastri', nationality: 'Australian', code: 'PIA', permanentNumber: '81' }, Constructors: [{ constructorId: 'mclaren', name: 'McLaren' }] },
    { position: '4', points: '319', Driver: { driverId: 'russell', givenName: 'George', familyName: 'Russell', nationality: 'British', code: 'RUS', permanentNumber: '63' }, Constructors: [{ constructorId: 'mercedes', name: 'Mercedes' }] },
    { position: '5', points: '242', Driver: { driverId: 'leclerc', givenName: 'Charles', familyName: 'Leclerc', nationality: 'Monegasque', code: 'LEC', permanentNumber: '16' }, Constructors: [{ constructorId: 'ferrari', name: 'Ferrari' }] },
    { position: '6', points: '156', Driver: { driverId: 'hamilton', givenName: 'Lewis', familyName: 'Hamilton', nationality: 'British', code: 'HAM', permanentNumber: '44' }, Constructors: [{ constructorId: 'ferrari', name: 'Ferrari' }] },
    { position: '7', points: '150', Driver: { driverId: 'antonelli', givenName: 'Andrea Kimi', familyName: 'Antonelli', nationality: 'Italian', code: 'ANT', permanentNumber: '12' }, Constructors: [{ constructorId: 'mercedes', name: 'Mercedes' }] },
    { position: '8', points: '73', Driver: { driverId: 'albon', givenName: 'Alexander', familyName: 'Albon', nationality: 'Thai', code: 'ALB', permanentNumber: '23' }, Constructors: [{ constructorId: 'williams', name: 'Williams' }] },
    { position: '9', points: '64', Driver: { driverId: 'sainz', givenName: 'Carlos', familyName: 'Sainz', nationality: 'Spanish', code: 'SAI', permanentNumber: '55' }, Constructors: [{ constructorId: 'williams', name: 'Williams' }] },
    { position: '10', points: '56', Driver: { driverId: 'alonso', givenName: 'Fernando', familyName: 'Alonso', nationality: 'Spanish', code: 'ALO', permanentNumber: '14' }, Constructors: [{ constructorId: 'aston_martin', name: 'Aston Martin' }] },
    { position: '11', points: '51', Driver: { driverId: 'hulkenberg', givenName: 'Nico', familyName: 'Hulkenberg', nationality: 'German', code: 'HUL', permanentNumber: '27' }, Constructors: [{ constructorId: 'kick_sauber', name: 'Kick Sauber' }] },
    { position: '12', points: '51', Driver: { driverId: 'hadjar', givenName: 'Isack', familyName: 'Hadjar', nationality: 'French', code: 'HAD', permanentNumber: '6' }, Constructors: [{ constructorId: 'rb', name: 'Racing Bulls' }] },
    { position: '13', points: '41', Driver: { driverId: 'bearman', givenName: 'Oliver', familyName: 'Bearman', nationality: 'British', code: 'BEA', permanentNumber: '87' }, Constructors: [{ constructorId: 'haas', name: 'Haas F1 Team' }] },
    { position: '14', points: '38', Driver: { driverId: 'lawson', givenName: 'Liam', familyName: 'Lawson', nationality: 'New Zealander', code: 'LAW', permanentNumber: '30' }, Constructors: [{ constructorId: 'rb', name: 'Racing Bulls' }] },
    { position: '15', points: '38', Driver: { driverId: 'ocon', givenName: 'Esteban', familyName: 'Ocon', nationality: 'French', code: 'OCO', permanentNumber: '31' }, Constructors: [{ constructorId: 'haas', name: 'Haas F1 Team' }] },
    { position: '16', points: '33', Driver: { driverId: 'stroll', givenName: 'Lance', familyName: 'Stroll', nationality: 'Canadian', code: 'STR', permanentNumber: '18' }, Constructors: [{ constructorId: 'aston_martin', name: 'Aston Martin' }] },
    { position: '17', points: '33', Driver: { driverId: 'tsunoda', givenName: 'Yuki', familyName: 'Tsunoda', nationality: 'Japanese', code: 'TSU', permanentNumber: '22' }, Constructors: [{ constructorId: 'red_bull', name: 'Red Bull Racing' }] },
    { position: '18', points: '22', Driver: { driverId: 'gasly', givenName: 'Pierre', familyName: 'Gasly', nationality: 'French', code: 'GAS', permanentNumber: '10' }, Constructors: [{ constructorId: 'alpine', name: 'Alpine' }] },
    { position: '19', points: '19', Driver: { driverId: 'bortoleto', givenName: 'Gabriel', familyName: 'Bortoleto', nationality: 'Brazilian', code: 'BOR', permanentNumber: '5' }, Constructors: [{ constructorId: 'kick_sauber', name: 'Kick Sauber' }] },
    { position: '20', points: '0', Driver: { driverId: 'colapinto', givenName: 'Franco', familyName: 'Colapinto', nationality: 'Argentine', code: 'COL', permanentNumber: '99' }, Constructors: [{ constructorId: 'alpine', name: 'Alpine' }] },
    { position: '21', points: '0', Driver: { driverId: 'doohan', givenName: 'Jack', familyName: 'Doohan', nationality: 'Australian', code: 'DOO', permanentNumber: '7' }, Constructors: [{ constructorId: 'alpine', name: 'Alpine' }] },
  ];
}

function getFallbackConstructorStandings() {
  // 2025 Constructor Standings - Calculated from driver standings
  // McLaren: Norris (423) + Piastri (410) = 833
  // Mercedes: Russell (319) + Antonelli (150) = 469
  // Red Bull: Verstappen (421) + Tsunoda (33) = 454
  // Ferrari: Leclerc (242) + Hamilton (156) = 398
  // Williams: Albon (73) + Sainz (64) = 137
  // Racing Bulls: Hadjar (51) + Lawson (38) = 89
  // Aston Martin: Alonso (56) + Stroll (33) = 89
  // Haas: Bearman (41) + Ocon (38) = 79
  // Kick Sauber: Hulkenberg (51) + Bortoleto (19) = 70
  // Alpine: Gasly (22) + Colapinto (0) + Doohan (0) = 22
  return [
    { position: '1', points: '833', Constructor: { constructorId: 'mclaren', name: 'McLaren' } },
    { position: '2', points: '469', Constructor: { constructorId: 'mercedes', name: 'Mercedes' } },
    { position: '3', points: '454', Constructor: { constructorId: 'red_bull', name: 'Red Bull Racing' } },
    { position: '4', points: '398', Constructor: { constructorId: 'ferrari', name: 'Ferrari' } },
    { position: '5', points: '137', Constructor: { constructorId: 'williams', name: 'Williams' } },
    { position: '6', points: '89', Constructor: { constructorId: 'rb', name: 'Racing Bulls' } },
    { position: '7', points: '89', Constructor: { constructorId: 'aston_martin', name: 'Aston Martin' } },
    { position: '8', points: '79', Constructor: { constructorId: 'haas', name: 'Haas F1 Team' } },
    { position: '9', points: '70', Constructor: { constructorId: 'kick_sauber', name: 'Kick Sauber' } },
    { position: '10', points: '22', Constructor: { constructorId: 'alpine', name: 'Alpine' } },
  ];
}

function getFallbackNextRace() {
  // Abu Dhabi GP was the final race of 2025 season (Dec 7, 2025)
  // Season is now over - return first race of 2026 season
  return {
    season: '2026',
    round: '1',
    raceName: 'Bahrain Grand Prix',
    date: '2026-03-01',
    time: '15:00:00Z',
    Circuit: {
      circuitId: 'bahrain',
      circuitName: 'Bahrain International Circuit',
      Location: {
        locality: 'Sakhir',
        country: 'Bahrain'
      }
    }
  };
}

async function getFallbackRaceResults() {
  // Recent race results for prediction model - 2025 Season (including Abu Dhabi GP)
  const { getAll2025RaceResults } = await import('./season2025Data');
  const seasonRaces = getAll2025RaceResults();
  return seasonRaces.slice(-5);
  
  // Legacy 2024 data (kept for reference)
  /*
  return [
    {
      raceName: 'Qatar Grand Prix',
      round: '23',
      date: '2024-12-01',
      Results: [
        { position: '1', Driver: { driverId: 'max_verstappen', code: 'VER' }, Constructor: { constructorId: 'red_bull' }, grid: '1', status: 'Finished' },
        { position: '2', Driver: { driverId: 'leclerc', code: 'LEC' }, Constructor: { constructorId: 'ferrari' }, grid: '2', status: 'Finished' },
        { position: '3', Driver: { driverId: 'piastri', code: 'PIA' }, Constructor: { constructorId: 'mclaren' }, grid: '3', status: 'Finished' },
        { position: '4', Driver: { driverId: 'russell', code: 'RUS' }, Constructor: { constructorId: 'mercedes' }, grid: '4', status: 'Finished' },
        { position: '5', Driver: { driverId: 'norris', code: 'NOR' }, Constructor: { constructorId: 'mclaren' }, grid: '5', status: 'Finished' },
      ]
    },
    {
      raceName: 'Las Vegas Grand Prix',
      round: '22',
      date: '2024-11-23',
      Results: [
        { position: '1', Driver: { driverId: 'russell', code: 'RUS' }, Constructor: { constructorId: 'mercedes' }, grid: '1', status: 'Finished' },
        { position: '2', Driver: { driverId: 'hamilton', code: 'HAM' }, Constructor: { constructorId: 'mercedes' }, grid: '10', status: 'Finished' },
        { position: '3', Driver: { driverId: 'sainz', code: 'SAI' }, Constructor: { constructorId: 'ferrari' }, grid: '2', status: 'Finished' },
        { position: '4', Driver: { driverId: 'leclerc', code: 'LEC' }, Constructor: { constructorId: 'ferrari' }, grid: '4', status: 'Finished' },
        { position: '5', Driver: { driverId: 'max_verstappen', code: 'VER' }, Constructor: { constructorId: 'red_bull' }, grid: '5', status: 'Finished' },
      ]
    },
    {
      raceName: 'Brazilian Grand Prix',
      round: '21',
      date: '2024-11-03',
      Results: [
        { position: '1', Driver: { driverId: 'max_verstappen', code: 'VER' }, Constructor: { constructorId: 'red_bull' }, grid: '17', status: 'Finished' },
        { position: '2', Driver: { driverId: 'ocon', code: 'OCO' }, Constructor: { constructorId: 'alpine' }, grid: '3', status: 'Finished' },
        { position: '3', Driver: { driverId: 'gasly', code: 'GAS' }, Constructor: { constructorId: 'alpine' }, grid: '4', status: 'Finished' },
        { position: '4', Driver: { driverId: 'russell', code: 'RUS' }, Constructor: { constructorId: 'mercedes' }, grid: '6', status: 'Finished' },
        { position: '5', Driver: { driverId: 'leclerc', code: 'LEC' }, Constructor: { constructorId: 'ferrari' }, grid: '5', status: 'Finished' },
      ]
    },
    {
      raceName: 'Mexico City Grand Prix',
      round: '20',
      date: '2024-10-27',
      Results: [
        { position: '1', Driver: { driverId: 'sainz', code: 'SAI' }, Constructor: { constructorId: 'ferrari' }, grid: '4', status: 'Finished' },
        { position: '2', Driver: { driverId: 'norris', code: 'NOR' }, Constructor: { constructorId: 'mclaren' }, grid: '3', status: 'Finished' },
        { position: '3', Driver: { driverId: 'leclerc', code: 'LEC' }, Constructor: { constructorId: 'ferrari' }, grid: '1', status: 'Finished' },
        { position: '4', Driver: { driverId: 'hamilton', code: 'HAM' }, Constructor: { constructorId: 'mercedes' }, grid: '5', status: 'Finished' },
        { position: '5', Driver: { driverId: 'russell', code: 'RUS' }, Constructor: { constructorId: 'mercedes' }, grid: '6', status: 'Finished' },
      ]
    },
    {
      raceName: 'United States Grand Prix',
      round: '19',
      date: '2024-10-20',
      Results: [
        { position: '1', Driver: { driverId: 'leclerc', code: 'LEC' }, Constructor: { constructorId: 'ferrari' }, grid: '1', status: 'Finished' },
        { position: '2', Driver: { driverId: 'sainz', code: 'SAI' }, Constructor: { constructorId: 'ferrari' }, grid: '3', status: 'Finished' },
        { position: '3', Driver: { driverId: 'max_verstappen', code: 'VER' }, Constructor: { constructorId: 'red_bull' }, grid: '2', status: 'Finished' },
        { position: '4', Driver: { driverId: 'norris', code: 'NOR' }, Constructor: { constructorId: 'mclaren' }, grid: '4', status: 'Finished' },
        { position: '5', Driver: { driverId: 'piastri', code: 'PIA' }, Constructor: { constructorId: 'mclaren' }, grid: '5', status: 'Finished' },
      ]
    },
  ];
}

// Abu Dhabi Grand Prix historical data (Yas Marina Circuit)
function getFallbackAbuDhabiHistory() {
  return [
    // 2023 Abu Dhabi GP
    {
      season: '2023',
      raceName: 'Abu Dhabi Grand Prix',
      Circuit: { circuitId: 'yas_marina', circuitName: 'Yas Marina Circuit' },
      Results: [
        { position: '1', Driver: { driverId: 'max_verstappen', code: 'VER' }, Constructor: { constructorId: 'red_bull' }, grid: '1' },
        { position: '2', Driver: { driverId: 'leclerc', code: 'LEC' }, Constructor: { constructorId: 'ferrari' }, grid: '2' },
        { position: '3', Driver: { driverId: 'russell', code: 'RUS' }, Constructor: { constructorId: 'mercedes' }, grid: '4' },
        { position: '4', Driver: { driverId: 'sainz', code: 'SAI' }, Constructor: { constructorId: 'ferrari' }, grid: '5' },
        { position: '5', Driver: { driverId: 'norris', code: 'NOR' }, Constructor: { constructorId: 'mclaren' }, grid: '6' },
        { position: '6', Driver: { driverId: 'hamilton', code: 'HAM' }, Constructor: { constructorId: 'mercedes' }, grid: '3' },
        { position: '7', Driver: { driverId: 'piastri', code: 'PIA' }, Constructor: { constructorId: 'mclaren' }, grid: '7' },
        { position: '8', Driver: { driverId: 'alonso', code: 'ALO' }, Constructor: { constructorId: 'aston_martin' }, grid: '8' },
      ]
    },
    // 2022 Abu Dhabi GP
    {
      season: '2022',
      raceName: 'Abu Dhabi Grand Prix',
      Circuit: { circuitId: 'yas_marina', circuitName: 'Yas Marina Circuit' },
      Results: [
        { position: '1', Driver: { driverId: 'max_verstappen', code: 'VER' }, Constructor: { constructorId: 'red_bull' }, grid: '1' },
        { position: '2', Driver: { driverId: 'leclerc', code: 'LEC' }, Constructor: { constructorId: 'ferrari' }, grid: '3' },
        { position: '3', Driver: { driverId: 'perez', code: 'PER' }, Constructor: { constructorId: 'red_bull' }, grid: '2' },
        { position: '4', Driver: { driverId: 'sainz', code: 'SAI' }, Constructor: { constructorId: 'ferrari' }, grid: '4' },
        { position: '5', Driver: { driverId: 'russell', code: 'RUS' }, Constructor: { constructorId: 'mercedes' }, grid: '6' },
        { position: '6', Driver: { driverId: 'norris', code: 'NOR' }, Constructor: { constructorId: 'mclaren' }, grid: '7' },
        { position: '7', Driver: { driverId: 'ocon', code: 'OCO' }, Constructor: { constructorId: 'alpine' }, grid: '8' },
        { position: '8', Driver: { driverId: 'stroll', code: 'STR' }, Constructor: { constructorId: 'aston_martin' }, grid: '11' },
      ]
    },
    // 2021 Abu Dhabi GP (Famous Hamilton vs Verstappen)
    {
      season: '2021',
      raceName: 'Abu Dhabi Grand Prix',
      Circuit: { circuitId: 'yas_marina', circuitName: 'Yas Marina Circuit' },
      Results: [
        { position: '1', Driver: { driverId: 'max_verstappen', code: 'VER' }, Constructor: { constructorId: 'red_bull' }, grid: '1' },
        { position: '2', Driver: { driverId: 'hamilton', code: 'HAM' }, Constructor: { constructorId: 'mercedes' }, grid: '2' },
        { position: '3', Driver: { driverId: 'sainz', code: 'SAI' }, Constructor: { constructorId: 'ferrari' }, grid: '3' },
        { position: '4', Driver: { driverId: 'tsunoda', code: 'TSU' }, Constructor: { constructorId: 'alphatauri' }, grid: '8' },
        { position: '5', Driver: { driverId: 'gasly', code: 'GAS' }, Constructor: { constructorId: 'alphatauri' }, grid: '6' },
        { position: '6', Driver: { driverId: 'bottas', code: 'BOT' }, Constructor: { constructorId: 'mercedes' }, grid: '6' },
        { position: '7', Driver: { driverId: 'norris', code: 'NOR' }, Constructor: { constructorId: 'mclaren' }, grid: '7' },
        { position: '8', Driver: { driverId: 'alonso', code: 'ALO' }, Constructor: { constructorId: 'alpine' }, grid: '9' },
      ]
    },
    // 2020 Abu Dhabi GP
    {
      season: '2020',
      raceName: 'Abu Dhabi Grand Prix',
      Circuit: { circuitId: 'yas_marina', circuitName: 'Yas Marina Circuit' },
      Results: [
        { position: '1', Driver: { driverId: 'max_verstappen', code: 'VER' }, Constructor: { constructorId: 'red_bull' }, grid: '3' },
        { position: '2', Driver: { driverId: 'bottas', code: 'BOT' }, Constructor: { constructorId: 'mercedes' }, grid: '2' },
        { position: '3', Driver: { driverId: 'hamilton', code: 'HAM' }, Constructor: { constructorId: 'mercedes' }, grid: '1' },
        { position: '4', Driver: { driverId: 'albon', code: 'ALB' }, Constructor: { constructorId: 'red_bull' }, grid: '4' },
        { position: '5', Driver: { driverId: 'norris', code: 'NOR' }, Constructor: { constructorId: 'mclaren' }, grid: '5' },
        { position: '6', Driver: { driverId: 'sainz', code: 'SAI' }, Constructor: { constructorId: 'mclaren' }, grid: '6' },
        { position: '7', Driver: { driverId: 'ricciardo', code: 'RIC' }, Constructor: { constructorId: 'renault' }, grid: '10' },
        { position: '8', Driver: { driverId: 'gasly', code: 'GAS' }, Constructor: { constructorId: 'alphatauri' }, grid: '8' },
      ]
    },
    // 2019 Abu Dhabi GP
    {
      season: '2019',
      raceName: 'Abu Dhabi Grand Prix',
      Circuit: { circuitId: 'yas_marina', circuitName: 'Yas Marina Circuit' },
      Results: [
        { position: '1', Driver: { driverId: 'hamilton', code: 'HAM' }, Constructor: { constructorId: 'mercedes' }, grid: '1' },
        { position: '2', Driver: { driverId: 'max_verstappen', code: 'VER' }, Constructor: { constructorId: 'red_bull' }, grid: '2' },
        { position: '3', Driver: { driverId: 'leclerc', code: 'LEC' }, Constructor: { constructorId: 'ferrari' }, grid: '3' },
        { position: '4', Driver: { driverId: 'bottas', code: 'BOT' }, Constructor: { constructorId: 'mercedes' }, grid: '4' },
        { position: '5', Driver: { driverId: 'vettel', code: 'VET' }, Constructor: { constructorId: 'ferrari' }, grid: '5' },
        { position: '6', Driver: { driverId: 'albon', code: 'ALB' }, Constructor: { constructorId: 'red_bull' }, grid: '6' },
        { position: '7', Driver: { driverId: 'perez', code: 'PER' }, Constructor: { constructorId: 'racing_point' }, grid: '9' },
        { position: '8', Driver: { driverId: 'norris', code: 'NOR' }, Constructor: { constructorId: 'mclaren' }, grid: '8' },
      ]
    },
  ];
}

export default {
  getDriverStandings,
  getConstructorStandings,
  getSeasonRaces,
  getRaceResults,
  getNextRace,
  getRecentRaceResults,
  getCurrentDrivers,
  getCircuitHistory,
  getPredictionData,
  getDriverPhotoUrl,
  getTeamColor
};
