# Fluffy Math Docs

> 🔢 四则运算 | BIT 软件开发团队项目文档

## 项目链接

项目共有三个仓库：
- [Fluffy Math Core](https://github.com/spencerwooo/fluffy-math)：Fluffy Math 的底层类库（与命令行界面）仓库
- [Fluffy Math Front-end](https://github.com/spencerwooo/fluffy-math-spa)：Fluffy Math 的前端仓库
- [Fluffy Math Docs](https://github.com/spencerwooo/fluffy-math-docs)：Fluffy Math 团队的博客文档，即本仓库

## Fluffy Math Core

地址：<https://github.com/spencerwooo/fluffy-math>

Fluffy Math Core 为 Fluffy Math 四则运算类库的 **生成与解决等底层工具库**，同时也包含了命令行界面（CLI）的内容。**主要完成了项目要求的第一阶段、第二阶段目标：**

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

**构建与编译方式：**

1. 下载仓库：

```bash
git clone https://github.com/spencerwooo/fluffy-math.git
```

2. 安装依赖：

```bash
yarn install
```

3. 编译运行：

```bash
yarn start
```

更多内容请参考 [Fluffy Math Core README](https://github.com/spencerwooo/fluffy-math#%E7%BC%96%E8%AF%91)。

## Fluffy Math Front-end

地址：<https://github.com/spencerwooo/fluffy-math-spa>

Fluffy Math Front-end 即 Fluffy Math 的前端页面，**主要完成了项目第三阶段的目标：**

- **第三阶段**
  - 对程序进行扩展：
    - 把程序变成一个网页程序，让用户设定参数得到各种题目
    - 选一个从未接触的编程语言（Javascript）并试一试实现基本功能

> 真的，我们两个人从来都没学过 Javascript。

这部分内容尚待完善。目前仅有基础框架，没有上线。

**构建与编译方式：**

1. 下载仓库：

```bash
git clone https://github.com/spencerwooo/fluffy-math-spa.git
```

2. 安装依赖：

```bash
yarn install
```

3. 编译并在本地构建开发服务器：

```bash
# Compiles and hot-reloads for development
yarn run serve
```

更多内容请参考 [Fluffy Math Front-end README](https://github.com/spencerwooo/fluffy-math-spa)。

---

🔢 **Fluffy Math** ©Spencer Woo. Released under the MIT License.

Authored by Spencer Woo. Co-maintained with [@Garvey Lau](https://github.com/Garvey98).

[@Blog](https://spencerwoo.com/) · [ⒿJike](https://web.okjike.com/user/4DDA0425-FB41-4188-89E4-952CA15E3C5E/post) · [@GitHub](https://github.com/spencerwooo)
