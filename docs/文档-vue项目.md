# vue框架

## 一、父子组件嵌套

#### 1.1 生命周期

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



#### 1.2 传参取值

（1）父组件向子组件传参

​		页面数据绑定+子组件prop

（2）父组件获取子组件的值

​		父组件内this.$refs.childComponent.data

（3）子组件向父组件传值

​		子组件内this.$emit('changeData',data)

#### 1.3 子组件刷新

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
