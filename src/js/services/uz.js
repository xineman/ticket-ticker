import axios from 'Api/axios';


export const getStations = term => axios.post('station/', null, {
  params: {
    term,
  },
})
  .then(r => r.data);

export const getTrains = data => axios.post('/', data)
  .then(r => r.data.data.list);
