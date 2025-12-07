import React from 'react';
import { Box, Typography, Avatar, Grid, Chip, LinearProgress, Divider } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import PersonIcon from '@mui/icons-material/Person';
import FlagIcon from '@mui/icons-material/Flag';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SpeedIcon from '@mui/icons-material/Speed';
import TimelineIcon from '@mui/icons-material/Timeline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupsIcon from '@mui/icons-material/Groups';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import { getDriverPhotoUrl, getTeamColor } from '../services/f1Api';
import predictionModel from '../services/predictionModel';

const DriverDetails = ({ driver, allPredictions }) => {
  if (!driver) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '300px',
          color: 'rgba(255,255,255,0.5)'
        }}
      >
        <PersonIcon sx={{ fontSize: '4rem', mb: 2, opacity: 0.3 }} />
        <Typography variant="h6">Select a driver to view details</Typography>
      </Box>
    );
  }

  const teamColor = getTeamColor(driver.constructor?.constructorId);
  const photoUrl = getDriverPhotoUrl(driver.driver.driverId);
  const featureImportance = predictionModel.getFeatureAnalysis(driver) || [];

  const StatBox = ({ icon, label, value, color = '#fff' }) => (
    <Box
      sx={{
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '12px',
        padding: '16px',
        border: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        flexDirection: 'column',
        gap: 1
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {icon}
        <Typography
          variant="caption"
          sx={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}
        >
          {label}
        </Typography>
      </Box>
      <Typography
        variant="h5"
        sx={{
          fontFamily: '"Orbitron", sans-serif',
          fontWeight: 700,
          color
        }}
      >
        {value}
      </Typography>
    </Box>
  );

  const FactorBar = ({ factor, score, contribution }) => {
    const getFactorIcon = (factorName) => {
      const icons = {
        'Championship Position': <EmojiEventsIcon sx={{ fontSize: '1rem' }} />,
        'Recent Race Form': <TrendingUpIcon sx={{ fontSize: '1rem' }} />,
        'Qualifying Performance': <SpeedIcon sx={{ fontSize: '1rem' }} />,
        'Circuit-Specific History': <TrackChangesIcon sx={{ fontSize: '1rem' }} />,
        'Constructor/Team Strength': <GroupsIcon sx={{ fontSize: '1rem' }} />,
        'Position Gains/Losses': <TimelineIcon sx={{ fontSize: '1rem' }} />,
        'Head-to-Head Record': <TimelineIcon sx={{ fontSize: '1rem' }} />
      };
      return icons[factorName] || <TimelineIcon sx={{ fontSize: '1rem' }} />;
    };

    return (
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {getFactorIcon(factor)}
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
              {factor}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{
              fontFamily: '"Orbitron", sans-serif',
              fontWeight: 600,
              color: '#E10600'
            }}
          >
            {score.toFixed(1)}%
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={score}
          sx={{
            height: 6,
            borderRadius: 3,
            backgroundColor: 'rgba(255,255,255,0.1)',
            '& .MuiLinearProgress-bar': {
              borderRadius: 3,
              background: `linear-gradient(90deg, ${teamColor} 0%, #E10600 100%)`
            }
          }}
        />
      </Box>
    );
  };

  const getRankSuffix = (rank) => {
    if (rank === 1) return 'st';
    if (rank === 2) return 'nd';
    if (rank === 3) return 'rd';
    return 'th';
  };

  const predictionRank = allPredictions?.findIndex(p => p.driver.driverId === driver.driver.driverId) + 1;

  return (
    <AnimatePresence mode="wait">
      <Box
        component={motion.div}
        key={driver.driver.driverId}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.4 }}
        sx={{
          background: 'linear-gradient(145deg, rgba(45, 45, 45, 0.6) 0%, rgba(26, 26, 26, 0.8) 100%)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* Team Color Accent */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: `linear-gradient(90deg, ${teamColor} 0%, transparent 100%)`
          }}
        />

        {/* Header Section */}
        <Box
          sx={{
            padding: { xs: '20px', md: '30px' },
            background: `linear-gradient(135deg, ${teamColor}15 0%, transparent 50%)`,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'center', sm: 'flex-start' },
            gap: 3
          }}
        >
          {/* Driver Photo */}
          <Box sx={{ position: 'relative' }}>
            <Avatar
              src={photoUrl}
              alt={driver.driver.familyName}
              sx={{
                width: 140,
                height: 140,
                border: `4px solid ${teamColor}`,
                boxShadow: `0 0 40px ${teamColor}40`
              }}
            />
            <Chip
              label={`P${predictionRank}`}
              sx={{
                position: 'absolute',
                bottom: -5,
                right: -5,
                background: predictionRank <= 3 
                  ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'
                  : 'linear-gradient(135deg, #E10600 0%, #B30500 100%)',
                color: predictionRank <= 3 ? '#000' : '#fff',
                fontFamily: '"Orbitron", sans-serif',
                fontWeight: 800,
                fontSize: '1rem',
                height: '32px'
              }}
            />
          </Box>

          {/* Driver Info */}
          <Box sx={{ flex: 1, textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography
              variant="overline"
              sx={{ color: teamColor, letterSpacing: '0.2em' }}
            >
              {driver.constructor?.name}
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontFamily: '"Orbitron", sans-serif',
                fontWeight: 800,
                marginBottom: 1,
                fontSize: { xs: '1.8rem', md: '2.5rem' }
              }}
            >
              {driver.driver.givenName}{' '}
              <Box component="span" sx={{ color: teamColor }}>
                {driver.driver.familyName.toUpperCase()}
              </Box>
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
              <Chip
                icon={<FlagIcon />}
                label={driver.driver.nationality}
                sx={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              />
              <Chip
                label={`#${driver.driver.permanentNumber || driver.driver.code}`}
                sx={{
                  background: `${teamColor}30`,
                  border: `1px solid ${teamColor}`,
                  color: teamColor,
                  fontFamily: '"Orbitron", sans-serif',
                  fontWeight: 700
                }}
              />
            </Box>
          </Box>

          {/* Win Probability Circle */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Box
              sx={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: `conic-gradient(#E10600 ${driver.winProbability * 3.6}deg, rgba(255,255,255,0.1) 0deg)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: '#1a1a1a',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: '"Orbitron", sans-serif',
                    fontWeight: 800,
                    color: '#E10600'
                  }}
                >
                  {driver.winProbability.toFixed(1)}%
                </Typography>
              </Box>
            </Box>
            <Typography
              variant="caption"
              sx={{
                color: 'rgba(255,255,255,0.5)',
                marginTop: 1,
                letterSpacing: '0.1em'
              }}
            >
              WIN CHANCE
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

        {/* Stats Grid */}
        <Box sx={{ padding: { xs: '20px', md: '30px' } }}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: '"Orbitron", sans-serif',
              fontWeight: 700,
              marginBottom: 3
            }}
          >
            SEASON STATISTICS
          </Typography>

          <Grid container spacing={2} sx={{ marginBottom: 4 }}>
            <Grid item xs={6} md={3}>
              <StatBox
                icon={<EmojiEventsIcon sx={{ color: '#FFD700', fontSize: '1.2rem' }} />}
                label="CHAMPIONSHIP"
                value={`${driver.championshipPosition}${getRankSuffix(driver.championshipPosition)}`}
                color={driver.championshipPosition <= 3 ? '#FFD700' : '#fff'}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <StatBox
                icon={<SpeedIcon sx={{ color: '#E10600', fontSize: '1.2rem' }} />}
                label="POINTS"
                value={driver.championshipPoints}
                color="#E10600"
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <StatBox
                icon={<TrendingUpIcon sx={{ color: '#00E676', fontSize: '1.2rem' }} />}
                label="PREDICTION RANK"
                value={`${predictionRank}${getRankSuffix(predictionRank)}`}
                color={predictionRank <= 3 ? '#00E676' : '#fff'}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <StatBox
                icon={<TimelineIcon sx={{ color: teamColor, fontSize: '1.2rem' }} />}
                label="CONFIDENCE"
                value={driver.confidence}
                color={teamColor}
              />
            </Grid>
          </Grid>

          {/* Factor Analysis */}
          <Typography
            variant="h6"
            sx={{
              fontFamily: '"Orbitron", sans-serif',
              fontWeight: 700,
              marginBottom: 3
            }}
          >
            PREDICTION FACTORS
          </Typography>

          <Box>
            {featureImportance.map((item, index) => (
              <FactorBar
                key={item.feature}
                factor={item.feature}
                score={item.score}
                contribution={item.weightedScore}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </AnimatePresence>
  );
};

export default DriverDetails;

