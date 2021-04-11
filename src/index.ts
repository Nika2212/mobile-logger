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

class MobileLogger {
    private inspectButton: HTMLElement;
    private inspectModal: HTMLElement;

    constructor() {
        this.onInit();
    }

    // Ladder Methods

    private onInit(): void {
        this.setDefaults();
        this.setEvents();
    }

    private setDefaults(): void {}

    private setEvents(): void {}

    // Construct Methods

    private renderButton(): void {}

    private renderModal(): void {}
}

const _md = new MobileLogger();
