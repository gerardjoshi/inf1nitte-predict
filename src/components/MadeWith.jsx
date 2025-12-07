import React from 'react';
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';

const MadeWith = () => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: 'linear-gradient(180deg, transparent 0%, rgba(13, 13, 13, 0.95) 100%)',
        backdropFilter: 'blur(10px)',
        padding: '8px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2
      }}
    >
      <Typography
        variant="caption"
        sx={{
          color: 'rgba(255,255,255,0.5)',
          fontFamily: '"Rajdhani", sans-serif',
          fontSize: '0.75rem',
          letterSpacing: '0.05em'
        }}
      >
        made with
      </Typography>
      
      {/* Emoji Icons */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <motion.span
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3
          }}
          style={{ fontSize: '1.2rem' }}
        >
          ❤️
        </motion.span>
        
        <motion.span
          animate={{ 
            rotate: [0, 360]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
          style={{ fontSize: '1.2rem' }}
        >
          ⚛️
        </motion.span>
        
        <motion.span
          animate={{ 
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{ fontSize: '1.2rem' }}
        >
          🧠
        </motion.span>
        
        <motion.span
          animate={{ 
            y: [0, -3, 0]
          }}
          transition={{ 
            duration: 1,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{ fontSize: '1.2rem' }}
        >
          ☕
        </motion.span>
      </Box>

      {/* GitHub Button */}
      <Tooltip title="View on GitHub" arrow>
        <IconButton
          component={motion.button}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.open('https://github.com/gerardjoshi', '_blank')}
          sx={{
            color: 'rgba(255,255,255,0.6)',
            padding: '4px',
            '&:hover': {
              color: '#E10600',
              background: 'rgba(225, 6, 0, 0.1)'
            },
            transition: 'all 0.3s ease'
          }}
        >
          <GitHubIcon sx={{ fontSize: '1.2rem' }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default MadeWith;

