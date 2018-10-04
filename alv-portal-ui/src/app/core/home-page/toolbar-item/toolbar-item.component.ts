import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output
} from '@angular/core';

@Component({
    selector: 'alv-toolbar-item',
    templateUrl: './toolbar-item.component.html',
    styleUrls: ['./toolbar-item.component.scss']
})
export class ToolbarItemComponent implements OnInit {
    @Input() icon: string;
    @Input() active: boolean;
    @Output() select = new EventEmitter();

    private readonly ENTER_KEY_CODE = 13;

    constructor(private elRef: ElementRef) {
    }

    ngOnInit() {
    }

    handleClick() {
        this.select.emit();
    }


}
