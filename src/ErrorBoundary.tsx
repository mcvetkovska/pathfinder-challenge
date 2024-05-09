import "./App.css";

import { Component, ErrorInfo, ReactNode } from "react";

type Props = {
  children?: ReactNode;
  resetError: boolean;
};

type State = {
  error: Error | null;
};

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  public state: State = {
    error: null,
  };

  componentDidUpdate(prevProps: Props): void {
    if (this.props.resetError !== prevProps.resetError) {
      this.setState({ error: null });
    }
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { error: error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info);
  }

  render() {
    if (this.state.error) {
      return <div className="error_boundary">An error has occured: {this.state.error?.message}</div>;
    }

    return this.props.children;
  }
}
