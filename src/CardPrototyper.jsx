import React from 'react';
import './CardPrototyper.scss';

export default class CardPrototyper extends React.Component {
  render() {
    return (
      <div className="card-prototyper w-full flex flex-col items-start justify-start">
        {this.props.children}
      </div>
    );
  }
}