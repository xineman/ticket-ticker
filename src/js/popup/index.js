import $ from 'jquery';
import { getStations, getTrains } from 'Services/uz';
import { generateList, generateRoutes } from 'Helpers';
// import * as storage from 'Services/storage';

function Route() {
  this.from = {
    name: null,
    id: null,
  };
  this.to = {
    name: null,
    id: null,
  };
  this.date = '2018-05-11';
  this.time = '00:00';
}

const route = new Route();

let stations = [];

$('#inputSummary').hide();

const dropdowns = $('.dropdown');

dropdowns.on('click', '.dropdown-item', function handleClick({ target }) {
  const dropdown = $(this).closest('.dropdown');
  const stationType = dropdown.get(0).id;
  const station = stations.find(s => s.value === Number(target.dataset.station));
  route[stationType] = {
    name: station.title,
    id: station.value,
  };
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
  summary.find('.route').text(`${route.from.name} -> ${route.to.name}`);
  summary.find('.date').text(route.date);
  summary.show();
  $('#input').hide();

  const formData = new FormData();
  formData.append('from', route.from.id);
  formData.append('to', route.to.id);
  formData.append('date', route.date);
  formData.append('time', route.time);

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
