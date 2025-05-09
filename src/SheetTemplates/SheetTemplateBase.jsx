import React from 'react';
import './SheetTemplate.scss';
export default class SheetTemplateBase extends React.Component {
    constructor(props) {
        super(props);
    }
    getContent() {
        return null;
    }
    getClass() {
        return "sheet";
    }
    render() {
        return <div className={this.getClass()}>
            {this.getContent()}
        </div>;
    }
}