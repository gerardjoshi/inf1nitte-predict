import React from 'react';
import { Box, Typography, Grid, Chip, LinearProgress, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import PsychologyIcon from '@mui/icons-material/Psychology';
import MemoryIcon from '@mui/icons-material/Memory';
import LayersIcon from '@mui/icons-material/Layers';
import TuneIcon from '@mui/icons-material/Tune';
import SpeedIcon from '@mui/icons-material/Speed';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DataUsageIcon from '@mui/icons-material/DataUsage';

const ModelAnalytics = ({ modelInfo }) => {
  if (!modelInfo) return null;

  const { architecture, metrics, trainingHistory } = modelInfo;

  const LayerVisualization = ({ layer, index }) => {
    const getLayerColor = (name) => {
      if (name.includes('Input')) return '#4CAF50';
      if (name.includes('Output')) return '#E10600';
      if (name.includes('Dropout')) return '#FF9800';
      if (name.includes('BatchNorm')) return '#2196F3';
      return '#9C27B0';
    };

    return (
      <Box
        component={motion.div}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1 }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative'
        }}
      >
        <Box
          sx={{
            width: Math.max(40, (layer.units || 20) * 1.5),
            height: '60px',
            background: `linear-gradient(180deg, ${getLayerColor(layer.name)}40 0%, ${getLayerColor(layer.name)}20 100%)`,
            border: `2px solid ${getLayerColor(layer.name)}`,
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontFamily: '"Orbitron", sans-serif',
              fontWeight: 700,
              color: getLayerColor(layer.name),
              fontSize: '0.7rem'
            }}
          >
            {layer.units || layer.rate || ''}
          </Typography>
        </Box>
        <Typography
          variant="caption"
          sx={{
            mt: 1,
            color: 'rgba(255,255,255,0.7)',
            fontSize: '0.65rem',
            textAlign: 'center',
            maxWidth: '80px'
          }}
        >
          {layer.name}
        </Typography>
        {layer.activation && (
          <Chip
            label={layer.activation}
            size="small"
            sx={{
              mt: 0.5,
              height: '16px',
              fontSize: '0.55rem',
              background: 'rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.6)'
            }}
          />
        )}
        {/* Connection line */}
        {index < architecture.layers.length - 1 && (
          <Box
            sx={{
              position: 'absolute',
              right: '-20px',
              top: '50%',
              width: '20px',
              height: '2px',
              background: 'linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(225,6,0,0.5) 100%)',
              transform: 'translateY(-50%)'
            }}
          />
        )}
      </Box>
    );
  };

  const MetricCard = ({ label, value, unit, color, icon }) => (
    <Box
      sx={{
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '12px',
        padding: '16px',
        border: '1px solid rgba(255,255,255,0.06)',
        textAlign: 'center'
      }}
    >
      <Box sx={{ color: color || '#E10600', mb: 1 }}>
        {icon}
      </Box>
      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
        {label}
      </Typography>
      <Typography
        variant="h5"
        sx={{
          fontFamily: '"Orbitron", sans-serif',
          fontWeight: 700,
          color: color || '#fff'
        }}
      >
        {value}{unit}
      </Typography>
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
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <PsychologyIcon sx={{ color: '#E10600', fontSize: '1.8rem' }} />
        <Box>
          <Typography
            variant="h5"
            sx={{ fontFamily: '"Orbitron", sans-serif', fontWeight: 700 }}
          >
            NEURAL NETWORK ANALYTICS
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
            TensorFlow.js Deep Learning Model Architecture
          </Typography>
        </Box>
        <Chip
          icon={<MemoryIcon sx={{ fontSize: '0.9rem !important' }} />}
          label="TensorFlow.js"
          sx={{
            ml: 'auto',
            background: 'rgba(255, 152, 0, 0.15)',
            border: '1px solid rgba(255, 152, 0, 0.4)',
            color: '#FF9800',
            fontFamily: '"Exo 2", sans-serif'
          }}
        />
      </Box>

      {/* Model Architecture Visualization */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{ fontFamily: '"Orbitron", sans-serif', fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <LayersIcon /> MODEL ARCHITECTURE
        </Typography>
        
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            overflowX: 'auto',
            py: 3,
            px: 2,
            background: 'rgba(0,0,0,0.2)',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.05)'
          }}
        >
          {architecture.layers.map((layer, index) => (
            <LayerVisualization key={index} layer={layer} index={index} />
          ))}
        </Box>

        {/* Architecture Details */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={6} md={3}>
            <Box sx={{ p: 2, background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                Network Type
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {architecture.type}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{ p: 2, background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                Optimizer
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {architecture.optimizer}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{ p: 2, background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                Loss Function
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {architecture.loss}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{ p: 2, background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                Regularization
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {architecture.regularization}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 4 }} />

      {/* Training Metrics */}
      <Box>
        <Typography
          variant="h6"
          sx={{ fontFamily: '"Orbitron", sans-serif', fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <TuneIcon /> TRAINING METRICS
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={6} md={3}>
            <MetricCard
              label="Training Epochs"
              value={metrics?.epochs || 50}
              unit=""
              color="#4CAF50"
              icon={<TrendingUpIcon />}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <MetricCard
              label="Final Loss"
              value={(metrics?.loss || 0).toFixed(4)}
              unit=""
              color="#FF9800"
              icon={<DataUsageIcon />}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <MetricCard
              label="Training Samples"
              value={metrics?.trainingSamples || 0}
              unit=""
              color="#2196F3"
              icon={<SpeedIcon />}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <MetricCard
              label="Validation Loss"
              value={(metrics?.validationLoss || 0).toFixed(4)}
              unit=""
              color="#E10600"
              icon={<CheckCircleIcon />}
            />
          </Grid>
        </Grid>

        {/* Training Status */}
        <Box
          sx={{
            mt: 3,
            p: 2,
            background: 'rgba(0, 230, 118, 0.08)',
            borderRadius: '12px',
            border: '1px solid rgba(0, 230, 118, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}
        >
          <CheckCircleIcon sx={{ color: '#00E676' }} />
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#00E676' }}>
              Model Trained Successfully
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
              Last trained: {metrics?.lastTrainedAt ? new Date(metrics.lastTrainedAt).toLocaleString() : 'N/A'}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* How It Works */}
      <Box sx={{ mt: 4 }}>
        <Typography
          variant="h6"
          sx={{ fontFamily: '"Orbitron", sans-serif', fontWeight: 700, mb: 2 }}
        >
          HOW THE MODEL WORKS
        </Typography>
        <Box
          sx={{
            p: 3,
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.06)'
          }}
        >
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 2 }}>
            <strong>1. Data Collection:</strong> The model fetches real-time F1 data from the Jolpica API, 
            including driver standings, race results, qualifying times, and circuit history.
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 2 }}>
            <strong>2. Feature Extraction:</strong> For each driver, 7 key features are calculated: 
            championship position, recent form, qualifying performance, circuit history, constructor strength, 
            position gains, and head-to-head records.
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 2 }}>
            <strong>3. Neural Network Training:</strong> The deep neural network is trained on historical race 
            data, learning patterns between feature combinations and race outcomes.
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
            <strong>4. Prediction:</strong> The trained model processes current driver features and outputs 
            win probability scores, which are normalized to show percentage chances.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ModelAnalytics;

