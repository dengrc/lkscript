//这个 js 主要用于，pc 端访问 xp h5 app 时。
//不会因为缺少 plus.* api 报错。
//不需要保证 plus.* 觉得正确执行。
import Barcode from "./Barcode.js";
import WebView from "./WebView.js";


function EmptyFunction() {

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

const plus = {
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
    bluetooth: {
        openBluetoothAdapter: EmptyFunction,
        startBluetoothDevicesDiscovery: EmptyFunction,
        stopBluetoothDevicesDiscovery: EmptyFunction,
        getConnectedBluetoothDevices: EmptyFunction,
        getBluetoothDevices: EmptyFunction,
        getBluetoothAdapterState: EmptyFunction,
        closeBluetoothAdapter: EmptyFunction,
        onBluetoothDeviceFound: EmptyFunction,
        onBluetoothAdapterStateChange: EmptyFunction
    },
    device: {
        model: "desktop",
        barnd: "lk",
        setWakelock: EmptyFunction
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
        prompt: function (message, onComplete) {
            var value = prompt(message);
            onComplete(value ? value.trim() : value)
        },
        confirm: function (options) {
            var a = confirm(options.content);
            options.success({
                confirm: a,
                cancel: !!a
            })
        }
    },
    navigator: {
        closeSplashscreen: EmptyFunction,
        setFullscreen: EmptyFunction,
        isFullscreen: EmptyFunction
    },
    webview: {
        getLaunchWebview: EmptyFunction,
        getWebviewById: EmptyFunction,
        create: function (url, id, styles) {
            return new WebView(...arguments)
        }
    }
}

addLog(plus)

window.plus = plus;
document.addEventListener('DOMContentLoaded', function () {
    document.dispatchEvent(new Event("plusready"))
}, false);