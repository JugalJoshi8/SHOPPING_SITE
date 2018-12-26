export const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const addEvents = (elements, parent) => {
    let event = null;
    for(let element in elements) {
        event = elements[element];
        // if only 1 event is there for 1 selector
        if(event.name) {
            parent.querySelector(element).addEventListener(event.name, event.handler);

        }
        // if multiple events are there for 1 selector
        else {
            for(let eventName in event) {
                parent.querySelector(element).addEventListener(eventName, eventName.handler);
            }
        }
    }
}