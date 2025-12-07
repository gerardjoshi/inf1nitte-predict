import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

const Header = ({ nextRace, isLoading }) => {
  return (
    <Box
      component={motion.header}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: { xs: '16px', md: '20px 40px' },
        background: 'linear-gradient(180deg, rgba(26, 26, 26, 0.95) 0%, rgba(13, 13, 13, 0.9) 100%)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(225, 6, 0, 0.3)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        gap: 2
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}
      >
        <motion.img
          src="/logo.jpg"
          alt="INF1NITTE Predict"
          style={{
            height: '50px',
            width: 'auto',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(225, 6, 0, 0.3)'
          }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        />
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontFamily: '"Orbitron", sans-serif',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #FFFFFF 0%, #E10600 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.1em',
              display: { xs: 'none', sm: 'block' }
            }}
          >
            PREDICT
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: 'rgba(255,255,255,0.6)',
              letterSpacing: '0.05em',
              fontSize: '0.7rem',
              display: { xs: 'none', sm: 'block' },
              fontStyle: 'italic'
            }}
          >
            we (statistics) think the winner of the next race will be
          </Typography>
        </Box>
      </Box>

      {/* Status Indicator */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}
      >
        <Chip
          icon={<AutoGraphIcon sx={{ color: '#00E676 !important' }} />}
          label={isLoading ? "Analyzing..." : "Model Active"}
          sx={{
            background: 'rgba(0, 230, 118, 0.1)',
            border: '1px solid rgba(0, 230, 118, 0.3)',
            color: '#00E676',
            fontFamily: '"Exo 2", sans-serif',
            fontWeight: 500,
            '& .MuiChip-icon': {
              animation: isLoading ? 'pulse 1.5s infinite' : 'none'
            }
          }}
        />

        {/* Live Data Indicator */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            padding: '6px 12px',
            background: 'rgba(225, 6, 0, 0.1)',
            borderRadius: '20px',
            border: '1px solid rgba(225, 6, 0, 0.3)'
          }}
        >
          <Box
            component={motion.div}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [1, 0.7, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#E10600',
              boxShadow: '0 0 10px #E10600'
            }}
          />
          <Typography
            variant="caption"
            sx={{
              color: '#E10600',
              fontFamily: '"Exo 2", sans-serif',
              fontWeight: 600,
              letterSpacing: '0.1em'
            }}
          >
            LIVE DATA
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;

