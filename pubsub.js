(function () {
    var PubSub = {
        callbacks: {},
        onceCallbacks: {}
    }
    function buildEvent (eventNames, callback, target) {
        if (typeof eventNames != 'string') {
            throw new Error('事件名称格式不正确!')
        }
        if (typeof callback != 'function') {
            throw new Error('回调函数缺失或者格式不正确!')
        }
        var namesArr = eventNames.split(/\s+/)
        for (var i = 0; i < namesArr.length; i++) {
            var eventName = namesArr[i]
            target[eventName] = target[eventName] || []
            target[eventName].push(callback)
        }
        // console.log(namesArr)
        // console.log(namesArr.length)
    }
    // 注册事件
    PubSub.on = function (eventNames, callback) {
        buildEvent(eventNames, callback, PubSub.callbacks)
    }

    function findCallbacksMatchKeys (eventNames, target) {
        var keys = Object.keys(target)
        var arr = keys.filter(function (key) {
            var regex = new RegExp('^'+eventNames+':*?');
            return eventNames === key  || key.match(regex)
        })
        return arr || []
    }

    // 解除事件
    PubSub.off = function (eventNames) {
        // 从所有的key中筛选出符合eventName开头和eventName+':'开头的事件
        var target = PubSub.callbacks
        var removeArr  = findCallbacksMatchKeys(eventNames, target)
        // console.log(removeArr)
        removeArr.forEach(function (value) {
            delete target[value]
        })
    }
    // 触发事件
    PubSub.trigger = function (eventNames, data) {
        var triggerArr  = findCallbacksMatchKeys(eventNames, PubSub.callbacks)
        triggerArr.forEach(function (value) {
            PubSub.callbacks[value].forEach(function (callback) {
                callback(data)
            })
        })
    }
    // 一次性事件
    PubSub.one = function (eventNames, callback) {
        buildEvent(eventNames, callback, PubSub.onceCallbacks)
    }
    PubSub.triggerOnce = function (eventNames, data) {
        var target = PubSub.onceCallbacks
        var triggerArr  = findCallbacksMatchKeys(eventNames, target)
        triggerArr.forEach(function (value) {
            target[value].forEach(function (callback) {
                callback(data)
            })
        })
        triggerArr.forEach(function (value) {
            delete target[value]
        })
    }
    window.PubSub = PubSub
})()