import CardTemplateBase from "./CardTemplateBase";

export default class FullPage extends CardTemplateBase {
    constructor(props) {
        super(props);
    }
    getClass() {
        return super.getClass() + " card-full-page";
    }
}