export const generateList = (dropdown, list) => {
  list.forEach((l) => {
    const item = document.createElement('div');
    item.className = 'dropdown-item';
    item.dataset.station = l.value;
    item.innerText = l.title;
    dropdown.append(item);
  });
};

export const generateRoutes = (trains) => {
  trains.forEach((train) => {
    const container = document.createElement('div');
    container.className = 'routes__train';

    const title = document.createElement('div');
    title.className = 'routes__train-title';

    const number = document.createElement('strong');
    number.className = 'routes__train-number';
    number.innerText = train.num;

    const name = document.createElement('div');
    name.className = 'routes__train-name';
    name.innerText = `${train.from.stationTrain} -> ${train.to.stationTrain}`;

    title.appendChild(number);
    title.appendChild(name);

    const types = document.createElement('div');
    types.className = 'routes__types';

    train.types.forEach((t) => {
      const type = document.createElement('div');
      const count = document.createElement('strong');
      type.className = 'routes__type';
      type.innerText = `${t.title}: `;
      count.innerText = t.places;
      type.appendChild(count);
      types.appendChild(type);
    });
    container.appendChild(title);
    container.appendChild(types);
    document.getElementById('routes').appendChild(container);
  });
};
