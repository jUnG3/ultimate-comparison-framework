import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
    selector: 'pdialog',
    templateUrl: './paper-dialog.component.html',
    styleUrls: ['./paper-dialog.component.css']
})
export class PaperDialogComponent {
    @Input() opened = false;
    @Input() heading: string;

    @Output() openedChange: EventEmitter<boolean> = new EventEmitter();

    @HostListener('click', ['$event.target']) onClick(target) {
        if (target.localName === 'pdialog') {
            this.close();
        }
    }

    public close() {
        this.opened = false;
        this.openedChange.emit();
    }

    @HostListener('window:keydown', ['$event']) onKeydown(event) {
        if (this.opened && event.key.toLowerCase() === 'escape') {
            this.close();
        }
    }
}
