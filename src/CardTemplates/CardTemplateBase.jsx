import React from 'react';
import './CardTemplate.scss';
export default class CardTemplateBase extends React.Component {
    getContent() {
        return null;
    }

    static getWidth() {
        return null;
    }
    static getHeight() {
        return null;
    }

    getStyle() {
        if(!this.constructor.getWidth() || !this.constructor.getHeight()) return null;
        if(this.props.options.landscape) {
            return {
                width: this.constructor.getHeight() + "px",
                height: this.constructor.getWidth() + "px"
            }    
        }
        return {
            width: this.constructor.getWidth() + "px",
            height: this.constructor.getHeight() + "px"
        }
    }

    getClass() {
        return "card";
    }
    render() {
        return <div className={this.getClass()} style={this.getStyle()}>
            {this.getContent()}
        </div>;
    }
}