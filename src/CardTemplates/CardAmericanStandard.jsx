import CardTemplateBase from "./CardTemplateBase";

export default class CardAmericanStandard extends CardTemplateBase {
    constructor(props) {
        super(props);
    }
    getClass() {
        return super.getClass() + " card-american-standard";
    }
}