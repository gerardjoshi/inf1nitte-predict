import React from 'react';
import { Box, Typography, Avatar, Grid, Chip, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { getDriverPhotoUrl, getTeamColor } from '../services/f1Api';

const DriverGrid = ({ predictions, onSelectDriver, selectedDriverId }) => {
  if (!predictions || predictions.length <= 3) return null;

  // Get drivers from 4th position onwards
  const otherDrivers = predictions.slice(3);

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      sx={{ marginTop: 4 }}
    >
      <Typography
        variant="h6"
        sx={{
          fontFamily: '"Orbitron", sans-serif',
          fontWeight: 700,
          marginBottom: 3,
          textAlign: 'center',
          color: 'rgba(255,255,255,0.8)'
        }}
      >
        OTHER CONTENDERS
      </Typography>

      <Grid container spacing={2}>
        {otherDrivers.map((prediction, index) => {
          const teamColor = getTeamColor(prediction.constructor?.constructorId);
          const isSelected = selectedDriverId === prediction.driver.driverId;
          const photoUrl = getDriverPhotoUrl(prediction.driver.driverId);
          const position = index + 4;

          return (
            <Grid item xs={6} sm={4} md={3} lg={2} key={prediction.driver.driverId}>
              <Tooltip
                title={`${prediction.driver.givenName} ${prediction.driver.familyName} - ${prediction.winProbability.toFixed(1)}% chance`}
                arrow
              >
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  onClick={() => onSelectDriver(prediction)}
                  sx={{
                    background: isSelected
                      ? `linear-gradient(145deg, ${teamColor}30 0%, rgba(26, 26, 26, 0.9) 100%)`
                      : 'linear-gradient(145deg, rgba(45, 45, 45, 0.5) 0%, rgba(26, 26, 26, 0.7) 100%)',
                    borderRadius: '16px',
                    border: isSelected 
                      ? `2px solid ${teamColor}` 
                      : '1px solid rgba(255, 255, 255, 0.08)',
                    padding: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '&:hover': {
                      borderColor: teamColor,
                      boxShadow: `0 8px 32px ${teamColor}30`
                    }
                  }}
                >
                  {/* Position Badge */}
                  <Chip
                    label={`P${position}`}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      background: 'rgba(0,0,0,0.5)',
                      color: 'rgba(255,255,255,0.7)',
                      fontFamily: '"Orbitron", sans-serif',
                      fontWeight: 600,
                      fontSize: '0.65rem',
                      height: '20px',
                      minWidth: '36px'
                    }}
                  />

                  {/* Driver Photo */}
                  <Avatar
                    src={photoUrl}
                    alt={prediction.driver.familyName}
                    sx={{
                      width: 60,
                      height: 60,
                      border: `3px solid ${teamColor}`,
                      marginBottom: 1.5,
                      boxShadow: isSelected ? `0 0 20px ${teamColor}50` : 'none'
                    }}
                  />

                  {/* Driver Code */}
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontFamily: '"Orbitron", sans-serif',
                      fontWeight: 700,
                      color: teamColor,
                      fontSize: '1rem'
                    }}
                  >
                    {prediction.driver.code || prediction.driver.familyName.substring(0, 3).toUpperCase()}
                  </Typography>

                  {/* Team */}
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'rgba(255,255,255,0.5)',
                      fontSize: '0.65rem',
                      textAlign: 'center',
                      marginBottom: 1
                    }}
                  >
                    {prediction.constructor?.name}
                  </Typography>

                  {/* Win Probability */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      background: 'rgba(225, 6, 0, 0.15)',
                      padding: '4px 8px',
                      borderRadius: '8px'
                    }}
                  >
                    <TrendingUpIcon sx={{ fontSize: '0.8rem', color: '#E10600' }} />
                    <Typography
                      variant="caption"
                      sx={{
                        fontFamily: '"Orbitron", sans-serif',
                        fontWeight: 600,
                        color: '#E10600',
                        fontSize: '0.75rem'
                      }}
                    >
                      {prediction.winProbability.toFixed(1)}%
                    </Typography>
                  </Box>
                </Box>
              </Tooltip>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default DriverGrid;

