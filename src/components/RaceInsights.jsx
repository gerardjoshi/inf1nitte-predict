import React, { useState } from 'react';
import { Box, Typography, Paper, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import PsychologyIcon from '@mui/icons-material/Psychology';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';

const RaceInsights = ({ insights }) => {
  const [expanded, setExpanded] = useState(false);
  const [minimized, setMinimized] = useState(false);

  if (!insights || insights.length === 0) {
    return null;
  }

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 1 }}
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 1000,
        maxWidth: { xs: 'calc(100vw - 40px)', sm: '400px' },
        width: '100%'
      }}
    >
      {/* Collapsed State */}
      {!expanded && !minimized && (
        <Paper
          component={motion.div}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setExpanded(true)}
          sx={{
            background: 'linear-gradient(135deg, #E10600 0%, #B30500 100%)',
            borderRadius: '50px',
            padding: '12px 20px',
            cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(225, 6, 0, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}
        >
          <PsychologyIcon sx={{ color: '#fff', fontSize: '1.5rem' }} />
          <Typography
            variant="body2"
            sx={{
              fontFamily: '"Exo 2", sans-serif',
              fontWeight: 600,
              color: '#fff',
              letterSpacing: '0.05em'
            }}
          >
            AI Insights
          </Typography>
          <Box
            sx={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              ml: 'auto'
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontFamily: '"Orbitron", sans-serif',
                fontWeight: 700,
                color: '#fff',
                fontSize: '0.7rem'
              }}
            >
              {insights.length}
            </Typography>
          </Box>
        </Paper>
      )}

      {/* Expanded State */}
      <AnimatePresence>
        {expanded && !minimized && (
          <Paper
            component={motion.div}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            sx={{
              background: 'linear-gradient(145deg, rgba(45, 45, 45, 0.95) 0%, rgba(26, 26, 26, 0.98) 100%)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
              maxHeight: '70vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            {/* Header */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                padding: '16px 20px',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                background: 'linear-gradient(90deg, rgba(225, 6, 0, 0.2) 0%, transparent 100%)'
              }}
            >
              <PsychologyIcon sx={{ color: '#E10600', fontSize: '1.5rem' }} />
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontFamily: '"Orbitron", sans-serif', fontWeight: 700 }}
                >
                  AI RACE INSIGHTS
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                  {insights.length} insights
                </Typography>
              </Box>
              <IconButton
                size="small"
                onClick={() => setExpanded(false)}
                sx={{
                  color: 'rgba(255,255,255,0.7)',
                  '&:hover': { color: '#fff', background: 'rgba(255,255,255,0.1)' }
                }}
              >
                <ExpandMoreIcon />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => setMinimized(true)}
                sx={{
                  color: 'rgba(255,255,255,0.7)',
                  '&:hover': { color: '#fff', background: 'rgba(255,255,255,0.1)' }
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* Insights List - Scrollable */}
            <Box
              sx={{
                overflowY: 'auto',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
                '&::-webkit-scrollbar': {
                  width: '6px'
                },
                '&::-webkit-scrollbar-track': {
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '3px'
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#E10600',
                  borderRadius: '3px'
                }
              }}
            >
              {insights.map((insight, index) => (
                <Paper
                  key={index}
                  component={motion.div}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  sx={{
                    background: 'rgba(255,255,255,0.03)',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderLeft: '3px solid #E10600',
                    '&:hover': {
                      background: 'rgba(255,255,255,0.05)',
                      borderLeftColor: '#FF1E1E'
                    }
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255,255,255,0.9)',
                      lineHeight: 1.5,
                      fontFamily: '"Rajdhani", sans-serif',
                      fontSize: '0.85rem'
                    }}
                  >
                    {insight}
                  </Typography>
                </Paper>
              ))}
            </Box>

            {/* Footer */}
            <Box
              sx={{
                padding: '12px 16px',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(0,0,0,0.2)'
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: 'rgba(255,255,255,0.4)',
                  fontSize: '0.7rem',
                  fontStyle: 'italic'
                }}
              >
                Based on 23 races from 2025 season
              </Typography>
            </Box>
          </Paper>
        )}
      </AnimatePresence>

      {/* Minimized State - Tiny bubble */}
      {minimized && (
        <Paper
          component={motion.div}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setMinimized(false);
            setExpanded(true);
          }}
          sx={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #E10600 0%, #B30500 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(225, 6, 0, 0.5)',
            border: '2px solid rgba(255,255,255,0.2)'
          }}
        >
          <PsychologyIcon sx={{ color: '#fff', fontSize: '1.8rem' }} />
        </Paper>
      )}
    </Box>
  );
};

export default RaceInsights;

