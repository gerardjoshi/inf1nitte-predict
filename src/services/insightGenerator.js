// Lightweight Language Model for F1 Race Insights
// Generates natural language insights about recent races and predictions

class F1InsightGenerator {
  constructor() {
    this.templates = {
      recentForm: [
        "{driver} has been {trend} in recent races, {performance}.",
        "Looking at the last few races, {driver} {trend} with {performance}.",
        "{driver}'s recent form shows {trend}, {performance}."
      ],
      circuitHistory: [
        "{driver} has {history} at {circuit}, which {impact}.",
        "At {circuit}, {driver} {history}, suggesting {impact}.",
        "Historical data shows {driver} {history} at this track, {impact}."
      ],
      qualifying: [
        "{driver} qualified {position} for today's race, {analysis}.",
        "Starting from P{position}, {driver} {analysis}.",
        "With a {position} grid position, {driver} {analysis}."
      ],
      prediction: [
        "Based on the data, {driver} has a {probability}% chance of winning, {reason}.",
        "Our model predicts {driver} as the {rank} favorite with {probability}% win probability, {reason}.",
        "{driver} emerges as a strong contender with {probability}% win chance, {reason}."
      ],
      seasonSummary: [
        "The 2025 season has been dominated by {topDriver}, who has {wins} wins so far.",
        "{topDriver} leads the championship with {points} points after {races} races.",
        "This season has seen intense battles between {topDriver} and {rival}, with {topDriver} currently ahead."
      ]
    };
  }

  // Analyze recent form
  analyzeRecentForm(driver, recentRaces) {
    const driverResults = recentRaces
      .map(race => race.Results?.find(r => r.Driver?.driverId === driver.driverId))
      .filter(Boolean)
      .slice(-5);

    if (driverResults.length === 0) return null;

    const positions = driverResults.map(r => parseInt(r.position));
    const avgPosition = positions.reduce((a, b) => a + b, 0) / positions.length;
    const wins = positions.filter(p => p === 1).length;
    const podiums = positions.filter(p => p <= 3).length;
    const recentTrend = this.calculateTrend(positions);

    let trend, performance;
    
    if (wins >= 2) {
      trend = "on fire";
      performance = `winning ${wins} of the last ${driverResults.length} races`;
    } else if (podiums >= 3) {
      trend = "very consistent";
      performance = `securing ${podiums} podiums in recent races`;
    } else if (avgPosition <= 4) {
      trend = "performing well";
      performance = `averaging P${avgPosition.toFixed(1)} finishes`;
    } else if (recentTrend === 'improving') {
      trend = "finding form";
      performance = `showing improvement with better results recently`;
    } else {
      trend = "struggling";
      performance = `averaging P${avgPosition.toFixed(1)} finishes`;
    }

    const template = this.templates.recentForm[Math.floor(Math.random() * this.templates.recentForm.length)];
    return template
      .replace('{driver}', `${driver.givenName} ${driver.familyName}`)
      .replace('{trend}', trend)
      .replace('{performance}', performance);
  }

  // Analyze circuit history
  analyzeCircuitHistory(driver, circuitHistory) {
    if (!circuitHistory || circuitHistory.length === 0) return null;

    const driverResults = circuitHistory
      .map(race => race.Results?.find(r => r.Driver?.driverId === driver.driverId))
      .filter(Boolean);

    if (driverResults.length === 0) return null;

    const wins = driverResults.filter(r => parseInt(r.position) === 1).length;
    const podiums = driverResults.filter(r => parseInt(r.position) <= 3).length;
    const avgPosition = driverResults.reduce((sum, r) => sum + parseInt(r.position), 0) / driverResults.length;

    let history, impact;

    if (wins >= 3) {
      history = `won ${wins} times`;
      impact = "gives them a significant advantage";
    } else if (wins >= 2) {
      history = `won ${wins} times`;
      impact = "shows they excel here";
    } else if (podiums >= 3) {
      history = `consistently finished on the podium`;
      impact = "indicates strong performance potential";
    } else if (avgPosition <= 5) {
      history = `averaged P${avgPosition.toFixed(1)} finishes`;
      impact = "suggests they can compete at the front";
    } else {
      history = `struggled historically`;
      impact = "may face challenges";
    }

    const template = this.templates.circuitHistory[Math.floor(Math.random() * this.templates.circuitHistory.length)];
    return template
      .replace('{driver}', `${driver.givenName} ${driver.familyName}`)
      .replace('{circuit}', 'Abu Dhabi')
      .replace('{history}', history)
      .replace('{impact}', impact);
  }

  // Analyze qualifying position
  analyzeQualifying(driver, qualifying) {
    if (!qualifying || !qualifying.QualifyingResults) return null;

    const qualResult = qualifying.QualifyingResults.find(
      q => q.Driver?.driverId === driver.driverId
    );

    if (!qualResult) return null;

    const position = parseInt(qualResult.position);
    let analysis;

    if (position === 1) {
      analysis = "has the best starting position and track position advantage";
    } else if (position <= 3) {
      analysis = "starts near the front and can challenge for the win";
    } else if (position <= 5) {
      analysis = "has a solid starting position to fight for podium";
    } else if (position <= 10) {
      analysis = "starts in the points but will need strong race pace";
    } else {
      analysis = "faces an uphill battle from the midfield";
    }

    const template = this.templates.qualifying[Math.floor(Math.random() * this.templates.qualifying.length)];
    return template
      .replace('{driver}', `${driver.givenName} ${driver.familyName}`)
      .replace('{position}', position)
      .replace('{analysis}', analysis);
  }

  // Generate prediction insight
  generatePredictionInsight(prediction, rank) {
    const driver = prediction.driver;
    const probability = prediction.winProbability.toFixed(1);
    
    let reason;
    const scores = prediction.scores;

    if (scores.circuit?.score > 0.7) {
      reason = "largely due to their exceptional track record at Yas Marina";
    } else if (scores.recentForm?.score > 0.7) {
      reason = "driven by their strong recent form";
    } else if (scores.qualifying?.score > 0.7) {
      reason = "thanks to their excellent qualifying position";
    } else if (scores.championship?.score > 0.7) {
      reason = "reflecting their championship-leading consistency";
    } else {
      reason = "based on a combination of strong season performance and recent momentum";
    }

    const template = this.templates.prediction[Math.floor(Math.random() * this.templates.prediction.length)];
    return template
      .replace('{driver}', `${driver.givenName} ${driver.familyName}`)
      .replace('{probability}', probability)
      .replace('{rank}', rank === 1 ? 'top' : rank === 2 ? 'second' : 'third')
      .replace('{reason}', reason);
  }

  // Generate season summary
  generateSeasonSummary(standings, recentRaces) {
    if (!standings || standings.length === 0) return null;

    const topDriver = standings[0];
    const wins = this.countWins(topDriver.Driver.driverId, recentRaces);
    const points = topDriver.points;
    const races = recentRaces.length;
    const rival = standings[1]?.Driver?.familyName || 'the competition';

    const template = this.templates.seasonSummary[Math.floor(Math.random() * this.templates.seasonSummary.length)];
    return template
      .replace('{topDriver}', `${topDriver.Driver.givenName} ${topDriver.Driver.familyName}`)
      .replace('{wins}', wins)
      .replace('{points}', points)
      .replace('{races}', races)
      .replace('{rival}', rival);
  }

  // Generate comprehensive race insights
  generateRaceInsights(predictions, recentRaces, circuitHistory, qualifying, standings) {
    const insights = [];

    // Season summary
    const seasonSummary = this.generateSeasonSummary(standings, recentRaces);
    if (seasonSummary) insights.push(seasonSummary);

    // Top 3 predictions
    predictions.slice(0, 3).forEach((pred, index) => {
      const driver = pred.driver;
      
      // Recent form
      const formInsight = this.analyzeRecentForm(driver, recentRaces);
      if (formInsight) insights.push(formInsight);

      // Circuit history
      const circuitInsight = this.analyzeCircuitHistory(driver, circuitHistory);
      if (circuitInsight) insights.push(circuitInsight);

      // Qualifying
      const qualInsight = this.analyzeQualifying(driver, qualifying);
      if (qualInsight) insights.push(qualInsight);

      // Prediction
      const predInsight = this.generatePredictionInsight(pred, index + 1);
      insights.push(predInsight);
    });

    // Key matchup
    if (predictions.length >= 2) {
      const matchup = this.generateMatchup(predictions[0], predictions[1]);
      if (matchup) insights.push(matchup);
    }

    return insights;
  }

  // Generate head-to-head matchup
  generateMatchup(driver1, driver2) {
    const d1Name = `${driver1.driver.givenName} ${driver1.driver.familyName}`;
    const d2Name = `${driver2.driver.givenName} ${driver2.driver.familyName}`;
    const diff = (driver1.winProbability - driver2.winProbability).toFixed(1);

    if (parseFloat(diff) > 10) {
      return `${d1Name} holds a significant ${diff}% advantage over ${d2Name}, making them the clear favorite.`;
    } else if (parseFloat(diff) > 5) {
      return `The battle between ${d1Name} and ${d2Name} is tight, with ${d1Name} holding a slight ${diff}% edge.`;
    } else {
      return `${d1Name} and ${d2Name} are neck-and-neck, separated by just ${diff}% in win probability.`;
    }
  }

  // Helper methods
  calculateTrend(positions) {
    if (positions.length < 2) return 'stable';
    const recent = positions.slice(-3);
    const earlier = positions.slice(0, -3);
    if (earlier.length === 0) return 'stable';
    
    const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
    const earlierAvg = earlier.reduce((a, b) => a + b, 0) / earlier.length;
    
    if (recentAvg < earlierAvg - 1) return 'improving';
    if (recentAvg > earlierAvg + 1) return 'declining';
    return 'stable';
  }

  countWins(driverId, races) {
    return races.filter(race => {
      const result = race.Results?.find(r => r.Driver?.driverId === driverId);
      return result && parseInt(result.position) === 1;
    }).length;
  }
}

// Singleton instance
const insightGenerator = new F1InsightGenerator();

export default insightGenerator;

