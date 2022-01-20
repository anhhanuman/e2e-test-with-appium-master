import {differenceInYears, parse} from 'date-fns';
import {Screen} from '@shared/helpers/screen';

export class Util {
    static calculatePartnerAge(actualDisplayingBirthDate: string): number {
        const dateFormat: string = 'dd.MM.yyyy';

        return differenceInYears(new Date(), parse(actualDisplayingBirthDate, dateFormat, new Date()));
    }

    static getTodayAndTime(): string {
        const today: Date = new Date();
        const currentHour: number = this.addZero(today.getHours());
        const currentMinute: number = this.addZero(today.getMinutes());
        const dd: string = String(today.getDate()).padStart(2, '0');
        const mm: string = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy: number = today.getFullYear();

        return dd + '.' + mm + '.' + yyyy + ', ' + currentHour + ':' + currentMinute;
    }

    static getSwissDateTime(): string {
        const date: Date = new Date();
        const currentDate = date.toLocaleDateString('de-CH', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            timeZone: 'Europe/Zurich'
        });
        const currentTime: string = date.toLocaleTimeString('de-CH', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Europe/Zurich'
        });
        return currentDate + ', ' + currentTime;
    }

    private static addZero(i: any) {
        if (i < 10) {
            i = '0' + i;
        }
        return i;
    }

    static getARandomIntegerNumber(minInclusive: number, maxExclusive: number) {
        const ceilMinInclusive = Math.ceil(minInclusive);
        const floorMaxExclusive = Math.floor(maxExclusive);
        return Math.floor(Math.random() * (floorMaxExclusive - ceilMinInclusive) + ceilMinInclusive);
    }

    static getARandomArrayNoRepetition(lengthOfArray: number, arrayToGetRandom: Array<number>): Array<number> {
        let newItems = [];
        for (let i = 0; i < lengthOfArray; i++) {
            const idx = Math.floor(Math.random() * arrayToGetRandom.length);
            newItems.push(arrayToGetRandom[idx]);
            arrayToGetRandom.splice(idx, 1);
        }

        return newItems;
    }

    static getRandomArrayElementIndexesNoRepetition(elements: Array<WebdriverIO.Element>, randomNumber: number): Array<number> {
        const elementIndexes = Screen.getIndexesOfElements(elements);

        return Util.getARandomArrayNoRepetition(randomNumber, elementIndexes);
    }

    static increaseOneEachIndex(categoryIndexes: Array<number>): Array<number> {
        let newCategoryIndexes: Array<number> = [];
        for (const index of categoryIndexes) {
            newCategoryIndexes.push(index + 1);
        }
        return newCategoryIndexes;
    }

    static getRandomElements(elements: Array<WebdriverIO.Element>) {
        const minInclusive = 1;
        const maxExclusive = elements.length + 1;
        return Util.getARandomIntegerNumber(minInclusive, maxExclusive);
    }
}
