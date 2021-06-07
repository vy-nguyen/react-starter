/*
 * Written by Vy Nguyen
 */
import Reflux    from 'reflux';
import $         from 'jquery';

const completeFn = {
    children: ['completed']
},
completedFailedFn = {
    children: ['completed', 'failed']
};

class SessionClz {
    constructor() {
        this.csrfHead = '';
        this.csrfToken = '';
        this.authToken = null;
    }

    hasCsrf = () => {
        return this.csrfHead && this.csrfToken;
    }

    setCsrf = (head, token) => {
        this.csrfHead = head;
        this.csrfToken = token;
    }

    getAuthToken = () => {
        return this.authToken;
    }
}


var SessionData = new SessionClz();
const Action = Reflux.createActions({
    login:        completedFailedFn,
    logout:       completeFn
});

function postRest(formData, url, json, action, context, completeFn) {
    let data = json ? JSON.stringify(formData) : formData;
    restApiCall(url, 'POST', json, action, data, context, completeFn);
}

function restApiCall(url, type, json, action, data, context, doneFn) {
    let dataType = null, content = null;

    if (json) {
        dataType = 'json';
        content = 'application/json; charset=utf-8';
    }
    $.ajax({
        type: type,
        url : url,
        data: data,
        dataType   : dataType,
        contentType: content,

        beforeSend: xhdr => {
            let token = SessionData.getAuthToken();
            if (token != null) {
                xhdr.setRequestHeader('Authorization', token);
            }
            if (SessionData.hasCsrf()) {
                xhdr.setRequestHeader(SessionData.csrfHead, SessionData.csrfToken);
            }
        }
    }).done((resp, status, xhdr) => {
        if ($.type(resp) === "string") {
            try {
                resp = JSON.parse(resp);
            } catch(e) {
                console.log(e);
            }
        }
        action.completed(resp, context);
        if (doneFn) {
            doneFn();
        }
    }).fail((resp, text, error) => {
        if (action.failed != null) {
            action.failed(resp, text, error);
        }
    });
}

Action.login.listen(data => {
    postRest(data, '/login', true, this, null, null);
});

Action.logout.listen(data => {
    postRest(data, '/logout', true, this, null, null);
});

export { SessionData, Action };
export default Action;
