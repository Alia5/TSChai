interface myAwesomeInterface {
    stuff: string;
    otherstuff: number;
}

class OuhBoy {
    private stuff: string;
    private otherStuff: string = 'sdfsdf';
    constructor(msg: string) {
        this.stuff = msg;
    }
    doStuff(param: number) {
        console.log(this.stuff);
        return param;
    }
}

const dshfg = new OuhBoy('wtf');

abstract class Animal {
    abstract makeSound(): void;
    move(p: number): void {
        console.log("roaming the earth...");

        switch(p) {
            case 1:
                console.log('value is 1');
                break;
            case 2:
                console.log('value is 2');
                break;
            default:
                console.log('don\'t care about value');
        }

    }
}

class Dog extends Animal {
    makeSound(): void {
        throw new Error('Method not implemented.');
    }
    public bark() {
        this.prnt();
    }

    private prnt() {
        console.log('Woof! Woof!');
    }
}

const dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();

function testFun(testParam: string, haveAnother): number {

    const testiTest = [
        (arg) => arg + 12,
    ];

    if (haveAnother > 10) {
        console.log('greater 10');
    } else if (haveAnother < 0
            && testParam === 'test') {
        console.log('smaller 0 and testParam==test');
    } else {
        console.log('everything else');
    }

    console.error('test', 42);
    console.log(testParam);
    const arrowFun = (param: number) => {
        const someVar = 67 + param;
        console.log(someVar);
    };
    arrowFun(6756);

    console.log('to be escaped: """"');

    // type param syntax required for marking captures...
    const toCapture = 'capme_bitch';
    const arrowFunWithCapture = <toCapture>(param: number) => {
        return toCapture + param;
    };

    const someotheruserfull = 'numb"er is: ' + testParam;

    const templateString = `test " ${someotheruserfull}`; 
    // const multiVar24 = 'nope', multiV24 = undefined;
    // let multiVar, multiVar2;
    const variable:string = "testvar1";
    let variable2: string|number = variable;
    var shouldTransTo_global = 24234;


    const shortArrowFun = (param) => param;

    const testDict = {
        some: 'awesome',
        dictionary: true,
    };

    const testArray = [
        'escape me: "',
        "don't to shit",
        `wtf ${12}`,
        24,
        (arg) => arg + 12,
        shortArrowFun,
        arrowFun(12)
    ];


    // c-style for loops
    for (let i = 0; i < 100; i++) { 
        console.log(i);
    }

    // c-style for loops
    for (let i = 0, k = 12; i < k ; i++) { 
        console.log(i);
    }

    // while
    while ( (param) => param-1 ) { console.log('yay'); }

    // ranged for
    for (const x in [1,2,3]) { console.log(x); }
    for (const x of [1,2,3]) { console.log(x); }






    return 42;
}


namespace mathStuff {
    export const magic: number = 42;
    export const getMagic = () => mathStuff.magic;
    export function moreMagic(param: number) {
        return mathStuff.magic * param;
    }

    export function evenMoreMagic(param: number) {
        console.log('even mooooooooore!');
        return mathStuff.magic * param;
    }
}

mathStuff.getMagic();
