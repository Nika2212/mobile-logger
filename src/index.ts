class StaticDataContainer {
    static getSquircleSVG(): string {
        return `
            <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="-304 -304 608 608">
                <title>Squircle: x to 4th plus y to 4th equals radius to 4th</title>
                <path fill="#01a0e4" stroke="#01a0e4" stroke-width="4.04" d="M0,288 C126.2,288,196.3563,288,242.1782,242.1782 C288,196.3563,288,126.2,288,0 C288,-126.2,288,-196.3563,242.1782,-242.1782 C196.3563,-288,126.2,-288,0,-288 C-126.2,-288,-196.3563,-288,-242.1782,-242.1782 C-288,-196.3563,-288,-126.2,-288,0 C-288,126.2,-288,196.3563,-242.1782,242.1782 C-196.3563,288,-126.2,288,0,288Z"/>
            </svg>
        `;
    }

    static getIconSVG(): string {
        return `
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bug" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-bug fa-w-16"><path fill="#f8f8f8" d="M511.988 288.9c-.478 17.43-15.217 31.1-32.653 31.1H424v16c0 21.864-4.882 42.584-13.6 61.145l60.228 60.228c12.496 12.497 12.496 32.758 0 45.255-12.498 12.497-32.759 12.496-45.256 0l-54.736-54.736C345.886 467.965 314.351 480 280 480V236c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v244c-34.351 0-65.886-12.035-90.636-32.108l-54.736 54.736c-12.498 12.497-32.759 12.496-45.256 0-12.496-12.497-12.496-32.758 0-45.255l60.228-60.228C92.882 378.584 88 357.864 88 336v-16H32.666C15.23 320 .491 306.33.013 288.9-.484 270.816 14.028 256 32 256h56v-58.745l-46.628-46.628c-12.496-12.497-12.496-32.758 0-45.255 12.498-12.497 32.758-12.497 45.256 0L141.255 160h229.489l54.627-54.627c12.498-12.497 32.758-12.497 45.256 0 12.496 12.497 12.496 32.758 0 45.255L424 197.255V256h56c17.972 0 32.484 14.816 31.988 32.9zM257 0c-61.856 0-112 50.144-112 112h224C369 50.144 318.856 0 257 0z" class=""></path></svg>
        `;
    }

    static getCloseSVG(): string {
        return `
            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="svg-inline--fa fa-times fa-w-10"><path fill="#f8f8f8" d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z" class=""></path></svg>
        `;
    }
}

class DOM {
    static createElement(tagName: keyof HTMLElementTagNameMap, attributeObject: object, styleObject: object, parentElement: HTMLElement): HTMLElement {
        const newElement = document.createElement(tagName);

        DOM.setStyle(newElement, styleObject);
        DOM.setAttributes(newElement, attributeObject);

        if (parentElement) {
            parentElement.appendChild(newElement);
        }

        return newElement;
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
        for (const styleProp of Object.keys(styleObject)) {
            el.style[styleProp] = styleObject[styleProp];
        }
    }

    static setAttributes(el: HTMLElement, attributeObject: object): void {
        for (const attrProp of Object.keys(attributeObject)) {
            el.setAttribute(attrProp, attributeObject[attrProp]);
        }

    }

    static renderIf(el: HTMLElement, state: boolean): void {
        if (state) {
            el.style.display = 'flex';
        } else {
            el.style.display = 'none';
        }
    }
}

enum LogTypes {
    ERROR = 'ERR',
    WARN = 'WAR',
    INFO = 'INF'
}

interface ILog {
    message: string;
    timestamp: number;
    type: LogTypes;
}

class MobileLogger {
    private inspectButtonRef: HTMLElement;
    private inspectModalRef: HTMLElement;
    private logs: ILog[] = [];
    private modalState: boolean;

    constructor() {
        this.onInit();
    }

    // Ladder Methods

    private onInit(): void {
        this.setDefaults();
        this.renderButton();
        this.renderModal();
        this.setEvents();
    }

    private setDefaults(): void {}

    private setEvents(): void {
        window.addEventListener('error', (error) => {
            const newLog: ILog = {
                message: error.message,
                timestamp: new Date().getTime(),
                type: LogTypes.ERROR
            };

            this.addLog(newLog);
        }, false);
        this.inspectButtonRef.addEventListener('click', () => this.toggleModal(), false);

        const that = this;

        // https://stackoverflow.com/questions/19846078/how-to-read-from-chromes-console-in-javascript/19846113
        console['defaultLog'] = console.log.bind(console);
        console.log = function() {
            that.catchConsole(arguments, LogTypes.INFO);

            console['defaultLog'].apply(console, arguments);
        };

        console['defaultWarn'] = console.warn.bind(console);
        console.warn = function() {
            that.catchConsole(arguments, LogTypes.WARN);

            console['defaultWarn'].apply(console, arguments);
        };

        console['defaultError'] = console.error.bind(console);
        console.error = function() {
            that.catchConsole(arguments, LogTypes.ERROR);

            console['defaultWarn'].apply(console, arguments);
        };
    }

    private renderButton(): void {
        const buttonContainer = DOM.createElement('div', {}, {
            position: 'fixed',
            right: '15px',
            bottom: '15px',
            width: '58px',
            height: '58px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '15px',
            userSelect: 'none',
            zIndex: '1000001'
        }, document.body);
        const buttonWrapper = DOM.createElement('div', {}, {
            width: '58px',
            height: '58px',

            userSelect: 'none'
        }, buttonContainer);

        buttonWrapper.innerHTML = StaticDataContainer.getSquircleSVG();

        const buttonIcon = DOM.createElement('span', {}, {
            position: 'absolute',
            left: '18px',
            top: '18px',
            width: '24px',
            height: '24px',
        }, buttonWrapper);

        buttonIcon.innerHTML = StaticDataContainer.getIconSVG();

        this.inspectButtonRef = buttonContainer;
    }

    private renderModal(): void {
        // TODO : - Position fixed ios issue

        const modal = DOM.createElement('div', {}, {
            position: 'fixed',
            left: '0',
            top: '0',
            width: '100vw',
            height: '100%',
            display: 'none',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            backgroundColor: '#202124',
            overflow: 'auto',
            transform: 'translate3d(0,0,0)',
            zIndex: '1000000'
        }, document.body);

        this.inspectModalRef = modal;
    }

    // Construct Methods

    private formatLog(log: ILog): string {
        return `[${new Date(log.timestamp).toLocaleTimeString()}] [${log.type}] - ${log.message}`;
    }

    private catchConsole(args: IArguments, type: LogTypes): void {
        const newLog: ILog = {
            timestamp: new Date().getTime(),
            type: type,
            message: ''
        };

        for (let i = 0; i < args.length; i++) {
            newLog.message += args[i];

            if (i < args.length - 1) {
                newLog.message += ', ';
            }
        }

        this.addLog(newLog);
    }

    private addLog(log: ILog): void {
        this.logs.push(log);

        // TODO : - Improve log saving and rendering
        setTimeout(() => {
            this.updateModal(log);
        }, 10);
    }

    private updateModal(log: ILog): void {
        const formattedLog = this.formatLog(log);
        let boxStyle = '';
        let fontColor = '';

        if (log.type === LogTypes.INFO) {
            boxStyle = `border-bottom: 1px solid #3a3a3a`;
            fontColor = 'rgb(240 240 240)';
        } else if (log.type === LogTypes.WARN) {
            boxStyle = `border-bottom: 1px solid rgb(102 85 0); background-color: #332b00`;
            fontColor = 'rgb(255 221 158)';
        } else if (log.type === LogTypes.ERROR) {
            boxStyle = `border-bottom: 1px solid rgb(92 0 0); background-color: #290000`;
            fontColor = '#ff8080';
        }

        this.inspectModalRef.innerHTML += `<p style="box-sizing: border-box; user-select: text; display: inline-block; width: 100%; max-width: 100%; white-space: pre-wrap; min-height: 20px; padding-top: 1px; padding-bottom: 1px; padding-left: 4px; margin: 0; font-family: consolas, sans-serif; font-size: 12px; line-height: 15px; flex-shrink: 0; color: ${fontColor}; ${boxStyle};">${formattedLog}</p>`;
        this.inspectModalRef.scroll(0, this.inspectModalRef.scrollHeight);
    }

    private toggleModal(): void {
        this.modalState = !this.modalState;
        DOM.renderIf(this.inspectModalRef, this.modalState);

        if (this.modalState) {
            this.inspectModalRef.scroll(0, this.inspectModalRef.scrollHeight);
        } else {
        }
    }
}

const _md = new MobileLogger();
