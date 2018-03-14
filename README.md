# alyssa

> :warning: :construction: :construction: :construction: :warning:
>
> Before exploring this project further, I am *brand new* to the world of JavaScript, Typescript, npm, and friends. This project **works** however, I don't guarantee that it follows best practices or is even packaged correctly.
>
> This project is my learning ground for the JS world. So if you're a JS expert (or you just know the pain I'm going through by entering the JS world) and you have an unsolicited advice/tips, they are welcome and I'd highly appreciate it!

Welcome to project alyssa! A library that allows you to programmatically generate C++ code (and maybe other languages in the future) from JavaScript or Typescript.

As mentioned in the beginning, this project is incredibly young and will likely be changing a lot. The fact that this project is starting at version 0.0.0 should be a sign of its stability. You have been warned!

## Okay. But why tho?

For my [BZFlag Plug-in Starter](https://github.com/allejo/bzflagPluginStarter2), I needed a way to programmatically generate C++ to help developers get started with writing plug-ins quickly. The initial version was written in a hurry and dubbed "CodeBuilder." It was time for me to properly learn JS and TS, so I decided to give the project another look and rewrite it.

## Usage

For the most up to date examples and functionality, it is highly recommended that you look at the [unit tests](/tests/) for the project.

```js
import { CPPClass, CPPFormatter, CPPFunction, CPPVariable, CPPVisibility } from 'alyssa';

let cppclass = new CPPClass('PetThief');
let stealFxn = new CPPFunction('void', 'steal', [
    CPPVariable.createInt('owner'),
    CPPVariable.createInt('target', -1)
]);

stealFxn.setVirtual(true);
stealFxn.setParentClass(cppclass, CPPVisibility.Public);

let fmtr = new CPPFormatter({
    indentWithSpaces: true,
    indentSpaceCount: 4,
    bracesOnNewLine: true
});

let output = cppclass.writeHeaderBlock(fmtr, 0);
```

And here's what would be outputted when you write out the class.

```cpp
class PetThief
{
    virtual void steal(int owner, int target = -1);
};
```

## Future Plans

If I am able to pick up some better practices, I'll definitely expand this to be able to generate other languages. I attempted to write some generic interfaces that *should* be able to work across different languages but for right now, C++ is the main focus.

## License

[MIT](/LICENSE.md)
