import React, { useState, useEffect } from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FlagIcon from '@mui/icons-material/Flag';

const NextRaceInfo = ({ nextRace }) => {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    if (!nextRace) return;

    const raceDateTime = new Date(`${nextRace.date}T${nextRace.time || '14:00:00Z'}`);

    const updateCountdown = () => {
      const now = new Date();
      const diff = raceDateTime - now;

      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, mins: 0, secs: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({ days, hours, mins, secs });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [nextRace]);

  if (!nextRace) return null;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return 'TBA';
    const [hours, minutes] = timeStr.replace('Z', '').split(':');
    const date = new Date();
    date.setUTCHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      timeZoneName: 'short'
    });
  };

  const CountdownBox = ({ value, label }) => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: { xs: '8px 12px', md: '12px 20px' },
        background: 'rgba(225, 6, 0, 0.1)',
        borderRadius: '12px',
        border: '1px solid rgba(225, 6, 0, 0.3)',
        minWidth: { xs: '50px', md: '70px' }
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontFamily: '"Orbitron", sans-serif',
          fontWeight: 700,
          color: '#E10600',
          fontSize: { xs: '1.5rem', md: '2rem' }
        }}
      >
        {String(value).padStart(2, '0')}
      </Typography>
      <Typography
        variant="caption"
        sx={{
          color: 'rgba(255,255,255,0.6)',
          fontFamily: '"Exo 2", sans-serif',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          fontSize: { xs: '0.6rem', md: '0.7rem' }
        }}
      >
        {label}
      </Typography>
    </Box>
  );

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      sx={{
        background: 'linear-gradient(145deg, rgba(45, 45, 45, 0.6) 0%, rgba(26, 26, 26, 0.8) 100%)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        padding: { xs: '20px', md: '30px' },
        marginBottom: '30px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(225, 6, 0, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 3 }}>
        <FlagIcon sx={{ color: '#E10600', fontSize: '1.8rem' }} />
        <Typography
          variant="h5"
          sx={{
            fontFamily: '"Orbitron", sans-serif',
            fontWeight: 700,
            letterSpacing: '0.05em'
          }}
        >
          NEXT RACE
        </Typography>
        <Chip
          label={`Round ${nextRace.round}`}
          size="small"
          sx={{
            background: 'rgba(225, 6, 0, 0.2)',
            border: '1px solid rgba(225, 6, 0, 0.4)',
            color: '#E10600',
            fontFamily: '"Exo 2", sans-serif',
            fontWeight: 600
          }}
        />
      </Box>

      {/* Race Name */}
      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Orbitron", sans-serif',
          fontWeight: 800,
          marginBottom: 1,
          fontSize: { xs: '1.5rem', md: '2.5rem' },
          background: 'linear-gradient(135deg, #FFFFFF 0%, #E0E0E0 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        {nextRace.raceName}
      </Typography>

      {/* Circuit Info */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginBottom: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocationOnIcon sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.2rem' }} />
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            {nextRace.Circuit?.circuitName}, {nextRace.Circuit?.Location?.country}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CalendarTodayIcon sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.2rem' }} />
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            {formatDate(nextRace.date)}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AccessTimeIcon sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.2rem' }} />
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            {formatTime(nextRace.time)}
          </Typography>
        </Box>
      </Box>

      {/* Countdown */}
      <Box>
        <Typography
          variant="overline"
          sx={{
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.2em',
            marginBottom: 2,
            display: 'block'
          }}
        >
          RACE STARTS IN
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: { xs: 1, md: 2 },
            flexWrap: 'wrap'
          }}
        >
          <CountdownBox value={countdown.days} label="Days" />
          <CountdownBox value={countdown.hours} label="Hours" />
          <CountdownBox value={countdown.mins} label="Mins" />
          <CountdownBox value={countdown.secs} label="Secs" />
        </Box>
      </Box>
    </Box>
  );
};

export default NextRaceInfo;

