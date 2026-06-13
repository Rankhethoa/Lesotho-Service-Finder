const socialData = {}; // Stores social platforms and usernames dynamically

    const addSocialBtn = document.getElementById('addSocialBtn');
    const socialList = document.getElementById('socialList');
    const platformSelect = document.getElementById('socialPlatform');
    const usernameInput = document.getElementById('socialUsername');
    const contactForm = document.getElementById('contactForm');

    // Display the list of added platforms
    function renderSocialList() {
        socialList.innerHTML = '';
        for (const [platform, username] of Object.entries(socialData)) {
            const li = document.createElement('li');
            li.innerHTML = `
                ${platform}: @${username}
                <button type="button" class="removeBtn" onclick="removePlatform('${platform}')">Remove</button>
            `;
            socialList.appendChild(li);
        }
    }

    // Handle form submission
    /* UNCOMMENT THIS
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = {
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            socialMedia: socialData
        };
        console.log('Form Data Submitted:', formData);
        alert('Form submitted! Check console for data.');
    });
*/

const API_URL = `http://localhost:5001/api/services`; // adjust if needed

async function loadServices() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    const services = Array.isArray(data) ? data : data.services || [];
    const container = document.getElementById("service-list");
    if (!container) {
      console.error("❌ Element with ID 'service-list' not found!");
      return;
    }
    if (services.length === 0) {
      container.innerHTML = `<p>No services available.</p>`;
      return;
    }
    container.innerHTML = services
      .map(
        (s) => `
        <div class="service-card">
          <h3>${s.name || "Unnamed Service"}</h3>
          <p>${s.category || "Unknown"} - ${s.location || "Unspecified"}</p>
          <p>${s.description || "No description provided."}</p>
          <p>📞 ${s.contact || "N/A"}</p>
        </div>
      `
      )
      .join("");
  } catch (error) {
    console.error("⚠️ Error loading services:", error);
    //document.getElementById("service-list").innerHTML = "<p>Failed to load services. Please try again later.</p>";
  }
}

document.addEventListener("DOMContentLoaded", loadServices);




//for myAccount
/*
document.getElementById("regAccount").addEventListener("click", () => {
  window.location.href = "registration.html"; //registration.html
});

document.getElementById("loginAccount").addEventListener("click", () => {
  window.location.href = "dashboard.html"; //provider-account.html
});
*/

