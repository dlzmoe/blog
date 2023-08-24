---
slug: 29
title: vue学习笔记(3)－－computed, watch，calss, style
date: "2020-11-25"
categories: 
  - 技术
tags: 
  - vue
  - 笔记
---





## 一、计算属性computed

### 1.例子

```html
<div id="app">
  <div>{{message}}</div>
  <div>{{revermessage}}</div>
</div>

<script>
  var vm = new Vue({
    el: '#app',
    data: {
      message: 'hello,wolrd'
    },
    computed: {
      revermessage: function() {
        return this.message.split('').reverse().join('')
      }
    }
  })
</script>
```

声明一个计算属性`severmessage`，在`computed`中被指向对`message`进行一些方法操作后的返回值

此时`vm.severmessage`依赖于`vm.message`的变化，对`message`改变数据，会引起`severmessage`的更新

### 2.计算属性缓存和方法

还可以通过在表达式中调用方法来达到想要的效果

```html
<div id="app">
  <div>{{message}}</div>
  <div>{{revermessage()}}</div>
</div>

<script>
  var vm = new Vue({
    el: '#app',
    data: {
      message: 'hello,wolrd'
    },
    methods: {
      revermessage: function() {
        return this.message.split('').reverse().join('')
      }
    }
  })
</script>
```

经过测试，两者的结果是一样的

我们可以将同一函数定义为一个方法而不是一个计算属性。两种方式的最终结果确实是完全相同的

区别是：**计算属性是基于他们的响应式依赖进行缓存的，只有当响应式依赖，也就是`message`发生改变时才会重新求值**，就意味着，只要`message`还没改变，多次访问`revermessage`计算属性只会返回之前计算结果的缓存，而不是直接执行计算属性的函数

而方法，**在每次触发重新渲染时，调用方法都会执行一次函数**，这就多了一份开销

我们为什么需要缓存？假设我们有一个性能开销比较大的计算属性 A，它需要遍历一个巨大的数组并做大量的计算。然后我们可能有其他的计算属性依赖于 A。如果没有缓存，我们将不可避免的多次执行 A 的 getter！如果你不希望有缓存，请用方法来替代

### 3.计算属性和侦听属性

vue还有一种方式来观测vue实例上的数据变动：**侦听属性－－watch**

```html
<div id="app">
  {{fullname}}
</div>

<script>
  var vm = new Vue({
    el: '#app',
    data: {
      firstname: 'a',
      lastname: 'b',
      fullname: 'ab'
    },
    watch: {
      firstname: function(val) {
        this.fullName = val + ' ' + this.lastName
      },
      lastname: function(val) {
        this.fullName = this.firstName + ' ' + val
      }
    }
  })
</script>
```

使用过程是极其繁琐且重复的，再来用计算属性试一下

```html
<div id="app">
  {{fullname}}
</div>

<script>
  var vm = new Vue({
    el: '#app',
    data: {
      firstname: 'a',
      lastname: 'b'
    },
    computed: {
      fullname: function() {
        return this.firstname + this.lastname
      }
    }
  })
</script>
```

很简单快速的就得到了我们想要的函数表达式

### 4.计算属性的setter

```js
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```

现在在控制台输入`vm.fullName = 'John Doe'`，页面会响应，并且`setter`会被调用，`vm.firstname`和`vm.lastname`也会相应地被更新


## 二、绑定class和style

### 1.对象语法

可以给`v-bind:class`传入一个对象，动态的切换`class`

```html
<div v-bind:class="{active: ok}"></div>
```

可以通过控制`ok`的布尔值来动态的控制class

还可以创建多个字段，并且不影响普通的`className`的存在

html:

```html
<div
  class="static"
  v-bind:class="{ active: isActive, 'text-danger': hasError }"
></div>
```

data:

```js
data{
  isActive: true,
  hasError: false
}
```

结果为：

```html
<div class="static active"></div>
```

当`isActive`或者`hasError`变化时，class 列表将相应地更新。例如，如果`hasError`的值为`true`，class 列表将变为`"static active text-danger"`。

绑定的数据对象也不必直接写在内联模板里

```html
<div id="app">
  <div v-bind:class="classobject"></div>
</div>

<script>
  var vm = new Vue({
    el: '#app',
    data: {
      classobject: {
        active: true,
        'text-danger': true
      }
    },
  })
</script>

<!-- <div class="active text-danger"></div> -->
```

>如果`className`有特殊符号，必须加上引号`''`，或者`""`

### 2.数组语法

我们可以把一个数组传给`v-bind:class`，以应用一个 class 列表

```html
<div v-bind:class="[activeClass, errorClass]"></div>
```

```js
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```

渲染为：

```html
<div class="active text-danger"></div>
```

### 3.用在组件上

当在一个自定义组件上使用`class`property 时，这些 class 将被添加到该组件的根元素上面。这个元素上已经存在的 class 不会被覆盖。

```js
Vue.component('my-component', {
  template: '<p class="foo bar">Hi</p>'
})
```
然后在使用的使用的时候添加了一些`class`：

```html
<my-component class="baz boo"></my-component>
```

html将会被渲染成：

```html
<p class="foo bar baz boo">Hi</p>
```

对于带数据绑定的`class`也同样适用

```html
<my-component v-bind:class="{ active: isActive }"></my-component>
```

当`isActive`为 truthy 时，HTML 将被渲染成为：

```html
<p class="foo bar active">Hi</p>
```

### 4.绑定内联样式style

`v-bind:style`的对象语法十分直观——看着非常像 CSS，但其实是一个 JavaScript 对象。CSS property 名可以用`驼峰式`或`带引号的短横线`来命名

```html
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```
js:
```js
data: {
  activeColor: 'red',
  fontSize: 30
}
```

**或者直接绑定到一个对象，会让模板更加清晰**

```html
<div v-bind:style="styleObject"></div>
```
js:
```js
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
```

**也可以将多个对象应用到一个元素上**

```html
<div v-bind:style="[baseStyles, overridingStyles]"></div>
```

**自动添加前缀**

当`v-bind:style`需要使用浏览器前缀的时候，如：`-webkit-`等，vue会自动侦测并帮生成相应的前缀