// ---- Visitor Tracking ----
const SESSION_KEY = 'visitorSessionId';

// Generate or reuse session ID
function getSessionId() {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = 'v_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

const sessionId = getSessionId();
const startTime = Date.now();
let tracked = false;

// Send visit after 15 seconds
const trackingTimer = setTimeout(async () => {
  try {
    await fetch('http://localhost:5001/api/visitors/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, timeSpent: 15 })
    });
    tracked = true;
  } catch (err) {
    console.error('Tracking error:', err);
  }
}, 15000);

// Also track when user leaves
window.addEventListener('beforeunload', () => {
  const timeSpent = Math.floor((Date.now() - startTime) / 1000);
  if (!tracked && timeSpent > 0) {
    navigator.sendBeacon(
      'http://localhost:5001/api/visitors/track',
      JSON.stringify({ sessionId, timeSpent })
    );
  }
});

// ---- Statistics Counter ----
async function loadStats() {
  try {
    const res = await fetch('http://localhost:5001/api/stats');
    const { serviceCount, visitorCount } = await res.json();

    animateCount('serviceCount', serviceCount);
    animateCount('visitorCount', visitorCount);
  } catch (err) {
    console.error('Failed to load stats:', err);
  }
}

function animateCount(elementId, target) {
  const el = document.getElementById(elementId);
  if (!el) return;

  let current = 0;
  const duration = 1500; // ms
  const steps = 60;
  const increment = target / steps;
  const interval = duration / steps;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString();
  }, interval);
}

// Load stats on page load
loadStats();

// complaint modal
function openComplaintModal(e) {
    e.preventDefault();
    document.getElementById("complaintModal").style.display = "flex";
    // clear previous state
    document.getElementById("complaintSuccess").style.display = "none";
    document.getElementById("complaintError").style.display = "none";
}

function closeComplaintModal() {
    document.getElementById("complaintModal").style.display = "none";
    // clear fields
    ["complaint_name", "complaint_email", "complaint_phone", 
     "complaint_message"].forEach(id => document.getElementById(id).value = "");
    document.getElementById("complaint_subject").value = "";
}

function submitComplaint() {
    const name    = document.getElementById("complaint_name").value.trim();
    const email   = document.getElementById("complaint_email").value.trim();
    const phone   = document.getElementById("complaint_phone").value.trim();
    const subject = document.getElementById("complaint_subject").value;
    const message = document.getElementById("complaint_message").value.trim();

    if (!name || !email || !subject || !message) {
        alert("Please fill in all required fields.");
        return;
    }

    const btn = document.getElementById("complaintSubmitBtn");
    btn.textContent = "Sending...";
    btn.disabled = true;

    fetch("http://localhost:5001/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, subject, message })
    })
    .then(res => res.json())
    .then(() => {
        document.getElementById("complaintSuccess").style.display = "block";
        btn.textContent = "Send Message";
        btn.disabled = false;
        setTimeout(closeComplaintModal, 3000);
    })
    .catch(() => {
        document.getElementById("complaintError").style.display = "block";
        btn.textContent = "Send Message";
        btn.disabled = false;
    });
}

// Close modal when clicking backdrop
document.getElementById("complaintModal").addEventListener("click", function(e) {
    if (e.target === this) closeComplaintModal();
});

// Rating modal
    let selectedRating = 0;

    function openRatingModal() {
        // Get the selected service from the Vue app
        const vueApp = document.querySelector('#app').__vue_app__;
        const appData = vueApp.config.globalProperties;  

        // Reset state
        selectedRating = 0;
        updateStars(0);
        document.getElementById('ratingLabel').textContent = 'Hover over a star to select';
        document.getElementById('ratingSuccess').style.display = 'none';
        document.getElementById('ratingAlready').style.display = 'none';
        document.getElementById('ratingError').style.display = 'none';
        document.getElementById('ratingStarSection').style.display = 'block';

        const ratingSubmitBtn = document.getElementById('ratingSubmitBtn');
        ratingSubmitBtn.style.opacity = '0.4';
        ratingSubmitBtn.style.cursor = 'not-allowed';

        // Get service name from Vue
        const service = getVueService();
        document.getElementById('ratingServiceName').textContent = service ? service.name : '';

        // Check if already rated
        const ratedServices = JSON.parse(localStorage.getItem('ratedServices') || '{}');
        if (service && ratedServices[service._id]) {
            document.getElementById('ratingAlready').style.display = 'block';
            document.getElementById('ratingStarSection').style.display = 'none';
        }

        // Show modal
        const modal = document.getElementById('ratingModal');
        modal.style.display = 'flex';
    }

    function closeRatingModal() {
        document.getElementById('ratingModal').style.display = 'none';
        selectedRating = 0;
        updateStars(0);
    }

    // Close on backdrop click (mirrors complaint modal behaviour)
    document.getElementById('ratingModal').addEventListener('click', function(e) {
        if (e.target === this) closeRatingModal();
    });

    // Star interactions
    const stars = document.querySelectorAll('#ratingStars .fa');

    stars.forEach(star => {
        star.addEventListener('mouseover', function() {
            updateStars(parseInt(this.dataset.star));
            document.getElementById('ratingLabel').textContent = this.dataset.star + ' / 5';
        });
        star.addEventListener('mouseleave', function() {
            updateStars(selectedRating);
            document.getElementById('ratingLabel').textContent = selectedRating
                ? selectedRating + ' / 5 selected'
                : 'Hover over a star to select';
        });
        star.addEventListener('click', function() {
            selectedRating = parseInt(this.dataset.star);
            updateStars(selectedRating);
            document.getElementById('ratingLabel').textContent = selectedRating + ' / 5 selected';

            // Enable submit button
            const btn = document.getElementById('ratingSubmitBtn');
            btn.style.opacity = '1';
            btn.style.cursor = 'pointer';
        });
    });

    function updateStars(count) {
        stars.forEach(star => {
            const val = parseInt(star.dataset.star);
            star.className = val <= count ? 'fa fa-star' : 'fa fa-star-o';
        });
    }

    function getVueService() {
        // Access the mounted Vue instance's selectedService
        const vueInstance = document.querySelector('#app').__vue_app__
            .config.globalProperties.$root;  
        // Walk component tree to find the root instance data
        return window._vueAppInstance ? window._vueAppInstance.selectedService : null;
    }

    async function submitRating() {
        if (!selectedRating) return;

        const service = window._vueAppInstance ? window._vueAppInstance.selectedService : null;
        if (!service) return;

        const serviceId = service._id;
        const ratedServices = JSON.parse(localStorage.getItem('ratedServices') || '{}');

        if (ratedServices[serviceId]) {
            document.getElementById('ratingAlready').style.display = 'block';
            document.getElementById('ratingStarSection').style.display = 'none';
            return;
        }

        const submitBtn = document.getElementById('ratingSubmitBtn');
        submitBtn.textContent = 'Submitting...';
        submitBtn.style.opacity = '0.6';

        try {
            const res = await fetch(`http://localhost:5001/api/services/${serviceId}/rate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rating: selectedRating })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error);

            // Update the Vue app's selectedService.rating directly
            if (window._vueAppInstance) {
                window._vueAppInstance.selectedService.rating = data.rating;
            }

            // Save to localStorage
            ratedServices[serviceId] = selectedRating;
            localStorage.setItem('ratedServices', JSON.stringify(ratedServices));

            // Show success, hide stars
            document.getElementById('ratingSuccess').style.display = 'block';
            document.getElementById('ratingStarSection').style.display = 'none';

            // Auto-close after 1.5s (same feel as complaint modal success)
            setTimeout(closeRatingModal, 1500);

        } catch (err) {
            console.error('Rating error:', err);
            document.getElementById('ratingError').style.display = 'block';
            submitBtn.textContent = 'Submit';
            submitBtn.style.opacity = selectedRating ? '1' : '0.4';
        }
    }

(function() {
    'use strict';

    /**
     * Initialize counter animation when page loads
     */
    function initCounterAnimation() {
        // Wait for jQuery to be available
        if (typeof jQuery === 'undefined') {
            console.warn('jQuery not loaded, counter animation skipped');
            return;
        }

        jQuery('.count').each(function() {
            const $this = jQuery(this);
            const targetValue = parseInt($this.text()) || 0;

            // Animate the counter
            jQuery({ Counter: 0 }).animate(
                { Counter: targetValue },
                {
                    duration: 4000,
                    easing: 'swing',
                    step: function(now) {
                        $this.text(Math.ceil(now));
                    },
                    complete: function() {
                        $this.text(targetValue);
                    }
                }
            );
        });
    }

    /**
     * Load statistics from API and animate
     */
    async function loadAndAnimateCounts() {
        try {
            const apiUrl = 'http://localhost:5001/api/services';

            // Fetch service provider count
            const servicesRes = await fetch(`${apiUrl}/count`);
            if (servicesRes.ok) {
                const servicesData = await servicesRes.json();
                const serviceCountEl = document.getElementById("serviceCount");
                if (serviceCountEl) {
                    serviceCountEl.textContent = servicesData.count;
                    animateSingleCounter(serviceCountEl, servicesData.count);
                }
            }

            // Fetch visitor count
            const visitorsRes = await fetch("http://localhost:5001/api/visitors");
            if (visitorsRes.ok) {
                const visitorsData = await visitorsRes.json();
                const visitorCountEl = document.getElementById("visitorCount");
                if (visitorCountEl) {
                    visitorCountEl.textContent = visitorsData.count;
                    animateSingleCounter(visitorCountEl, visitorsData.count);
                }
            }
        } catch (err) {
            console.error("Error loading counts:", err);
        }
    }

    /**
     * Animate a single counter element
     */
    function animateSingleCounter(element, targetValue) {
        if (typeof jQuery === 'undefined') {
            return;
        }

        const $element = jQuery(element);
        jQuery({ Counter: 0 }).animate(
            { Counter: targetValue },
            {
                duration: 3000,
                easing: 'swing',
                step: function(now) {
                    $element.text(Math.ceil(now));
                }
            }
        );
    }

    /**
     * Initialize on page load
     */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(loadAndAnimateCounts, 500);
        });
    } else {
        setTimeout(loadAndAnimateCounts, 500);
    }

})();