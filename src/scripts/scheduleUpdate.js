import schedule from 'node-schedule';
import main from '..';

schedule.scheduleJob('0 0 7 * * *', async () => {
  main();
});
