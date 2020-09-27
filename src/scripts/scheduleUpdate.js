import schedule from 'node-schedule';
import main from '..';

schedule.scheduleJob('0 0 9 * * *', async () => {
  main();
});
