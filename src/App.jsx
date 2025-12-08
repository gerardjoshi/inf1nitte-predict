import React, { useState, useEffect, useCallback } from 'react';
import { Box, Container, Typography, Alert, Button, Grid, Snackbar, Tabs, Tab } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import RefreshIcon from '@mui/icons-material/Refresh';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import StorageIcon from '@mui/icons-material/Storage';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

import Header from './components/Header';
import NextRaceInfo from './components/NextRaceInfo';
import Podium from './components/Podium';
import DriverDetails from './components/DriverDetails';
import DriverGrid from './components/DriverGrid';
import LoadingScreen from './components/LoadingScreen';
import DataSourcesPanel from './components/DataSourcesPanel';
import ModelAnalytics from './components/ModelAnalytics';
import RaceHistory from './components/RaceHistory';
import PredictionComparison from './components/PredictionComparison';
import FeatureAnalysis from './components/FeatureAnalysis';
import RaceInsights from './components/RaceInsights';
import MadeWith from './components/MadeWith';
import AbuDhabiComparison from './components/AbuDhabiComparison';

import { getPredictionData } from './services/f1Api';
import predictionModel from './services/predictionModel';
import insightGenerator from './services/insightGenerator';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [nextRace, setNextRace] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [showUpdateSnackbar, setShowUpdateSnackbar] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [modelInfo, setModelInfo] = useState(null);
  const [recentRaces, setRecentRaces] = useState([]);
  const [dataUsed, setDataUsed] = useState(null);
  const [raceInsights, setRaceInsights] = useState([]);

  const fetchAndPredict = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Initialize the prediction model
      if (!predictionModel.isInitialized) {
        console.log('Initializing TensorFlow.js neural network...');
        await predictionModel.initialize();
      }

      // Fetch all required data from F1 API
      console.log('Fetching F1 data from APIs...');
      const data = await getPredictionData();
      
      if (!data || !data.standings || data.standings.length === 0) {
        throw new Error('No standings data available');
      }
      
      // Store recent races for analysis components
      setRecentRaces(data.recentRaces || []);
      
      // Store next race info
      setNextRace(data.nextRace);

      // Run predictions with neural network
      console.log('Running TensorFlow.js prediction model...');
      const results = await predictionModel.predict(data);
      
      if (!results || results.length === 0) {
        throw new Error('Prediction model returned no results');
      }
      
      setPredictions(results);
      setSelectedDriver(results[0]); // Select the predicted winner by default
      setLastUpdated(new Date());
      setShowUpdateSnackbar(true);
      setError(null);

      // Get model info for analytics display
      const info = predictionModel.getModelInfo();
      setModelInfo(info);
      setDataUsed(info.dataUsed);

      // Generate AI insights
      const insights = insightGenerator.generateRaceInsights(
        results,
        data.recentRaces,
        data.circuitHistory,
        data.currentQualifying,
        data.standings
      );
      setRaceInsights(insights);

      console.log('Predictions complete:', results.slice(0, 3).map(p => ({
        driver: `${p.driver.givenName} ${p.driver.familyName}`,
        probability: `${p.winProbability.toFixed(1)}%`
      })));

    } catch (err) {
      console.error('Error fetching/predicting:', err);
      setError(err.message || 'Failed to load predictions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAndPredict();

    // Auto-refresh every 30 minutes
    const refreshInterval = setInterval(fetchAndPredict, 30 * 60 * 1000);

    return () => {
      clearInterval(refreshInterval);
      predictionModel.dispose();
    };
  }, [fetchAndPredict]);

  const handleSelectDriver = (driver) => {
    setSelectedDriver(driver);
  };

  const handleRefresh = () => {
    fetchAndPredict();
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (isLoading && predictions.length === 0) {
    return <LoadingScreen message="INITIALIZING TENSORFLOW.JS MODEL" />;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <MadeWith />
      <Header nextRace={nextRace} isLoading={isLoading} />

      <Container 
        maxWidth="xl" 
        sx={{ 
          flex: 1, 
          paddingY: { xs: 2, md: 4 },
          paddingX: { xs: 2, md: 3 }
        }}
      >
        {/* Error Alert */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Alert 
                severity="error" 
                sx={{ 
                  marginBottom: 3,
                  background: 'rgba(211, 47, 47, 0.1)',
                  border: '1px solid rgba(211, 47, 47, 0.3)'
                }}
                action={
                  <Button color="inherit" size="small" onClick={handleRefresh}>
                    Retry
                  </Button>
                }
              >
                {error}
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Abu Dhabi GP 2025 Comparison - Main Element */}
        {predictions.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <AbuDhabiComparison predictions={predictions} />
          </Box>
        )}

        {/* Next Race Information */}
        {nextRace && <NextRaceInfo nextRace={nextRace} />}

        {/* Navigation Tabs */}
        <Box
          sx={{
            mb: 4,
            background: 'rgba(26, 26, 26, 0.8)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            p: 1
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                fontFamily: '"Exo 2", sans-serif',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.6)',
                minHeight: '48px',
                '&.Mui-selected': {
                  color: '#E10600'
                }
              },
              '& .MuiTabs-indicator': {
                background: '#E10600',
                height: '3px',
                borderRadius: '3px'
              }
            }}
          >
            <Tab icon={<DashboardIcon />} label="Predictions" iconPosition="start" />
            <Tab icon={<AnalyticsIcon />} label="ML Analytics" iconPosition="start" />
            <Tab icon={<StorageIcon />} label="Data Sources" iconPosition="start" />
            <Tab icon={<CompareArrowsIcon />} label="Accuracy" iconPosition="start" />
          </Tabs>
        </Box>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 0 && (
            <motion.div
              key="predictions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Main Content Grid */}
              <Grid container spacing={4}>
                {/* Podium Section */}
                <Grid item xs={12} lg={7}>
                  <Box>
                    {/* Podium Visualization */}
                    <Podium 
                      predictions={predictions} 
                      onSelectDriver={handleSelectDriver}
                      selectedDriverId={selectedDriver?.driver?.driverId}
                    />

                    {/* Other Drivers Grid */}
                    <DriverGrid
                      predictions={predictions}
                      onSelectDriver={handleSelectDriver}
                      selectedDriverId={selectedDriver?.driver?.driverId}
                    />
                  </Box>
                </Grid>

                {/* Driver Details Panel */}
                <Grid item xs={12} lg={5}>
                  <Box
                    sx={{
                      position: { lg: 'sticky' },
                      top: { lg: '100px' }
                    }}
                  >
                    <DriverDetails 
                      driver={selectedDriver} 
                      allPredictions={predictions}
                    />

                    {/* Feature Analysis for Selected Driver */}
                    {selectedDriver && (
                      <Box sx={{ mt: 3 }}>
                        <FeatureAnalysis driver={selectedDriver} />
                      </Box>
                    )}

                    {/* Last Updated & Refresh */}
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 3,
                        padding: 2,
                        background: 'rgba(255,255,255,0.03)',
                        borderRadius: '12px',
                        border: '1px solid rgba(255,255,255,0.06)'
                      }}
                    >
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{ color: 'rgba(255,255,255,0.4)', display: 'block' }}
                        >
                          Last Updated
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: 'rgba(255,255,255,0.7)' }}
                        >
                          {lastUpdated?.toLocaleTimeString() || 'Never'}
                        </Typography>
                      </Box>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<RefreshIcon />}
                        onClick={handleRefresh}
                        disabled={isLoading}
                        sx={{
                          borderColor: 'rgba(225, 6, 0, 0.5)',
                          color: '#E10600',
                          '&:hover': {
                            borderColor: '#E10600',
                            background: 'rgba(225, 6, 0, 0.1)'
                          }
                        }}
                      >
                        {isLoading ? 'Updating...' : 'Refresh'}
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </motion.div>
          )}

          {activeTab === 1 && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* ML Model Analytics */}
              <ModelAnalytics modelInfo={modelInfo} />
              
              {/* Recent Race Analysis */}
              <RaceHistory 
                recentRaces={recentRaces} 
                selectedDriver={selectedDriver}
                predictions={predictions}
              />
            </motion.div>
          )}

          {activeTab === 2 && (
            <motion.div
              key="datasources"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Data Sources Panel */}
              <DataSourcesPanel 
                dataUsed={dataUsed} 
                modelMetrics={modelInfo?.metrics}
              />
            </motion.div>
          )}

          {activeTab === 3 && (
            <motion.div
              key="accuracy"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Prediction Comparison */}
              <PredictionComparison 
                predictions={predictions}
                recentRaces={recentRaces}
                nextRace={nextRace}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            marginTop: 6,
            paddingY: 4,
            borderTop: '1px solid rgba(255,255,255,0.08)',
            textAlign: 'center'
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: 'rgba(255,255,255,0.4)', marginBottom: 1 }}
          >
            Powered by TensorFlow.js and insane amounts of free time and coffee 
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: 'rgba(255,255,255,0.3)' }}
          >
            Data sourced from Jolpica F1 API • Model trains on historical race data and whatever Qadir told me about f1
          </Typography>
          <Typography
            variant="caption"
            sx={{ 
              color: 'rgba(255,255,255,0.2)', 
              display: 'block',
              marginTop: 2,
              fontFamily: '"Orbitron", sans-serif',
              letterSpacing: '0.2em'
            }}
          >
            ABDULILLAQADIR © {new Date().getFullYear()}
          </Typography>
        </Box>
      </Container>

      {/* Update Snackbar */}
      <Snackbar
        open={showUpdateSnackbar}
        autoHideDuration={4000}
        onClose={() => setShowUpdateSnackbar(false)}
        message="Neural network predictions updated"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{
          '& .MuiSnackbarContent-root': {
            background: 'linear-gradient(135deg, #E10600 0%, #B30500 100%)',
            fontFamily: '"Rajdhani", sans-serif'
          }
        }}
      />

      {/* AI Race Insights - Floating Bubble */}
      {raceInsights.length > 0 && <RaceInsights insights={raceInsights} />}
    </Box>
  );
}

export default App;
