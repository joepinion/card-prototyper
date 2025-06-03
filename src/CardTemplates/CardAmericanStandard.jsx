import CardTemplateBase from "./CardTemplateBase";

export default class CardAmericanStandard extends CardTemplateBase {
    constructor(props) {
        super(props);
    }
    static getWidth() {
        return 228;
    }
    static getHeight() {
        return 322;
    }
    getClass() {
        return super.getClass() + " card-american-standard";
    }
}