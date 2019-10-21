//这个 js 主要用于，pc 端访问 xp h5 app 时。
//不会因为缺少 plus.* api 报错。
//不需要保证 plus.* 觉得正确执行。


(function () {}(
    function EmptyFunction() {

    },

    window.plus = {
        device: {
            model: "desktop",
            barnd: "lk"
        },
        runtime: {
            version: "*",
            quit: EmptyFunction,
            openFile: EmptyFunction
        },
        storage: localStorage,
        screen: {
            lockOrientation: EmptyFunction
        },
        nativeUI: {
            showWaiting: EmptyFunction,
            closeWaiting: EmptyFunction
        },
        bridge: {
            exec: EmptyFunction,
            callbackId: EmptyFunction
        },
        net: {
            XMLHttpRequest: XMLHttpRequest
        }
    },

    function addLog(obj) {
        Object.keys(obj).forEach((modules) => {
            const value = obj[modules];
            Object.keys(value).forEach((key) => {
                if (value[key] === EmptyFunction) {
                    value[key] = function () {
                        console.log(`plus.${modules}.${key}`);
                        console.log.apply(console, [].slice.call(arguments));
                    }
                }
            })
        })
    },
    addLog(window.plus),
    window.addEventListener('load', function () {
        document.dispatchEvent(new Event("plusready"))
    }, false)
));