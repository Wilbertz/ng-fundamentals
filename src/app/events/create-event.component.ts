import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
    template: `
        <h1>New Event</h1>
        <hr>
        <div class="col-md-6">
            <h3>[Create Event Form will go here]</h3>
            <br/>
            <br/>
            <button type="submit" class="btn btn-primary" (click)="save()">Save</button>
            <button type="default" class="btn btn-cancel" (click)="cancel()">Cancel</button>
        <div>
    `
})
export class CreateEventComponent {

    isDirty: boolean = true;

    constructor(private router: Router) {

    }
    save() {
        this.isDirty = false;
    }

    cancel() {
        this.router.navigate(['/events']);
    }
}