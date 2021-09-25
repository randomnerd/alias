import { makeAutoObservable } from 'mobx';

export class CommonStore {
    history: string[] = ['start']
    page = 'start'
    constructor() {
        makeAutoObservable(this)
    }

    public setPage(page: string) {
        this.history.push(page)
        this.page = page
    }

    public getPage() {
        return this.page
    }

    public goBack() {
        this.history.splice(-1)
        this.page = this.history[this.history.length - 1]
    }
}
export const commonStore = new CommonStore();
