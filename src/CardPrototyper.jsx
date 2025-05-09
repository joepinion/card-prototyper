import React from 'react';
import './CardPrototyper.scss';
import CardAmericanStandard from './CardTemplates/CardAmericanStandard';
import PrintableSheet from './SheetTemplates/PrintableSheet';

export default class CardPrototyper extends React.Component {
  render() {
    return (
      <div className="card-prototyper w-full flex flex-col items-center justify-start">
        <PrintableSheet
          cards={[<CardAmericanStandard />, <CardAmericanStandard />, <CardAmericanStandard />,<CardAmericanStandard />,<CardAmericanStandard />,<CardAmericanStandard />,<CardAmericanStandard />,<CardAmericanStandard />,<CardAmericanStandard />,<CardAmericanStandard />,<CardAmericanStandard />,<CardAmericanStandard />,<CardAmericanStandard />,<CardAmericanStandard />,<CardAmericanStandard />,<CardAmericanStandard />,<CardAmericanStandard />,<CardAmericanStandard />,<CardAmericanStandard />,<CardAmericanStandard />,<CardAmericanStandard />,<CardAmericanStandard />,<CardAmericanStandard />,<CardAmericanStandard />,<CardAmericanStandard />]}
          cardsPerRow={3}
          rowsPerPage={3}
        />
      </div>
    );
  }
}