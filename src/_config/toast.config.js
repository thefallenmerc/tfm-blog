export class Toast {
    constructor() {
        this.toasts = [];
    }

    add(title = '', message = '', type = '') {
        this.toasts.push({
            title,
            message,
            type
        });
    }
    
}