let instance = null;

var IPAddress;
var MicFunction;
var Nav;
var title;
var name;
var route;

export default class Singleton {

    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    setIP(ip) {
        this.IPAddress = ip;
    }

    getIP() {
        return this.IPAddress;
    }

    setMicFunction(func) {
        this.MicFunction = func;
    }

    getMicFunction() {
        return this.MicFunction;
    }

    setNav(nav) {
        this.Nav = nav;
    }

    getNav() {
        return this.Nav;
    }

    setTitle(title) {
        this.title = title;
    }

    getTitle() {
        return this.title;
    }

    setRoomName(name) {
        this.name = name;
    }

    getRoomName() {
        return this.name;
    }

    setRoute(route) {
        this.route = route;
    }

    getRoute() {
        return this.route;
    }

    getPageSize() {
        return 6;
    }
}  