import Papa from 'papaparse';
import CardTemplateBase from './CardTemplates/CardTemplateBase';
import React from 'react';
import domtoimage from 'dom-to-image-more';

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

export function downloadDomImage(id, bgcolor="#FFFFFF") {
    domtoimage.toBlob(
        document.getElementById(id), 
        {
            bgcolor: bgcolor,
            copyDefaultStyles: false,
        }
    ).then((blob) => {
        let link=window.URL.createObjectURL(blob);
        window.location=link;
    });
}

export function makeCardsFromData(data, options) {
    if(!options.template) options.template = CardTemplateBase;
    let cards = [];
    for(let [i, item] of data.entries()) {
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
            let rx = new RegExp(String.raw`\[(${all_array.join("|")})\]`, "g");
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
    downloadDomImage,
    genericBackTemplate,
};