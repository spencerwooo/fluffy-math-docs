---
sidebarDepth: 3
---

# Spencer 的开发历程

:::tip 相关信息

- 姓名：武上博
- 学号：1120161730
- 班级：07111603
:::

## I. 项目地址

### 代码库

- 项目核心代码库位于：<https://github.com/spencerwooo/fluffy-math>
- 项目前端代码库位于：<https://github.com/spencerwooo/fluffy-math-spa>
- 项目文档（团队博客）源码库位于：<https://github.com/spencerwooo/fluffy-math-docs>

### 前端部署地址

<https://spencerwoo.com/fluffy-math-spa/>

## II. PSP

|                PSP 2.1                |   Personal Software Progress Stages    | 预估耗时（分钟） | 实际耗时（分钟） |
| :-----------------------------------: | :------------------------------------: | :--------------: | :--------------: |
|               Planning                |                  计划                  |        50          |      50            |
|               Estimate                |        估计这个任务需要多少时间        |         2000         |         2460         |
|              Development              |                  开发                  |          200        |           180       |
|               Analysis                |       需求分析（包括学习新技术）       |          900        |            900      |
|              Design Spec              |              生成设计文档              |          60        |       30           |
|             Design Review             |     设计复审（和同事审核设计文档）     |          30        |        20          |
|            Coding Standard            | 代码规范（为目前的开发制定合适的规范） |          20        |        20          |
|                Design                 |                具体设计                |          90        |        90          |
|                Coding                 |                具体编码                |          600        |       900           |
|              Code Review              |                代码复审                |          60        |        30          |
|                 Test                  |  测试（自我测试、修改代码、提交测试）  |          60        |        60          |
|               Reporting               |                  报告                  |          120        |       60           |
|              Test Report              |                测试报告                |          60        |        30          |
|           Size Measurement            |               计算工作量               |          60        |        30          |
| Postmortem & Process Improvement Plan |      事后总结，并提出过程改进计划      |          60        |        60          |
|                                       |                  合计                  |          2310        |       2460           |

## III. 开发模块

本次团队项目，我们团队选择了「四则运算题目的生成」这个项目来实现。

### 3.1 需求、功能模块化

经过讨论，本次项目我们将需求拆解为如下的模块：

![](https://i.loli.net/2019/01/18/5c41f4cf5142c.png)

详细地：

- **Fluffy Math Core**：实现基础的四则运算题目生成和求解功能，同时提供基于命令行的用户交互功能：
  - 生成一定数目的题目
  - 对一个文件里面的题目进行求解
  - Quiz Mode：用户答题，程序判断对错和求解
- **Fluffy Math Frontend**：实现四则运算题目生成的前端页面，即 SPA - Single Page Application，部署在 GitHub Pages 上

### 3.2 开发分工

**经过协商，我负责开发：**

- **Core 核心项目**：
  - **求解题目功能**
  - 命令行形式的用户交互功能
  - Quiz Mode 功能
- **Frontend 前端项目**：
  - 前端框架与前端页面的设计与交互

**我的队友负责开发：**

- **Core 核心项目**：
  - **生成题目** 的基础功能
  - 对 **生成题目的难度、题量和乘方表示** 等项目的控制
- **Frontend 前端项目**：
  - 将核心功能（包括生成题目和求解题目）迁移至前端项目中

### 3.3 功能实现

经过近一个月的开发，我们几乎实现了题目要求的所有功能，包括：

- **第一阶段**

  - 写一个能自动生成小学四则运算题目的命令行「软件」，分别满足下面的各种需求：

    - 一次可以出一千道题目，不重复，并把题目写入一个文件
    - 当有超过一个运算符的时候，如何对表达式求值？逐步扩展功能和可以支持的表达式类型，最后希望能支持下面类型的题目（最多 10 个运算符，不限括号数量）

    ```
    25 - 3 * 4 - 2 / 2 + 89 = ?
    1/2 + 1/3 - 1/4 = ?
    (5 - 4) * (3 + 28) = ?
    ```

    - 除了整数外还指出真分数的四则运算
    - 让程序接受用户输入答案，判定对错，最后给出总对、错题目的数量

- **第二阶段**

  - 增加一个运算符，支持乘方运算（乘方优先级高于乘除法优先级）
  - 支持两种表示乘方的方式：「^」和「**」（可以通过设置来选择）

- **第三阶段**

- 对程序进行扩展：

  - 把程序变成一个网页程序，让用户设定参数得到各种题目
  - 选一个从未接触的编程语言（Javascript）并试一试实现基本功能

下面我将对我开发实现的模块（题目求解和前端框架搭建）进行介绍。

## IV. 解题思路

### 4.1 求解题目

在四则运算题目中，最难实现的应该就是对各种类型表达式的求解了，包括对分数、整数、四种运算符和乘方的运算式求解。

在数据结构这门课上，我了解到对于四则运算表达式，有三种表现形式：

1. 前缀表达式
2. 中缀表达式
3. 后缀表达式（逆波兰表达式）

其中中缀表达式是我们常见的，人方便理解的表现方式，也是求解题目模块的输入。为了解决四则运算表达式，我们需要将中缀表达式转化为后缀表达式，即逆波兰表达式，从而方便计算机对其求解。那么求解题目的模块就划分为两个模块：

- 逆波兰表达式的生成（中缀表达式转后缀表达式）
- 对逆波兰表达式的求解

#### 逆波兰表达式的生成

我参考了这篇文章：[Parse With The Shunting Yard Algorithm Using JavaScript](https://www.thepolyglotdeveloper.com/2015/03/parse-with-the-shunting-yard-algorithm-using-javascript/) 中逆波兰表达式生成的算法。具体的，将一个字符串形式的中缀表达式转为后缀表达式是这样的过程：

- 一个字符一个字符读入中缀表达式
- 如果字符：
  - 是数字：直接压入后缀表达式栈中
  - 是 `^*/+-` 中的字符：根据上一个操作符优先级对这次的操作符进行处理，判断是否压入或调出栈
  - 是左括号：直接压入操作符栈中
  - 是右括号：将操作符栈中操作符全部调出直到左括号为止

这样分析之后，我们就很容易实现中缀表达式转后缀表达式的算法了。

#### 逆波兰表达式的求解

得到了逆波兰表达式，我们就很容易实现求解表达式值了。经过这篇文章：[Evaluate A Reverse Polish Notation Equation With JavaScript](https://www.thepolyglotdeveloper.com/2015/04/evaluate-a-reverse-polish-notation-equation-with-javascript/) 的参考，我总结，对逆波兰表达式的求解主要是这样的步骤：

- 同样的一个字符一个字符读入逆波兰表达式
- 如果字符：
  - 是数字：直接压入栈
  - 是操作符：将栈顶的两个数字调出，并用该操作符运算两个数字
- 将得到的结果重新压入栈中
- 最后：
  - 如果栈中出现了多于一个数字，那么输入表达式有问题，做异常处理
  - 如果栈中只剩下一个数字，那么这个数字就是表达式的值

这就是解题模块大致的实现方法，更加具体的实现请看 [设计实现](/Spencer/#v-设计实现) 部分。

### 4.2 前端设计

我们团队选择了对第三阶段的「把程序变成一个网页程序，让用户设定参数得到各种题目」这个需求进行实现。综合考虑之后，我决定利用 [Vue.js](https://cn.vuejs.org/index.html) 作为前端项目的主体框架，利用 [Bootstrap](https://getbootstrap.com/) 这个优秀的前端组件框架加速前端项目的实现。更多的内容请继续参考 [设计实现 | 前端的实现](/Spencer/#_5-2-前端的实现) 部分。

## V. 设计实现

为了方便前后端和核心代码库的整合，我们团队决定整个项目都利用 JavaScript 来实现。核心代码库和命令行交互方式利用 Node.js 来实现，前端利用 Vue.js 实现。

### 5.1 命令行交互和核心库的实现

整个命令行交互的程序流程如下：

![](https://i.loli.net/2019/01/20/5c43533641253.png)

其中具体的两个地方：题目求解和答题模式，是我负责开发的，下面我具体介绍这两个部分的实现方法。

#### 题目求解的具体实现

考虑和其他模块的整合，我设计了 `Solver` 类来求解题目。在 `Solver` 类中，我实现了这样的几个方法：

- `reversePolishNotation(expression)`：中缀表达式转后缀表达式，即逆波兰表达式的生成。传入参数 `expression` 为中缀表达式的字符串形式
- `solveIntegerExpression(expression)`：求解表达式值。传入参数 `expression` 为中缀表达式的字符串形式

第一个逆波兰表达式的生成算法前文已经提到我就不继续赘述。

第二个方法的实现很意外，最初我的设计思路是：实现两个方法 `solveIntegerExpression()` 和 `solveFractionalExpression()`，分别求解整数形式的四则运算题目和分数形式的四则运算题目。为了整合这样的设计，我还特别要我的队友在生成表达式的时候，在表达式前加上标识符，以表示表达式的类型。不过经过实际的代码编写和进一步的分析讨论，我意识到可以直接将分数看作两个整数的除法，这样就不必对表达式进行判定种类，用一个方法 `solveIntegerExpression` 来直接求解两种类型的题目。

在这里，为了处理分数，我首先思考了一种方式：将一个数表示为「符号、分子和分母」的形式，从而既实现表示分数也能表示整数。比如整数 -2 表示为 {1, 2, 1}，整数 1 表示为 {0, 1, 1}；分数 1/2 表示为 {0, 1, 2}，分数 -3/8 表示为 {1, 3, 8}（符号位参考了原码的表示，即 0 表示正数，1 表示负数）。我知道 JavaScript 的一个叫做 `Math.js` 的库能够直接支持分数的运算和高精度除法，但是经过实现我发现 `Math.js` 处理效率并不高。经过一番搜索，我发现 JavaScript 的一个叫做 `Fraction.js` 的库，采用的表示有理数的方法和我的思考完全一致！于是我直接利用 `Fraction.js` 表示有理数，以实现高精度的数值运算。利用 `Fraction.js`，我能够直接对任何形式的传入题目进行求解，并最后给出极度精确的分数表示形式的答案，符合要求！

#### 命令行的答题模式

为了统一入口程序，方便整合，我设计了 `QuestionBot` 类来实现答题模式，即：Quiz mode。在 `QuestionBot` 类中实现了 `startQuestioning` 方法，进行提问。`startQuestioning(problemSet)` 接受参数为 `problemSet`，即问题集合，是一个 `Array` 型的变量。

方法在开头维护了一个当前题目的变量 `currentProblem`，初始值为 0；同时记录了问题集合的长度，作为本次答题模式的总分值 `totalScore`，每题一分。

在开始答题模式时：

- 首先入口程序 `app.js` 读入题库 `solve_problems.txt`，从中提取运算题集合传入 `QuestionBot`
- 随即 `QuestionBot` 建立问题集合进行提问：
  - 利用 `currentProblem` 维护当前题目进展
  - 用户每输入一道题目的答案，即调用 `Solver` 求解题目，将答案和用户输入对比并给出反馈：
    - 如果正确，则给用户回答正确的反馈
    - 如果错误，则给用户答案错误的反馈，并从总分 `totalScore` 中扣除一分
- 最后，用户题目回答完毕，我们给出用户的最后分数和回答正确率等参数，答题模式完毕

代码细节和具体代码实现请看：[代码细节 | 7.2 Quiz Mode 答题模式](/Spencer/#_7-2-quiz-mode-答题模式)

### 5.2 前端的实现

前端，即「网页程序」，我单独建立了一个仓库：<https://github.com/spencerwooo/fluffy-math-spa> 进行开发。同时利用 GitHub Pages，我也直接将静态页面部署在：<https://spencerwoo.com/fluffy-math-spa>。

其实无论是 JavaScript 还是前端的内容，对我和我队友来说都是全新的领域，经过资料整理、讨论分析，我们最终决定利用 `Vue.js` 实现前端的基本框架。设计之后，我们团队定下了 UI 视觉方案：

- 采用左右分栏的设计：
  - 左侧侧边栏处理生成题目的设置选项
  - 右侧主体显示生成的题目
- 选定了亮蓝色作为背景色、明黄色作为强调色，起到美观和视觉平衡的效果：
  - 主色调为：`#2176FF`
  - 辅色调为：`#33A1FD`
  - 强调色为：`#FDCA40`

在后续的设计和实现过程中，我严格遵守了上面的设计准则，最后实现的前端项目是这个样子：

![](https://i.loli.net/2019/01/20/5c435817d86fe.png)

由于 `Vue.js` 是渐进式的 JavaScript 框架，极度体现模块化设计理念，我在实现前端的过程中也同样遵循了模块化的开发理念，将侧边栏和主体拆开，实现了两个模块：

- `App.vue`：为前端的入口模块，实现页面的主体，显示生成的四则运算题目，调用侧边栏模块
- `Sidebar.vue`：为侧边栏模块，实现生成四则运算题目，并实现用户对题目难度、数量、题目种类和乘方标识符的选择配置

更加详细的代码实现请参看 [代码细节 | 前端](/Spencer/#_7-3-前端)。

## VI. 性能改进

[![Codacy Badge](https://img.shields.io/codacy/coverage/ebf8f648a65a4e3a86f93b50d7fd6dce.svg)](https://www.codacy.com/app/spencerwooo/fluffy-math?utm_source=github.com&utm_medium=referral&utm_content=spencerwooo/fluffy-math&utm_campaign=Badge_Coverage)

## VII. 代码细节

### 7.1 Solver 解题模块

下面是逆波兰表达式的生成，即中缀转后缀表达式的实现模块：

```javascript
/** @function
 * @name reversePolishNotation - 中缀表达式转后缀表达式
 * */
this.reversePolishNotation = function (preFixExpression) {
  let outputQueue = ''
  let operatorStack = []
  let operators = {
    '^': {
      priority: 4,
      associativity: 'R'
    },
    '/': {
      priority: 3,
      associativity: 'L'
    },
    '*': {
      priority: 3,
      associativity: 'L'
    },
    '+': {
      priority: 2,
      associativity: 'L'
    },
    '-': {
      priority: 2,
      associativity: 'L'
    }
  }

  // Get rid of unnecessary spaces
  preFixExpression = preFixExpression.replace(/\s+/g, '')
  preFixExpression = cleanArray(preFixExpression.split(/([+\-*/^()])/))

  for (let i = 0; i < preFixExpression.length; i++) {
    let token = preFixExpression[i]
    if (isNumeric(token)) {
      outputQueue += token + ' '
    } else if ('^*/+-'.indexOf(token) !== -1) {
      let o1 = token
      let o2 = operatorStack[operatorStack.length - 1]
      while ('^*/+-'.indexOf(o2) !== -1 && ((operators[o1].associativity === 'L' && operators[o1].priority <= operators[o2].priority) || (operators[o1].associativity === 'R' && operators[o1].priority < operators[o2].priority))) {
        outputQueue += operatorStack.pop() + ' '
        o2 = operatorStack[operatorStack.length - 1]
      }
      operatorStack.push(o1)
    } else if (token === '(') {
      operatorStack.push(token)
    } else if (token === ')') {
      while (operatorStack[operatorStack.length - 1] !== '(') {
        outputQueue += operatorStack.pop() + ' '
      }
      operatorStack.pop()
    }
  }

  while (operatorStack.length > 0) {
    outputQueue += operatorStack.pop() + ' '
  }

  return outputQueue
}
```

下面是对后缀表达式（即逆波兰表达式）的求解模块：

```javascript
/** @function
 * @name solveIntegerExpression - 中缀转后缀，然后以后缀表达式的形式求解四则运算问题
 * @param {string} expression - 中缀表达式
 */
this.solveIntegerExpression = function (expression) {
  let resultStack = []
  let postFixExpression = this.reversePolishNotation(expression)

  postFixExpression = postFixExpression.split(' ')
  cleanArray(postFixExpression)
  for (let i = 0; i < postFixExpression.length; i++) {
    if (isNumeric(postFixExpression[i])) {
      resultStack.push(Fraction(postFixExpression[i]))
    } else {
      let val1 = resultStack.pop()
      let val2 = resultStack.pop()
      if (postFixExpression[i] === '+') {
        resultStack.push(Fraction(val1).add(val2))
      } else if (postFixExpression[i] === '-') {
        resultStack.push(Fraction(val2).sub(val1))
      } else if (postFixExpression[i] === '*') {
        resultStack.push(Fraction(val1).mul(val2))
      } else if (postFixExpression[i] === '/') {
        try {
          resultStack.push(Fraction(val2).div(val1))
        } catch (error) {
          return error.name
        }
      } else if (postFixExpression[i] === '^') {
        resultStack.push(Fraction(val2).pow(val1))
      }
    }
  }

  if (resultStack.length > 1) {
    return 'ERR'
  } else {
    return resultStack.pop()
  }
}
```
### 7.2 Quiz Mode 答题模式

下面是答题模式模块的实现：

```javascript
var inquirer = require('inquirer')
var Solver = require('./solver')
var { from } = require('rxjs')

function QuestionBot () {
  this.startQuestioning = function (problemSet) {
    let totalScore = problemSet.length
    let currentProblem = 0
    console.log('----------------------------------------')
    console.log('There are', totalScore, 'problems to solve!')
    console.log('Write fractions as \'1/2\' with no spaces.')
    console.log('Happy hacking!')
    console.log('----------------------------------------')

    let solverBot = new Solver()

    let questionBotAsk = []
    problemSet.forEach(problem => {
      let questionBotAskEach = {
        type: 'input',
        name: 'botAsk',
        message: problem + ' ='
      }
      questionBotAsk.push(questionBotAskEach)
    })
    let obs = from(questionBotAsk)

    inquirer.prompt(obs).ui.process.subscribe(
      function (ans) {
        let problem = problemSet[currentProblem]
        let answer = solverBot.solve(problem).toFraction()
        if (ans.answer === answer) {
          console.log('✅ ', 'You are right!')
        } else {
          console.log('❌ ', 'That was wrong...')
          totalScore = totalScore - 1
        }
        currentProblem = currentProblem + 1
      },
      function (err) {
        console.log('Err: ', err)
        currentProblem = currentProblem + 1
      },
      function () {
        let accuracy = (totalScore / problemSet.length * 100).toFixed(2) + '%'
        console.log('----------------------------------------')
        console.log('That\'s the end of the quiz!')
        console.log('You scored', totalScore, 'out of', problemSet.length + ', with an accuracy of', accuracy)
        console.log('Thanks for playing!')
        console.log('----------------------------------------')
      }
    )
  }
}

module.exports = QuestionBot
```

具体的，在 `startQuestioning` 方法中，我首先利用 `problemSet` 问题集合建立 `questionBotAsk` prompt 集合，供 Inquirer.js 创建问题。由于 JavaScript 异步的语言特性，我并不能在每次用户输入前对程序做中断处理，而是需要在用户输入答案之后进行回调（Callback），这是我在构建这个模块时遇到的坑点。

### 7.3 前端

前端的代码实在复杂，限于篇幅我不将代码直接嵌入这里，不过下面几个模块是我开发过程中印象深刻的几个地方：

#### 模块化的理念

以 `Sidebar.vue` 为例，首先 `Vue.js` 是这样的语法：

```vue
<!-- Sidevar.vue -->
<template>
  <div id="sidebar">
    <!-- ... -->
  </div>
</template>

<script>
export default {
   name: 'Sidebar',
   data() {
       ...
   },
   methods: {
       ...
   }
}
</script>

<style scoped>
#sidebar {
  position: fixed;
  z-index: 10;
  margin: 0;
  top: 0;
  left: 0;
  bottom: 0;
  ...
}
</style>
```

利用 `html`、`css`、`javascript`，在一个文件定义整个模块的内容、样式、数据和功能。将模块化的理念贯彻到底。

#### 主模块调用子模块

在 `App.vue` 中，我是这样声明 `Sidebar` 模块的：

```vue
<!-- App.vue -->
<template>
  <div id="app">
    <Sidebar ... />
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'

export default {
  name: 'app',
  components: {
    Sidebar
  },
  ...
}
</script>
...
```

#### 模块之间传递数据

在生成题目过程，我需要将 `Sidebar` 模块生成的题目集合、以及题目配置文件传递给 `App` 主模块。在 Web 领域，数据是利用 `json` 来传输的。特别的，在两个 `Vue` 模块之间传递数据是这样的：

首先在子模块（即 `Sidebar.vue`）处理好要传递的内容，包括题目集合、题目的配置等等。然后利用 `$emit` 将数据传递给父模块：

```vue
<!-- Sidebar.vue -->
...
<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      form: {
        ...
      }
    }
  },
  methods: {
    ...,
    onSubmit(evt) {
      ...
      this.$emit('passDataToApp', this.form)
    }
  }
}
</script>
```

在父模块（即 `App.vue`）接受数据：

```vue
<!-- App.vue -->
<template>
  <div id="app">
    <Sidebar v-on:passDataToApp="onProblemSubmit"/>
    ...
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
export default {
  name: 'app',
  components: {
    Sidebar
  },
  data() {
    return {
        ...
        problem: {
        difficulty: '小学一年级难度',
        quantity: 15,
        type: '整数四则运算',
        powerIndicator: '^',
        problemSet: []
      },
      generatedProblems: ['1 + 1', '1 / 3 + 2 / 5']
    }
  },
  methods: {
    onProblemSubmit(problem) {
      this.generatedProblems = problem.problemSet
      ...
    }
  }
}
</script>
```

这些就是前端开发过程，我遇到印象深刻的地方。

## VIII. 项目总结

最后我们团队几乎实现了全部需求的功能。我们近一个月的开发：

**在软件工程的理念方面：**

不仅让我和我的队友更加深刻的理解了软件工程过程的生命周期，能够在对一个具体的需求进行分析、实现和维护，还真正实现了团队合作。深入贯彻了模块化开发的理念，化繁为简、分而治之。

**在具体的代码实现方面：**

我不仅熟悉了一门全新语言 JavaScript 的使用语法，还在开发过程中理解了 JavaScript 异步、回调的设计理念，以及 Promise 的返回理念。这些都是我在传统语言的学习里从未接触甚至是听说过的领域和知识。同时我也更加理解了前后端的整合和沟通方法，对前端框架的构建的思考也更上一层楼。总体来说，本次的开发过程和体验让我收获太多太多。