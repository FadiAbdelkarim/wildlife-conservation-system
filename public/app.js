
const SUPABASE_URL = 'https://wkmcoijcpvtlhxegylgf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrbWNvaWpjcHZ0bGh4ZWd5bGdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwOTg3OTAsImV4cCI6MjA5MzY3NDc5MH0.x1RTDvZk1fWkO_emqFLncJECAT6XA57yYtH347cQfH0';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

function toInt(value) {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? null : parsed;
}

function requireValue(value, message) {
  if (!value || String(value).trim() === '') {
    alert(message);
    return false;
  }
  return true;
}

function clearFields(ids) {
  ids.forEach((id) => {
    const element = document.getElementById(id);
    if (element) element.value = '';
  });
}



async function loadAnimals() {
  const table = document.getElementById('animalTable');
  if (!table) return;

  const { data, error } = await supabaseClient
    .from('Animals')
    .select('*')
    .order('animal_id', { ascending: true });

  if (error) {
    alert(error.message);
    return;
  }

  table.innerHTML = '';
  data.forEach((animal) => {
    table.innerHTML += `
      <tr>
        <td>${animal.animal_id ?? ''}</td>
        <td>${animal.species ?? ''}</td>
        <td>${animal.status ?? ''}</td>
        <td>${animal.population_estimate ?? ''}</td>
      </tr>
    `;
  });
}

async function addAnimal() {
  const species = document.getElementById('species').value.trim();
  const status = document.getElementById('status').value.trim();
  const population = toInt(document.getElementById('population').value);

  if (!requireValue(species, 'Species is required')) return;
  if (!requireValue(status, 'Status is required')) return;
  if (population === null) return alert('Population must be a valid number');

  const { error } = await supabaseClient
    .from('Animals')
    .insert([{ species, status, population_estimate: population }]);

  if (error) return alert(error.message);

  alert('Animal added successfully');
  clearFields(['species', 'status', 'population']);
  await loadAnimals();
}

async function deleteAnimal() {
  const id = toInt(document.getElementById('deleteId').value);
  if (id === null) return alert('Animal ID is required');

  const { error } = await supabaseClient
    .from('Animals')
    .delete()
    .eq('animal_id', id);

  if (error) return alert(error.message);

  alert('Animal deleted successfully');
  clearFields(['deleteId']);
  await loadAnimals();
}

async function updateAnimal() {
  const animal_id = toInt(document.getElementById('updateAnimalId').value);
  const species = document.getElementById('updateSpecies').value.trim();
  const status = document.getElementById('updateStatus').value.trim();
  const population = toInt(document.getElementById('updatePopulation').value);

  if (animal_id === null) return alert('Animal ID is required');

  const updates = {};
  if (species) updates.species = species;
  if (status) updates.status = status;
  if (population !== null) updates.population_estimate = population;

  if (Object.keys(updates).length === 0) {
    return alert('Enter at least one field to update');
  }

  const { error } = await supabaseClient
    .from('Animals')
    .update(updates)
    .eq('animal_id', animal_id);

  if (error) return alert(error.message);

  alert('Animal updated successfully');
  clearFields(['updateAnimalId', 'updateSpecies', 'updateStatus', 'updatePopulation']);
  await loadAnimals();
}



async function loadRangers() {
  const table = document.getElementById('rangerTable');
  if (!table) return;

  const { data, error } = await supabaseClient
    .from('Rangers')
    .select('*')
    .order('ranger_id', { ascending: true });

  if (error) {
    alert(error.message);
    return;
  }

  table.innerHTML = '';
  data.forEach((ranger) => {
    table.innerHTML += `
      <tr>
        <td>${ranger.ranger_id ?? ''}</td>
        <td>${ranger.ranger_name ?? ranger.name ?? ''}</td>
        <td>${ranger.area_id ?? ranger.assigned_area ?? ''}</td>
      </tr>
    `;
  });
}

async function addRanger() {
  const rangerId = toInt(document.getElementById('rangerId').value);
  const rangerName = document.getElementById('rangerName').value.trim();
  const rangerArea = toInt(document.getElementById('rangerArea').value);

  if (rangerId === null) return alert('Ranger ID is required');
  if (!requireValue(rangerName, 'Ranger name is required')) return;
  if (rangerArea === null) return alert('Area ID is required');

  const { error } = await supabaseClient
    .from('Rangers')
    .insert([{
      ranger_id: rangerId,
      ranger_name: rangerName,
      area_id: rangerArea
    }]);

  if (error) return alert(error.message);

  alert('Ranger added successfully');
  clearFields(['rangerId', 'rangerName', 'rangerArea']);
  await loadRangers();
}

async function deleteRanger() {
  const rangerId = toInt(document.getElementById('deleteRangerId').value);
  if (rangerId === null) return alert('Ranger ID is required');

  const { error } = await supabaseClient
    .from('Ranges')
    .delete()
    .eq('ranger_id', rangerId);

  if (error) return alert(error.message);

  alert('Ranger deleted successfully');
  clearFields(['deleteRangerId']);
  await loadRangers();
}


async function loadAreas() {
  const table = document.getElementById('areaTable');
  if (!table) return;

  const { data, error } = await supabaseClient
    .from('ProtectedAreas')
    .select('*')
    .order('area_id', { ascending: true });

  if (error) {
    alert(error.message);
    return;
  }

  table.innerHTML = '';
  data.forEach((area) => {
    table.innerHTML += `
      <tr>
        <td>${area.area_id ?? ''}</td>
        <td>${area.area_name ?? area.name ?? ''}</td>
        <td>${area.location ?? ''}</td>
        <td>${area.size ?? area.size_sq_km ?? ''}</td>
      </tr>
    `;
  });
}

async function addArea() {
  const areaId = toInt(document.getElementById('areaId').value);
  const areaName = document.getElementById('areaName').value.trim();
  const location = document.getElementById('location').value.trim();
  const size = toInt(document.getElementById('size').value);

  if (areaId === null) return alert('Area ID is required');
  if (!requireValue(areaName, 'Area name is required')) return;
  if (!requireValue(location, 'Location is required')) return;
  if (size === null) return alert('Size must be a valid number');

  const { error } = await supabaseClient
    .from('ProtectedAreas')
    .insert([{
      area_id: areaId,
      area_name: areaName,
      location,
      size
    }]);

  if (error) return alert(error.message);

  alert('Area added successfully');
  clearFields(['areaId', 'areaName', 'location', 'size']);
  await loadAreas();
}

async function deleteArea() {
  const areaId = toInt(document.getElementById('deleteAreaId').value);
  if (areaId === null) return alert('Area ID is required');

  const { error } = await supabaseClient
    .from('ProtectedAreas')
    .delete()
    .eq('area_id', areaId);

  if (error) return alert(error.message);

  alert('Area deleted successfully');
  clearFields(['deleteAreaId']);
  await loadAreas();
}



async function loadSightings() {
  const table = document.getElementById('sightingTable');
  if (!table) return;

  const { data, error } = await supabaseClient
    .from('Sightings')
    .select('*')
    .order('sighting_id', { ascending: true });

  if (error) {
    alert(error.message);
    return;
  }

  table.innerHTML = '';
  data.forEach((sighting) => {
    table.innerHTML += `
      <tr>
        <td>${sighting.sighting_id ?? ''}</td>
        <td>${sighting.animal_id ?? ''}</td>
        <td>${sighting.ranger_id ?? ''}</td>
        <td>${sighting.area_id ?? ''}</td>
        <td>${sighting.sighting_date ?? sighting.date ?? ''}</td>
        <td>${sighting.animal_count ?? ''}</td>
      </tr>
    `;
  });
}

async function addSighting() {
  const sightingId = toInt(document.getElementById('sightingId').value);
  const animalId = toInt(document.getElementById('animalId').value);
  const rangerId = toInt(document.getElementById('sightingRangerId').value);
  const areaId = toInt(document.getElementById('sightingAreaId').value);
  const date = document.getElementById('date').value;
  const animalCount = toInt(document.getElementById('animalCount').value);

  if (sightingId === null) return alert('Sighting ID is required');
  if (animalId === null) return alert('Animal ID is required');
  if (rangerId === null) return alert('Ranger ID is required');
  if (areaId === null) return alert('Area ID is required');
  if (!requireValue(date, 'Date is required')) return;
  if (animalCount === null) return alert('Animal Count must be a number');

  const { error } = await supabaseClient
    .from('Sightings')
    .insert([{
      sighting_id: sightingId,
      animal_id: animalId,
      ranger_id: rangerId,
      area_id: areaId,
      sighting_date: date,
      animal_count: animalCount
    }]);

  if (error) return alert(error.message);

  alert('Sighting added successfully');
  clearFields(['sightingId', 'animalId', 'sightingRangerId', 'sightingAreaId', 'date', 'animalCount']);
  await loadSightings();
}

async function deleteSighting() {
  const sightingId = toInt(document.getElementById('deleteSightingId').value);
  if (sightingId === null) return alert('Sighting ID is required');

  const { error } = await supabaseClient
    .from('Sightings')
    .delete()
    .eq('sighting_id', sightingId);

  if (error) return alert(error.message);

  alert('Sighting deleted successfully');
  clearFields(['deleteSightingId']);
  await loadSightings();
}

async function updateSighting() {
  const sightingId = toInt(document.getElementById('updateSightingId').value);
  const animalCount = toInt(document.getElementById('updateAnimalCount').value);

  if (sightingId === null) return alert('Sighting ID is required');
  if (animalCount === null) return alert('New Animal Count must be a number');

  const { error } = await supabaseClient
    .from('Sightings')
    .update({ animal_count: animalCount })
    .eq('sighting_id', sightingId);

  if (error) return alert(error.message);

  alert('Sighting updated successfully');
  clearFields(['updateSightingId', 'updateAnimalCount']);
  await loadSightings();
}
