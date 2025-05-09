import Papa from 'papaparse';
import CardTemplateBase from './CardTemplates/CardTemplateBase';
import React from 'react';

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

export function makeCardsFromData(data, options) {
    if(!options.template) options.template = CardTemplateBase;
    let cards = [];
    for(let [i, item] of data.entries()) {
        let count = 1;
        if(options.quantity_field) {
            count = item[options.quantity_field];
        }
        for(let c=0; c<count; c++) {
            let card = React.createElement(options.template, {data: item, key: `${i}-${c}`});
            cards.push(card);
        }
    };
    return cards;
}