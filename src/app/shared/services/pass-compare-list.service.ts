import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { SearchItem } from "../models/search-item.model";

@Injectable({
    providedIn: 'root'
})
export class PassCompareListService {
    private compareList$ = new BehaviorSubject<SearchItem[]>([]);
    selectedCompareList$ = this.compareList$.asObservable();
    public hasCompareList: boolean = false;

    constructor() { }

    setCompareList(list: any) {
        this.compareList$.next(list);
        this.hasCompareList = true;
    }
}