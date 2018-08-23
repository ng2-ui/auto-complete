export class AutoCompleteFilter {
    public enabled?: boolean;
    public label: string;
    public filterBy?: (item: any) => boolean;
}
