---
slug: 13
title: javascript——函数、变量和方法
date: "2020-11-04"
categories: 
  - 技术
tags: 
  - 笔记
---




当代码出现有规律的重复之后，可以利用函数，定义变量，调用方法，不用去重复的改动代码，只需要进行函数的修改。基本上所有的高级语言都支持函数，javascript也不例外，它可以像变量一样被使用，方便且强大，因此本文对js函数进行系统的学习，并在学习过程中做了详细的笔记以及样例。

<!-- more -->



## 一、函数的定义和调用

### 1.定义函数
````js
function abs(x) {
    if(x = 0) {
        return x;
    } else {
        return -x;
    }
}
````

1. `function()`指出这是一个函数定义
2. `abs`是函数的代码
3. `(x)`里面的内容是函数的参数
4. `{...}`的内容是函数体，可以包括若干语句，甚至可以没有任何语句

> 函数体中，必须以`return`结尾，才可以把结果返回，如果不用return结尾的话，就会返回undefined

也可以直接定义一个对象，这个对象也可以写成函数的方式
````js
var abs = function (x) {
    if (x>=0) {
        return x
    }else {
        return -x
    }
}；
````
`function(x)`就是一个匿名函数，这个函数被赋值给了`变量abs`，所以可以直接通过`abs`调用该函数

>这两种定义函数的方式完全一致，，但是用变量定义的时候需要注意，要用`;`结尾，代表函数语句结束

### 2.调用函数

调用函数时，直接传参即可
abs(10)，根据函数定义，将10代入进去即可，返回的结果是x , 即10

### 3.检查参数

可以对参数进行检查，看看是否是自己想要的参数对类型

如果传入对参数`abs(x)`中非数字，控制台返回结果`this is not number`，如果传参为数字，则进行条件判断

````js
function abs(x) {
    // 检查参数x是否为数字
    if (typeof x !== 'number') {
        console.log('this is not number')
    }else{
        if (x >= 0) {
            return x
        }else {
            return -x
        }
    }
}
````

### 4.arguments

利用`arguments`，可以获得调用者传入的所有参数

`arguments`代表传入的参数，`arguments.length`代表传入参数的长度

````js
console.log(arguments.length)
// 这行代码写在函数中，控制台就可以输出出来
````

先写一个循环，把参数输出的函数方法，函数写完之后，传入参数，控制台随之打印出传入的参数

````js
function str() {
    var s
    for(var i = 0; i<arguments.length; i++) {
        // 返回传入的参数
        console.log(arguments[i]);
        s += arguments[i] + ",";
    }
    return s;
};
// 传入参数
str("name", "age");
//控制台输出：name, age
````
### 5.return

返回true时，点击链接直接跳转，返回false时，会忽略a链接的地址，跳转到window.location.href后的地址

````js
<a href="https:www.baidu.com" onclick="return myfun()">baidu</a>
<input type="text" id="test" value="click">
<script>
    function myfun() {
    window.location.href = 'https://www.bilibili.com';
    var test = document.getElementById('test').value;
    console.log(test);
    
    return false;
}
</script>
````

>return需要注意的地方：函数会自动在行尾添加`;`，所以在写return的时候一定要注意，不要单纯的拆分为两行，很容易报错

````js
return 
    { name: 'foo' }
// 上面这种写法就是有问题的，js的机制会自动将其渲染为
return;     //return undefined
    { naem: 'foo' };

// 正确的写法应该是：
return {
    name: 'foo'
};
````


### 6.rest

把传入的参数，多余的部分，以数组的形式保存起来，为了获得额外的参数，需要i = 2开始，把已有的a,b排除掉

````js
function arr(a, b) {
    var i, rest = [];
    if (arguments.length > 2) {
        
        for (i = 2; i<arguments.length; i++) {
            rest.push(arguments[i]);
        }
    }
    console.log('a = ' + a);
    console.log('b = ' + b);
    console.log(rest);
};

arr(1,2,3,4);
````
控制台打印：

可以看到多余的部分被打印到`Array`中了

<green>这种写法略显麻烦，下面是更简单的写法</green>

直接在在函数里定义参数`rest`，并且在前面加上`...`标识，多余的参数直接以数组的形式交给变量`rest`，不需要`arguments`就可以获取全部参数

如果传参数量还没有超过定义参数的数量，函数就会返回一个空数组

````js
function foo(a, b, ...rest) {
    console.log('a = ' + a);
    console.log('b = ' + b);
    console.log(rest)
}

foo(1,2,3,4)
// a = 1
// b = 2
// Array [3,4]

foo(1)
// a = 1
// b = undefined
// Array [ ] 
````

### 7.计算

**对传入的参数求和**

````js
// forEach可以返回数组中所有的元素

function sum(...rest) {
    var sum = 0;
    rest.forEach(function(x) {
        sum += x;
    });
    return sum;
};

//sum(1,2)
//控制台输出 3。求和成功
````

**计算圆的面积**

````js
// r 表示圆的半径
// pi 如果没有参数，默认为3.14
function area_of_circle(r, pi){
    var area;
    if(arguments.length == 1) {
        // 当传入的参数只有一位时，计算3.14*r的平方
        area = 3.14*r*r;
    }else{
        area = pi*r*r;
    }
    return area;
}
````

## 二、变量和作用域

### 1.声明变量

在js中，通常使用`var`来生声明变量，而声明的变量实际上是有作用域的

1. 在函数体内声明的变量，只能在函数体内生效，在函数体外是无法识别的

````js
function fun() {
    var a = 1;
};
a = a + 1;  // err  这行代码直接报错，因为全局中没有a这个变量
````
2. 如果两个函数体中各自声明了`变量a`，互不干扰，在自己的函数体内可以正常作用，出了函数体都没有作用了

3. js函数可以嵌套，内部函数可以访问外部函数，外部函数不能访问内部函数

````js
function par() {
    var x = 1;
    function son() {
        var y = x + 1;
    };
    var z = x + y;      // Error:
}
````

所以`var z = x + y`会报错，因为`变量y`在`son()`中，根据`函数外部无法访问函数内部`，`y`无法被访问，因此`var z = x + y`报错

4. 两个嵌套的函数体，各有一个重名变量，js函数在查找变量的时候，优先从自身开始，如果自身有这个变量就获取，如果没有，有内向外，由下层到上层的查找

````js
function par() {
    var num = 1;
    function son() {
        var num = 2;
        console.log("son() = " + num);
    };
    console.log("par() = " + num);
    son();
};
par();
````

>函数必须经过调用之后才能生效  `son()`和`par()`

### 2.变量提升

JavaScript的函数定义有个特点，它会先扫描整个函数体的语句，把所有申明的变量“提升”到函数顶部，但是并不会将赋值一起提升，很容易产生代码的报错

因此，针对这一问题，我们在声明变量的时候，要将其统一放置在函数的起始位置，严格遵守`在函数内部首先声明所有变量`的原则

### 3.全局作用域

不再任何函数内部定义的变量就叫做全局变量，也就是`window下`，他也被称作`全局作用域`，全局作用域下的变量实际上被绑定到`window`

````js
var course = 'learn js';
console.log(course);        // learn js
console.log(window.course)  // learn js
````

直接访问全局变量或者在前面加上`window`，结果都是一样的

整个js文件只有一个全局作用域，就是`window`，如果在某一个函数作用域内查找变量，没有查找到，就会由内到外一层层查找，如果最后在全局作用域中也没有查找到，就会`ReferenceError` 报错


### 4.局部作用域

在函数内部就是局部作用域，这个代码的名字只在函数的内部起作用


在`for循环`等语句中，无法定义具有局部作用域的变量

### 5.全局变量和局部变量的区别

1. 全局变量：在任何一个地方都可以使用，全局变量只有在浏览器关闭的时候才会销毁，比较占用内存资源

2. 局部变量：只能在函数内部使用，当其所在代码块被执行时，会被初始化；当代码块执行完毕就会销毁，因此更节省节约内存空间

3. 当在函数作用域中操作一个变量的时候，会先在自身作用域中查找，如果有就直接使用，如果没有就向上级作用域中寻找。如果全局作用域中也没有，那么就报错

### 6.常量

`var`和`let`声明的是一个变量，在ES6之间，用大写的变量名，表示定义一个常量

````js
// ES5
var NAME = 'xiaoming'
````

ES6新增一个关键字`const`来定义常量
````js
// ES6
const name = 'xiaoming'
````

## 三、解构赋值

**1.可以把一个数组的元素分别赋值给不同的变量**
````js
var array = ['hello', 'javascript', 'ES6'];
var x = array[0];
var y = array[1];
var z = array[2];

// x = 'hello'
// y = 'javascript'
// z = 'ES6'
````

**2.如果数组本身还有嵌套，也可以进行解构赋值，但是要注意嵌套的层次和数组保持一致**
````js
let [x, [y, z]] = ['hello', ['JavaScript', 'ES6']];

x; // 'hello'
y; // 'JavaScript'
z; // 'ES6'
````

**3.解构赋值时可以忽略元素**
````js
let [, , z] = ['hello', 'JavaScript', 'ES6'];

z;  // ES6 
````

**4.还可以对`对象`进行解构赋值**
````js
var person = {
    name: 'xiaoming',
    age: 22,
    gender: 'male',
    email: 'zsh981109@163.com',
    school: 'zyg'
}
// 定义了三个变量，分别对应三个属性
var {name, age, email} = person;
console.log(name, age, email);
````

控制台就可以打印出我们想要的内容了


>对对象进行解构赋值时，也可以进行嵌套

**5.可以通过属性名赋值的时候，重新定义一个变量名**
````js
var person = {
    name: '小明',
    age: 20,
    gender: 'male',
    passport: 'G-12345678',
    school: 'No.4 middle school'
};

// 把passport属性赋值给变量id:
let {name, passport:id} = person;
console.log(name);
console.log(age);
console.log(id);
console.log(email);
````

控制台输出结果：


可以看到，name,age,id都打印出来了，而email报错，因为email的内容赋值给了新变量`id`，而`email`没有任何内容，所以报错

**6.可以使用默认值true，避免不存在的属性返回undefined**

````js
var person = {
    name: '小明',
    age: 20,
    gender: 'male',
    passport: 'G-12345678'
};

// 如果person对象没有single属性，默认赋值为true:
var {name, single=true} = person;
name;   // '小明'
single; // true

````

>要注意，赋值的时候不能以`{`开头，避免js将其渲染失败
````js
var person = {
    name: '小明',
    age: 20,
    gender: 'male',
    passport: 'G-12345678'
};
// 声明变量
var x;
var y;

// 解构赋值
{x, y} = { name: '小明', x: 100, y: 200} // Error:
````
在这里 `{x, y} = person`会报一个错误，`=`不合法，所以正确的写法是，在赋值语句外部包裹一层`()`小括号
````js
({x, y} = { name: '小明', x: 100, y: 200});
````

**7.解构赋值的使用场景**

交换两个变量的值
````js
var a = 1;
var b = 2;
[a, b] = [b, a]
````

## 四、对象的方法

>绑定到对象上的函数被称为方法

在一个对象中绑定函数，称为这个对象的方法

### 1.this

下面段代码返回的是（今年的年份－出生年份）
````js
var xm = {
    name: 'xiaoming',
    birth: 1998,
    age: function() {
        var year = new Date().getFullYear();
        return year - this.birth
    }
};
// 在对象xm中，调用方法age()
xm.age();   // 22
````

<red>这里引入了一个新的关键词`this`</red>

在方法内部，`this`是一个特殊的变量，它始终指向当前对象，也就是`xm`这个变量

所以`this.birth`指的就是`变量xm的birth属性`

>`this`存在于方法中，想在方法中调用对象的属性，必须通过`this`

如果在方法写在对象外部时，`this`的指向问题就要好好分析了，比如：
````js
function getage() {
    var year = new Date().getFullYear();
    return year - this.birth;
}

var xiaoming = {
    name: '小明',
    birth: 1990,
    age: getage
};
````

单独调用`getage()`的时候，这时的`getage()`指的是一个方法，同时这个方法处于全局作用域下，此时`this`指向的是全局对象`window`，所以返回`NaN`

只有`xiaoming.age()`调用的才是对象`xiaoming`下面的方法`getage()`

>因此：要保证`this`的指向正确，必须使用`obj.xxx()`的形式调用
>如果没有使用这种方法，全部报错，如果是在'use strict'模式下，`this`会指向undefined

### 2.that

如果在对象里面的方法，又套了一层事件，此时`this`指向又有问题了，它指向第一层方法，而不是方法对应的对象

所以，在写方法的时候，直接先声明一个`var that = this`，这个`that`指向对象里面的属性，接下来，在方法里面调用属性的时候，直接在前面加上`that.`即可，它直接指向到对象下面的属性

````js
var xm = {
    name: 'xiaoming',
    birth: 1998,
    age: function() {
        var that = this;
        function getbirthage() {
            var y = new Date().getFullYear();
            return y - that.birth;
        }
        return getbirthage();
    }
};

// xm.age();
````

可以看到，通过定义`var that = this`，然后在方法里面使用`that.`指向属性，不管套了几层方法，都不会报错，直接指向对象下面的属性

通过`var that = this`，可以放心的在方法里面定义其他函数，不用担心获取不到对象属性的问题

>但是有一个需要注意的地方，每个方法结束后，都要返回一下结果，`return getbirthage()`

### 3.apply

除了`var that = this`，还可以通过`apply`属性控制`this`的指向

`apply`是函数本身的方法，它拥有两个参数

````js
function getage() {
    var y = new Date().getFullYear();
    return y - this.birth;
}

var xm = {
    name: 'xiaoming',
    birth: 1998,
    age: getage
}

// xm.age();
// getage.apply(xm, []);
````
写法就是`getage.apply(xm, [])`，`apply`的第一个参数代表`this指向`，即对象，第二个参数，表示函数本身的参数

### 4.apply( ) 和 call( )

`call()`是与`apply`类似的方法，区别是：

1. `apply()`将参数打包成`Array`
2. `call()`直接将参数按顺序传入

调用`math.max(1,2,3)`，分别采用两种方式

````js
math.max.apply(null, [1,2,3]);  // 3
math.max.call(null, [1,2,3]);   // 3
````

两者的结果是一样的，调用普通函数时，把`this`绑定为`null`

