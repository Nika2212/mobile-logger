class StaticDataContainer {
    static getSquircleSVG(): string {
        return '';
    }

    static getIconSVG(): string {
        return '';
    }
}

class DOM {
    static createElement(tagName: keyof HTMLElementTagNameMap, attributeObject: object, styleObject: object, parentElement: HTMLElement): HTMLElement {
        const newElement = document.createElement(tagName);

        DOM.setStyle(newElement, styleObject);
        DOM.setAttributes(newElement, styleObject);

        if (parentElement) {
            parentElement.appendChild(newElement);
        }

        return parentElement;
    }

    static removeElement(el: Element): boolean {
        if (el && el.remove) {
            el.remove();
            return true;
        } else {
            return false;
        }
    }

    static setStyle(el: HTMLElement, styleObject: object): void {

    }

    static setAttributes(el: HTMLElement, attributeObject: object): void {}
}

enum LogTypes {
    ERROR,
    WARN,
    INFO
}

let args;

interface Log {
    message: string;
    timestamp: number;
    type: LogTypes;
}

class MobileLogger {
    private inspectButtonRef: HTMLElement;
    private inspectModalRef: HTMLElement;
    private logs: Log[] = [];

    constructor() {
        this.onInit();
    }

    // Ladder Methods

    private onInit(): void {
        this.setDefaults();
        this.setEvents();
    }

    private setDefaults(): void {}

    private setEvents(): void {
        window.addEventListener('error', (error) => {
            const newLog: Log = {
                message: error.message,
                timestamp: new Date().getTime(),
                type: LogTypes.ERROR
            };

            this.logs.push(newLog);
        }, false);

        const that = this;

        console['defaultLog'] = console.log.bind(console);
        console['logs'] = [];
        console.log = function() {
            that.catchConsole(arguments);

            console['defaultLog'].apply(console, arguments);
        };
    }

    // Construct Methods

    private catchConsole(args: IArguments): void {

    }

    private renderButton(): void {}

    private renderModal(): void {}
}

const _md = new MobileLogger();
