import { getTrains } from 'Services/uz';
import { GET_TRAINS, POLL_INTERVAL } from '../constants';


const pollTrains = async (route) => {
  try {
    const trains = await getTrains(route);
    const places = trains.find(t => t.num === '131О').types.find(type => type.id === 'П').places;
    console.log('[Places]:', places);
    if (places < 11) {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'img/icon16.png',
        title: 'Ticket notification',
        message: `Only ${places} places left`,
        requireInteraction: true,
      });
    }
  } catch (e) {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'img/icon16.png',
      title: 'Ticket notification',
      message: `Error happened: ${e.message}`,
    });
  }
  setTimeout(() => pollTrains(route), POLL_INTERVAL + (Math.random() * 100));
};

chrome.runtime.onMessage.addListener(
  ({ type, route }) => {
    if (type === GET_TRAINS) {
      pollTrains(route);
    }
    return true;
  },
);
