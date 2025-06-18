import Papa from 'papaparse';
import CardTemplateBase from './CardTemplates/CardTemplateBase';
import React from 'react';
import domtoimage from 'dom-to-image-more';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const IMAGE_SCALE = 3;
export const PX_PER_INCH = 92;

export function loadCsvDataFromUrl(url) {
    return new Promise((resolve) => {
         Papa.parse(url, {
              download: true,
              header: true,
              complete: (results) => {
                  resolve(results);
              }
        });
    })
}

export function downloadDomImage(id, bgcolor="#FFFFFF", scale=IMAGE_SCALE) {
    return new Promise(r=>{
        getDomImageBlob(id, bgcolor, scale).then((blob) => {
            let link=window.URL.createObjectURL(blob);
            r(link);
            download(link);
        });
    });
}

export function download(href) {
    const a = document.createElement('a');
    a.href = href;
    a.download = 'image.png';
    a.click();
}

export function getDomImageBlob(id, bgcolor="#FFFFFF", scale=IMAGE_SCALE) {
    return new Promise(r=>{
        domtoimage.toBlob(
            document.getElementById(id), 
            {
                bgcolor: bgcolor,
                copyDefaultStyles: false,
                quality: 1,
                scale: scale,
            }
        ).then((blob) => {
            r(blob);
        });
    });
}

export function getDomImageData(id, bgcolor="#FFFFFF", scale=IMAGE_SCALE) {
    return new Promise(r=>{
        domtoimage.toPng(
            document.getElementById(id), 
            {
                bgcolor: bgcolor,
                copyDefaultStyles: false,
                quality: 1,
                scale: scale,
            }
        ).then((d) => {
            r(d);
        });
    });
}

export function makeCardsFromData(data, options) {
    if(!options.template) options.template = CardTemplateBase;
    let cards = [];
    let filtered_data = data;
    if(options.changed_only) {
        filtered_data = data.filter(x=>x[options.changed_only]);
    }
    for(let [i, item] of filtered_data.entries()) {
        let count = 1;
        if(options.quantity_field) {
            count = item[options.quantity_field];
        }
        for(let c=0; c<count; c++) {
            let card = React.createElement(options.template, {data: item, key: `${i}-${c}`, processText: options.processText, options: options});
            cards.push(card);
        }
    };
    return cards;
}

export function genericBackTemplate(base_template, content, options={}) {
    class BackTemplate extends base_template {
        getContent() {
            let styles = {};
            if(options.bg_color) {
                styles.backgroundColor = options.bgcolor;
            }
            if(options.text_color) {
                styles.color = options.text_color;
            }
            let classes = ["w-full", "h-full", "flex", "flex-col", "items-center", "justify-center"];
            if(options.classes) {
                classes = [...classes, ...options.classes];
            }
            return <div className={classes.join(" ")} style={styles}>
                {content}
            </div>
        }
    }
    return BackTemplate;
}

export function getTextProcessor(icons={}, jsx={}, default_icon_class="inline-block h-[15px] w-auto relative bottom-[2px]") {
    return (text, icon_class=default_icon_class) => {
        if(!text) return "";
        text = text.replace(/(?:\r\n|\r|\n|\u2028)/g, '[>]');
        let jsx_to_return = [];
        let spl_text = text.split("[>]");
        let spl_ranger = 0;
        while(spl_ranger<spl_text.length) {
            let txt = spl_text[spl_ranger];
            if(txt==="") {
                spl_ranger++;
                continue;
            }
            let items_jsx = [];
            let all_array = [
                ...Object.keys(icons),
                ...Object.keys(jsx),
                ">"
            ].map(x=>RegExp.escape(x));
            let rx = new RegExp(
                String.raw`\[(${all_array.join("|")}|fas:[A-Za-z]+|far:[A-Za-z]+|fab:[A-Za-z]+)\]`
            , "g");
            let split_for_items = txt.split(rx);
            for(let [index, one_item] of split_for_items.entries()) {
                if(index%2===0) {
                    if(one_item!=="") items_jsx.push(
                        <span key={"items_"+index+"_"+spl_ranger}>{one_item}</span>
                    );
                } else if(one_item===">") {
                    items_jsx.push(
                        <p key={"items_"+index+"_"+spl_ranger}></p>
                    );
                } else if(one_item.slice(0,4)==="fas:") {
                    let icon_name = one_item.slice(4);
                    items_jsx.push(<span key={spl_ranger+"_fas_"+index} className={"text-icon text-icon-"+one_item}>
                        <FontAwesomeIcon icon={`fa-solid fa-${icon_name}`} />
                    </span>);
                } else if(one_item.slice(0,4)==="far:") {
                    let icon_name = one_item.slice(4);
                    items_jsx.push(<span key={spl_ranger+"_fas_"+index} className={"text-icon text-icon-"+one_item}>
                        <FontAwesomeIcon icon={`fa-regular fa-${icon_name}`} />
                    </span>);
                } else if(one_item.slice(0,4)==="fab:") {
                    let icon_name = one_item.slice(4);
                    items_jsx.push(<span key={spl_ranger+"_fas_"+index} className={"text-icon text-icon-"+one_item}>
                        <FontAwesomeIcon icon={`fa-brands fa-${icon_name}`} />
                    </span>);
                } else if(Object.keys(icons).includes(one_item)) {
                    let icon_src = icons[one_item];
                    items_jsx.push(<span key={spl_ranger+"_ico_"+index} className={"text-icon text-icon-"+one_item}><img src={icon_src} alt={one_item} className={icon_class} /></span>);
                } else if(Object.keys(jsx).includes(one_item)) {
                    items_jsx.push(<span key={spl_ranger+"_jsx_"+index}>{jsx[one_item]}</span>);
                }
            }
            if(items_jsx.length>1) {
                jsx_to_return.push(
                    <span key={spl_ranger+"_mult"}>
                        {items_jsx}
                    </span>
                );
            } else if(items_jsx.length===1) {
                jsx_to_return.push(items_jsx[0]);
            }
            spl_ranger++;
        }
        return jsx_to_return;
    }
}

export default {
    loadCsvDataFromUrl,
    makeCardsFromData,
    getTextProcessor,
    genericBackTemplate,
};