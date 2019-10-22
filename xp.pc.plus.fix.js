//这个 js 主要用于，pc 端访问 xp h5 app 时。
//不会因为缺少 plus.* api 报错。
//不需要保证 plus.* 觉得正确执行。
import Barcode from "./Barcode.js"

(function () {
    function EmptyFunction() {

    }

    window.plus = {
        audio: {
            createPlayer: function () {
                return {
                    close: EmptyFunction,
                    addEventListener: EmptyFunction
                }
            }
        },
        barcode: {
            Barcode: Barcode
        },
        bridge: {
            exec: EmptyFunction,
            callbackId: EmptyFunction
        },
        device: {
            model: "desktop",
            barnd: "lk"
        },
        key: {
            addEventListener: EmptyFunction,
            hideSoftKeybord: EmptyFunction
        },
        io: {
            convertLocalFileSystemURL: EmptyFunction
        },
        net: {
            XMLHttpRequest: XMLHttpRequest
        },
        runtime: {
            version: "*",
            quit: EmptyFunction,
            openFile: EmptyFunction
        },
        speech: {
            startRecognize: EmptyFunction,
            stopRecognize: EmptyFunction,
        },
        screen: {
            lockOrientation: EmptyFunction
        },
        storage: localStorage,

        nativeUI: {
            showWaiting: EmptyFunction,
            closeWaiting: EmptyFunction,
            showPrompt: function (message, onComplete) {
                var value = prompt(message);
                onComplete(value.trim())
            }
        },
        navigator: {
            closeSplashscreen: EmptyFunction,
            setFullscreen: EmptyFunction,
            isFullscreen: EmptyFunction
        },
        webview: {
            getLaunchWebview: EmptyFunction
        }
    }

    function addLog(obj) {
        Object.keys(obj).forEach((modules) => {
            const value = obj[modules];
            Object.keys(value).forEach((key) => {
                if (value[key] === EmptyFunction) {
                    value[key] = function () {
                        console.log(`plus.${modules}.${key}`);
                        //console.log.apply(console, [].slice.call(arguments));
                    }
                }
            })
        })
    }
    addLog(window.plus)
    window.addEventListener('load', function () {
        document.dispatchEvent(new Event("plusready"))
    }, false)
}());