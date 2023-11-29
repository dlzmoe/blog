---
slug: 43
title: 使用 React 与 Vue 创建同一款 App，差别究竟有多大？
date: 2021-01-06
categories: 
  - 技术
tags: 
  - vue
  - 编程
  - react
---

关于 [React 框架](https://react.docschina.org/) 和 [Vue 框架](https://cn.vuejs.org/) 的对比，用两者写出同一个程序，对比其代码实现的过程，看看它们的差异究竟有多大？


>转载于：https://blog.csdn.net/csdnnews/article/details/81880378
>原文：https://medium.com/javascript-in-plain-english/i-created-the-exact-same-app-in-react-and-vue-here-are-the-differences-e9a1ae8077fd 
>作者简介：Sunil Sandhu，一位 Web 全栈工程师 + 空想家。 
>译者：安翔，责编：屠敏

众所周知，Vue 和 React 都是目前非常著名的前端框架。我在工作中经常使用 Vue，因此我对它有很深入的了解。同时，我也对 React 充满了好奇，想要学习一下，一探究竟。

于是我阅读了 React 文档并观看了一些视频教程，虽然这些资料很不错，但是我真正想了解的是 React 与 Vue 之间的不同之处。所谓“不同之处”，我并非想知道它们是否都具有虚拟 DOMS 或者它们如何渲染页面，而是希望有人能够从代码的角度解释这两者之间的差异。我想找到一篇解释这些差异的文章，以便 Vue 或者 React 的初学者可以更好地理解它们两者之间的差异。

很遗憾，我并未找到一篇这样的文章。于是我意识到必须自己动手来比较 Vue 与 React 之间的异同。在我自力更生的过程中，我用这篇文章记录下了具体过程。 

## 1.目标

我将会构建一个标准的待办事项应用程序，允许用户添加和删除列表中的项目。这两个应用程序都使用默认的 CLI（command-line interface，命令行界面）构建，React 使用 create-react-app，Vue 使用 vue-cli。

两个应用程序的外观如下： 

两个应用程序的 CSS 代码几乎一样，但这些代码的位置存在差异。考虑到这一点，我们来看看这两个应用程序的文件结构： 

你会发现它们的结构几乎完全相同。唯一的区别在于 React App 拥有三个 CSS 文件，而 Vue App 中没有 CSS 文件。这是因为 React 的 create-react-app 组件需要一个附带文件来保存其样式，而 Vue CLI 采用全包方法，其样式在实际组件文件中声明。

两种不同的策略得到的结果是一样的，相信开发者很快能够掌握这两种不同的策略。开发者可以根据自己的偏好做出选择，你会听到开发社区关于如何构建 CSS 的大量讨论。以上，我们遵循两个 CLI 列出了代码结构。

在我们进一步讨论之前，先快速看一下典型的 Vue 和 React 组件的外观：

现在让我们正式开始，深入其中的细节！

## 2.如何修改数据

首先，我们需要明白“修改数据”的意思是什么。它听起来有些学术，但实际上很简单，就是把我们已经存储好的数据进行更改。比如，如果我们想把一个人的名字变量从“Jhon”改为“Mark”，我们就需要执行“修改数据”的操作。在这一点上，React 和 Vue 的处理方式有所区别。Vue 本质上会创建一个数据对象，其中的数据可以自由更改；React 则创建一个状态对象，更改数据需要一些额外的操作。React 之所以需要额外的操作有着自己的理由，稍后我会深入介绍。在此之前，我们先看看 Vue 中的数据对象和 React 中的状态对象： 

**vue 数据对象**

**React 状态对象**

从图中可以看出，我们传入了相同的数据，但它们的标记方法不同。因此，将初始数据传递到组件的方式非常相似。但正如我们提到的那样，在两个框架中更改数据的方式有所不同。

假设我们有一个名为 name: ‘Sunil’的数据元素。

在 Vue 中，我们通过调用 this.name 来引用它。我们也可以通过调用 this.name ='John' 来更新它。这样一来，名字就被成功改为了“Jhon”。

在 React 中，我们通过调用 this.state.name 来引用同一段数据。现在关键的区别在于，我们不能简单地写成 this.state.name ='John'，因为 React 有限制机制，它会阻止这种简单的修改方式。在 React 中，我们需要这样写：this.setState({name：'John'})。

虽然这基本上与我们在 Vue 中实现的结果一样，但是 React 的操作更为繁琐，那是因为 Vue 在每次更新数据时默认组合了自己的 setState 版本。简单来说就是，React 需要 setState，然后更新其内部数据，而对于 Vue 来说，当你更新数据对象的值时它就默认了你的更改意图。那么为什么 React 没有进行简化，为什么需要 setState 呢？Revanth Kumar 对此做出了解释：

>“这是因为 React 希望在状态发生变化时重新运行某些生命周期 hook，比如 componentWillReceiveProps、shouldComponentUpdate、componentWillUpdate、render、componentDidUpdate。当你调用 setState 函数时，它知道状态已经改变。如果你直接改变状态，React 将需要做更多工作来跟踪更改以及运行生命周期 hook 等等。所以为了简单起见，React 使用 setState。" 

## 3.添加新的待办事项

### React 的实现方法

```js
createNewToDoItem = () => {
    this.setState( ({ list, todo }) => ({
      list: [
          ...list,
        {
          todo
        }
      ],
      todo: ''
    })
  );
};
```

在 React 中，我们的输入字段有一个名为 value 的属性。这个 value 通过使用几个函数自动更新，这些函数绑定在一起以创建双向绑定。我们通过在输入字段上附加一个 onChange 事件监听器来创建这种形式的双向绑定。看看代码，一探究竟：

```html
<input type="text" 
       value={this.state.todo} 
       onChange={this.handleInput}/>
```

只要输入字段的值发生更改，handleInput 函数就会运行。它通过将状态对象设置为输入字段中的任何内容来更新状态对象内的 todo。handleInput 函数如下：

```js
handleInput = e => {
  this.setState({
    todo: e.target.value
  });
};
```

现在，只要用户按下页面上的 + 按钮添加新项目，createNewToDoItem 函数就会运行 this.setState 并向其传递一个函数。该函数有两个参数，第一个是来自状态对象的整个列表数组，第二个是由 handleInput 函数更新的 todo。然后该函数返回一个新对象，该对象包含之前的整个列表，并在其末尾添加 todo。整个列表是通过使用扩展运算符添加的。

最后，我们将 todo 设置为空字符串，它会自动更新输入字段中的 value。

### Vue 的实现方法

```js
createNewToDoItem() {
    this.list.push(
        {
            'todo': this.todo
        }
    );
    this.todo = '';
}
```

在 Vue 中，我们的输入字段中有一个名为 v-model 的句柄。这实现了**双向绑定。输入字段代码如下：

```html
<input type="text" v-model="todo"/>
```

V-Model 将输入字段的内容绑定到名为 toDoItem 的数据对象的键（key）上。当页面加载时，我们将 toDoItem 设置为空字符串，比如：todo：' '。如果已经存在数据，例如 todo：'添加文本处'，输入字段将加载添加文本处的输入内容。无论如何，将其作为空字符串，我们在输入字段中键入的任何文本都会绑定到 todo。这实际上是双向绑定（输入字段可以更新数据对象，数据对象可以更新输入字段）。

因此，回顾前面的 createNewToDoItem() 代码块，我们将 todo 的内容存放到列表数组中，然后将 todo 改为空字符串。

## 4.删除待办事项

### React 的实现方法

```js
deleteItem = indexToDelete => {
    this.setState(({ list }) => ({
      list: list.filter((toDo, index) => index !== indexToDelete)
    }));
};
```

尽管 deleteItem 函数位于 ToDo.js 文件中，但是从 ToDoItem.js 文件中引用它也很容易，将 deleteItem() 函数作为 上的 prop 传递：

```js
<ToDoItem deleteItem={this.deleteItem.bind(this, key)}/>
```

这会将该函数传递给子组件，使其可以访问。我们绑定了 this 并传递 key 参数，当用户点击删除项时，函数通过 key 区分用户点击的是哪一条 ToDoItem。然后，在 ToDoItem 组件内部，我们执行以下操作：

```html
<div className=”ToDoItem-Delete” onClick={this.props.deleteItem}>-</div> 
```

想要引用位于父组件内部的函数，只需引用 this.props.deleteItem 即可。

### Vue 的实现方法

```js
onDeleteItem(todo){
  this.list = this.list.filter(item => item !== todo);
}
```

Vue 的实现方法稍有不同，我们需要做到以下三点：

1. 首先，在元素上调用函数：

```html
<div class=”ToDoItem-Delete” @click=”deleteItem(todo)”>-</div>
```

2. 然后我们必须创建一个 emit 函数，将其作为子组件的内部方法（在本例中为 ToDoItem.vue），如下所示：

```js
deleteItem(todo) {
    this.$emit('delete', todo)
}
```

3. 之后，你会发现，当我们添加 ToDo.vue 的 ToDoItem.vue 时，实际上引用了一个函数：

```js
<ToDoItem v-for="todo in list" 
	:todo="todo" 
	@delete="onDeleteItem" // <-- this :)
	:key="todo.id" />
```

这就是所谓的自定义事件监听器。它会监听任何使用 'delete' 字符串的触发事件。一旦监听到事件，它会触发一个名为 onDeleteItem 的函数。此函数位于 ToDo.vue 内部，而不是 ToDoItem.vue。如前所述，该函数只是过滤数据对象内的 todo 数组，以删除被点击的待办事项。

在 Vue 示例中还需要注意的是，我们可以在 @click 侦听器中编写 $emit 部分，这样更加简单，如下所示：

```html
<div class=”ToDoItem-Delete” @click=”$emit(‘delete’, todo)”>-</div> 
```

如果你喜欢，这样做可以把 3 步减少到 2 步。

React 中的子组件可以通过 this.props 访问父函数，而在 Vue 中，你需要从子组件中发出事件，父组件来收集事件。

## 5.如何传递事件监听器

### React 的实现方法

事件监听器处理简单事件（比如点击）非常直接。我们为待办事项创建了点击事件，用于创建新的待办事项，代码如下： 

```html
<div className=”ToDo-Add” onClick={this.createNewToDoItem}>+</div>
```

非常简单，就像使用 vanilla JS 处理内联 onClick 一样。正如前文所述，只要按下回车按钮，设置事件监听器就需要花费更长的时间。这需要输入标签处理 onKeyPress 事件，代码如下：

```html
<input type=”text” onKeyPress={this.handleKeyPress}/>
```

该函数只要识别到'enter'键被按下，它就会触发 **createNewToDoItem** 函数，代码如下所示：

```js
handleKeyPress = (e) => {
  if (e.key === ‘Enter’) {
		this.createNewToDoItem();
	}
};
```

### Vue 的实现方法

Vue 的事件监听器更加直接。我们只需要使用一个简单的 @ 符号，就可以构建出我们想要的事件监听器。例如，想要添加 click 事件监听器，代码：

```html
<div class=”ToDo-Add” @click=”createNewToDoItem()”>+</div> 
```

>注意：@click 实际上是 v-on:click 的简写。Vue 事件监听器很强大，你可以为其选择属性，例如 .once 可以防止事件监听器被多次触发。此外，它还包含很多快捷方式。按下回车按钮时，React 就需要花费更长的时间来创建事件监听器，从而创建新的 ToDo 项目。在 Vue，代码如下：

```html
<input type=”text” v-on:keyup.enter=”createNewToDoItem”/>
```

## 6.如何将数据传递给子组件

### React 的实现方法

在 React 中，我们将 props 传递到子组件的创建处。比如：

```js
<ToDoItem key={key} item={todo} />
```

此处我们向 ToDoItem 组件传递了两个 prop。之后，我们可以在子组件中通过 this.props 引用它们。因此，想要访问 item.todo prop，我们只需调用 this.props.item。

### Vue 的实现方法

在 Vue 中，我们将 props 传递到子组件创建处的方式如下：

```js
<ToDoItem v-for="todo in list" 
	:todo="todo"
	:key="todo.id"
	@delete="onDeleteItem" />
```

我们将它们传递给子组件中的 props 数组，如：props：['id'，'todo']。然后可以在子组件中通过名字引用它们。

## 7.如何将数据发送回父组件

### React 的实现方法

我们首先将函数传递给子组件，方法是在我们调用子组件时将其引用为 prop。然后我们通过引用 this.props.whateverTheFunctionIsCalled，为子组件添加调用函数，例如 onClick。然后，这将触发父组件中的函数。删除待办事项一节中详细介绍了整个过程。

### Vue 的实现方法

在子组件中我们只需编写一个函数，将一个值发送回父函数。在父组件中编写一个函数来监听子组件何时发出该值的事件，监听到事件之后触发函数调用。同样，删除待办事项一节中详细介绍了整个过程。

## 8.总结

我们研究了添加、删除和更改数据，以 prop 形式从父组件到子组件传递数据，以及通过事件监听器的形式将数据从子组件发送到父组件。当然，React 和 Vue 之间存在一些小差异，希望本文的内容有助于理解这两个框架。

两个应用程序的 GitHub 地址：

**Vue ToDo:**https://github.com/sunil-sandhu/vue-todo

**React ToDo:**https://github.com/sunil-sandhu/react-todo