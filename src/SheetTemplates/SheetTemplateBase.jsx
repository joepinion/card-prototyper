import React from 'react';
import './SheetTemplate.scss';
import {loadCsvDataFromUrl, makeCardsFromData} from '../utils';
export default class SheetTemplateBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            data: null,
        }
    }
    componentDidMount() {
        if(this.props.cardInfo) {
            let opt = this.props.cardInfo;
            if(this.props.cardInfo.data) {
                this.setState({cards: makeCardsFromData(this.props.cardInfo.data, opt)});
            } else if(this.props.cardInfo.data_url) {
                loadCsvDataFromUrl(this.props.cardInfo.data_url).then((results) => {
                    this.setState({
                        cards: makeCardsFromData(results.data, opt), 
                        data: results.data
                    });
                });
            }
        }
    }
    getContent() {
        return null;
    }
    getClass() {
        return "sheet";
    }
    renderSheet() {
        return <div className={this.getClass()}>
            {this.getContent()}
        </div>;
    }
    render() {
        if(!this.state.cards) {
            return null;
        }
        return this.renderSheet();
    }
}