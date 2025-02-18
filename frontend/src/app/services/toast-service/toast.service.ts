import { Injectable } from '@angular/core';

export interface Toast {
  header?: string,
  body: string,
  classname?: string,
  delay?: number
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: Toast[] = []

  constructor() { }

  show(header: string, body: string, classname?: string, delay?: number) {
    this.toasts.push({ header, body, classname, delay })
  }

  remove(toast: Toast){
    this.toasts = this.toasts.filter(t => t != toast);
  }

  clear(){
    this.toasts.splice(0, this.toasts.length);
  }
}
