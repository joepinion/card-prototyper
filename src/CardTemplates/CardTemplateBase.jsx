import React from 'react';
import './CardTemplate.scss';
export default class CardTemplateBase extends React.Component {
    getContent() {
        return null;
    }
    getClass() {
        return "card";
    }
    render() {
        return <div className={this.getClass()}>
            {this.getContent()}
        </div>;
    }
}