import { Directive, OnInit, Inject, ElementRef, Input } from '@angular/core';
import { JQ_TOKEN } from './jQuery.service';
//import * as JQuery from 'jquery';
//import * as $ from 'jquery';

declare var $: any;

@Directive({
    selector: '[modal-trigger]'
})
export class ModalTriggerDirective implements OnInit {

    private el: HTMLElement;
    @Input('modal-trigger') modalId!: string;

    constructor(ref: ElementRef, @Inject(JQ_TOKEN) private $: any) {
        this.el = ref.nativeElement;
        
    }

    ngOnInit() {
        this.el.addEventListener('click', e => {
            console.log('Click');
            console.log($);
            console.log($('#simple-modal'));
            $(`#${this.modalId}`).modal({});
        });
    }
}