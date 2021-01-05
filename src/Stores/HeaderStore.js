import { makeObservable, observable, computed, action } from "mobx"

export class HeaderStore {
    @observable state = {
        keyword: '',
        mode: 'add'
    }

    enter = (e) => {
        
        switch (e.key) {
            case 'Enter':
                console.log('enter')
                //console.log(this.state.keyword)
                
                this.addItem(this.state.keyword)
                break;
            case "Esc":
            case "Escape":
                console.log('esc')
                this.state.mode = 'none'
                break;
            case "Backspace":
                this.state.keyword = this.state.keyword.slice(0, -1);
                break;
            case "Shift":
                break;
            case "Control":
                break;
            default:
                this.state.keyword += e.key
        }
    }

  /*  updateKeyword = (e) => {
        this.state.keyword = e.target.value
    }*/

    addItem(title) {
        if (!this.validate(title)) return false
       // else this.state.keyword = title
       console.log(title)
    }

     validate(str) {
        return !str.trim() == ''
    }
}