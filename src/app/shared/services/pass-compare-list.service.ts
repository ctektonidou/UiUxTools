import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PassCompareListService {
    private compareList$ = new BehaviorSubject<string[]>([]);
    selectedCompareList$ = this.compareList$.asObservable();
    public hasCompareList: boolean = false;

    constructor() { }

    setCompareList(list: any) {
        this.compareList$.next(list);
        this.hasCompareList = true;
    }
}