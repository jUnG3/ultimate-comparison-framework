export class Details {
    public header: string;
    public headerLabel: string;
    public headerUrl: string;
    public bodyMainTitle: string;
    public body: string;
    public disabledBodyAttachmentTags: Array<string>;
    public tooltipAsText: boolean;

    constructor(jsonObj: any) {
        this.header = jsonObj.header ? jsonObj.header : 'tag';
        this.headerLabel = jsonObj['header-label'] ? jsonObj['header-label'] : 'undefined';
        this.headerUrl = jsonObj['header-url'] ? jsonObj['header-url'] : 'url';
        this.bodyMainTitle = jsonObj['body-main-title'] ? jsonObj['body-main-title'] : 'Description';
        this.body = jsonObj.body ? jsonObj.body : 'Description';
        this.disabledBodyAttachmentTags = jsonObj['disable-body-attachment-tags'] ? jsonObj['disable-body-attachment-tags'] : [];
        this.tooltipAsText = jsonObj.tooltipAsText != null ? jsonObj.tooltipAsText : true;
    }
}
