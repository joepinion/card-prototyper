import CardProto from './CardPrototyper.jsx'
import utils from './utils.jsx'
import SheetTemplateBase from './SheetTemplates/SheetTemplateBase.jsx';
import PrintableSheet from './SheetTemplates/PrintableSheet.jsx';
import CardAmericanStandard from './CardTemplates/CardAmericanStandard.jsx';
import CardAmericanMini from './CardTemplates/CardAmericanMini.jsx';
import CardTemplateBase from './CardTemplates/CardTemplateBase.jsx';
import FullPage from './CardTemplates/FullPage.jsx';
import './output.css';


const CardPrototyper = {
    CardPrototyper: CardProto,
    utils: utils,
    sheets: {
      SheetTemplateBase, 
      PrintableSheet
    },
    cards: {
      CardTemplateBase,
      CardAmericanStandard,
      CardAmericanMini,
      FullPage,
    }
  }

  export default CardPrototyper;
