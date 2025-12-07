import React from 'react';
import { Box, Typography, Grid, LinearProgress, Tooltip, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import InsightsIcon from '@mui/icons-material/Insights';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SpeedIcon from '@mui/icons-material/Speed';
import GroupsIcon from '@mui/icons-material/Groups';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import TimelineIcon from '@mui/icons-material/Timeline';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import predictionModel from '../services/predictionModel';
import { getTeamColor } from '../services/f1Api';

const FeatureAnalysis = ({ driver }) => {
  if (!driver) return null;

  const featureAnalysis = predictionModel.getFeatureAnalysis(driver) || [];
  const teamColor = getTeamColor(driver.constructor?.constructorId);
  
  // Safety check - if no feature analysis available, don't render
  if (featureAnalysis.length === 0) return null;

  const getFeatureIcon = (featureName) => {
    const icons = {
      'Championship Position': <EmojiEventsIcon sx={{ fontSize: '1.2rem' }} />,
      'Recent Race Form': <TrendingUpIcon sx={{ fontSize: '1.2rem' }} />,
      'Qualifying Performance': <SpeedIcon sx={{ fontSize: '1.2rem' }} />,
      'Circuit-Specific History': <TrackChangesIcon sx={{ fontSize: '1.2rem' }} />,
      'Constructor/Team Strength': <GroupsIcon sx={{ fontSize: '1.2rem' }} />,
      'Position Gains/Losses': <TimelineIcon sx={{ fontSize: '1.2rem' }} />,
      'Head-to-Head Record': <CompareArrowsIcon sx={{ fontSize: '1.2rem' }} />
    };
    return icons[featureName] || <InsightsIcon sx={{ fontSize: '1.2rem' }} />;
  };

  const getScoreColor = (score) => {
    if (score >= 70) return '#00E676';
    if (score >= 50) return '#FFD700';
    if (score >= 30) return '#FF9800';
    return '#FF5252';
  };

  const FeatureBar = ({ feature, index }) => {
    const scoreColor = getScoreColor(feature.score);
    
    return (
      <Box
        component={motion.div}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        sx={{ mb: 3 }}
      >
        {/* Feature Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: '8px',
              background: `${scoreColor}20`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: scoreColor
            }}
          >
            {getFeatureIcon(feature.feature)}
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              {feature.feature}
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
              Weight: {feature.weight.toFixed(0)}% • Source: {feature.dataSource}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Orbitron", sans-serif',
                fontWeight: 700,
                color: scoreColor
              }}
            >
              {feature.score.toFixed(1)}
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>
              /100
            </Typography>
          </Box>
        </Box>

        {/* Progress Bar */}
        <Box sx={{ position: 'relative' }}>
          <LinearProgress
            variant="determinate"
            value={feature.score}
            sx={{
              height: 12,
              borderRadius: 6,
              backgroundColor: 'rgba(255,255,255,0.1)',
              '& .MuiLinearProgress-bar': {
                borderRadius: 6,
                background: `linear-gradient(90deg, ${scoreColor} 0%, ${scoreColor}80 100%)`
              }
            }}
          />
          {/* Weight indicator */}
          <Box
            sx={{
              position: 'absolute',
              left: `${feature.weight}%`,
              top: -4,
              width: 2,
              height: 20,
              background: 'rgba(255,255,255,0.5)',
              borderRadius: 1
            }}
          />
        </Box>

        {/* Description */}
        <Typography
          variant="caption"
          sx={{ color: 'rgba(255,255,255,0.6)', mt: 1, display: 'block' }}
        >
          {feature.description}
        </Typography>

        {/* Impact */}
        <Chip
          label={feature.impact}
          size="small"
          sx={{
            mt: 1,
            height: '20px',
            fontSize: '0.65rem',
            background: 'rgba(255,255,255,0.05)',
            color: 'rgba(255,255,255,0.6)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        />
      </Box>
    );
  };

  // Calculate weighted total
  const weightedTotal = featureAnalysis.reduce((sum, f) => sum + f.weightedScore, 0);

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      sx={{
        background: 'linear-gradient(145deg, rgba(45, 45, 45, 0.6) 0%, rgba(26, 26, 26, 0.8) 100%)',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        padding: { xs: '20px', md: '30px' },
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Team color accent */}
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

      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <InsightsIcon sx={{ color: '#E10600', fontSize: '1.8rem' }} />
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h5"
            sx={{ fontFamily: '"Orbitron", sans-serif', fontWeight: 700 }}
          >
            FEATURE ANALYSIS
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
            Detailed breakdown for {driver.driver.givenName} {driver.driver.familyName}
          </Typography>
        </Box>
        
        {/* Overall Score */}
        <Box
          sx={{
            textAlign: 'center',
            p: 2,
            background: `${teamColor}20`,
            borderRadius: '12px',
            border: `1px solid ${teamColor}40`
          }}
        >
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
            Weighted Score
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Orbitron", sans-serif',
              fontWeight: 800,
              color: teamColor
            }}
          >
            {weightedTotal.toFixed(1)}
          </Typography>
        </Box>
      </Box>

      {/* Feature Vector Display */}
      <Box
        sx={{
          mb: 4,
          p: 2,
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.05)'
        }}
      >
        <Typography
          variant="caption"
          sx={{ color: 'rgba(255,255,255,0.5)', mb: 1, display: 'block', letterSpacing: '0.1em' }}
        >
          FEATURE VECTOR (Neural Network Input)
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {driver.featureVector?.map((value, index) => (
            <Tooltip 
              key={index} 
              title={`Feature ${index + 1}: ${(value * 100).toFixed(1)}%`}
              arrow
            >
              <Chip
                label={value.toFixed(3)}
                size="small"
                sx={{
                  fontFamily: 'monospace',
                  fontSize: '0.75rem',
                  background: `rgba(225, 6, 0, ${value * 0.5 + 0.1})`,
                  color: '#fff',
                  border: '1px solid rgba(225, 6, 0, 0.3)'
                }}
              />
            </Tooltip>
          )) || <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)' }}>No feature vector available</Typography>}
        </Box>
      </Box>

      {/* Individual Features */}
      <Typography
        variant="h6"
        sx={{ fontFamily: '"Orbitron", sans-serif', fontWeight: 700, mb: 3 }}
      >
        INDIVIDUAL FEATURES
      </Typography>
      
      {featureAnalysis.map((feature, index) => (
        <FeatureBar key={feature.feature} feature={feature} index={index} />
      ))}

      {/* Contribution Chart */}
      <Box sx={{ mt: 4 }}>
        <Typography
          variant="h6"
          sx={{ fontFamily: '"Orbitron", sans-serif', fontWeight: 700, mb: 2 }}
        >
          CONTRIBUTION TO PREDICTION
        </Typography>
        
        <Box
          sx={{
            display: 'flex',
            height: '40px',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          {featureAnalysis.map((feature, index) => {
            const contribution = (feature.weightedScore / weightedTotal) * 100;
            const colors = ['#E10600', '#FF6B6B', '#FFD700', '#00E676', '#29B6F6', '#9C27B0', '#FF9800'];
            
            return (
              <Tooltip
                key={feature.feature}
                title={`${feature.feature}: ${contribution.toFixed(1)}%`}
                arrow
              >
                <Box
                  sx={{
                    width: `${contribution}%`,
                    background: colors[index % colors.length],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: contribution > 5 ? '40px' : '20px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      filter: 'brightness(1.2)'
                    }
                  }}
                >
                  {contribution > 10 && (
                    <Typography
                      variant="caption"
                      sx={{ 
                        fontWeight: 700, 
                        color: '#fff',
                        textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                        fontSize: '0.65rem'
                      }}
                    >
                      {contribution.toFixed(0)}%
                    </Typography>
                  )}
                </Box>
              </Tooltip>
            );
          })}
        </Box>
        
        {/* Legend */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
          {featureAnalysis.map((feature, index) => {
            const colors = ['#E10600', '#FF6B6B', '#FFD700', '#00E676', '#29B6F6', '#9C27B0', '#FF9800'];
            return (
              <Box key={feature.feature} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '2px',
                    background: colors[index % colors.length]
                  }}
                />
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.65rem' }}>
                  {feature.feature.split(' ')[0]}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default FeatureAnalysis;

