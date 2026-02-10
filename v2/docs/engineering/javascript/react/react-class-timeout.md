# Using `setTimeout` in React Class Components

```javascript
class TimeoutWrapper extends Component {
  constructor(props) {
    super(props);

    // Initialise the timeout state
    this.state = {
      timeout: null,
    };
  }

  useTimeout() {
    const { timeout } = this.state;
    // Clear any previous timeouts
    clearTimeout(timeout);
    // Set our new timeout
    this.setState({
      timeout: setTimeout(() => {
        // Do some fun timeout stuff here :)
      }, 1000),
    });
  }
}
```
