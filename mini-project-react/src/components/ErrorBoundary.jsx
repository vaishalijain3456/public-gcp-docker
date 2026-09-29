import { Component } from "react";

// Day 9 -- this is a safety net for the whole app. If any page crashes
// while drawing itself, this catches it and shows a friendly message
// instead of a blank, broken screen. It has to be written this older way
// (a class), because this kind of safety net does not work with newer,
// simpler React code. Note: this only catches crashes while drawing the
// page -- normal server/network errors are handled separately (see the
// Day 8 error handling in apolloClient.js).
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("[ErrorBoundary] caught a render error:", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div role="alert" style={{ padding: "1rem", border: "1px solid #c00", borderRadius: 4 }}>
          <strong>Something went wrong.</strong>
          <p>{this.state.error.message}</p>
          <button type="button" onClick={() => this.setState({ error: null })}>
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
