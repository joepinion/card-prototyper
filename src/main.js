import CardProto from './CardPrototyper.jsx'
import utils from './utils.jsx'
import SheetTemplateBase from './SheetTemplates/SheetTemplateBase.jsx';
import PrintableSheet from './SheetTemplates/PrintableSheet.jsx';
import GridSheet from './SheetTemplates/GridSheet.jsx';
import CardAmericanStandard from './CardTemplates/CardAmericanStandard.jsx';
import CardAmericanMini from './CardTemplates/CardAmericanMini.jsx';
import CardTemplateBase from './CardTemplates/CardTemplateBase.jsx';
import FullPage from './CardTemplates/FullPage.jsx';
import './output.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fas, far, fab);

const CardPrototyper = {
    CardPrototyper: CardProto,
    utils: utils,
    sheets: {
      SheetTemplateBase, 
      PrintableSheet,
      GridSheet
    },
    cards: {
      CardTemplateBase,
      CardAmericanStandard,
      CardAmericanMini,
      FullPage,
    }
  }

  export default CardPrototyper;
