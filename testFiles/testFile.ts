function testFun(testParam: string, haveAnother): number {

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
        const someVar = 'number is: ' + param;
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

    return 42;
}