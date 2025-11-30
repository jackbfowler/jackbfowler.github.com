import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', color: 'red' }}>
          <h1>Something went wrong.</h1>
          <pre>{this.state.error?.toString()}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}

import TitleWorker from './workers/titleTimer.ts?worker';

import Footer from './components/Footer';

function App() {
  React.useEffect(() => {
    const originalTitle = "Jack Fowler";
    const waveTitle = "👋 Jack Fowler";

    // Initialize Worker
    const worker = new TitleWorker();

    // Listen for messages from the worker
    worker.onmessage = (e: MessageEvent) => {
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
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Placeholder routes */}
            <Route path="/projects" element={<div className="container section" style={{ paddingTop: '100px' }}><h2>Projects Coming Soon</h2></div>} />
            <Route path="/resume" element={<div className="container section" style={{ paddingTop: '100px' }}><h2>Resume Coming Soon</h2></div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
