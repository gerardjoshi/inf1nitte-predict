import React from 'react';
import { Box, Typography, Grid, Chip, LinearProgress, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import StorageIcon from '@mui/icons-material/Storage';
import ApiIcon from '@mui/icons-material/Api';
import DataObjectIcon from '@mui/icons-material/DataObject';
import UpdateIcon from '@mui/icons-material/Update';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SpeedIcon from '@mui/icons-material/Speed';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TimelineIcon from '@mui/icons-material/Timeline';
import { FEATURE_CONFIG } from '../services/predictionModel';

const DataSourcesPanel = ({ dataUsed, modelMetrics }) => {
  const dataSources = [
    {
      name: 'Driver Standings API',
      endpoint: 'api.jolpi.ca/ergast/f1/current/driverStandings',
      description: 'Current championship standings with points and positions',
      status: 'active',
      dataPoints: dataUsed?.driversAnalyzed || 20,
      icon: <EmojiEventsIcon />
    },
    {
      name: 'Constructor Standings API',
      endpoint: 'api.jolpi.ca/ergast/f1/current/constructorStandings',
      description: 'Team championship positions and car performance metrics',
      status: 'active',
      dataPoints: 10,
      icon: <SpeedIcon />
    },
    {
      name: 'Race Results API',
      endpoint: 'api.jolpi.ca/ergast/f1/current/results',
      description: 'Complete race results including grid positions, finish positions, and lap times',
      status: 'active',
      dataPoints: dataUsed?.totalRacesAnalyzed || 0,
      icon: <TimelineIcon />
    },
    {
      name: 'Qualifying Data',
      endpoint: 'api.jolpi.ca/ergast/f1/current/{round}/qualifying',
      description: 'Qualifying session results - Q1, Q2, Q3 times and grid positions',
      status: 'active',
      dataPoints: dataUsed?.qualifyingSessionsAnalyzed || 0,
      icon: <StorageIcon />
    },
    {
      name: 'Circuit History API',
      endpoint: 'api.jolpi.ca/ergast/f1/circuits/{id}/results',
      description: 'Historical performance data at specific circuits over multiple seasons',
      status: 'active',
      dataPoints: dataUsed?.circuitsInHistory || 0,
      icon: <DataObjectIcon />
    }
  ];

  const DataSourceCard = ({ source, index }) => (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      sx={{
        background: 'linear-gradient(145deg, rgba(45, 45, 45, 0.6) 0%, rgba(26, 26, 26, 0.8) 100%)',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '16px',
        height: '100%'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '10px',
            background: 'rgba(225, 6, 0, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#E10600'
          }}
        >
          {source.icon}
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="subtitle2"
            sx={{ fontFamily: '"Exo 2", sans-serif', fontWeight: 600 }}
          >
            {source.name}
          </Typography>
          <Chip
            icon={<CheckCircleIcon sx={{ fontSize: '0.8rem !important' }} />}
            label="Active"
            size="small"
            sx={{
              height: '20px',
              fontSize: '0.65rem',
              background: 'rgba(0, 230, 118, 0.15)',
              color: '#00E676',
              border: '1px solid rgba(0, 230, 118, 0.3)',
              '& .MuiChip-icon': { color: '#00E676' }
            }}
          />
        </Box>
      </Box>

      <Typography
        variant="caption"
        sx={{
          color: 'rgba(255,255,255,0.5)',
          display: 'block',
          mb: 1,
          fontFamily: 'monospace',
          fontSize: '0.7rem',
          wordBreak: 'break-all'
        }}
      >
        {source.endpoint}
      </Typography>

      <Typography
        variant="body2"
        sx={{ color: 'rgba(255,255,255,0.7)', mb: 2, fontSize: '0.8rem' }}
      >
        {source.description}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <DataObjectIcon sx={{ fontSize: '1rem', color: '#E10600' }} />
        <Typography
          variant="caption"
          sx={{ color: '#E10600', fontFamily: '"Orbitron", sans-serif', fontWeight: 600 }}
        >
          {source.dataPoints} data points
        </Typography>
      </Box>
    </Box>
  );

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
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <ApiIcon sx={{ color: '#E10600', fontSize: '1.8rem' }} />
        <Box>
          <Typography
            variant="h5"
            sx={{ fontFamily: '"Orbitron", sans-serif', fontWeight: 700 }}
          >
            DATA SOURCES
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
            Real-time F1 data powering the prediction model
          </Typography>
        </Box>
      </Box>

      {/* Data Stats Summary */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          mb: 4,
          p: 2,
          background: 'rgba(225, 6, 0, 0.08)',
          borderRadius: '12px',
          border: '1px solid rgba(225, 6, 0, 0.2)'
        }}
      >
        <Box sx={{ flex: '1 1 auto', minWidth: '120px' }}>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
            Races Analyzed
          </Typography>
          <Typography
            variant="h5"
            sx={{ fontFamily: '"Orbitron", sans-serif', fontWeight: 700, color: '#E10600' }}
          >
            {dataUsed?.totalRacesAnalyzed || 0}
          </Typography>
        </Box>
        <Box sx={{ flex: '1 1 auto', minWidth: '120px' }}>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
            Drivers Analyzed
          </Typography>
          <Typography
            variant="h5"
            sx={{ fontFamily: '"Orbitron", sans-serif', fontWeight: 700, color: '#E10600' }}
          >
            {dataUsed?.driversAnalyzed || 0}
          </Typography>
        </Box>
        <Box sx={{ flex: '1 1 auto', minWidth: '120px' }}>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
            Features Extracted
          </Typography>
          <Typography
            variant="h5"
            sx={{ fontFamily: '"Orbitron", sans-serif', fontWeight: 700, color: '#E10600' }}
          >
            {dataUsed?.featuresExtracted || 7}
          </Typography>
        </Box>
        <Box sx={{ flex: '1 1 auto', minWidth: '120px' }}>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
            Last Updated
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontFamily: '"Exo 2", sans-serif', fontWeight: 600 }}
          >
            {dataUsed?.lastUpdated ? new Date(dataUsed.lastUpdated).toLocaleTimeString() : 'N/A'}
          </Typography>
        </Box>
      </Box>

      {/* Data Sources Grid */}
      <Grid container spacing={2}>
        {dataSources.map((source, index) => (
          <Grid item xs={12} sm={6} md={4} key={source.name}>
            <DataSourceCard source={source} index={index} />
          </Grid>
        ))}
      </Grid>

      {/* Feature Weights */}
      <Box sx={{ mt: 4 }}>
        <Typography
          variant="h6"
          sx={{ fontFamily: '"Orbitron", sans-serif', fontWeight: 700, mb: 2 }}
        >
          FEATURE WEIGHTS IN MODEL
        </Typography>
        <Grid container spacing={2}>
          {Object.entries(FEATURE_CONFIG).map(([key, config], index) => (
            <Grid item xs={12} sm={6} key={key}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                sx={{ mb: 1 }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    {config.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontFamily: '"Orbitron", sans-serif', fontWeight: 600, color: '#E10600' }}
                  >
                    {(config.weight * 100).toFixed(0)}%
                  </Typography>
                </Box>
                <Tooltip title={config.description} arrow>
                  <LinearProgress
                    variant="determinate"
                    value={config.weight * 100}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 4,
                        background: `linear-gradient(90deg, #E10600 0%, #FF6B6B 100%)`
                      }
                    }}
                  />
                </Tooltip>
                <Typography
                  variant="caption"
                  sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem' }}
                >
                  Source: {config.dataSource}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default DataSourcesPanel;

