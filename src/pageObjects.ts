import userEvent from '@testing-library/user-event';

export class BaseObject {
    container: Element;

    constructor(container: Element) {
        this.container = container;
    }

    async click() {
        await userEvent.click(this.container);
    }
}

export class RowObject extends BaseObject {
    get text() {
        return this.container.querySelector('.Row-Name')?.textContent || '';
    }

    get deleteButton(): BaseObject {
        const element = this.container.querySelector('.Row-Remove')!;

        return new BaseObject(element);
    }
}

export class AppObject {
    container: Element;

    constructor(container: Element) {
        this.container = container;
    }

    get rows(): RowObject[] {
        return Array.from(this.container.querySelectorAll<Element>('.Row')).map(row => new RowObject(row));
    }

    get rowsNames(): string[] {
        return this.rows.map(row => row.text);
    }

    async inputType(text: string): Promise<void> {
        await userEvent.type(this.input, text);
    }

    private get input(): Element {
        return this.container.querySelector('.Input')!
    }

    get addButton(): BaseObject {
        const element = this.container.querySelector('.Add')!

        return new BaseObject(element);
    }
}