import CardTemplateBase from "./CardTemplateBase";

export default class FullPage extends CardTemplateBase {
    constructor(props) {
        super(props);
    }
    static getWidth() {
        return 725;
    }
    static getHeight() {
        return 960;
    }
    getClass() {
        return super.getClass() + " card-full-page";
    }
}