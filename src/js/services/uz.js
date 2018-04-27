import axios from 'Api/axios';


export const getStations = term => axios.post('station/', null, {
  params: {
    term,
  },
})
  .then(r => r.data);

export const getTrains = (route) => {
  const formData = new FormData();
  formData.append('from', route.from.id);
  formData.append('to', route.to.id);
  formData.append('date', route.date);
  formData.append('time', route.time);

  return axios.post('/', formData)
    .then(r => r.data.data.list);
};
