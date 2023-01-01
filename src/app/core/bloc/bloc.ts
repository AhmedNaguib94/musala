import { BehaviorSubject, Observable, Subject } from 'rxjs';

export abstract class Bloc<BlocEvent, BlocState>  {

    protected onState$ = new BehaviorSubject<BlocState>(null);
    protected setEvent$ = new BehaviorSubject<BlocEvent>(null);
    protected destroy$ = new Subject();
    private currentState: BlocState;

    constructor() {
        this.setEvent.subscribe((event: BlocEvent) => this.handleIncomingEvents(event));
        this.onState$.subscribe(state => this.currentState = state);
    }

    get onState(): Observable<BlocState> {
        return this.onState$.asObservable();
    }

    get setEvent(): BehaviorSubject<BlocEvent> {
        return this.setEvent$;
    }

    dispose(): void {
        this.onState$.complete();
        this.setEvent$.complete();
        this.destroy$.complete();
    }

    private handleIncomingEvents(event: BlocEvent) {
        if (!event) { return; }
        this.onIncomingEvents(event, this.currentState);
    }

    protected abstract onIncomingEvents(event: BlocEvent, currentState: BlocState);
}
