import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', color: 'red' }}>
          <h1>Something went wrong.</h1>
          <pre>{this.state.error.toString()}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}

import TitleWorker from './workers/titleTimer.js?worker';

function App() {
  React.useEffect(() => {
    const originalTitle = "Jack Fowler";
    const waveTitle = "👋 Jack Fowler";

    // Initialize Worker
    const worker = new TitleWorker();

    // Listen for messages from the worker
    worker.onmessage = (e) => {
      if (e.data === 'tick') {
        document.title = waveTitle;
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Tab is hidden, tell worker to start timer
        worker.postMessage('start');
      } else {
        // Tab is visible, tell worker to clear timer and reset title
        worker.postMessage('clear');
        document.title = originalTitle;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      worker.terminate(); // Clean up worker
    };
  }, []);

  return (
    <ErrorBoundary>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Placeholder routes */}
        <Route path="/projects" element={<div className="container section" style={{ paddingTop: '100px' }}><h2>Projects Coming Soon</h2></div>} />
        <Route path="/resume" element={<div className="container section" style={{ paddingTop: '100px' }}><h2>Resume Coming Soon</h2></div>} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
