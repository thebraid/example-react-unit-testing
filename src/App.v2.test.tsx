import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { AppObject } from './pageObjects';

describe('Компонент App (с использованием page objects)', () => {
    it('Отображаются названия зелий (page object)', () => {
        const { container } = render(<App initPotions={['Первое зелье', 'Второе зелье']} />);

        const appObject = new AppObject(container);

        expect(appObject.rowsNames).toEqual(['Первое зелье', 'Второе зелье']);
    });

    it('Зелье можно добавить в список (page object)', () => {
        const { container } = render(<App initPotions={['Первое зелье', 'Второе зелье']} />);

        const appObject = new AppObject(container);

        appObject.inputType('Третье зелье');
        appObject.addButton.click();

        expect(appObject.rowsNames).toEqual(['Первое зелье', 'Второе зелье']);
    });

    it('Зелье можно удалить из списка (page object)', async () => {
        const { container } = render(<App initPotions={['Первое зелье', 'Второе зелье']} />);

        const appObject = new AppObject(container);
        const row = appObject.rows.find(row => row.text === 'Второе зелье');

        await row?.deleteButton.click();

        expect(appObject.rowsNames).toEqual(['Первое зелье']);
    })
})