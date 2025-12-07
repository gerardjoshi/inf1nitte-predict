import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Chip, Avatar, LinearProgress, Tabs, Tab } from '@mui/material';
import { motion } from 'framer-motion';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { getDriverPhotoUrl, getTeamColor } from '../services/f1Api';

const PredictionComparison = ({ predictions, recentRaces, nextRace }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [comparisonData, setComparisonData] = useState([]);

  useEffect(() => {
    if (recentRaces && recentRaces.length > 0 && predictions) {
      // Generate comparison data for each recent race
      const comparisons = recentRaces.slice(-5).reverse().map(race => {
        const actualResults = race.Results?.slice(0, 10) || [];
        
        // Simulate what predictions would have been (based on standings before that race)
        // For simplicity, we'll compare current predictions structure with actual results
        const predictedTop5 = predictions.slice(0, 5).map(p => p.driver.driverId);
        const actualTop5 = actualResults.slice(0, 5).map(r => r.Driver?.driverId);
        const actualPodium = actualResults.slice(0, 3).map(r => r.Driver?.driverId);
        const actualWinner = actualResults[0]?.Driver?.driverId;
        
        // Calculate accuracy metrics
        const podiumHits = predictedTop5.slice(0, 3).filter(id => actualPodium.includes(id)).length;
        const top5Hits = predictedTop5.filter(id => actualTop5.includes(id)).length;
        const winnerCorrect = predictedTop5[0] === actualWinner;

        return {
          race,
          actualResults: actualResults.slice(0, 5),
          predictedTop5: predictions.slice(0, 5),
          metrics: {
            winnerCorrect,
            podiumAccuracy: (podiumHits / 3) * 100,
            top5Accuracy: (top5Hits / 5) * 100,
            podiumHits,
            top5Hits
          }
        };
      });

      setComparisonData(comparisons);
    }
  }, [recentRaces, predictions]);

  // Check if the season is over (no upcoming races)
  const isSeasonOver = !nextRace || new Date(nextRace.date) < new Date();

  const ComparisonCard = ({ comparison, index }) => {
    const { race, actualResults, predictedTop5, metrics } = comparison;
    
    return (
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        sx={{
          background: 'linear-gradient(145deg, rgba(45, 45, 45, 0.6) 0%, rgba(26, 26, 26, 0.8) 100%)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          overflow: 'hidden'
        }}
      >
        {/* Race Header */}
        <Box
          sx={{
            background: metrics.winnerCorrect 
              ? 'linear-gradient(90deg, rgba(0, 230, 118, 0.2) 0%, transparent 100%)'
              : 'linear-gradient(90deg, rgba(255, 82, 82, 0.2) 0%, transparent 100%)',
            padding: '16px',
            borderBottom: '1px solid rgba(255,255,255,0.08)'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {metrics.winnerCorrect ? (
              <CheckCircleIcon sx={{ color: '#00E676', fontSize: '1.5rem' }} />
            ) : (
              <CancelIcon sx={{ color: '#FF5252', fontSize: '1.5rem' }} />
            )}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontFamily: '"Orbitron", sans-serif', fontWeight: 700, fontSize: '0.95rem' }}>
                {race.raceName}
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                Round {race.round} • {new Date(race.date).toLocaleDateString()}
              </Typography>
            </Box>
            <Chip
              label={`${metrics.top5Accuracy.toFixed(0)}% Top 5`}
              sx={{
                background: metrics.top5Accuracy >= 60 ? 'rgba(0, 230, 118, 0.2)' : 'rgba(255, 152, 0, 0.2)',
                color: metrics.top5Accuracy >= 60 ? '#00E676' : '#FF9800',
                fontFamily: '"Orbitron", sans-serif',
                fontWeight: 600
              }}
            />
          </Box>
        </Box>

        {/* Comparison Grid */}
        <Box sx={{ padding: '16px' }}>
          <Grid container spacing={2}>
            {/* Predicted Column */}
            <Grid item xs={6}>
              <Typography
                variant="caption"
                sx={{ color: 'rgba(255,255,255,0.5)', mb: 1, display: 'block', letterSpacing: '0.1em' }}
              >
                MODEL PREDICTED
              </Typography>
              {predictedTop5.slice(0, 3).map((pred, pIndex) => {
                const isCorrect = actualResults[pIndex]?.Driver?.driverId === pred.driver.driverId;
                const actualPosition = actualResults.findIndex(r => r.Driver?.driverId === pred.driver.driverId) + 1;
                const teamColor = getTeamColor(pred.constructor?.constructorId);
                
                return (
                  <Box
                    key={pred.driver.driverId}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      mb: 1,
                      p: 1,
                      borderRadius: '8px',
                      background: isCorrect ? 'rgba(0, 230, 118, 0.1)' : 'rgba(255,255,255,0.03)',
                      border: isCorrect ? '1px solid rgba(0, 230, 118, 0.3)' : '1px solid transparent'
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: '"Orbitron", sans-serif',
                        fontWeight: 700,
                        width: '24px',
                        color: pIndex === 0 ? '#FFD700' : pIndex === 1 ? '#C0C0C0' : '#CD7F32'
                      }}
                    >
                      P{pIndex + 1}
                    </Typography>
                    <Avatar
                      src={getDriverPhotoUrl(pred.driver.driverId)}
                      sx={{ width: 24, height: 24, border: `2px solid ${teamColor}` }}
                    />
                    <Typography variant="caption" sx={{ fontWeight: 600, flex: 1 }}>
                      {pred.driver.code}
                    </Typography>
                    {isCorrect ? (
                      <CheckCircleIcon sx={{ color: '#00E676', fontSize: '1rem' }} />
                    ) : actualPosition > 0 ? (
                      <Chip
                        label={`P${actualPosition}`}
                        size="small"
                        sx={{
                          height: '18px',
                          fontSize: '0.6rem',
                          background: 'rgba(255,255,255,0.1)'
                        }}
                      />
                    ) : (
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)' }}>—</Typography>
                    )}
                  </Box>
                );
              })}
            </Grid>

            {/* Actual Column */}
            <Grid item xs={6}>
              <Typography
                variant="caption"
                sx={{ color: 'rgba(255,255,255,0.5)', mb: 1, display: 'block', letterSpacing: '0.1em' }}
              >
                ACTUAL RESULT
              </Typography>
              {actualResults.slice(0, 3).map((result, rIndex) => {
                const teamColor = getTeamColor(result.Constructor?.constructorId);
                const wasPredicted = predictedTop5.slice(0, 3).some(p => p.driver.driverId === result.Driver?.driverId);
                
                return (
                  <Box
                    key={result.Driver?.driverId}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      mb: 1,
                      p: 1,
                      borderRadius: '8px',
                      background: wasPredicted ? 'rgba(0, 230, 118, 0.1)' : 'rgba(255, 82, 82, 0.1)',
                      border: wasPredicted ? '1px solid rgba(0, 230, 118, 0.3)' : '1px solid rgba(255, 82, 82, 0.3)'
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: '"Orbitron", sans-serif',
                        fontWeight: 700,
                        width: '24px',
                        color: rIndex === 0 ? '#FFD700' : rIndex === 1 ? '#C0C0C0' : '#CD7F32'
                      }}
                    >
                      P{rIndex + 1}
                    </Typography>
                    <Avatar
                      src={getDriverPhotoUrl(result.Driver?.driverId)}
                      sx={{ width: 24, height: 24, border: `2px solid ${teamColor}` }}
                    />
                    <Typography variant="caption" sx={{ fontWeight: 600, flex: 1 }}>
                      {result.Driver?.code || result.Driver?.familyName?.substring(0, 3).toUpperCase()}
                    </Typography>
                    {wasPredicted ? (
                      <CheckCircleIcon sx={{ color: '#00E676', fontSize: '1rem' }} />
                    ) : (
                      <Typography variant="caption" sx={{ color: '#FF5252' }}>Miss</Typography>
                    )}
                  </Box>
                );
              })}
            </Grid>
          </Grid>
        </Box>

        {/* Metrics */}
        <Box
          sx={{
            padding: '12px 16px',
            background: 'rgba(0,0,0,0.2)',
            display: 'flex',
            gap: 2,
            justifyContent: 'center'
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>
              Podium Hits
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#E10600' }}>
              {metrics.podiumHits}/3
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>
              Top 5 Hits
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#E10600' }}>
              {metrics.top5Hits}/5
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  };

  // Calculate overall accuracy
  const overallMetrics = comparisonData.reduce((acc, comp) => ({
    winnerCorrect: acc.winnerCorrect + (comp.metrics.winnerCorrect ? 1 : 0),
    totalPodiumHits: acc.totalPodiumHits + comp.metrics.podiumHits,
    totalTop5Hits: acc.totalTop5Hits + comp.metrics.top5Hits,
    races: acc.races + 1
  }), { winnerCorrect: 0, totalPodiumHits: 0, totalTop5Hits: 0, races: 0 });

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
        <CompareArrowsIcon sx={{ color: '#E10600', fontSize: '1.8rem' }} />
        <Box>
          <Typography
            variant="h5"
            sx={{ fontFamily: '"Orbitron", sans-serif', fontWeight: 700 }}
          >
            PREDICTION ACCURACY
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
            How our model's predictions compared to actual race results
          </Typography>
        </Box>
      </Box>

      {/* Overall Accuracy Stats */}
      <Box
        sx={{
          mb: 4,
          p: 3,
          background: 'linear-gradient(145deg, rgba(225, 6, 0, 0.1) 0%, rgba(26, 26, 26, 0.8) 100%)',
          borderRadius: '16px',
          border: '1px solid rgba(225, 6, 0, 0.2)'
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontFamily: '"Orbitron", sans-serif', fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <AnalyticsIcon /> OVERALL MODEL PERFORMANCE
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                Winner Predictions
              </Typography>
              <Typography
                variant="h4"
                sx={{ fontFamily: '"Orbitron", sans-serif', fontWeight: 800, color: '#FFD700' }}
              >
                {overallMetrics.races > 0 
                  ? `${((overallMetrics.winnerCorrect / overallMetrics.races) * 100).toFixed(0)}%`
                  : '—'}
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>
                {overallMetrics.winnerCorrect}/{overallMetrics.races} correct
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                Podium Accuracy
              </Typography>
              <Typography
                variant="h4"
                sx={{ fontFamily: '"Orbitron", sans-serif', fontWeight: 800, color: '#C0C0C0' }}
              >
                {overallMetrics.races > 0 
                  ? `${((overallMetrics.totalPodiumHits / (overallMetrics.races * 3)) * 100).toFixed(0)}%`
                  : '—'}
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>
                {overallMetrics.totalPodiumHits}/{overallMetrics.races * 3} positions
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                Top 5 Accuracy
              </Typography>
              <Typography
                variant="h4"
                sx={{ fontFamily: '"Orbitron", sans-serif', fontWeight: 800, color: '#E10600' }}
              >
                {overallMetrics.races > 0 
                  ? `${((overallMetrics.totalTop5Hits / (overallMetrics.races * 5)) * 100).toFixed(0)}%`
                  : '—'}
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>
                {overallMetrics.totalTop5Hits}/{overallMetrics.races * 5} positions
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                Races Analyzed
              </Typography>
              <Typography
                variant="h4"
                sx={{ fontFamily: '"Orbitron", sans-serif', fontWeight: 800, color: '#00E676' }}
              >
                {overallMetrics.races}
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>
                recent races
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Race by Race Comparison */}
      <Typography
        variant="h6"
        sx={{ fontFamily: '"Orbitron", sans-serif', fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <EmojiEventsIcon /> RACE-BY-RACE COMPARISON
      </Typography>
      
      <Grid container spacing={2}>
        {comparisonData.map((comparison, index) => (
          <Grid item xs={12} md={6} key={comparison.race.round}>
            <ComparisonCard comparison={comparison} index={index} />
          </Grid>
        ))}
      </Grid>

      {/* Analysis Note */}
      <Box
        sx={{
          mt: 3,
          p: 2,
          background: 'rgba(33, 150, 243, 0.08)',
          borderRadius: '12px',
          border: '1px solid rgba(33, 150, 243, 0.2)'
        }}
      >
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
          <strong>Analysis Note:</strong> This comparison uses the current model's prediction methodology 
          applied to historical data. Actual predictions would have used data available at the time. 
          The model learns from these patterns to improve future predictions. Factors like weather, 
          crashes, and strategy calls introduce unpredictability that pure data analysis cannot capture.
        </Typography>
      </Box>
    </Box>
  );
};

export default PredictionComparison;

