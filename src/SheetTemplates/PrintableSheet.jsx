import { getDomImageBlob, getDomImageData } from "../utils";
import SheetTemplateBase from "./SheetTemplateBase";
import { jsPDF } from "jspdf";

export default class PrintableSheet extends SheetTemplateBase {
    constructor(props) {
        super(props);
    }
    componentDidUpdate(prevProps, prevState) {
        if(!prevState.prepping_download && this.state.prepping_download) {
            this.doNextPageImage();
        } else if(this.state.prepping_download && prevState.page_images.length<this.state.page_images.length) {
            this.doNextPageImage();
        }
    }
    getClass() {
        return super.getClass() + " sheet-printable";
    }

    getMaxPages(count_backs=false) {
        let count = Math.ceil(this.state.cards.length / this.getCardsPerPage());
        if(count_backs && this.hasBacks()) {
            return count*2;
        }
        return count;
    }

    getCardsPerPage() {
        return this.props.rowsPerPage * this.props.cardsPerRow;
    }

    getPageId(page_num, is_back=false) {
        if(!this.props.download_id) return null;
        return `${this.props.download_id}-page${page_num}-${is_back ? "back" : "front"}`;
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
        return <div key={page_num} id={this.getPageId(page_num, is_back)} className="sheet-page flex flex-col items-center justify-start">
            {rows}
        </div>;
    }

    doDownload() {
        this.setState({prepping_download: "Prepping image of page 1.", page_images: []});
    }

    doNextPageImage() {
        if(this.state.page_images.length===this.getMaxPages(true)) {
            this.setState({prepping_download: "Prepping PDF for download."});
            let pdf = new jsPDF({
                orientation: this.props.orientation || "landscape",
                format: this.props.format || "letter",
                unit: this.props.unit || "in",
            });
            for(let [i, page_image] of this.state.page_images.entries()) {
                if(i!==0) {
                    pdf.addPage();
                }
                pdf.addImage(page_image, "png", .5, .5, 0, 0, null, "NONE");
            }
            pdf.save(`${this.props.download_id}.pdf`);
            this.setState({prepping_download: false});
            return;
        }
        let page_num = this.state.page_images.length+1;
        this.setState({prepping_download: `Prepping image of page ${page_num}.`});
        let is_back = false;
        if(this.hasBacks()) {
            if(page_num%2===1) {
                is_back = true;
            }
            page_num = Math.floor(page_num/2);
        }
        let page_id = this.getPageId(page_num, is_back);
        getDomImageData(page_id).then(d=>{
            this.setState({page_images: [...this.state.page_images, d]});
        })
    }

    hasBacks() {
        return this.state.backs.length===this.state.cards.length;
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
            if(this.hasBacks()) {
                rendered_pages.push(this.renderPage(one_page, true));
            }
        }
        return <>
           {rendered_pages} 
        </>;
    }
}