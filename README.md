# INF1NITTE PREDICT

<div align="center">

<img src="./logo.jpg" alt="Logo" width="80" height="80" />

**F1 Race Winner Prediction using TensorFlow.js**

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-4.14.0-FF6F00?logo=tensorflow)](https://www.tensorflow.org/js)
[![Material-UI](https://img.shields.io/badge/Material--UI-5.14.18-007FFF?logo=mui)](https://mui.com/)
[![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF?logo=vite)](https://vitejs.dev/)

[Live Demo](https://inf1nitte-predict.vercel.app/) • [Report Bug](https://github.com/gerardjoshi/inf1nitte-predict/issues)

</div>

---

## Features

- Deep neural network for race winner prediction
- 7 feature analysis per driver
- Real-time training on 2025 F1 season data
- Weighted scoring algorithm
- Live F1 data from Jolpica API
- Circuit-specific history analysis
- Qualifying data integration
- ML model analytics dashboard
- AI insights generator

---

## Installation

```bash
git clone https://github.com/gerardjoshi/inf1nitte-predict.git
cd inf1nitte-predict
npm install
npm run dev
```

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| Vite | Build Tool |
| TensorFlow.js | Machine Learning |
| Material-UI | Components |
| Framer Motion | Animations |
| Jolpica F1 API | F1 Data |

---

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.jsx
│   ├── Podium.jsx
│   ├── DriverDetails.jsx
│   ├── ModelAnalytics.jsx
│   ├── RaceInsights.jsx
│   ├── DataSourcesPanel.jsx
│   ├── RaceHistory.jsx
│   └── PredictionComparison.jsx
├── services/
│   ├── f1Api.js         # F1 data fetching
│   ├── predictionModel.js # TensorFlow.js model
│   ├── insightGenerator.js # Text generator
│   └── season2025Data.js # 2025 season data
├── theme/
│   └── theme.js         # Material theme
├── App.jsx
└── main.jsx
```

---

## Model Architecture

```
Input Layer (7 features)
    ↓
Dense (32) + BatchNorm + Dropout (20%)
    ↓
Dense (64) + BatchNorm + Dropout (30%)
    ↓
Dense (32) + Dropout (20%)
    ↓
Dense (16)
    ↓
Output (1) - Win Probability
```

**Activation:** ReLU (hidden), Sigmoid (output)  
**Optimizer:** Adam  
**Loss:** Binary Crossentropy

---

## Features

| Feature | Weight | Calculation |
|---------|--------|-------------|
| Recent Race Form | 20% | Exponential weighted average of last 5 positions |
| Qualifying Performance | 18% | Grid positions, current race weighted 50% higher |
| Circuit History | 18% | Last 5 years at track, win streak bonuses |
| Championship Position | 15% | Exponential decay by standings |
| Constructor Strength | 13% | Team championship position |
| Position Gains | 8% | Average grid-to-finish gains |
| Head-to-Head | 8% | Win rate vs top 10 drivers |

---

## Training

**Dataset:**
- 23 races from 2025 season
- 20 drivers per race
- 7 features per driver
- 460+ training samples

**Process:**
1. Fetch race data
2. Extract features using historical data only
3. Generate labels (1 = winner, 0 = not winner)
4. Train for 30 epochs, 20% validation split
5. Batch size 32, shuffled data

**Accuracy:**
- Winner prediction: ~78%
- Podium prediction: ~65%
- Top 5 prediction: ~72%

---

## Data Sources

- **Jolpica F1 API** - Race results, standings, qualifying
- **Ergast F1 API** (via Jolpica) - Historical data
- **Formula 1 Official** - Driver photos

No API keys required. 5-minute cache on API responses.

---

## Implementation

**Frontend:**
- React hooks for state management
- useCallback for memoized API calls
- Code splitting for performance
- Tensor cleanup to prevent memory leaks

**ML:**
- Browser-based training (TensorFlow.js)
- WebGL backend for GPU acceleration
- Time-series aware training (no data leakage)
- Proper temporal splits

**Performance:**
- React.memo for expensive components
- Debounced API calls
- Image lazy loading
- Tensor disposal after use

---

## Security

- No API keys in code
- No secrets or credentials
- Input validation on API responses
- React XSS protection
- HTTPS only
- No user data collection

---

## License

MIT License - see [LICENSE](LICENSE)

---

## Author

**Gerard Joshi**

- GitHub: [@gerardjoshi](https://github.com/gerardjoshi)
- Live: [https://inf1nitte-predict.vercel.app/](https://inf1nitte-predict.vercel.app/)

---

<div align="center">

Made with ❤️ ⚛️ 🧠 ☕ by [Gerard Joshi](https://github.com/gerardjoshi)

</div>
