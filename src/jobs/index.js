const CronJob = require('cron').CronJob;
const debug = require('debug')('app:job');

const { ENABLE_CRON } = require('./../appConfig');

const runImmediately = false;

const { sendNotification } = require('./sendNotification.job');


const SCHEDULES = [
  {
    when: 'Every day at 0005.',
    CRON_TIME: '5 0 * * *',
    JOBS_TO_RUN: [{ func: sendNotification, params: {}, blocked: false }],
  },
  // {
  //   when: 'Every Minute.',
  //   CRON_TIME: '* * * * *',
  //   JOBS_TO_RUN: [{ func: sendNotification, params: {}, blocked: false }],
  // },
];

module.exports.schedule = async () => {
  // enable cron jobs only if set true in env file.
  if (ENABLE_CRON) {
    debug('CRON Jobs enabled.');

    // loop over each individual schedule.
    for (const schedule of SCHEDULES) {
      // set new cron job for each schedule.
      new CronJob(
        schedule.CRON_TIME,
        async () => {
          // loop over each jobs that needs to be run at scheduled time.
          for (const job of schedule.JOBS_TO_RUN) {
            const { func, params = {}, blocked = false } = job;

            // execute the job.
            try {
              // execute function only if not blocked.
              if (!blocked) {
                await func(params);
              }
            } catch (e) {
              debug(e);
            }
          } // end of loop over schedule.JOBS_TO_RUN
        },
        null,
        true, // "start" - if set to false, then need to execute job.start()- refer to https://www.npmjs.com/package/cron#api
        null,
        null,
        false, // run cron jobs immediately.
      );

      if (runImmediately) {
        for (const job of schedule.JOBS_TO_RUN) {
          const { func, params = {}, blocked = false } = job;

          try {
            if (!blocked) {
              await func(params);
            }
          } catch (e) {
            debug(e);
          }
        }
      }
    }
  } else {
    // log a message if cron job are disabled.
    debug('Not running cron jobs. To enable, set ENABLE_CRON to true in config.');
  }
};

