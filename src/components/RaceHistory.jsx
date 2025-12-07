import React from 'react';
import { Box, Typography, Grid, Chip, Avatar, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import HistoryIcon from '@mui/icons-material/History';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FlagIcon from '@mui/icons-material/Flag';
import SpeedIcon from '@mui/icons-material/Speed';
import { getDriverPhotoUrl, getTeamColor } from '../services/f1Api';

const RaceHistory = ({ recentRaces, selectedDriver, predictions }) => {
  if (!recentRaces || recentRaces.length === 0) return null;

  // Get last 5 races
  const lastRaces = recentRaces.slice(-5).reverse();

  // Calculate driver stats from recent races
  const calculateDriverStats = (driverId) => {
    let totalPositionChange = 0;
    let wins = 0;
    let podiums = 0;
    let points = 0;
    let raceCount = 0;

    lastRaces.forEach(race => {
      const result = race.Results?.find(r => r.Driver?.driverId === driverId);
      if (result) {
        const grid = parseInt(result.grid) || 0;
        const finish = parseInt(result.position);
        
        if (grid > 0) {
          totalPositionChange += grid - finish;
        }
        
        if (finish === 1) wins++;
        if (finish <= 3) podiums++;
        
        const pointsMap = { 1: 25, 2: 18, 3: 15, 4: 12, 5: 10, 6: 8, 7: 6, 8: 4, 9: 2, 10: 1 };
        points += pointsMap[finish] || 0;
        raceCount++;
      }
    });

    return {
      avgPositionChange: raceCount > 0 ? (totalPositionChange / raceCount).toFixed(1) : 0,
      wins,
      podiums,
      points,
      raceCount
    };
  };

  const RaceCard = ({ race, index }) => {
    const topResults = race.Results?.slice(0, 5) || [];
    
    return (
      <Box
        component={motion.div}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        sx={{
          background: 'linear-gradient(145deg, rgba(45, 45, 45, 0.6) 0%, rgba(26, 26, 26, 0.8) 100%)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          overflow: 'hidden',
          mb: 2
        }}
      >
        {/* Race Header */}
        <Box
          sx={{
            background: 'linear-gradient(90deg, rgba(225, 6, 0, 0.2) 0%, transparent 100%)',
            padding: '16px',
            borderBottom: '1px solid rgba(255,255,255,0.08)'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FlagIcon sx={{ color: '#E10600' }} />
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h6"
                sx={{ fontFamily: '"Orbitron", sans-serif', fontWeight: 700, fontSize: '1rem' }}
              >
                {race.raceName}
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                Round {race.round} • {new Date(race.date).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </Typography>
            </Box>
            <Chip
              label={index === 0 ? 'LATEST' : `${index + 1} races ago`}
              size="small"
              sx={{
                background: index === 0 ? 'rgba(225, 6, 0, 0.2)' : 'rgba(255,255,255,0.1)',
                color: index === 0 ? '#E10600' : 'rgba(255,255,255,0.6)',
                border: index === 0 ? '1px solid rgba(225, 6, 0, 0.4)' : 'none',
                fontFamily: '"Exo 2", sans-serif',
                fontSize: '0.65rem'
              }}
            />
          </Box>
        </Box>

        {/* Top 5 Results */}
        <Box sx={{ padding: '16px' }}>
          <Typography
            variant="caption"
            sx={{ color: 'rgba(255,255,255,0.5)', mb: 2, display: 'block', letterSpacing: '0.1em' }}
          >
            TOP 5 FINISHERS
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {topResults.map((result, rIndex) => {
              const position = parseInt(result.position);
              const grid = parseInt(result.grid) || 0;
              const change = grid > 0 ? grid - position : 0;
              const teamColor = getTeamColor(result.Constructor?.constructorId);
              const isSelected = selectedDriver?.driver?.driverId === result.Driver?.driverId;
              
              return (
                <Box
                  key={result.Driver?.driverId}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    padding: '8px 12px',
                    background: isSelected ? `${teamColor}20` : 'rgba(255,255,255,0.03)',
                    borderRadius: '8px',
                    border: isSelected ? `1px solid ${teamColor}` : '1px solid transparent'
                  }}
                >
                  {/* Position */}
                  <Box
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: '6px',
                      background: position === 1 ? '#FFD700' : position === 2 ? '#C0C0C0' : position === 3 ? '#CD7F32' : 'rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: '"Orbitron", sans-serif',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        color: position <= 3 ? '#000' : '#fff'
                      }}
                    >
                      {position}
                    </Typography>
                  </Box>

                  {/* Driver */}
                  <Avatar
                    src={getDriverPhotoUrl(result.Driver?.driverId)}
                    sx={{ width: 32, height: 32, border: `2px solid ${teamColor}` }}
                  />
                  
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {result.Driver?.givenName} {result.Driver?.familyName}
                    </Typography>
                    <Typography variant="caption" sx={{ color: teamColor }}>
                      {result.Constructor?.name}
                    </Typography>
                  </Box>

                  {/* Grid Position */}
                  <Tooltip title={`Started P${grid}`}>
                    <Chip
                      label={`P${grid}`}
                      size="small"
                      sx={{
                        height: '20px',
                        fontSize: '0.65rem',
                        background: 'rgba(255,255,255,0.1)',
                        color: 'rgba(255,255,255,0.6)'
                      }}
                    />
                  </Tooltip>

                  {/* Position Change */}
                  <Box sx={{ display: 'flex', alignItems: 'center', minWidth: '50px' }}>
                    {change > 0 ? (
                      <>
                        <TrendingUpIcon sx={{ color: '#00E676', fontSize: '1rem' }} />
                        <Typography variant="caption" sx={{ color: '#00E676', fontWeight: 600 }}>
                          +{change}
                        </Typography>
                      </>
                    ) : change < 0 ? (
                      <>
                        <TrendingDownIcon sx={{ color: '#FF5252', fontSize: '1rem' }} />
                        <Typography variant="caption" sx={{ color: '#FF5252', fontWeight: 600 }}>
                          {change}
                        </Typography>
                      </>
                    ) : (
                      <>
                        <TrendingFlatIcon sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '1rem' }} />
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>
                          0
                        </Typography>
                      </>
                    )}
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    );
  };

  // Get stats for top 5 drivers
  const topDriverStats = predictions?.slice(0, 5).map(p => ({
    ...p,
    stats: calculateDriverStats(p.driver.driverId)
  })) || [];

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      sx={{
        background: 'linear-gradient(145deg, rgba(45, 45, 45, 0.4) 0%, rgba(26, 26, 26, 0.6) 100%)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        padding: { xs: '20px', md: '30px' },
        mb: 4
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <HistoryIcon sx={{ color: '#E10600', fontSize: '1.8rem' }} />
        <Box>
          <Typography
            variant="h5"
            sx={{ fontFamily: '"Orbitron", sans-serif', fontWeight: 700 }}
          >
            RECENT RACE ANALYSIS
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
            Last {lastRaces.length} races performance data used for predictions
          </Typography>
        </Box>
      </Box>

      {/* Driver Form Summary */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{ fontFamily: '"Orbitron", sans-serif', fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <SpeedIcon /> TOP DRIVERS - LAST {lastRaces.length} RACES
        </Typography>
        
        <Grid container spacing={2}>
          {topDriverStats.map((driver, index) => {
            const teamColor = getTeamColor(driver.constructor?.constructorId);
            
            return (
              <Grid item xs={12} sm={6} md={4} lg={2.4} key={driver.driver.driverId}>
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  sx={{
                    background: 'linear-gradient(145deg, rgba(45, 45, 45, 0.6) 0%, rgba(26, 26, 26, 0.8) 100%)',
                    borderRadius: '12px',
                    border: `1px solid ${teamColor}40`,
                    padding: '16px',
                    textAlign: 'center'
                  }}
                >
                  <Avatar
                    src={getDriverPhotoUrl(driver.driver.driverId)}
                    sx={{
                      width: 50,
                      height: 50,
                      border: `3px solid ${teamColor}`,
                      margin: '0 auto 12px'
                    }}
                  />
                  <Typography
                    variant="subtitle2"
                    sx={{ fontFamily: '"Orbitron", sans-serif', fontWeight: 700, color: teamColor }}
                  >
                    {driver.driver.code}
                  </Typography>
                  
                  <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                        Wins
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 600, color: '#FFD700' }}>
                        {driver.stats.wins}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                        Podiums
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        {driver.stats.podiums}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                        Points
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 600, color: '#E10600' }}>
                        {driver.stats.points}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                        Avg Pos Δ
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 600,
                          color: parseFloat(driver.stats.avgPositionChange) > 0 ? '#00E676' : 
                                 parseFloat(driver.stats.avgPositionChange) < 0 ? '#FF5252' : 'rgba(255,255,255,0.6)'
                        }}
                      >
                        {parseFloat(driver.stats.avgPositionChange) > 0 ? '+' : ''}{driver.stats.avgPositionChange}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {/* Race by Race Results */}
      <Typography
        variant="h6"
        sx={{ fontFamily: '"Orbitron", sans-serif', fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <EmojiEventsIcon /> RACE RESULTS
      </Typography>
      
      <Grid container spacing={2}>
        {lastRaces.map((race, index) => (
          <Grid item xs={12} md={6} key={race.round}>
            <RaceCard race={race} index={index} />
          </Grid>
        ))}
      </Grid>

      {/* Impact Note */}
      <Box
        sx={{
          mt: 3,
          p: 2,
          background: 'rgba(225, 6, 0, 0.08)',
          borderRadius: '12px',
          border: '1px solid rgba(225, 6, 0, 0.2)'
        }}
      >
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
          <strong>How this affects predictions:</strong> Recent race performance carries the highest weight (22%) 
          in our model. More recent races have exponentially higher influence - the last race contributes 
          ~40% more than the 5th most recent race to the "Recent Form" score.
        </Typography>
      </Box>
    </Box>
  );
};

export default RaceHistory;

