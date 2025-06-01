import React from 'react';
import './SheetTemplate.scss';
import {downloadDomImage, loadCsvDataFromUrl, makeCardsFromData} from '../utils';
export default class SheetTemplateBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            backs: [],
            data: null,
        }
    }
    componentDidMount() {
        if(this.props.cardInfo) {
            let opt = this.props.cardInfo;
            if(this.props.cardInfo.data) {
                this.setState({cards: makeCardsFromData(this.props.cardInfo.data, opt)});
                if(this.props.cardInfo.back_template) {
                    this.setState({
                        backs: makeCardsFromData(this.props.cardInfo.data, Object.assign({}, opt, {template: this.props.cardInfo.back_template}))
                    })
                }
            } else if(this.props.cardInfo.data_url) {
                loadCsvDataFromUrl(this.props.cardInfo.data_url).then((results) => {
                    this.setState({
                        cards: makeCardsFromData(results.data, opt), 
                        data: results.data
                    });
                    if(this.props.cardInfo.back_template) {
                        this.setState({
                            backs: makeCardsFromData(results.data, Object.assign({}, opt, {template: this.props.cardInfo.back_template}))
                        })
                    }
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
    doDownload() {
        downloadDomImage(this.props.download_id);
    }
    getDownloadButton() {
        return <div className="sheet-download-button">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>this.doDownload()}>
                Download
            </button>
        </div>
    }
    renderSheet() {
        return <div className={this.getClass()} id={this.props.download_id ? this.props.download_id : null}>
            {this.getContent()}
        </div>;
    }
    render() {
        if(!this.state.cards) {
            return null;
        }
        return <>
            {this.props.download_id && this.getDownloadButton()}
            {this.renderSheet()}
        </>;
    }
}