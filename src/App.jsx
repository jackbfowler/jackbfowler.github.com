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

function App() {
  React.useEffect(() => {
    let timeoutId;
    const originalTitle = "Jack Fowler";
    const waveTitle = "👋 Jack Fowler";

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Tab is hidden, start timer
        timeoutId = setTimeout(() => {
          document.title = waveTitle;
        }, 2000); // 2 seconds delay
      } else {
        // Tab is visible, clear timer and reset title
        clearTimeout(timeoutId);
        document.title = originalTitle;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(timeoutId);
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
