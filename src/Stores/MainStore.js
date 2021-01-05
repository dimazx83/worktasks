import { HeaderStore } from './HeaderStore.js'
import { ItemsStore } from './ItemsStore.js'
import { FooterStore } from './FooterStore.js'

export class MainStore {
    constructor() {
        this.headerStore = new HeaderStore(),
        this.itemsStore = new ItemsStore(),
        this.footerStore = new FooterStore()
    }
}