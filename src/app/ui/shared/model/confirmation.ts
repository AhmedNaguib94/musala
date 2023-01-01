export enum ConfirmationType {
    DestructiveAction,
    NonDestructiveAction
}

export class Confirmation {
    constructor(
        public type: ConfirmationType = ConfirmationType.NonDestructiveAction,
        public headerTitle: string = '',
        public message: string = '',
        public mainActionText?: string,
        public cancelActionText?: string,
        public checkboxOption?: string
    ) { }
}
