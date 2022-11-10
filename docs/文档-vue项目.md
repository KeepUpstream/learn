# vue项目

## 一、配置文件

### vscode setting.json文件

```json
{
  "workbench.iconTheme": "material-icon-theme",
	"workbench.startupEditor": "welcomePage",
  "workbench.colorTheme": "Quiet Light",
	"git.autofetch": true,
	"git.confirmSync": false,
  "window.zoomLevel": 0,
  // vscode默认启用了根据文件类型自动设置tabsize的选项
	"editor.detectIndentation": false,
	// 重新设定tabsize
	"editor.tabSize": 2,
  "eslint.validate": [
      "javascript",
      "javascriptreact",
      // {
      //     "language": "vue",
      //     "autoFix": true
      // },
  ],
  // "vetur.format.defaultFormatter.html": "prettyhtml",
  "vetur.format.defaultFormatter.css": "prettier",
  "vetur.format.defaultFormatter.postcss": "prettier",
  "vetur.format.defaultFormatter.scss": "prettier",
  "vetur.format.defaultFormatter.less": "prettier",
  "vetur.format.defaultFormatter.stylus": "stylus-supremacy",
  "vetur.format.defaultFormatter.js": "prettier",
  "vetur.format.defaultFormatter.ts": "prettier",
  "vetur.format.defaultFormatter.sass": "sass-formatter",
  "vetur.format.options.tabSize": 2,
  "vetur.format.options.useTabs": false,
  "vetur.format.defaultFormatter.html": "js-beautify-html",
  "vetur.format.defaultFormatterOptions": {
    "js-beautify-html": {
      // js-beautify-html settings here
			// #vue组件中html代码格式化样式
			"wrap_attributes": "force-aligned", //也可以设置为“auto”，效果会不一样
			"wrap_line_length": 200,
			"end_with_newline": false,
			"semi": false,
			"singleQuote": true
    },
    "prettier": {
      // Prettier option here
      "trailingComma": "es5", // 多行时，尽可能打印尾随的逗号
      "tabWidth": 4, // 会忽略vetur的tabSize配置
      "useTabs": false, // 是否利用tab替代空格
      "semi": true, // 句尾是否加;
      "singleQuote": true, // 使用单引号而不是双引号
      "arrowParens": "avoid", // allow paren-less arrow functions 箭头函数的参数使用圆括号
      }
  },
	// #值设置为true时，每次保存的时候自动格式化；值设置为false时，代码格式化请按shift+alt+F
	"editor.formatOnSave": false,
	// #每次保存的时候将代码按eslint格式进行修复
	"eslint.autoFixOnSave": true,
	// 添加 vue 支持
	"eslint.validate": [
		"javascript",
		"javascriptreact",
		"vue-html",
		{
			"language": "html",
			"autoFix": true
		}
	],
	//  #让prettier使用eslint的代码格式进行校验
  "prettier.eslintIntegration": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.fixAll.eslint": true
  },
}
```

我的配置文件

```json
{
    "editor.formatOnPaste": true,
    "workbench.tree.indent": 20,
    "editor.fontSize": 15,
    "explorer.confirmDelete": false,
    "window.zoomLevel": 1,
    "editor.tabSize": 2,
    "editor.codeActionsOnSave": {            
        "source.fixAll.eslint": true        
    },
    "[vue]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "editor.formatOnSave": true,
    // "eslint.autoFixOnSave": true,
    "eslint.validate": [
        "javascript",
        "javascripteact",
        "html",
        "vue"
    ],
    // "prettier.eslintIntergration": true,
    "prettier.trailingComma": "es5",
    "prettier.singleQuote": true,
    "prettier.semi": false,
    "vetur.format.defaultFormatter.js": "vscode-typescript",
    "prettier.jsxBracketSameLine": false,
    "[javascript]": {
        "editor.defaultFormatter": "vscode.typescript-language-features"
    },
    "javascript.format.insertSpaceBeforeFunctionParenthesis": true
}
```



### vue.config.js

可选配置文件，若项目跟目录存在此文件（与package.json同级），它会被@vue/cli-service自动加载。

[官网参考链接]: https://cli.vuejs.org/zh/guide/

### .browserslistrc文件

你会发现有 `package.json` 文件里的 `browserslist` 字段 (或一个单独的 `.browserslistrc` 文件)，指定了项目的目标浏览器的范围。这个值会被 [@babel/preset-env](https://new.babeljs.io/docs/en/next/babel-preset-env.html) 和 [Autoprefixer](https://github.com/postcss/autoprefixer) 用来确定需要转译的 JavaScript 特性和需要添加的 CSS 浏览器前缀。



### .gitignore文件

如果某些文件不需要要加入版本管理，可在此配置提交时忽略追踪的某些文件及目录。

```markdown
.DS_Store
node_modules/
/dist/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
```

可用正则

### .babelrc文件

前端技术在不断迭代更新，如果想要在项目中使用新的语法特性，同时兼容老版本的语法，可在此文件中配置转码规则。

```json
{
  //presets配置语法转译器 只负责转译js最新的语法，并不负责转译js新增的api和全局对象；
  "presets": [
    //babel-preset-env转译器包 可以让代码兼容不同版本的浏览器或者node。浏览器或者node已经支持的语法将不再转译了，不支持的才转译。
    ["env", {
      //默认支持CommonJS规范
      "modules": false,	
      //制定兼容浏览器类型以及版本
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      }
    }],
    "stage-2"
    //stage-0：包含stage-1,2,3的功能
    //stage-1：覆盖了stage-2,stage-3的所有功能
		//stage-2：覆盖了stage-3的功能，并支持两个插件:支持增强代码可读性的插件;支持es6的解构赋值
    //stage-3：支持 async，await
    //调用顺序stage-2 => env；
  ],
  
  //plugins配置补丁转译器 补丁转译器负责转译js新增的api和全局对象；调用顺序transform-runtime=>transform-vue-jsx;
  "plugins": ["transform-vue-jsx", "transform-runtime"]
  //transform-runtime：babel-runtime，babel-polyfill 与之有近似的能力，但是为什么选择这哥们呢？ 			//transform-runtime会自动polyfill es5不具备的新特性 ，即es6的API转换为es5；
  //babel-runtime必须手动require；
  //babel-polyfill直接改写全局prototype，方式比较暴力，容易污染全局变量，而且这个包很大。

  //babel-plugin-dynamic-import-node 热更新速度，开发环境通过babel将异步import()转化为同步require()来增加热更新速度，生产环境继续使用webpack的import机制。
  "env":{
  	"development":{
  		"plugins":["dynamic-import-node"]
		}
	}
}
```

### .editorconfig文件

配置编辑器的编码风格.

```json
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
```

### .eslintrc.js文件

这个文件放在根目录下面是负责代码规范，引入插件的.

官网：// https://eslint.org/docs/user-guide/configuring

```json
module.exports = {
  root: true,
  
  parserOptions: {
    parser: 'babel-eslint'
  },
  
  env: {
    browser: true,
  },
  
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
```



### .eslintignore文件

要引入三方js库，但是这些库不符合eslint规范，可以在这个文件里忽略掉，例如：

```json
build/*.js
config/*.js
static
```

### .prettierrc文件

格式化代码插件

​		首先，在vscode安装prettier - Code formatter；

​		然后要代码保存并格式化就需要在vscode的setting.json里加上下面这句话`"editor.formatOnSave":true`，这样每按下ctrl+S是代码会根据你配置的prettierrc规则进行格式化

**规则遵循优先级关系：项目根目录下的.prettierrc > setting.json里设置的 prettier规则**

规则的配置可以写在setting.json里，也可以在项目的根目录下创建 .prettierrc文件定制项目专属的规则。

```json
{
  //在对象或数组后最后一个元素后面是否加","(es5中加)
  "trailingComma": "es5",
  //缩进字节数
  "tabWidth": 2,
  //句尾添加分号
  "semi": false,
  //使用单引号代替双引号
  "singleQuote": true,
  //在jsx中使用单引号代替双引号
  "jsxSingleQuote":false,
  //在jsx中吧把’>‘是否单独放一行
  "jsxBracketSameLine": true,
  //html空格敏感性，此处Wie忽略
  "htmlWhitespaceSensitivity": "ignore",
  //prettier使用stylelint的代码格式进行校验
  "stylelintIntegration":false,
  //prettier使用tslint的代码格式进行校验
  "tslintIntegration":false
}
```

### .package.json文件

package.json及webpack 开发环境&生产环境配置:https://segmentfault.com/a/1190000023109072

webpack配置整理：https://www.jianshu.com/p/78e4815889e1



## 二、Vue源码解读

参考链接：https://blog.csdn.net/quanxin0222/article/details/121310600

#### 1. compiler

​		将template编译成render函数。对于在线编译，render在运行时执行，执行时会生成vnode

- 运行时和编译时

  运行时：new Vue()时产生一个对象，包含data、methods、events、lifecycle等，它们通过**“数据与模板的绑定关系”**维持vue的使用，被维持的绑定关系就是运行时。

  编译时：时创建对应关系的代码，编译的对象是template，分为离线编译和在线编译

  ```js
  离线编译：开发、打包的过程，将.vue业务代码编译成render函数的过程；
  在线编译：上线的代码在运行时编译，new Vue()代码在浏览器里跑的过程。
  // vue和react源码区别
  // react做运行时优化，所以react源码复杂；vue没有太多运行时优化但也很流畅，因为vue做编译时优化，所以vue模板必须按他的规则去写，而react就很灵活。
  ```

compiler编译步骤：

（1）如果有render函数，那么已经是编译完成的，返回；

（2）判断template：string | dom，离线编译（判断编译环境，执行compileToFunctions函数）；

（3）然后将template编译成函数；

parser：对模板进行AST解析（先分词，再做词法分析）

- html解析
- filter解析
- 分析v-for的key
- 优化：判断静态节点（纯dom、文本没有vue指令的是纯静态节点；若有子节点，子节点也应为静态节点）

#### 2. core：核心

```js
core目录
|——component：模板编译代码
|——global-api：文件接口
|——instance：实例，处理初始化、状态、数据、生命周期、事件
|——observer：数据订阅
|——utils：工具函数
|——vdom：虚拟dom，使用虚拟dom的原因是，原生dom有很多无用的属性，占用太多内存
```

- core是vue代码的核心，而 observer 是 core 的核心。它利用 Object.defineProperty 实现对数据的操作拦截，然后将数据绑定到一个 由 观察者模式 为单元（watcher）组成的数据维护中心（Dep）。
- 对于数组，新增或修改元素可能造成整个数组的元素重新排列，所以对数组进行了重写。所有新增的元素都调用 observer 方法，使其变为一个可观察的对象。
- 对于任何数据，都进行递归操作，使其任意属性变得可以追踪。

##### 2.1 observer

（1）defineReactive

（2）observer

（3）watcher

（4）Dep

（5）scheduler

（6）nextTick

##### 2.2 components

keep-alive，保存的是 vnode 节点，而不是数据。

由于 vnode 节点比描述状态的数据大一些，所以 keep-alive 能够保存的数据大小有限，所以它存在取舍问题，一般舍弃最老的组件。

对于任意组件，无论是否被添加到 keep-alive 缓存列表中，重新访问时，都会把它设置为列表的结尾。

##### 2.3 use

用于为vue设置插件，它维护一个插件队列，判断是否已存在，如果未存在，执行插件，并且添加到插件队列中。

#### 3. platform：web、weex平台

#### 4. server：服务端渲染

#### 5. sfc

​	单文件组件处理，将.vue文件的template、script、style拆分

#### 6. shared：工具、常量



1.1 生命周期

```vue
<template>
	<div root>
    <ComponentA></ComponentA>
    <ComponentB></ComponentB>
  </div>
</template>

beforeCreate: root
created: root
beforeMount: root
beforeCreate: A
created: A
beforeMount: A
beforeCreate: B
created: B
beforeMount: B
mounted: A
mounted: B
mounted: root
```



1.2 传参取值

（1）父组件向子组件传参

​		页面数据绑定+子组件prop

（2）父组件获取子组件的值

​		父组件内this.$refs.childComponent.data

（3）子组件向父组件传值

​		子组件内this.$emit('changeData',data)

1.3 子组件刷新

​		把一个组件重置到初始状态是一个常见的需求，推荐的做法有两种：

（1）是父组件重置子组件的 prop

（2）是子组件暴露一个重置的方法供父组件调用。

​		但有些时候，子组件既没有提供重置的方法，也没提供 prop 来重置自己的状态。更重要的是，这个子组件我们还动不了。于是我们就需要一种 hack 的方式来强制子组件重置到初始状态。方法如下：

```jsx
//原理就是：采用v-if会销毁组件并且重绘，这样就会重载组件
// 子组件：自己封装的组件
<IncomeStatistics v-if="DestroyIncomeStatistics == true"
                  ref="IncomeStatisticsChild"></IncomeStatistics>

// 然后再父组件内的增删改查方法中操作，就好了
this.DestroyIncomeStatistics = false;
// 然后你的方法成功后
// Vue 实现响应式并不是数据发生变化之后 DOM 立即变化，而是按一定的策略进行 DOM 的更新。
// 在vue的深入响应式原理中有解释：
// $nextTick 是在下次 DOM 更新循环结束之后执行延迟回调，在修改数据之后使用 $nextTick，则可以在回调中获取更新后的 DOM
   this.$nextTick(() => {
          this.DestroyIncomeStatistics = true;
        });
//这样的话就会完成强制刷新
```

## 三、小细节问题

#### 1. export default中定义name属性的作用

答：1）允许组件末班递归地调用自身（使用`Vue.component()`注册全局组件时，全局id自动为组件name）

2）方便在vue.js官方提供的调试工具vue-devtools中定位组件，进行调试

3）在使用keep-alive设置是否缓存页面时，可以使用include和exclude属性，依据的就是组件name属性

