import moment from 'moment';

export default {
    dayId         : moment().format('Y') + '' + moment().format('MM') + '' + moment().format('DD'),
    weekId        : moment().format('Y') + '' + moment().format('WW'),
    date          : moment().format('YYYY-MM-DD'),
    weekday       : parseInt(moment().format('E')),
    week          : parseInt(moment().format('WW')),
    year          : parseInt(moment().format('Y')),
    completedTasks: 0,
    power         : 0,
    zone          : 0,
    tasks         : {
        // Body
        body    : {
            fitness: false,
            fuel   : false
        },
        // Being
        being   : {
            meditation: false,
            memoirs   : false
        },
        // Balance
        balance : {
            partner  : false,
            posterity: false
        },
        // Business
        business: {
            discover: false,
            declare : false
        }
    }
};
