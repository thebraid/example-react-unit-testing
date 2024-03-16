import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

describe('Компонент App', () => {
    it('Отображаются названия зелий', () => {
        const { container } = render(<App initPotions={['Первое зелье', 'Второе зелье']} />);

        const nameElements = Array.from(container.querySelectorAll<Element>('.Row-Name'));
        const potionNames = nameElements.map((row: Element) => row.textContent || '');

        expect(potionNames).toEqual(['Первое зелье', 'Второе зелье']);
    });

    it('Зелье можно добавить в список', async () => {
        const { container } = render(<App initPotions={[]} />);

        const inputElem = container.querySelector('.Input')!;
        const addButton = container.querySelector('.Add')!;

        await userEvent.type(inputElem, 'Третье зелье');
        await userEvent.click(addButton);

        const nameElements = Array.from(container.querySelectorAll<Element>('.Row-Name'));
        const potionNames = nameElements.map((row: Element) => row.textContent || '');

        expect(potionNames).toEqual(['Третье зелье']);
    })

    it('Зелье можно удалить из списка', async () => {
        const { container } = render(<App initPotions={['Первое зелье', 'Второе зелье']} />);

        const rowElements = Array.from(container.querySelectorAll<Element>('.Row'));
        const targetPotionRow = rowElements.find(element => element.querySelector('.Row-Name')?.textContent === 'Второе зелье');
        const deleteButton = targetPotionRow?.querySelector('.Row-Remove')!;

        await userEvent.click(deleteButton);

        const nameElements = Array.from(container.querySelectorAll<Element>('.Row-Name'));
        const potionNames = nameElements.map((row: Element) => row.textContent || '');

        expect(potionNames).toEqual(['Первое зелье']);
    });
})