import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import { motion } from 'framer-motion';

const LoadingScreen = ({ message = 'Loading...', progress = null }) => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0D0D0D',
        zIndex: 9999
      }}
    >
      {/* Animated Background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          pointerEvents: 'none'
        }}
      >
        {/* Racing lines animation */}
        {[...Array(5)].map((_, i) => (
          <Box
            key={i}
            component={motion.div}
            animate={{
              x: ['calc(-100%)', 'calc(200vw)'],
            }}
            transition={{
              duration: 1.5 + i * 0.3,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.2
            }}
            sx={{
              position: 'absolute',
              top: `${20 + i * 15}%`,
              left: 0,
              width: '200px',
              height: '2px',
              background: `linear-gradient(90deg, transparent 0%, #E10600 50%, transparent 100%)`,
              opacity: 0.3 + i * 0.1
            }}
          />
        ))}
      </Box>

      {/* Logo */}
      <motion.img
        src="/logo.jpg"
        alt="INF1NITTE Predict"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          height: '80px',
          marginBottom: '40px',
          borderRadius: '12px',
          boxShadow: '0 0 60px rgba(225, 6, 0, 0.4)'
        }}
      />

      {/* Loading Spinner */}
      <Box
        sx={{
          position: 'relative',
          width: 80,
          height: 80,
          marginBottom: 4
        }}
      >
        {/* Outer ring */}
        <Box
          component={motion.div}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '3px solid transparent',
            borderTopColor: '#E10600',
            borderRightColor: '#E1060080'
          }}
        />
        
        {/* Inner ring */}
        <Box
          component={motion.div}
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          sx={{
            position: 'absolute',
            top: '15%',
            left: '15%',
            width: '70%',
            height: '70%',
            borderRadius: '50%',
            border: '2px solid transparent',
            borderTopColor: '#fff',
            borderLeftColor: '#ffffff80'
          }}
        />

        {/* Center dot */}
        <Box
          component={motion.div}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: '#E10600',
            boxShadow: '0 0 20px #E10600'
          }}
        />
      </Box>

      {/* Loading Text */}
      <Typography
        variant="h6"
        component={motion.h6}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        sx={{
          fontFamily: '"Orbitron", sans-serif',
          fontWeight: 600,
          letterSpacing: '0.2em',
          marginBottom: 2,
          color: '#fff'
        }}
      >
        {message}
      </Typography>

      {/* Progress Bar */}
      {progress !== null && (
        <Box sx={{ width: '200px', mt: 2 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 4,
              borderRadius: 2,
              backgroundColor: 'rgba(255,255,255,0.1)',
              '& .MuiLinearProgress-bar': {
                borderRadius: 2,
                background: 'linear-gradient(90deg, #E10600 0%, #FF1E1E 100%)'
              }
            }}
          />
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              textAlign: 'center',
              marginTop: 1,
              color: 'rgba(255,255,255,0.5)',
              fontFamily: '"Orbitron", sans-serif'
            }}
          >
            {progress}%
          </Typography>
        </Box>
      )}

      {/* Loading Steps */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 40,
          display: 'flex',
          gap: 2
        }}
      >
        {['Fetching Data', 'Running Model', 'Generating Predictions'].map((step, i) => (
          <Box
            key={step}
            component={motion.div}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5 }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#E10600'
              }}
            />
            <Typography
              variant="caption"
              sx={{
                color: 'rgba(255,255,255,0.6)',
                fontFamily: '"Rajdhani", sans-serif',
                letterSpacing: '0.1em'
              }}
            >
              {step}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default LoadingScreen;

