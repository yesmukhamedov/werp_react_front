export const NOTIFY = 'NOTIFY';



export function notify(a_notify_type, a_notify_text, a_notify_header) {
    const obj = {
        type: NOTIFY,
        notifyType: a_notify_type,
        notifyText: a_notify_text,
        notifyHeader: a_notify_header
    };
    return obj;
}