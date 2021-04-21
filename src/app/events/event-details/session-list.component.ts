import { Component, Input, OnChanges, SimpleChanges } from '@angular/core'
import { ISession } from '../shared/index'
import { AuthService } from '../../user/auth.service'
import { VoterService } from './voter.service'

@Component({
    selector: 'session-list',
    templateUrl: './session-list.component.html'
})
export class SessionListComponent implements OnChanges {
    
    @Input() sessions!: ISession[] | undefined;
    @Input() filterBy!: string;
    @Input() sortBy!: string;
    visibleSessions: ISession[] | undefined = [];

    constructor(private auth: AuthService, private voterService: VoterService ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (this.sessions) {
            this.filterSessions(this.filterBy);
            this.sortBy === 'name'
                ? this.visibleSessions?.sort(this.sortByNameAscending) 
                : this.visibleSessions?.sort(this.sortByVotesDescending)
        }
    }

    toggleVote(session: ISession) {
        if(this.userHasVoted(session)) {
            this.voterService.deleteVoter(session, this.auth.currentUser.userName);
        }
        else {
            this.voterService.addVoter(session, this.auth.currentUser.userName);
        }
        if(this.sortBy === 'votes') {
            this.visibleSessions?.sort(this.sortByVotesDescending);
        }
    }

    userHasVoted(session: ISession) {
        return this.voterService.userHasVoted(session, this.auth.currentUser.userName);

    }

    filterSessions(filter: string) {
        if(filter === 'all') {
            this.visibleSessions = this.sessions?.slice(0);
        } else {
            this.visibleSessions = this.sessions?.filter(session => {
                return session.level.toLocaleLowerCase() === filter;
            } )
        }
    }

    sortByNameAscending(s1: ISession, s2: ISession) : number {
        if (s1.name > s2.name) return 1;
        else if(s1.name === s2.name) return 0;
        else return -1;
    }
    
    sortByVotesDescending(s1: ISession, s2: ISession) : number {
        if (s1.voters.length > s2.voters.length) return -1;
        else if(s1.voters.length === s2.voters.length) return 0;
        else return 1;
    }
}