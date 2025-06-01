import CardTemplateBase from "./CardTemplateBase";

export default class CardAmericanMini extends CardTemplateBase {
    static getWidth() {
        return 150;
    }
    static getHeight() {
        return 235;
    }
    getClass() {
        return super.getClass() + " card-american-mini";
    }
}