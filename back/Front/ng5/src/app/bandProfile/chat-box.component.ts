import { Component, ViewChild, ElementRef, OnInit, AfterViewInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';
export class Message {
    constructor(
        public sender: string,
        public content: string,
        public isBroadcast = false,
    ) { }
}
@Component({
    selector: 'app-chat-box',
    templateUrl: './chat-box.component.html',
    styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements AfterViewInit, OnInit {

    @ViewChild('viewer') private viewer: ElementRef;

    public serverMessages = new Array<Message>();
    public clientMessage =  'Welcome, ask band if he is looking for a gig!';
    public isBroadcast = false;
    public sender = 'Sys';
    private socket$: WebSocketSubject<Message>;

    constructor() {}
    ngAfterViewInit(): void {
        this.scroll();
    }
    ngOnInit() {
      this.socket$ = WebSocketSubject.create('ws://52.40.161.160:3000');
        this.send();
        this.isBroadcast = true;
        this.socket$
            .subscribe(
            (message) => this.serverMessages.push(message) && this.scroll(),
            (err) => console.error(err),
            () => console.log('Default message fetched')
            );
            this.sender = JSON.parse(localStorage.getItem('user')).username;
          }
    public toggleIsBroadcast(): void {
        this.isBroadcast = !this.isBroadcast;
    }

    public send(): void {
        const message = new Message(this.sender, this.clientMessage, this.isBroadcast);
        this.serverMessages.push(message);
        this.socket$.next(<any>JSON.stringify(message));
        this.clientMessage = '';
        this.scroll();
    }

    public isMine(message: Message): boolean {
        return message && message.sender === this.sender;
    }

    public getSenderInitials(sender: string): string {
        return sender && sender.substring(0, 3).toLocaleUpperCase();
    }

    private getSenderColor(sender: string): string {
        const alpha = '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZ';
        const initials = this.getSenderInitials(sender);
        const value = Math.ceil((alpha.indexOf(initials[0]) + alpha.indexOf(initials[1])) * 255 * 255 * 255 / 70);
        return '#' + value.toString(16).padEnd(6, '0');
    }

    private scroll(): void {
        setTimeout(() => {
            this.scrollToBottom();
        }, 100);
    }

    private getDiff(): number {
        const nativeElement = this.viewer.nativeElement;
        return nativeElement.scrollHeight - (nativeElement.scrollTop + nativeElement.clientHeight);
    }

    private scrollToBottom(t = 1, b = 0): void {
        if (b < 1) {
            b = this.getDiff();
        }
        if (b > 0 && t <= 120) {
            setTimeout(() => {
                const diff = this.easeInOutSin(t / 120) * this.getDiff();
                this.viewer.nativeElement.scrollTop += diff;
                this.scrollToBottom(++t, b);
            }, 1 / 60);
        }
    }

    private easeInOutSin(t): number {
        return (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2;
    }
}
