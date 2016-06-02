export class Subscription {
   
    constructor(owner, events) {
        this.owner=owner;
        this.events=events;
    } 
    owner;
    events;
    callback;
    context;
    then(callback, context?) {
        this.callback = callback || this.callback;
        this.context = context || this.context;
        if (!this.callback) {
            return this;
        }
        this.owner.on(this.events, this.callback, this.context);
        return this;
    }
    on = this.then;
    off() {
        this.owner.off(this.events, this.callback, this.context);
        return this;
    }
}

export class Events {
    eventSplitter = "/\s+/";
    callbacks;
    on(events, callback?, context?): any {
        var calls, event, list;

        if (!callback) {
            return new Subscription(this, events);
        } else {
            calls = this.callbacks || (this.callbacks = {});
            events = events.split(this.eventSplitter);

            while (event = events.shift()) {
                list = calls[event] || (calls[event] = []);
                list.push(callback, context);
            }

            return this;
        }

    }

    off(events, callback, context) {
        var event, calls, list, i;

        if (!(calls = this.callbacks)) {
            return this;
        }

        if (!(events || callback || context)) {
            delete this.callbacks;
            return this;
        }

        events = events ? events.split(this.eventSplitter) : Object.keys(calls);

        while (event = events.shift()) {
            if (!(list = calls[event]) || !(callback || context)) {
                delete calls[event];
                continue;
            }

            for (i = list.length - 2; i >= 0; i -= 2) {
                if (!(callback && list[i] !== callback || context && list[i + 1] !== context)) {
                    list.splice(i, 2);
                }
            }
        }

        return this;
    }

    trigger(events, ...params) {
        var event, calls, list, i, length, args, all, rest;
        if (!(calls = this.callbacks)) {
            return this;
        }

        rest = [];
        events = events.split(this.eventSplitter);
        for (var param of params) {
            rest.push(param);
        }

        while (event = events.shift()) {
            if (all = calls.all) {
                all = all.slice();
            }

            if (list = calls[event]) {
                list = list.slice();
            }

            if (list) {
                for (i = 0, length = list.length; i < length; i += 2) {
                    list[i].apply(list[i + 1] || this, rest);
                }
            }

            if (all) {
                args = [event].concat(rest);
                for (i = 0, length = all.length; i < length; i += 2) {
                    all[i].apply(all[i + 1] || this, args);
                }
            }
        }

        return this;

    }
    proxy(events) {
        var that = this;
        return (function (arg) {
            that.trigger(events, arg);
        });
    }
}

 class EventListen extends Events{
    
    
}
export var EventListener=new EventListen();