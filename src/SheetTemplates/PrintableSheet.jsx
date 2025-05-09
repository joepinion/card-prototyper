import SheetTemplateBase from "./SheetTemplateBase";

export default class PrintableSheet extends SheetTemplateBase {
    constructor(props) {
        super(props);
    }
    getClass() {
        return super.getClass() + " sheet-printable";
    }

    getMaxPages() {
        return Math.ceil(this.props.cards.length / this.getCardsPerPage());
    }

    getCardsPerPage() {
        return this.props.rowsPerPage * this.props.cardsPerRow;
    }

    renderPage(page_num) {
        if(page_num>this.getMaxPages()) {
            return null;
        }
        let cards_on_page = this.props.cards.slice((page_num-1)*this.getCardsPerPage(), page_num*this.getCardsPerPage());
        let rows = [];
        for(let r=0; r<this.props.rowsPerPage; r++) {
            if(r*this.props.cardsPerRow >= cards_on_page.length) {
                break;
            }
            let row = [];
            for(let c=0; c<this.props.cardsPerRow; c++) {
                if(r*this.props.cardsPerRow+c >= cards_on_page.length) {
                    break;
                }
                row.push(cards_on_page[r*this.props.cardsPerRow+c]);
            }
            rows.push(<div className="sheet-row flex flex-row justify-center items-start">
                {row}
            </div>);
        }
        return <div key={page_num} className="sheet-page flex flex-col items-center justify-start">
            {rows}
        </div>;
    }

    render() {
        let pages = this.props.pages;
        if(!pages) {
            pages = [];
            for(let i=1; i<=this.getMaxPages(); i++) {
                pages.push(i);
            }
            console.log(pages);
        }
        return <div className={this.getClass()}>
            {pages.map((page_num) => this.renderPage(page_num))}
        </div>;
    }
}