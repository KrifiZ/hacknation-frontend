interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary: () => void
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="error-fallback">
      <div className="error-fallback__content">
        <div className="error-fallback__icon">⚠️</div>
        <h1 className="error-fallback__title">Something went wrong</h1>
        <p className="error-fallback__message">
          {error.message || 'An unexpected error occurred'}
        </p>
        {process.env.NODE_ENV === 'development' && (
          <details className="error-fallback__details">
            <summary>Error Details</summary>
            <pre>{error.stack}</pre>
          </details>
        )}
        <div className="error-fallback__actions">
          <button
            onClick={resetErrorBoundary}
            className="error-fallback__button error-fallback__button--primary"
          >
            Try Again
          </button>
          <button
            onClick={() => (window.location.href = '/')}
            className="error-fallback__button error-fallback__button--secondary"
          >
            Go to Home
          </button>
        </div>
      </div>

      <style>{`
        .error-fallback {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          background-color: #f9fafb;
        }

        .error-fallback__content {
          max-width: 28rem;
          width: 100%;
          text-align: center;
          background: white;
          padding: 2rem;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .error-fallback__icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .error-fallback__title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #111827;
          margin: 0 0 0.5rem;
        }

        .error-fallback__message {
          color: #6b7280;
          margin: 0 0 1.5rem;
        }

        .error-fallback__details {
          text-align: left;
          margin-bottom: 1.5rem;
          background: #fef2f2;
          padding: 1rem;
          border-radius: 0.375rem;
          border: 1px solid #fecaca;
        }

        .error-fallback__details summary {
          cursor: pointer;
          color: #991b1b;
          font-weight: 500;
        }

        .error-fallback__details pre {
          margin: 0.5rem 0 0;
          font-size: 0.75rem;
          overflow-x: auto;
          white-space: pre-wrap;
          word-break: break-word;
          color: #7f1d1d;
        }

        .error-fallback__actions {
          display: flex;
          gap: 0.75rem;
          justify-content: center;
        }

        .error-fallback__button {
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s;
          border: none;
        }

        .error-fallback__button--primary {
          background-color: #2563eb;
          color: white;
        }

        .error-fallback__button--primary:hover {
          background-color: #1d4ed8;
        }

        .error-fallback__button--secondary {
          background-color: #e5e7eb;
          color: #374151;
        }

        .error-fallback__button--secondary:hover {
          background-color: #d1d5db;
        }
      `}</style>
    </div>
  )
}