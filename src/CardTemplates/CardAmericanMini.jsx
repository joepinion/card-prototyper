import CardTemplateBase from "./CardTemplateBase";

export default class CardAmericanMini extends CardTemplateBase {
    getClass() {
        return super.getClass() + " card-american-mini";
    }
}