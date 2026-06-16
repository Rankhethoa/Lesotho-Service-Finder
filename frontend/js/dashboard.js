/*
let originalData = {};
  let serviceId = null;
  const token = localStorage.getItem('token');

  // Redirect if not logged in
  if (!token) window.location.href = 'my account.html';

async function loadService() {
    try {
        console.log('Token:', token);
      const res = await fetch('/api/services/mine', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      console.log('Response status:', res.status);

      const data = await res.json();
      console.log('Data received:', data);

      document.getElementById('loading').style.display = 'none';
  
      if (!res.ok || data.length === 0) {
        document.getElementById('no-service').style.display = 'block';
        return;
      }
  
      const service = data[0];
      serviceId = service._id;
      originalData = service;
  
      document.getElementById('serviceName').value = service.name             || '';
      document.getElementById('description').value = service.description      || '';
      document.getElementById('category').value    = service.category?.[0]   || '';
      document.getElementById('district').value    = service.location?.district || '';
      document.getElementById('area').value        = service.location?.area   || '';
  
      document.getElementById('service-form').style.display = 'block';
  
    } catch (err) {
      console.error(err);
      document.getElementById('loading').textContent = 'Failed to load service info.';
    }
  }
  
  async function saveService() {
    const btn = document.getElementById('saveBtn');
    const msg = document.getElementById('statusMsg');
  
    btn.disabled = true;
    btn.textContent = 'Saving...';
    msg.className = 'status-msg';
  
    const updated = {
      name:        document.getElementById('serviceName').value,
      description: document.getElementById('description').value,
      category:    [document.getElementById('category').value], // ✅ array
      location: {
        district:  document.getElementById('district').value,  // ✅ separate field
        area:      document.getElementById('area').value
      }
    };
  
    try {
      const res = await fetch(`/api/services/${serviceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updated)
      });
  
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save');
  
      originalData = { ...originalData, ...updated };
      msg.textContent = '✅ Changes saved successfully!';
      msg.className = 'status-msg success';
  
    } catch (err) {
      msg.textContent = `❌ ${err.message}`;
      msg.className = 'status-msg error';
    }
  
    btn.disabled = false;
    btn.textContent = 'Save Changes';
  }
  
  function cancelEdit() {
    document.getElementById('serviceName').value = originalData.name              || '';
    document.getElementById('description').value = originalData.description       || '';
    document.getElementById('category').value    = originalData.category?.[0]    || '';
    document.getElementById('district').value    = originalData.location?.district || '';
    document.getElementById('area').value        = originalData.location?.area    || '';
  
    document.getElementById('statusMsg').className = 'status-msg';
  }
    */