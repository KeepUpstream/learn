# Node指令

[Node.js](http://lib.csdn.net/base/nodejs)是[JavaScript](http://lib.csdn.net/base/javascript)的一种运行环境，是对Google V8引擎进行的封装。是一个服务器端的javascript的解释器。

NPM（Node Package Manager）是node.js的包管理器。便于我们开发时，可以简单快速下载引用第三方模块。

## 1. NPM指令

```js
//npm 指令格式
	 npm config set <key> <value> [--global]
   npm config get <key>
   npm config delete <key>
   npm config list	//查看config配置信息
   npm config edit
   npm get <key>
   npm set <key> <value> [--global]
```

npm获取配置有6种方式，优先级由高到底。

1. 命令行参数。 `--proxy http://server:port`即将proxy的值设为`http://server:port`。
2. 环境变量。 以`npm_config_`为前缀的环境变量将会被认为是npm的配置属性。如设置proxy可以加入这样的环境变量`npm_config_proxy=http://server:port`。
3. 用户配置文件。可以通过`npm config get userconfig`查看文件路径。如果是mac系统的话默认路径就是`$HOME/.npmrc`。
4. 全局配置文件。可以通过`npm config get globalconfig`查看文件路径。mac系统的默认路径是`/usr/local/etc/npmrc`。
5. 内置配置文件。安装npm的目录下的npmrc文件。
6. 默认配置。 npm本身有默认配置参数，如果以上5条都没设置，则npm会使用默认配置。

#### 1.1 node版本更新

```js
node -v									//查看node.js版本
sudo npm cache clean -f	//清除node.js的chache
sudo npm install -g n		//node版本管理工具
sudo n stable						//安装最稳定的node版本
sudo npm install npm@latest -g	//更新npm到最新版本
----------------------------------------------------
node -v
npm  -v
```



####  1.2 下载包

【下载包位置】配置

安装node.js时，默认将npm安装在C盘，可以修改相关配置

```
npm config set prefix "D:\install\node\node_global"
npm config set chache "D:\install\node\node_cache"
```

安装目录变更后，新安装的模块找不到会报错，此时要配置环境变量：

① 设置系统环境变量，在Path中添加D:\install\node\node_global；

② 新建环境变量NODE_PATH：D:\install\node\node_global\node_modules；

然后在cmd中使用 vue -v 即可查看版本

webpack安装

使用webpack的优势：方便vue组件化，webpack可以将组件、文件打包合并成一个入口js文件

```js
npm install -g webpack webpack-cli
```

vue安装

```js
npm install -g vue vue-cli
```

#### 1.3 淘宝镜像

全局安装淘宝镜像

```
npm install -g cnpm --registry=https://registry.npm.taobao.org 
```

配置淘宝镜像

```
npm config set registry http://registry.npm.taobao.org  //安装淘宝镜像
```

[npm镜像及配置方法](https://www.cnblogs.com/zixuan00/p/11197532.html)

如果配置了多个镜像的话，可以使用`nrm use xxx` 进行切换。

#### 1.4 全局安装 vs 局部安装

​		很多时候我们都纳闷，为什么我在项目中执行`npm i`指令后，命名在该项目的`node_moudles/`目录下能看到安装的`@babel/cli`包，但是在`vscode`终端项目根目录下，执行`babel src --out-dir lib `会出现`zsh: command not found: babel`呢？

但是我们这样执行却能够成功：

```js
// project是项目名
project % ./node_modules/.bin/babel src/app.vue --out-dir a
project % npx babel src/app.vue --out-dir as
```





## 2. 权限问题

比如，目前的npm默认安装第三方依赖位置是/usr/local/lib/node_modules，但我们在使用npm install命令式发现报错如下：缺少对该路径的访问权限。

```js
zhuyanhui@zhuyanhuideMacBook-Pro / % npm install webpack -g
npm WARN checkPermissions Missing write access to /usr/local/lib/node_modules
npm ERR! code EACCES
npm ERR! syscall access
npm ERR! path /usr/local/lib/node_modules
npm ERR! errno -13
npm ERR! Error: EACCES: permission denied, access '/usr/local/lib/node_modules'
npm ERR!  [Error: EACCES: permission denied, access '/usr/local/lib/node_modules'] {
npm ERR!   errno: -13,
npm ERR!   code: 'EACCES',
npm ERR!   syscall: 'access',
npm ERR!   path: '/usr/local/lib/node_modules'
npm ERR! }
npm ERR! 
npm ERR! The operation was rejected by your operating system.
npm ERR! It is likely you do not have the permissions to access this file as the current user
npm ERR! 
npm ERR! If you believe this might be a permissions issue, please double-check the
npm ERR! permissions of the file and its containing directories, or try running
npm ERR! the command again as root/Administrator.

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/zhuyanhui/.npm/_logs/2021-09-28T15_31_45_010Z-debug.log
```

可使用管理员权限进行安装:

```js
zhuyanhui@zhuyanhuideMacBook-Pro / % sudo npm install webpack -g 
//sudo password is your login password.(your brother's birth of 6)
```

