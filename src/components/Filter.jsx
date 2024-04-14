import { Component } from 'react';

export class Filter extends Component {
  render() {
    const { filter } = this.props;
    return (
      <div>
        <p>Find contacts by name</p>
        <input onChange={filter} />
      </div>
    );
  }
}
