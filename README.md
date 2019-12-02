# TSChai
TypeScript to Chaiscript transpiler. Write TypeScript and use Chaiscript

Anothing other than smaller scripts in Chaiscript are hard to maintain and, if you have a lot of bindings, hard to write.
Typescript has good IDE support and the powerful option of simply declaring your existing API and bindings using Typescript declaration files.

**WORK IN PROGRESS**

## Usage

### Install

`npm install -g tschai`

#### Setting up

Example tsconfig.json
```json
{
	"compilerOptions": {
		"rootDir": "./src",
		"outDir": "./out",
		"noImplicitAny": false,
		"removeComments": true
	},
	"include": [
		"src/**/*"
	],
	"exclude": [
		"out"
	]
}
```

#### Compile
`tschai`

## Examples and Info

- `import`, `interface`, and `type`-alias statements, as well as type infos, are removed.

- Single quotes from String literals as well as template-literal ticks ( ` ) are automatically changed to double-quotes  
  Double quotes are properly escaped. 
 
- Supported Translated Statements, gotchas and examples: 

<details><summary>EXPAND</summary> 

### Variables

TS
```typescript
const variable: string = "testvar1";
let variable2: string|number = variable;
var shouldTransTo_global = 24234;

// Objects/Dictionary and Arrays / Vectors and Maps
const testDictionary = {
    some: 'awesome',
    dictionary: true,
};
const testArray = [
    'escape me: "',
    24,
    arrowFun(12)
];
```
Chai
```c++
auto variable = "testvar1";
auto variable2 = variable;
global shouldTransTo_global = 24234;

// Objects/Dictionary and Arrays / Vectors and Maps
auto testDictionary = [ "some":"awesome", "dictionary":true ];
auto testArray = [ "escape me: \"", 24, arrowFun(12) ];
```
References are currently not supported...

### Functions
```typescript
// functions
function testFun(testParam: string, haveAnother): number {
    return 42;
}
// arrow functions / lambdas
const arrowFun = (param: number) => {
    print(67 + param);
};

const shortArrowFun = (param) => param;

// type param syntax required for marking captures...
const toCapture = 'capture me';
const arrowFunWithCapture = <toCapture>(param: number) => {
    return toCapture + param;
};

```
Chai
```c++
// functions
def testFun(testParam, haveAnother) {
    return 42;
}

//arrow functions / lambdas
auto arrowFun = fun(param) {
    print(67 + param);
};

auto shortArrowFun = fun(param){ return param; };

auto toCapture = "capture me";
auto arrowFunWithCapture = fun[toCapture](param) {
    return toCapture + param;
};

```
### Classes

```typescript
abstract class Animal {
    abstract makeSound(): void;
    move(p: number): void {
    }
}
class Dog extends Animal {
    private stuff: string;
    private otherStuff: string = 'Bone';
    constructor(msg: string) {
        this.stuff = msg;
    }
    makeSound(): void {
        // doStuff()
    }
    public bark() {
        this.prnt();
    }

    private prnt() {
        console.log('Woof! Woof!');
    }
}
const dog = new Dog();

```
Chai
```c++
// Chaiscript doesn't support Class inheritance, so abstract and extends are all removed.
class Animal {
    // class has no ctor, you wouldn't be able to use this.
    def makeSound() {
    
    }
    def move(p) {
        console.log("roaming the earth...");
    }
};
// Chaiscript also doesn't support access-modifiers, these are also removed.
class Dog {
    auto stuff;
    auto otherStuff = "Bone";
    def Dog(msg) {
        this.stuff = msg
    }
    def makeSound() {
        // doStuff()
    }
    def bark() {
        this.prnt();
    }
    def prnt() {
        console.log("Woof! Woof!");
    }
};
auto dog = Dog('Toy'); // new keyword is removed.
```

### Namespaces / Modules
Basic support for namespaces is present.  
However, to use them pretty much every member has to be exported.  
Every Member also needs to be prefixed with the namespace name.  
Otherwise no valid Chaiscript is generated

This might change in a future version.

TS
```typescript
namespace mathStuff {
    export const magic: number = 42;
    export const getMagic = () => mathStuff.magic;
    export function moreMagic(param: number) {
        return mathStuff.magic * param;
    }

    export function evenMoreMagic(param: number) {
        print('even mooooooooore!');
        return mathStuff.magic * param;
    }
}

mathStuff.getMagic();
```
Chai
```c++
namespace("mathStuff");
mathStuff.magic = 42;
mathStuff.getMagic = fun(){ return mathStuff.magic; };
mathStuff.moreMagic = fun(param) {
    return mathStuff.magic * param;
}
mathStuff.evenMoreMagic = fun(param) {
    print("even mooooooooore!");
    return mathStuff.magic * param;
}

mathStuff.getMagic();
```

### Loops

TS
```typescript
// c-style for loops
for (let i = 0; i < 100; ++i) { 
    print(i);
}

for (let i = 0, k = 12; i < k ; ++i) { 
    print(i);
}

// while
while ( someCondition() ) { print('yay'); }

// ranged for
for (const x in [1,2,3]) { print(x); }
// for (const x of [1,2,3]) { print(x); } <-- same as above
```
Chai
```c++
// c-style for loops
for (auto i = 0; i < 100; ++i) {
    print(i);
}

auto k = 12;
for (auto i = 0; i < k; ++i) {
    print(i);
}

// while
while ( someCondition() ) {
    print("yay");
}

// ranged for
for (auto x : [ 1, 2, 3 ]) {
    print(x);
}
```

### Switches, Conditionals 

Examples omitted

</details>