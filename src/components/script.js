'use strict';

class dateInput {
    constructor() {
        this.input = document.querySelector(".input");

        this.input.addEventListener('change', () => {
            this.container.innerText ='';
            this.inputValue = this.input.value;
            this.updateTime = new Date(Date.parse(this.input.value));
            this.onChange();
        });
    }

}

class dateRange extends dateInput {
    constructor() {
        super();
        this.container = document.querySelector('.containerForLastUpdateRecordAndPeriodItems');
    }

    createItems(period) {
        let dates = [];
        for (let i = +period.start; i < +period.end; i+= 60 * 60 * 1000 * 168)  {   /*Добавил let для переменной i и обернул цикл for   в фигурные скобки*/
            dates.push(i);
        }

        let periods = [];

        for(let i=  0; i < dates.length; i++) {                                 /*Добавил let для переменной i  и заменил переменную date на dates*/
            let date = new Date(dates[i]);

            if (date.getDay() === 1)      periods[i] = `${date.toLocaleDateString()} - ${new  Date(date.setHours(144)).toLocaleDateString()}`;
            else if (date.getDay() === 2) periods[i] = `${new  Date(date.setHours(-24)).toLocaleDateString()} - ${new  Date(date.setHours(144)).toLocaleDateString()}`;
            else if (date.getDay() === 3) periods[i] = `${new  Date(date.setHours(-48)).toLocaleDateString()} - ${new  Date(date.setHours(144)).toLocaleDateString()}`;
            else if (date.getDay() === 4) periods[i] = `${new  Date(date.setHours(-72)).toLocaleDateString()} - ${new  Date(date.setHours(144)).toLocaleDateString()}`;
            else if (date.getDay() === 5) periods[i] = `${new  Date(date.setHours(-96)).toLocaleDateString()} - ${new  Date(date.setHours(144)).toLocaleDateString()}`;
            else if (date.getDay() === 6) periods[i] = `${new  Date(date.setHours(-120)).toLocaleDateString()} - ${new  Date(date.setHours(144)).toLocaleDateString()}`;
            else if (date.getDay() === 0) periods[i] = `${new  Date(date.setHours(-144)).toLocaleDateString()} - ${new  Date(date.setHours(144)).toLocaleDateString()}`;
        }

        return periods;
    }

    renderItems(items) {
        let element = document.createElement('div');
        this.container.appendChild(element);             /*Добавил let для переменной element и вынес ее объявление за пределы метода appendChild*/
        let month = this.updateTime.getMonth() + 1 < 9 ? '0'+(this.updateTime.getMonth() + 1)              /*Убрал двоеточие перед знаком вопроса*/
            : this.updateTime.getMonth() + 1;
        element.innerText = `Последнее изменение: ${this.updateTime.getDate() + '.' 
            + month + '.' + this.updateTime.getFullYear()}`;

        items.forEach( (item) => {
            const element = document.createElement('div');
            element.innerText = item;
            this.container.appendChild(element);
        })                                                                        /*Добавил пропущенную закрывающую скобку в методе forEach*/
    }

        onChange() {
        this.renderItems(this.createItems(this.createPeriod(this.inputValue)));   /*Добавил this в renderItems */
    }

    createPeriod(date) {
        let newDate = Date.parse(date);
        let lastDate = +new Date(new Date(newDate).getFullYear()+1, new Date(newDate).getMonth(),new Date(newDate).getDate());

        return {
                start: newDate,
                end: lastDate
        }
    }
}

