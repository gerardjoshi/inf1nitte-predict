import React from 'react';
import { Box, Typography, Avatar, Chip, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { getDriverPhotoUrl, getTeamColor } from '../services/f1Api';

const Podium = ({ predictions, onSelectDriver, selectedDriverId }) => {
  if (!predictions || predictions.length < 3) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography>Loading predictions...</Typography>
      </Box>
    );
  }

  // Reorder for podium display: 2nd, 1st, 3rd
  const podiumOrder = [predictions[1], predictions[0], predictions[2]];
  const podiumHeights = ['180px', '240px', '140px'];
  const podiumPositions = ['2', '1', '3'];
  const podiumColors = ['#C0C0C0', '#FFD700', '#CD7F32'];
  const podiumLabels = ['P2', 'P1', 'P3'];

  const PodiumDriver = ({ prediction, height, position, color, label, index }) => {
    const teamColor = getTeamColor(prediction.constructor?.constructorId);
    const isSelected = selectedDriverId === prediction.driver.driverId;
    const photoUrl = getDriverPhotoUrl(prediction.driver.driverId);

    return (
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        onClick={() => onSelectDriver(prediction)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'translateY(-10px)'
          }
        }}
      >
        {/* Trophy for P1 */}
        {position === '1' && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.5, type: 'spring' }}
          >
            <EmojiEventsIcon
              sx={{
                fontSize: '3rem',
                color: '#FFD700',
                filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.5))',
                marginBottom: 1
              }}
            />
          </motion.div>
        )}

        {/* Driver Photo */}
        <Box
          sx={{
            position: 'relative',
            marginBottom: 2
          }}
        >
          <Avatar
            src={photoUrl}
            alt={prediction.driver.familyName}
            sx={{
              width: position === '1' ? 120 : 90,
              height: position === '1' ? 120 : 90,
              border: `4px solid ${teamColor}`,
              boxShadow: isSelected 
                ? `0 0 30px ${teamColor}, 0 0 60px rgba(225, 6, 0, 0.5)`
                : `0 8px 32px rgba(0,0,0,0.4)`,
              transition: 'all 0.3s ease',
              background: 'linear-gradient(145deg, #2d2d2d 0%, #1a1a1a 100%)'
            }}
          />
          
          {/* Win Probability Badge */}
          <Chip
            label={`${prediction.winProbability.toFixed(1)}%`}
            size="small"
            icon={<TrendingUpIcon sx={{ fontSize: '0.9rem !important' }} />}
            sx={{
              position: 'absolute',
              bottom: -8,
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(135deg, #E10600 0%, #B30500 100%)',
              color: '#fff',
              fontFamily: '"Orbitron", sans-serif',
              fontWeight: 700,
              fontSize: '0.75rem',
              boxShadow: '0 4px 15px rgba(225, 6, 0, 0.4)',
              '& .MuiChip-icon': {
                color: '#fff'
              }
            }}
          />
        </Box>

        {/* Driver Name */}
        <Typography
          variant="h6"
          sx={{
            fontFamily: '"Orbitron", sans-serif',
            fontWeight: 700,
            textAlign: 'center',
            fontSize: position === '1' ? '1.1rem' : '0.95rem',
            marginBottom: 0.5,
            textShadow: '0 2px 10px rgba(0,0,0,0.5)'
          }}
        >
          {prediction.driver.givenName}
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontFamily: '"Orbitron", sans-serif',
            fontWeight: 800,
            textAlign: 'center',
            fontSize: position === '1' ? '1.5rem' : '1.2rem',
            color: teamColor,
            textShadow: `0 0 20px ${teamColor}40`
          }}
        >
          {prediction.driver.familyName.toUpperCase()}
        </Typography>

        {/* Team Name */}
        <Typography
          variant="caption"
          sx={{
            color: 'rgba(255,255,255,0.6)',
            fontFamily: '"Rajdhani", sans-serif',
            marginTop: 0.5,
            marginBottom: 2
          }}
        >
          {prediction.constructor?.name}
        </Typography>

        {/* Podium Bar */}
        <Box
          component={motion.div}
          initial={{ height: 0 }}
          animate={{ height }}
          transition={{ duration: 0.8, delay: 0.3 + index * 0.1, ease: 'easeOut' }}
          sx={{
            width: position === '1' ? '140px' : '110px',
            background: `linear-gradient(180deg, ${color}40 0%, ${color}20 50%, ${color}10 100%)`,
            borderRadius: '12px 12px 0 0',
            border: `2px solid ${color}60`,
            borderBottom: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingTop: 2,
            position: 'relative',
            overflow: 'hidden',
            boxShadow: `0 -10px 40px ${color}30`
          }}
        >
          {/* Position Number */}
          <Typography
            variant="h2"
            sx={{
              fontFamily: '"Orbitron", sans-serif',
              fontWeight: 900,
              color: color,
              textShadow: `0 0 30px ${color}`,
              fontSize: position === '1' ? '4rem' : '3rem'
            }}
          >
            {position}
          </Typography>

          {/* Decorative racing stripes */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: color
            }}
          />
        </Box>
      </Box>
    );
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      sx={{
        marginBottom: 4
      }}
    >
      {/* Section Header */}
      <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
        <Typography
          variant="overline"
          sx={{
            color: '#E10600',
            letterSpacing: '0.3em',
            fontSize: '0.8rem'
          }}
        >
          AI PREDICTION
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontFamily: '"Orbitron", sans-serif',
            fontWeight: 800,
            marginTop: 1
          }}
        >
          PREDICTED PODIUM
        </Typography>
      </Box>

      {/* Podium Display */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          gap: { xs: 1, md: 3 },
          padding: { xs: '0 10px', md: '0 40px' },
          paddingBottom: 0
        }}
      >
        {podiumOrder.map((prediction, index) => (
          <PodiumDriver
            key={prediction.driver.driverId}
            prediction={prediction}
            height={podiumHeights[index]}
            position={podiumPositions[index]}
            color={podiumColors[index]}
            label={podiumLabels[index]}
            index={index}
          />
        ))}
      </Box>

      {/* Podium Base */}
      <Box
        sx={{
          height: '20px',
          background: 'linear-gradient(180deg, #2d2d2d 0%, #1a1a1a 100%)',
          borderRadius: '0 0 20px 20px',
          marginX: { xs: 2, md: 8 },
          boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
        }}
      />

      {/* Confidence Note */}
      <Box sx={{ textAlign: 'center', marginTop: 3 }}>
        <Chip
          label={`Model Confidence: ${predictions[0]?.confidence || 'Medium'}`}
          sx={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.7)',
            fontFamily: '"Rajdhani", sans-serif'
          }}
        />
      </Box>
    </Box>
  );
};

export default Podium;

