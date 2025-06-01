import CardTemplateBase from "./CardTemplateBase";

export default class FullPage extends CardTemplateBase {
    constructor(props) {
        super(props);
    }
    static getWidth() {
        return 650;
    }
    static getHeight() {
        return 970;
    }
    getClass() {
        return super.getClass() + " card-full-page";
    }
}