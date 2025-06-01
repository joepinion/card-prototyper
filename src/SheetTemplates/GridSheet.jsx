import SheetTemplateBase from "./SheetTemplateBase";

export default class GridSheet extends SheetTemplateBase {
    constructor(props) {
        super(props);
    }
    getClass() {
        return super.getClass() + " sheet-grid";
    }

    gridSize() {
        return this.props.rows * this.props.cardsPerRow;
    }

    getContent() {
        let offset = this.props.offset || 0;
        let cards = this.state.cards.slice(offset, offset+this.gridSize());
        let rows = [];
            for(let r=0; r<this.props.rows; r++) {
                if(r*this.props.cardsPerRow >= cards.length) {
                    break;
                }
                let row = [];
                for(let c=0; c<this.props.cardsPerRow; c++) {
                    if(r*this.props.cardsPerRow+c >= cards.length) {
                        break;
                    }
                    row.push(cards[r*this.props.cardsPerRow+c]);
                }
                rows.push(<div key={r} className="sheet-row flex flex-row justify-start items-start">
                    {row}
                </div>);
            }
        return <>{rows}</>;
    }
}