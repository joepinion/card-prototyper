import SheetTemplateBase from "./SheetTemplateBase";

export default class PrintableSheet extends SheetTemplateBase {
    constructor(props) {
        super(props);
    }
    getClass() {
        return super.getClass() + " sheet-printable";
    }

    getMaxPages() {
        return Math.ceil(this.state.cards.length / this.getCardsPerPage());
    }

    getCardsPerPage() {
        return this.props.rowsPerPage * this.props.cardsPerRow;
    }

    renderPage(page_num, is_back=false) {
        if(page_num>this.getMaxPages()) {
            return null;
        }
        let cards_on_page = this.state[is_back ? "backs" : "cards"].slice((page_num-1)*this.getCardsPerPage(), page_num*this.getCardsPerPage());
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
                if(is_back) {
                    row.unshift(cards_on_page[r*this.props.cardsPerRow+c]);
                } else {
                    row.push(cards_on_page[r*this.props.cardsPerRow+c]);
                }
            }
            rows.push(<div key={r} className="sheet-row flex flex-row justify-center items-start">
                {row}
            </div>);
        }
        return <div key={page_num} className="sheet-page flex flex-col items-center justify-start">
            {rows}
        </div>;
    }

    getContent() {
        let pages = this.props.pages;
        if(!pages) {
            pages = [];
            for(let i=1; i<=this.getMaxPages(); i++) {
                pages.push(i);
            }
        }
        let rendered_pages = [];
        for(let one_page of pages) {
            rendered_pages.push(this.renderPage(one_page));
            if(this.state.backs.length===this.state.cards.length) {
                rendered_pages.push(this.renderPage(one_page, true));
            }
        }
        return <>
           {rendered_pages} 
        </>;
    }
}