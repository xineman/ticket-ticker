import $ from 'jquery';
import { getStations, getTrains } from 'Services/uz';
import { generateList, generateRoutes } from 'Helpers';
// import * as storage from 'Services/storage';


let stations = [];
const inputs = {
  time: '00:00',
  date: '2018-05-11',
};
const selectedStations = {
  from: '',
  to: '',
};

const dropdowns = $('.dropdown');
$('#inputSummary').hide();

dropdowns.on('click', '.dropdown-item', function handleClick({ target }) {
  const dropdown = $(this).closest('.dropdown');
  const station = stations.find(s => s.value === Number(target.dataset.station));
  inputs[dropdown.get(0).id] = station.value;
  selectedStations[dropdown.get(0).id] = station.title;
  dropdown.find('.dropdown-title').val(station.title);
  dropdown.removeClass('shown');
});

dropdowns.on('keyup', async function handleChange({ target }) {
  try {
    dropdowns.removeClass('shown');
    stations = await getStations(target.value);
    const dropdown = $(this).find('.dropdown-list');
    dropdown.empty();
    if (!stations.length) {
      return;
    }
    generateList(dropdown, stations);
    $(this).addClass('shown');
  } catch (e) {
    console.log('Error:', e);
  }
});

async function handleStart() {
  const summary = $('#inputSummary');
  summary.find('.route').text(`${selectedStations.from} -> ${selectedStations.to}`);
  summary.find('.date').text(inputs.date);
  $('#input').hide();
  summary.show();
  const formData = new FormData();
  Object.keys(inputs).forEach(k => formData.append(k, inputs[k]));
  const trains = await getTrains(formData);
  generateRoutes(trains);
  $('#routes').show();
}

function handleEdit() {
  $('#inputSummary').hide();
  $('#routes').empty().hide();
  $('#input').show();
}


$('body').click(({ target }) => {
  switch (target.id) {
    case 'start': {
      handleStart();
      break;
    }
    case 'edit': {
      handleEdit();
      break;
    }
    default: {
      break;
    }
  }
});
