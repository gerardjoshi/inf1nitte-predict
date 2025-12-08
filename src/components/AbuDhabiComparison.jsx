import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Chip, Avatar, LinearProgress, Divider, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import WarningIcon from '@mui/icons-material/Warning';
import { getDriverPhotoUrl, getTeamColor } from '../services/f1Api';
import { getAbuDhabi2025Results } from '../services/season2025Data';

const AbuDhabiComparison = ({ predictions }) => {
  const [actualResults, setActualResults] = useState(null);
  const [comparison, setComparison] = useState(null);

  useEffect(() => {
    // Get actual Abu Dhabi GP results
    const abuDhabiRace = getAbuDhabi2025Results();
    if (abuDhabiRace && abuDhabiRace.Results) {
      setActualResults(abuDhabiRace.Results);
      
      // Compare with predictions
      if (predictions && predictions.length > 0) {
        const predictedTop3 = predictions.slice(0, 3);
        const actualTop3 = abuDhabiRace.Results.slice(0, 3);
        const actualTop10 = abuDhabiRace.Results.slice(0, 10);
        
        // Calculate accuracy metrics
        const winnerCorrect = predictedTop3[0]?.driver?.driverId === actualTop3[0]?.Driver?.driverId;
        const podiumHits = predictedTop3.filter(p => 
          actualTop3.some(a => a.Driver?.driverId === p.driver?.driverId)
        ).length;
        const top10Hits = predictions.slice(0, 10).filter(p => 
          actualTop10.some(a => a.Driver?.driverId === p.driver?.driverId)
        ).length;
        
        // Find where predictions went wrong
        const wrongPredictions = predictedTop3.map((pred, index) => {
          const actualPosition = abuDhabiRace.Results.findIndex(
            r => r.Driver?.driverId === pred.driver?.driverId
          ) + 1;
          return {
            predicted: pred,
            predictedPosition: index + 1,
            actualPosition: actualPosition > 0 ? actualPosition : null,
            wasInTop3: actualPosition > 0 && actualPosition <= 3,
            positionDiff: actualPosition > 0 ? actualPosition - (index + 1) : null
          };
        });
        
        // Find surprises (drivers in actual top 3 but not predicted)
        const surprises = actualTop3.filter(actual => 
          !predictedTop3.some(p => p.driver?.driverId === actual.Driver?.driverId)
        );
        
        setComparison({
          winnerCorrect,
          podiumHits,
          top10Hits,
          podiumAccuracy: (podiumHits / 3) * 100,
          top10Accuracy: (top10Hits / 10) * 100,
          wrongPredictions,
          surprises,
          predictedTop3,
          actualTop3
        });
      }
    }
  }, [predictions]);

  if (!actualResults || !comparison) {
    return null;
  }

  const DriverCard = ({ driver, position, isPredicted, isActual, positionDiff, teamColor }) => {
    const driverId = driver?.driverId || driver?.Driver?.driverId;
    const code = driver?.code || driver?.Driver?.code;
    const givenName = driver?.givenName || driver?.Driver?.givenName;
    const familyName = driver?.familyName || driver?.Driver?.familyName;
    const actualTeamColor = teamColor || getTeamColor(driver?.Constructor?.constructorId || driver?.constructor?.constructorId);
    
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          p: 2,
          borderRadius: '12px',
          background: isPredicted && isActual 
            ? 'linear-gradient(90deg, rgba(0, 230, 118, 0.15) 0%, rgba(0, 230, 118, 0.05) 100%)'
            : isPredicted && !isActual
            ? 'linear-gradient(90deg, rgba(255, 82, 82, 0.15) 0%, rgba(255, 82, 82, 0.05) 100%)'
            : !isPredicted && isActual
            ? 'linear-gradient(90deg, rgba(255, 152, 0, 0.15) 0%, rgba(255, 152, 0, 0.05) 100%)'
            : 'rgba(255,255,255,0.03)',
          border: isPredicted && isActual
            ? '2px solid rgba(0, 230, 118, 0.4)'
            : isPredicted && !isActual
            ? '2px solid rgba(255, 82, 82, 0.4)'
            : !isPredicted && isActual
            ? '2px solid rgba(255, 152, 0, 0.4)'
            : '1px solid rgba(255,255,255,0.08)'
        }}
      >
        {/* Position Badge */}
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '10px',
            background: position === 1 ? '#FFD700' : position === 2 ? '#C0C0C0' : position === 3 ? '#CD7F32' : 'rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `2px solid ${actualTeamColor}`
          }}
        >
          <Typography
            sx={{
              fontFamily: '"Orbitron", sans-serif',
              fontWeight: 800,
              fontSize: '1rem',
              color: position <= 3 ? '#000' : '#fff'
            }}
          >
            {position}
          </Typography>
        </Box>

        {/* Driver Avatar */}
        <Avatar
          src={getDriverPhotoUrl(driverId)}
          sx={{ 
            width: 48, 
            height: 48, 
            border: `3px solid ${actualTeamColor}`,
            boxShadow: `0 0 10px ${actualTeamColor}40`
          }}
        />

        {/* Driver Info */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ fontFamily: '"Orbitron", sans-serif', fontWeight: 700, fontSize: '1rem' }}>
            {givenName} {familyName}
          </Typography>
          <Typography variant="caption" sx={{ color: actualTeamColor, fontWeight: 600 }}>
            {code}
          </Typography>
        </Box>

        {/* Status Icons */}
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          {isPredicted && isActual && (
            <CheckCircleIcon sx={{ color: '#00E676', fontSize: '1.5rem' }} />
          )}
          {isPredicted && !isActual && (
            <CancelIcon sx={{ color: '#FF5252', fontSize: '1.5rem' }} />
          )}
          {!isPredicted && isActual && (
            <WarningIcon sx={{ color: '#FF9800', fontSize: '1.5rem' }} />
          )}
          {positionDiff && positionDiff !== 0 && (
            positionDiff > 0 ? (
              <TrendingDownIcon sx={{ color: '#FF5252', fontSize: '1.2rem' }} />
            ) : (
              <TrendingUpIcon sx={{ color: '#00E676', fontSize: '1.2rem' }} />
            )
          )}
        </Box>
      </Box>
    );
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        background: 'linear-gradient(145deg, rgba(45, 45, 45, 0.6) 0%, rgba(26, 26, 26, 0.9) 100%)',
        backdropFilter: 'blur(10px)',
        borderRadius: '24px',
        border: '2px solid rgba(225, 6, 0, 0.3)',
        padding: { xs: '24px', md: '40px' },
        mb: 4,
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2 }}>
          <EmojiEventsIcon sx={{ color: '#E10600', fontSize: '2.5rem' }} />
          <Typography
            variant="h3"
            sx={{ 
              fontFamily: '"Orbitron", sans-serif', 
              fontWeight: 800,
              background: 'linear-gradient(135deg, #E10600 0%, #FF6B6B 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '1.8rem', md: '2.5rem' }
            }}
          >
            ABU DHABI GP 2025
          </Typography>
        </Box>
        <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.7)', fontFamily: '"Rajdhani", sans-serif' }}>
          Prediction vs Reality • December 7, 2025
        </Typography>
      </Box>

      {/* Overall Accuracy Stats */}
      <Box
        sx={{
          mb: 4,
          p: 3,
          background: 'linear-gradient(145deg, rgba(225, 6, 0, 0.15) 0%, rgba(26, 26, 26, 0.8) 100%)',
          borderRadius: '20px',
          border: '2px solid rgba(225, 6, 0, 0.3)'
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontFamily: '"Orbitron", sans-serif', fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <AnalyticsIcon /> MODEL ACCURACY
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', display: 'block', mb: 1 }}>
                Winner Prediction
              </Typography>
              <Typography
                variant="h3"
                sx={{ 
                  fontFamily: '"Orbitron", sans-serif', 
                  fontWeight: 800, 
                  color: comparison.winnerCorrect ? '#00E676' : '#FF5252',
                  mb: 0.5
                }}
              >
                {comparison.winnerCorrect ? '✓' : '✗'}
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>
                {comparison.winnerCorrect ? 'Correct' : 'Incorrect'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', display: 'block', mb: 1 }}>
                Podium Accuracy
              </Typography>
              <Typography
                variant="h3"
                sx={{ fontFamily: '"Orbitron", sans-serif', fontWeight: 800, color: '#C0C0C0' }}
              >
                {comparison.podiumAccuracy.toFixed(0)}%
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>
                {comparison.podiumHits}/3 correct
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', display: 'block', mb: 1 }}>
                Top 10 Accuracy
              </Typography>
              <Typography
                variant="h3"
                sx={{ fontFamily: '"Orbitron", sans-serif', fontWeight: 800, color: '#E10600' }}
              >
                {comparison.top10Accuracy.toFixed(0)}%
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>
                {comparison.top10Hits}/10 correct
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', display: 'block', mb: 1 }}>
                Overall Score
              </Typography>
              <Typography
                variant="h3"
                sx={{ 
                  fontFamily: '"Orbitron", sans-serif', 
                  fontWeight: 800,
                  color: comparison.podiumAccuracy >= 66 ? '#00E676' : comparison.podiumAccuracy >= 33 ? '#FF9800' : '#FF5252'
                }}
              >
                {((comparison.podiumAccuracy + comparison.top10Accuracy) / 2).toFixed(0)}%
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>
                Combined metric
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Side-by-Side Comparison */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        {/* Predicted Podium */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h6"
            sx={{ 
              fontFamily: '"Orbitron", sans-serif', 
              fontWeight: 700, 
              mb: 2,
              color: '#E10600',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <TrendingUpIcon /> MODEL PREDICTED
          </Typography>
          {comparison.predictedTop3.map((pred, index) => {
            const actualPos = actualResults.findIndex(
              r => r.Driver?.driverId === pred.driver?.driverId
            ) + 1;
            const isCorrect = actualPos > 0 && actualPos <= 3 && actualPos === index + 1;
            const wasInTop3 = actualPos > 0 && actualPos <= 3;
            
            return (
              <Box key={pred.driver?.driverId} sx={{ mb: 2 }}>
                <DriverCard
                  driver={pred.driver}
                  position={index + 1}
                  isPredicted={true}
                  isActual={wasInTop3}
                  positionDiff={actualPos > 0 ? actualPos - (index + 1) : null}
                  teamColor={getTeamColor(pred.constructor?.constructorId)}
                />
                {actualPos > 0 && actualPos !== index + 1 && (
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', ml: 2, display: 'block', mt: 0.5 }}>
                    Actually finished P{actualPos}
                  </Typography>
                )}
              </Box>
            );
          })}
        </Grid>

        {/* Actual Podium */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h6"
            sx={{ 
              fontFamily: '"Orbitron", sans-serif', 
              fontWeight: 700, 
              mb: 2,
              color: '#00E676',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <EmojiEventsIcon /> ACTUAL RESULT
          </Typography>
          {comparison.actualTop3.map((actual, index) => {
            const wasPredicted = comparison.predictedTop3.some(
              p => p.driver?.driverId === actual.Driver?.driverId
            );
            const predictedPos = comparison.predictedTop3.findIndex(
              p => p.driver?.driverId === actual.Driver?.driverId
            ) + 1;
            
            return (
              <Box key={actual.Driver?.driverId} sx={{ mb: 2 }}>
                <DriverCard
                  driver={actual.Driver}
                  position={index + 1}
                  isPredicted={wasPredicted}
                  isActual={true}
                  positionDiff={wasPredicted && predictedPos > 0 ? (index + 1) - predictedPos : null}
                  teamColor={getTeamColor(actual.Constructor?.constructorId)}
                />
                {wasPredicted && predictedPos !== index + 1 && (
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', ml: 2, display: 'block', mt: 0.5 }}>
                    Predicted P{predictedPos}
                  </Typography>
                )}
                {!wasPredicted && (
                  <Chip
                    label="Surprise!"
                    size="small"
                    sx={{
                      ml: 2,
                      mt: 0.5,
                      background: 'rgba(255, 152, 0, 0.2)',
                      color: '#FF9800',
                      fontFamily: '"Orbitron", sans-serif',
                      fontWeight: 600
                    }}
                  />
                )}
              </Box>
            );
          })}
        </Grid>
      </Grid>

      {/* Analysis Section */}
      <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />

      <Box>
        <Typography
          variant="h5"
          sx={{ fontFamily: '"Orbitron", sans-serif', fontWeight: 700, mb: 3 }}
        >
          ANALYSIS & IMPROVEMENT AREAS
        </Typography>

        {/* What Went Wrong */}
        {comparison.wrongPredictions.some(w => !w.wasInTop3 || w.positionDiff !== 0) && (
          <Alert 
            severity="error" 
            icon={<CancelIcon />}
            sx={{ 
              mb: 2,
              background: 'rgba(255, 82, 82, 0.1)',
              border: '1px solid rgba(255, 82, 82, 0.3)',
              '& .MuiAlert-icon': { color: '#FF5252' }
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
              Where the Model Went Wrong:
            </Typography>
            <Box component="ul" sx={{ pl: 2, m: 0 }}>
              {comparison.wrongPredictions.map((wrong, idx) => {
                if (wrong.wasInTop3 && wrong.positionDiff === 0) return null;
                return (
                  <li key={idx} style={{ marginBottom: '8px' }}>
                    <Typography variant="body2">
                      <strong>{wrong.predicted.driver?.givenName} {wrong.predicted.driver?.familyName}</strong> was 
                      predicted P{wrong.predictedPosition} but finished 
                      {wrong.actualPosition ? ` P${wrong.actualPosition}` : ' outside the points'}
                      {wrong.positionDiff && wrong.positionDiff !== 0 && (
                        <span style={{ color: wrong.positionDiff > 0 ? '#FF5252' : '#00E676' }}>
                          {' '}({wrong.positionDiff > 0 ? '-' : '+'}{Math.abs(wrong.positionDiff)} positions)
                        </span>
                      )}
                    </Typography>
                  </li>
                );
              })}
            </Box>
          </Alert>
        )}

        {/* Surprises */}
        {comparison.surprises.length > 0 && (
          <Alert 
            severity="warning" 
            icon={<WarningIcon />}
            sx={{ 
              mb: 2,
              background: 'rgba(255, 152, 0, 0.1)',
              border: '1px solid rgba(255, 152, 0, 0.3)',
              '& .MuiAlert-icon': { color: '#FF9800' }
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
              Surprises (Not Predicted in Top 3):
            </Typography>
            <Box component="ul" sx={{ pl: 2, m: 0 }}>
              {comparison.surprises.map((surprise, idx) => (
                <li key={idx} style={{ marginBottom: '8px' }}>
                  <Typography variant="body2">
                    <strong>{surprise.Driver?.givenName} {surprise.Driver?.familyName}</strong> finished 
                    P{surprise.position} but wasn't in our predicted top 3
                  </Typography>
                </li>
              ))}
            </Box>
          </Alert>
        )}

        {/* Improvement Areas */}
        <Alert 
          severity="info" 
          icon={<AnalyticsIcon />}
          sx={{ 
            background: 'rgba(33, 150, 243, 0.1)',
            border: '1px solid rgba(33, 150, 243, 0.3)',
            '& .MuiAlert-icon': { color: '#2196F3' }
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
            Model Improvement Areas:
          </Typography>
          <Box component="ul" sx={{ pl: 2, m: 0 }}>
            <li>
              <Typography variant="body2">
                <strong>Race Strategy Factors:</strong> The model may need better weighting of race strategy, 
                tire management, and pit stop timing which significantly impact final positions.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                <strong>Overtaking Ability:</strong> Consider adding a feature for driver overtaking statistics, 
                especially for circuits like Yas Marina where track position matters.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                <strong>Recent Form Weight:</strong> Increase the weight of the most recent 2-3 races 
                as they better reflect current car performance and driver confidence.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                <strong>Qualifying to Race Conversion:</strong> Better model the relationship between 
                qualifying position and race finish, accounting for race pace vs. qualifying pace differences.
              </Typography>
            </li>
            {comparison.surprises.length > 0 && (
              <li>
                <Typography variant="body2">
                  <strong>Unexpected Performances:</strong> The model should better account for drivers 
                  who consistently outperform expectations, especially in race conditions vs. qualifying.
                </Typography>
              </li>
            )}
          </Box>
        </Alert>
      </Box>
    </Box>
  );
};

export default AbuDhabiComparison;

