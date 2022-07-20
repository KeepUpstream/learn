# 官网

https://git-scm.com/book/zh/v2

# Git常用命令

## 1. 配置

首次使用Git时需要一些配置。配置文件分3个层次： 

| 配置级别 | 影响范围     | 对应文件       | 修改                |
| -------- | ------------ | -------------- | ------------------- |
| 系统全局 | 系统所有用户 | /etc/gitconfig | git config --system |
| 用户     | 单个用户     | ~/.gitconfig   | git config --global |
| 仓库     | 当前仓库     | .git/config    | git config          |

一般使用用户级配置，不然对每个仓库都要设置一遍。

#### Github账号及SSH Key配置

**（1）配置github名字和邮箱**

```js
git config --list  				//显示当前git配置

//设置用户名和邮箱
git config [--global] user.name "KeepupStream"
git config [--global] user.email "XXX@163.com"

git config --global core.editor "vim"	//指定编辑器
git config --global merge.tool "vimdiff" //指定文件对比工具

git config --global push.default simple	//指定push的方式
```

push的方式如下：

+ nothing 什么都不推送，除非明确指定分支引用规格。
+ current 推送当前分支到名字相同的分支
+ upstream 推送当前分支到上游。这个模式只适用于推送与拉取数据相同的仓库，比如：中央仓库流程模式。
+ simple （Git 2.0默认）中央仓库工作流程模式下推送本地当前分支给上游名字匹配的分支。
+ matching 推送本地仓库和远程仓库所有名字匹配的分支。

编辑查看用户级Git config信息如下：

```js
git config -e [--global]  //编辑[用户级]git配置文件

[user]
        name = KeepupStream
        email = 13292827645@163.com
[core]
        editor = vim
[merge]
        tool = vimdiff
[push]
        default = simple
```

**（2）生成SSH Key**

​		Git配置好之后，就可以在本地创建仓库或从Git服务器上获取仓库。Git支持ssh、git、http、https四中协议，常用的是ssh协议，需要通过ssh进行认证，将ssh的公钥提交给git服务提供方，可以直接通过秘钥登录进行文件传输。

```js
//检查 ~/.ssh 目录下是否已有rsa密钥
$ cd ~/.ssh
$ ls
id_rsa  id_rsa.pub
$ cat id_rsa.pub //查看公钥

//如果有则跳过；没有则生成密钥
$ ssh-keygen -t rsa -C "13292827645@16.com"

Generating public/private rsa key pair.
Enter file in which to save the key (/c/Users/user/.ssh/id_rsa):
Created directory '/c/Users/user/.ssh'.
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /c/Users/user/.ssh/id_rsa
Your public key has been saved in /c/Users/user/.ssh/id_rsa.pub
The key fingerprint is:
SHA256:U8K/ilh79TrX+hbm+QEuGUJ1FILN6lPdiKOAnpDScyM 13292827645@16.com
The key's randomart image is:
+---[RSA 3072]----+
|          +o.+.  |
|       . ..oo    |
|  . . . o.o o o  |
| . E + ..= + o . |
|  . * o S.+...   |
|     o   =o.+ +  |
|      .  .o+ = + |
|     o o... + = .|
|    . o.. .+.+...|
+----[SHA256]-----+
```

**（3）获取公钥**

```js
$ vi ~/.ssh/id_rsa.pub
//或
cat id_rsa.pub
```

**（4）将公钥加入GitHub**

然后，复制密钥粘贴到github仓库个人账户settings->SSH and GPG keys->new SSH key
参考链接：https://www.jianshu.com/p/dc484632c547

#### Gitlab账号及SSH Key配置

#### GitHub与Gitlab账号切换

参考链接：https://www.jianshu.com/p/5e3d12bbafeb

https://www.jianshu.com/p/236adb2110d8



配置仓库默认分支

```js
git config --global init.defaultBranch master
```



## 2. 常用指令

##### 获得帮助

```js
//获取git命令的综合手册页
git help <verb>
git <verb> --help
man git-<verb>
  
//快速了解git命令的可用选项
git <verb> -h
```

### 2.1 使用仓库

##### 新建仓库

```js
//新建并初始化仓库
$ mkdir test
$ cd test
$ git init
//或
$ mkdir test
$ git init test
```

显示所有远程仓库

```js
git remote -v
```



##### 导入已有仓库

```js
//http方式导入
git clone https://github.com/KeepupStream/web.git
//下载项目报错
git config --global http.sslVerify "false"

//ssh方式导入
git clone git@github.com:KeepUpstream/learn.git
```

删除远程仓库

```js
git remote rm origin 远程分支地址
```



### 2.2 暂存区

开始工作，这时Git还没有对你的文件进行跟踪，Git跟踪的文件分3种状态：

* Modified(working directory)：被修改过的文件
* Staged(staging directory)：暂存区文件
* Commited(git directory)：仓库中的文件

暂存区文件就是下一个版本的文件变化清单。我们可以很方便的控制文件：

```js
//设置提交时忽略文件，避免一些不必要的文件被加入
法1：常规的windows操作
1. 根目录下创建gitignore.txt；编辑规则，例如加上node_modules/；
2. 打开命令行窗口，切换到根目录（可以直接在文件夹上面的地址栏输入cmd回车）； 
3. 执行命令ren gitignore.txt .gitignore。

mac环境：
$ cd atest //进入atest目录 
$ vim .gitignore //打开文件（没有文件会自动创建，可能我们看不见这个文件）； 
//按i键切换到编辑状态，输入规则
# 注释
node_modules/		#过滤整个文件夹
*.zip						#过滤所有.zip文件
*.[oa]					#[]过滤单个字符的匹配列表，表示忽略.o .a文件
test_?					#？为单个字符的通配符
!aaa.doc				#！表示不忽略跟踪匹配的文件或目录

//然后按Esc键退出，输入:wq保存退出。

//排除内容可参考：https://github.com/github/gitignore
```

##### 查看当前Git状态

```js
//有新文件会提示Untracked Files
git status 
```

##### 添加文件到暂存区

```js
git add .								//将当前目录所有文件到暂存区
git add [dir]						//当指定目录及其子目录添加暂存区
git add [file1] [file2] //当指定文件添加暂存区

git add -p 							//添加每个变化前都会要求确认
```

说明

> git add -A 与 git add .的区别：
>
> git add .		  保存新的添加和修改，但是不包括删除；
>
> git add -u		保存修改和删除，但是不包括新增
>
> git add -A	 	保存所有修改

##### 删除工作区文件

```js
git rm [file1] [file2]  						//将这次删除放入暂存区
git rm --cached [file]  						//停止追踪指定文件，但该文件会保留在工作区
git mv [file-origin] [file-renamed] //改名文件，并将这个改名放入暂存区
```

##### 暂存区更改提交

```js
git commit -m [message]									//提交暂存区到仓库
git commit [file1] [file2] -m [message] //提交暂存区的指定文件到仓库区
git commit -a 													//提交工作区自上次commit之后的变化直接到仓库区
git commit -v 													//提交时显示所有的diff信息

//覆盖上次提交
git commit --amend -m [message] 
git commit --amend [file1] [file2]
```

### 2.3 历史版本

##### 查看版本修改记录

```js
git log				 //显示当前版本提交历史信息
git log -patch //显示每次提交的差异对比信息
git log -stat  //显示commit历史，以及每次commit发生变更的文件

//搜索提交历史，根据关键词
$ git log -S [keyword]
//显示某个commit之后的所有变动，每个commit占据一行
$ git log [tag] HEAD --pretty=format:%s
//显示某个commit之后的所有变动，其"提交说明"必须符合搜索条件
$ git log [tag] HEAD --grep feature
//显示某个文件的版本历史，包括文件改名
$ git log --follow [file]
$ git whatchanged [file]
//显示指定文件相关的每一次diff
$ git log -p [file] 
//显示过去5次提交
$ git log -5 --pretty --oneline
//显示所有提交过的用户，按提交次数排序
$ git shortlog -sn

//显示当前分支的最近几次提交
$ git reflog
```

##### 查看文件修改记录

```js
//显示指定文件是什么人在什么时间修改过
$ git blame [file]	//文件路径要正确
```

##### 文件差异性对比

```js
//显示暂存区和工作区的差异
$ git diff
//显示暂存区和上一个commit的差异
$ git diff --cached [file]
//显示工作区与当前分支最新commit之间的差异
$ git diff HEAD
//显示两次提交之间的差异
$ git diff [first-branch]...[second-branch]
//显示今天你写了多少行代码
$ git diff --shortstat "@{0 day ago}"

//显示某次提交的元数据和内容变化
$ git show [commit]
//显示某次提交发生变化的文件
$ git show --name-only [commit]
//显示某次提交时，某个文件的内容
$ git show [commit]:[filename]
```



### 2.4 安全认证

2021年8月14日起，github身份验证方式由密码变成了token方式。

参考链接：https://blog.csdn.net/weixin_41010198/article/details/119698015

```js
//从Github-settings中获取（2021.11.04）Token：
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 
//Token应实时保持最新，一旦更改Token，所有连接所使用的Token必须随之更改。
```

使用token的方式如下：

```js
//每次push时在password处输入

//把token直接添加远程仓库链接中，这样就可以避免同一个仓库每次提交代码都要输入token
git remote set-url origin https://<your_token>@github.com/<USERNAME>/<REPO>.git
```

### 2.5 分支管理

> 项目分支管理
>
> 分支的新建与合并
>
> https://git-scm.com/book/zh/v2/Git-%E5%88%86%E6%94%AF-%E5%88%86%E6%94%AF%E7%9A%84%E6%96%B0%E5%BB%BA%E4%B8%8E%E5%90%88%E5%B9%B6
>
> 分类介绍：https://www.ruanyifeng.com/blog/2015/08/git-use-process.html
>
> git flow：https://www.jianshu.com/p/bc39b953d769

##### 查看分支

```js
git branch    //列出所有本地分支
git branch -r //列出所有远程分支
git branch -a //列出本地分支和远程分支
```

更新远程分支列表

```js
git remote update origin --prune
```



##### 新建分支

（1）相关指令

```js
git branch [branch-name] 			//但仍保存在当前分支
git branch [branch] [commit] 	//指向指定commit
git branch --track [branch] [remote-branch] //与指定的远程分支建立追踪关系
```

（2）操作实例

比如，我们在实际项目开发过程中，考虑到开发和项目发版等诸多因素，因创建多个分支（比如develop分支用于开发，master分支用于发版等等），那么如何基于某一分支创建新的分支并开始自己的开发呢？

```js
//首先拷贝源代码，比如当前已有分支master、develop
git clone git@git地址

git branch -a //列出本地分支和远程分支

//根据develop分支拉取新的分支，作为自己的开发分支
git checkout -b develop-zyh-20211201 origin/develop

//本地分支和远程分支建立联系，然后能够push代码
git push --set-upstream origin develop-zyh-20211201

//完成开发后推送git
git push origin develop-zyh-20211201
```

##### 切换分支

```js
// 切换本地分支
git checkout [branch-name] 	//切换到指定分支并更新工作区
git checkout - 							//切换到上一分支
//以远程分支为基础新建一个新分支，并切换至该分支
git checkout -b [branch] origin/[remote-branch] 

// 切换远程分支
git remote set-url origin http://gitlab.inner.com/xxx
```

##### 更新分支

如何多人同时基于develop分支进行开发，我们需要自己及时从develop拉取最新代码到本地

```js
//从指定分支更新代码到本地
git pull origin develop

$ git pull [remote] [branch] //取回远程仓库的变化，并与本地分支合并
```

![git-pull-rebase](./image-git/git-pull-rebase.png)

**冲突解决**

​		在更新代码时，最新更改内容与本地更改有冲突很常见。解决方式有两种：

（1）先将自己的所有修改添加到暂存区

```js
git add .
git commit -m "fix:"
git pull origin master
```

（2）先将代码回滚到上一次提交版本

```
git stash
git pull origin master
git stash pop
```

**git pull --rebase命令**

可以行命令`$ git pull --rebase origin master` ，他相当于fetch+merge，--rebase的作用在取消commit记录，并把它们临时保存为补丁（patch，放在.git/rebase目录中），之后同步远程仓库到本地，最后合并补丁到本地仓库。

Git pull --rebase做了一下操作：

a. 把你commit到本地仓库的内容取出放入暂存区stash，这时工作区是干净的；

b. 然后从远端拉取代码到本地，由于工作区是干净的，所以不会有冲突；

c. 从暂存区把之前提交的内容取出跟拉取的新代码进行合并

所以，在拉取代码钱要确保你本地的工作区是干净的，如果本地修改的内容没完全commit或stash，就会rebase失败。

https://blog.csdn.net/wq6ylg08/article/details/114106272

##### 远程推送

如果是clone来的仓库，服务器地址会出现在你的仓库中。注意：在推送本地仓库的更改到远程仓库之前，需要将远程仓库的最新更改同步到本地仓库，不然会发生冲突。

```js
$ git push origin master //推送本地仓库提交的更改
//如果提示报错：
//fatal: unable to access 'https://github.com/KeepUpstream/testgit.git/': LibreSSL SSL_connect: SSL_ERROR_SYSCALL in connection to github.com:443 
//是因为网络连接超时，等待重新push

//--others:
$ git push [remote] [branch] 	//上传本地指定分支到远程仓库
$ git push [remote] --force 	//强行推送当前分支到远程仓库，即使有冲突
$ git push [remote] --all 		//推送所有分支到远程仓库
```

如果是本地建立的仓库temp，默认没有Git服务器地址，需在github中创建test.git，然后将本地仓库temp和远程仓库test.git相关联

```js
$ git remote add origin https://github.com/KeepUpstream/test.git 
$ git remote -v //显示所有远程仓库
$ git push -u origin master
```

##### 合并分支

```js
//切换分支
git checkout master
//将develop分支的代码合并到master分支
git merge develop
git push origin master
git cheery-pick [commit] 	//选择一个commit，合并进当前分支
```

​		如果是团队合作，往往是需要将本地代码同步到响应远程分支之后，在切换到develop分支，然后`create merge request`向项目管理人发起合并分支请求，等对方审核是否将自己分支合并到develop分支中去。

##### 删除分支

```js
git branch -d [branch-name] //删除本地分支
//删除远程分支
git push origin --delelte [branch-name]
```

##### 多分支同时开发

​		许多功能在发版上线之后会有bug修复、新增需求等，往往不同任务会基于不同分支进行开发。那么，如何在暂存基于A分支开发的代码，切换到B分支在进行开发，同时做到各分支代码“随用随取，互不干扰”呢？

方式一：git stash list

```js
git stash 会将当前本地的修改保存到本地

git stash list 查看当前stash的记录

git stash pop 取出stash，并【删除记录】(默认是最近一次)
git stash pop + "stash@{X}"  取出X记录

git stash apply 取出stash，不删除记录
git stash apply + "stash@{X}"  取出X记录

git stash drop + "stash@{X}"  删除X记录

git stash clear 删除所有记录

git stash show 展示最近一次记录
git stash show + "stash@{X}" 展示X次记录
git stash show -p 展示最近一次记录修改的对比，好似在Linux上看文件的diff

```

方式二：git worktree



### 2.6  标签

列出所有tag

$ git tag

新建一个tag在当前commit

$ git tag [tag]

新建一个tag在指定commit

$ git tag [tag] [commit]

删除本地tag

$ git tag -d [tag]

删除远程tag

$ git push origin :refs/tags/[tagName]

查看tag信息

$ git show [tag]

提交指定tag

$ git push [remote] [tag]

提交所有tag

$ git push [remote] --tags

新建一个分支，指向某个tag

$ git checkout -b [branch] [tag]



### 2.7 撤销

恢复暂存区的指定文件到工作区

$ git checkout [file]

恢复某个commit的指定文件到暂存区和工作区

$ git checkout [commit] [file]

恢复暂存区的所有文件到工作区

$ git checkout .

重置暂存区的指定文件，与上一次commit保持一致，但工作区不变

$ git reset [file]

重置暂存区与工作区，与上一次commit保持一致

$ git reset --hard

重置当前分支的指针为指定commit，同时重置暂存区，但工作区不变

$ git reset [commit]

重置当前分支的HEAD为指定commit，同时重置暂存区和工作区，与指定commit一致

$ git reset --hard [commit]

重置当前HEAD为指定commit，但保持暂存区和工作区不变

$ git reset --keep [commit]

新建一个commit，用来撤销指定commit

后者的所有变化都将被前者抵消，并且应用到当前分支

$ git revert [commit]

暂时将未提交的变化移除，稍后再移入

$ git stash

$ git stash pop

### 2.8 其他

生成一个可供发布的压缩包

$ git archive
