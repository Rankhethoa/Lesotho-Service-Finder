let serviceData = {
  name: "",
  category: "",
  location: {
      district: "",
      area: ""        
  },
  contact: { phone: "" },
  socialMedia: [],
  description: "",
  priceRange: ""
};

const token = localStorage.getItem('token');

// Step navigation
const steps = document.querySelectorAll('.modal-body');
const nextButtons = document.querySelectorAll('.nxtBtn');
const backButtons = document.querySelectorAll('.backBtn');
const indicators = document.querySelectorAll('.modal-header span');
let currentStep = 0;

function showStep(index) {
  steps.forEach((step, i) => {
      step.style.display = i === index ? 'block' : 'none';
      step.classList.toggle('is-showing', i === index);
  });
  indicators.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === index);
  });
}

nextButtons.forEach(btn => {
  btn.addEventListener('click', e => {
      const form = btn.closest('form');
      if (form && !form.checkValidity()) {
          form.reportValidity();
          return;
      }
      if (currentStep < steps.length - 1) {
          currentStep++;
          showStep(currentStep);
      }
  });
});

backButtons.forEach(btn => {
  btn.addEventListener('click', () => {
      if (currentStep > 0) {
          currentStep--;
          showStep(currentStep);
      }
  });
});

indicators.forEach((dot, index) => {
  dot.classList.toggle('is-active', index === currentStep);
});

showStep(currentStep);

// Run on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedPhone = localStorage.getItem('pendingPhone');
  if (savedPhone) {
      document.getElementById('phone').value = savedPhone;
  }
});

// Price slider
let sliderOne = document.getElementById("slider-1");
let sliderTwo = document.getElementById("slider-2");
let displayValOne = document.getElementById("range1");
let displayValTwo = document.getElementById("range2");
let priceText = document.getElementById("priceText");
let sliderTrack = document.querySelector(".slider-track");
let minGap = 50;
let sliderMaxValue = 10000;

function slideOne() {
  if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
      sliderOne.value = parseInt(sliderTwo.value) - minGap;
  }
  displayValOne.textContent = "M" + sliderOne.value;
  updateTrack();
  updatePriceText();
}

function slideTwo() {
  if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
      sliderTwo.value = parseInt(sliderOne.value) + minGap;
  }
  displayValTwo.textContent = "M" + sliderTwo.value;
  updateTrack();
  updatePriceText();
}

function updateTrack() {
  let percent1 = (sliderOne.value / sliderMaxValue) * 100;
  let percent2 = (sliderTwo.value / sliderMaxValue) * 100;
  sliderTrack.style.background = `linear-gradient(to right, #d5d5d5 ${percent1}%, #007bff ${percent1}%, #007bff ${percent2}%, #d5d5d5 ${percent2}%)`;
}

function updatePriceText() {
  priceText.textContent = `M${sliderOne.value} - M${sliderTwo.value}`;
}

sliderOne.addEventListener("input", slideOne);
sliderTwo.addEventListener("input", slideTwo);
updateTrack();
updatePriceText();

// Collect step data
document.querySelector("#step1 .nxtBtn").addEventListener("click", () => {
  serviceData.name = document.getElementById("serviceName").value.trim();
});

document.querySelector("#step2 .nxtBtn").addEventListener("click", () => {
  serviceData.category = document.getElementById("categorySelect").value;
  serviceData.location.district = document.getElementById("districtSelect").value; // ← nested
  serviceData.location.area = document.getElementById("areaSelect").value;          // ← add area
});


document.querySelector("#step3 .nxtBtn").addEventListener("click", () => {
  serviceData.contact.phone = document.getElementById("phone").value;
});

document.querySelector("#step4 .nxtBtn").addEventListener("click", () => {
  serviceData.description = document.getElementById("descriptionInput").value.trim();
});

// Social media
document.getElementById("addSocialBtn").addEventListener("click", () => {
  let platform = document.getElementById("socialPlatform").value;
  let url = document.getElementById("socialUsername").value.trim();
  if (!platform || !url) return;

  serviceData.socialMedia.push({ platform, url }); // ← save to serviceData

  const li = document.createElement("li");
  li.textContent = `${platform}: ${url}`;
  li.dataset.platform = platform;
  li.dataset.url = url;
  document.getElementById("socialList").appendChild(li);

  document.getElementById("socialUsername").value = "";
  document.getElementById("socialPlatform").value = "";
});

// Final submit
async function submitRegistration() {
  try {
      serviceData.priceRange = `M${sliderOne.value} - M${sliderTwo.value}`;

      const registrationData = {
        name: serviceData.name,
        category: serviceData.category,
        location: serviceData.location,
        contact: { phone: serviceData.contact.phone },
        socialMedia: serviceData.socialMedia, // ✅ top level
        description: serviceData.description,
        priceRange: serviceData.priceRange,
      };

      console.log('Submitting:', registrationData);
      localStorage.removeItem('pendingPhone');

    const response = await fetch("/api/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(registrationData)
    });

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      throw new Error(`Server returned: ${text}`);
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Registration failed');
    }

    const result = await response.json();
    console.log('Registration successful:', result);
  
    alert('Service registered successfully! Redirecting...');
    setTimeout(() => { window.location.href = 'index.html'; }, 1000);

  } catch (error) {
    console.error('Error submitting registration:', error);
    alert(`Registration failed: ${error.message}`);
  }
}

      

document.getElementById("step5Form").addEventListener("submit", async function(e) {
  e.preventDefault();

  const registerBtn = document.getElementById('regBtn');
  registerBtn.textContent = 'Registering...';
  registerBtn.style.opacity = '0.6';
  registerBtn.style.pointerEvents = 'none';

  try {
      await submitRegistration();
  } catch (error) {
      registerBtn.textContent = 'Register';
      registerBtn.style.opacity = '1';
      registerBtn.style.pointerEvents = 'auto';
  }
});