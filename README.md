# PubSub - 事件发布订阅
## 一、PubSub.on(events, [callback])
- 描述: 绑定一个或多个事件的事件处理函数
- events: 一个或多个用空格分隔的事件类型和可选的命名空间，如"click"或"click dbclick"或"click:first"、"click:second" 
- callback: 绑定事件的回调 
## 二、PubSub.off(events)
- 描述: 移除一个或多个事件的事件处理函数
- events: 一个或多个用空格分隔的事件类型和可选的命名空间，如"click"或"click dbclick"或"click:first"、"click:second" 
## 三、PubSub.trigger(events, [data])
- 描述: 触发由 **PubSub.on** 绑定的事件集
- events: 一个或多个用空格分隔的事件类型和可选的命名空间
- data: 传递给事件处理函数的附加参数
## 四、PubSub.one(events, [callback])
- 描述: 绑定一个或多个事件的事件处理函数，该函数在被触发过一次后自动销毁
- events: 一个或多个用空格分隔的事件类型和可选的命名空间，如"click"或"click dbclick"或"click:first"、"click:second" 
- callback: 绑定事件的回调 
## 五、PubSub.triggerOnce(events, [data])
- 描述: 触发由 **PubSub.one** 绑定的事件集
- events: 一个或多个用空格分隔的事件类型和可选的命名空间
- data: 传递给事件处理函数的附加参数

## 举例
### 1.绑定事件
``` javascript
/** 
* 1.绑定的一个叫做"start"的事件
*/
PubSub.on('start',  function (data) {
    console.log('data: ' + data)
})
/** 
* 2.绑定的事件多个事件，用空格分隔事件名称 加冒号的方式，表示事件子事件
*/
PubSub.on('start end',  function (data) {
    console.log('data: ' + data)
})
/** 
* 3.绑定的事件多个事件，形如：A事件名 + 加冒号 + B事件名，表示A事件B子事件
*/
PubSub.on('start:111 start:222',  function (data) {
    console.log('data: ' + data)
})
```
### 2.触发事件
``` javascript
/** 
* 1.假定目前PubSub所有的事件集只有一个名为"start"的事件
*/
PubSub.trigger('start', 'I am start trigger')
// 输出：data: I am start trigger

/** 
* 2.假定目前PubSub所有的事件集总共有两个事件："start"、"end"
* 他们的回调分别为：startCallback、endCallback
*/
PubSub.trigger('start end',  'I am two events')
// 输出startCallback('I am two events')
// 输出endCallback('I am two events')

/** 
* 3.假定目前PubSub所有的事件集总共有三个事件："start"、"start:111"、"start:222"
* 他们的回调分别为callbackA、callbackB、callbackC
*/
PubSub.trigger('start:111', '执行start:111')
// 输出：callbackB('执行start:111')

/** 执行的事件如果存在子事件，将会被一起执行 */
PubSub.trigger('start', '执行all')
// 输出：callbackA('执行all')
// 输出：callbackB('执行all')
// 输出：callbackC('执行all')
```
### 3.移除事件
``` javascript
/** 
* 1.假定目前PubSub所有的事件集只有一个名为"start"的事件
*/
// 移除单个事件
PubSub.off('start')

/** 
* 2.假定目前PubSub所有的事件集总共有两个事件："start"、"end"
*/
// 移除多个事件
PubSub.off('start end')

/** 
* 3.假定目前PubSub所有的事件集总共有三个事件："start"、"start:111"、"start:222"
*/
// 移除子事件，不对父事件和兄弟事件产生任何影响
PubSub.off('start:111')
// 移除父事件，其相关的子事件都会被移除
PubSub.off('start')
```
### 4.绑定一次性事件
``` javascript
// 规则与on一致
/** 
* 1.绑定的一个叫做"start"的事件
*/
PubSub.one('start',  function (data) {
    console.log('data: ' + data)
})
/** 
* 2.绑定的事件多个事件，用空格分隔事件名称 加冒号的方式，表示事件子事件
*/
PubSub.one('start end',  function (data) {
    console.log('data: ' + data)
})
/** 
* 3.绑定的事件多个事件，形如：A事件名 + 加冒号 + B事件名，表示A事件B子事件
*/
PubSub.one('start:111 start:222',  function (data) {
    console.log('data: ' + data)
})
```
### 5.触发一次性事件
``` javascript
// 触发过一次后，事件将会自动被清除，再次执行将不再触发任何事件

/** 
* 1.假定目前PubSub所有的事件集只有一个名为"start"的事件
*/
PubSub.triggerOnce('start', 'I am start trigger')
// 输出：data: I am start trigger

// 再次执行
PubSub.triggerOnce('start', 'I am start trigger')
// 事件不存在！

/** 
* 2.假定目前PubSub所有的事件集总共有两个事件："start"、"end"
* 他们的回调分别为：startCallback、endCallback
*/
PubSub.triggerOnce('start end',  'I am two events')
// 输出startCallback('I am two events')
// 输出endCallback('I am two events')

// 再次执行
PubSub.triggerOnce('start end',  'I am two events')
// 输出：事件不存在！

/** 
* 3.假定目前PubSub所有的事件集总共有三个事件："start"、"start:111"、"start:222"
* 他们的回调分别为callbackA、callbackB、callbackC
*/
PubSub.triggerOnce('start:111', '执行start:111')
// 输出：callbackB('执行start:111')

// 再次执行
PubSub.triggerOnce('start:111', '执行start:111')
// 输出：事件不存在！

/** 执行的事件如果存在子事件，将会被一起执行 */
PubSub.triggerOnce('start', '执行all')
// 输出：callbackA('执行all')
// 输出：callbackB('执行all')
// 输出：callbackC('执行all')

// 再次执行
PubSub.triggerOnce('start', '执行all')
// 输出：事件不存在！
```
