import { Component, type ReactNode } from 'react'
import { ErrorFallback } from './ErrorFallback'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
  onReset?: () => void
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
    }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error)
    console.error('Component stack:', errorInfo.componentStack)

    this.props.onError?.(error, errorInfo)
  }

  resetErrorBoundary = (): void => {
    this.props.onReset?.()
    this.setState({
      hasError: false,
      error: null,
    })
  }

  render() {
    const { hasError, error } = this.state
    const { children, fallback } = this.props

    if (hasError && error) {
      if (fallback) {
        return fallback
      }

      return (
        <ErrorFallback
          error={error}
          resetErrorBoundary={this.resetErrorBoundary}
        />
      )
    }

    return children
  }
}