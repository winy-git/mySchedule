const schedule = require('node-schedule');
const nodemailer = require('nodemailer');

const email = {
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "123456789",
        pass: "abcdefghijk"
    }
};

const send = async(option) => {
    nodemailer.createTransport(email).sendMail(option, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log(info);
            return info.response;
        }
    });
};

let email_data = {
    from: 'winystar@naver.com',
    to: 'winystar@naver.com',
    subject: 'test e-mail',
    text: 'I Send test e-mail by using nodemailer library'
};

let scheduleObj = null;

const set = (s) => {
    var rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = s.dayOfWeek;
    rule.hour = s.hour;
    rule.minute = s.minute;

    var job = schedule.scheduleJob(rule, () => send(email_data));

    scheduleObj = job;
};

const cancel = () => {
    if (scheduleObj != null) {
        scheduleObj.cancel();
    }
};

const setSchedule = (s) => {
    cancel();
    set(s);
};

const scheduleData = {
    dayOfWeek: [4, 5],
    hour: 14,
    minute: 2
};

setSchedule(scheduleData);
