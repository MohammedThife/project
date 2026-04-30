/* =========================================
   appointment.js
   Handles the Book Appointment form:
   - Client-side validation
   - Sends form data to mohammedtaif@gmail.com
     via FormSubmit (https://formsubmit.co/)
   - Shows success / error messages
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
  initAppointmentForm();
  setMinDate();
});

/* ─────────────────────────────────────────
   SET MINIMUM DATE TO TODAY
───────────────────────────────────────── */
function setMinDate() {
  const dateInput = document.getElementById('appt-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }
}

/* ─────────────────────────────────────────
   FORM INITIALIZATION
───────────────────────────────────────── */
function initAppointmentForm() {
  const form      = document.getElementById('appointment-form');
  const successEl = document.getElementById('form-success');
  const errorEl   = document.getElementById('form-error');
  const submitBtn = document.getElementById('submit-btn');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Reset messages
    hideAlert(successEl);
    hideAlert(errorEl);

    // Validate
    if (!validateForm(form)) return;

    // Show loading state
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '⏳ Sending...';
    submitBtn.disabled  = true;

    // Collect form data
    const data = new FormData(form);

    try {
      // FormSubmit.co — free email service for static sites.
      // Replace mohammedtaif@gmail.com with the doctor's email when ready.
      const response = await fetch('https://formsubmit.co/ajax/mohammedtaif@gmail.com', {
        method : 'POST',
        body   : data,
        headers: { Accept: 'application/json' }
      });

      if (response.ok) {
        showAlert(successEl, '✅ Your appointment request has been sent! We will contact you shortly to confirm.');
        form.reset();
        setMinDate(); // re-apply min date after reset
      } else {
        throw new Error('Server responded with an error.');
      }
    } catch (err) {
      console.error('Appointment form error:', err);
      showAlert(errorEl, '❌ Something went wrong. Please try calling us directly at +91 90000 00000.');
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled  = false;
    }
  });

  // Live validation feedback on blur
  form.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => clearFieldError(input));
  });
}

/* ─────────────────────────────────────────
   VALIDATION HELPERS
───────────────────────────────────────── */
function validateForm(form) {
  let valid = true;
  form.querySelectorAll('.form-control[required]').forEach(field => {
    if (!validateField(field)) valid = false;
  });
  return valid;
}

function validateField(field) {
  const value = field.value.trim();
  let message = '';

  if (field.hasAttribute('required') && !value) {
    message = 'This field is required.';
  } else if (field.type === 'email' && value && !isValidEmail(value)) {
    message = 'Please enter a valid email address.';
  } else if (field.id === 'appt-phone' && value && !isValidPhone(value)) {
    message = 'Please enter a valid 10-digit phone number.';
  }

  if (message) {
    setFieldError(field, message);
    return false;
  } else {
    clearFieldError(field);
    return true;
  }
}

function setFieldError(field, message) {
  field.style.borderColor = '#e53e3e';
  let errEl = field.parentNode.querySelector('.field-error');
  if (!errEl) {
    errEl = document.createElement('span');
    errEl.className = 'field-error';
    errEl.style.cssText = 'color:#e53e3e;font-size:0.8rem;margin-top:4px;display:block;';
    field.parentNode.appendChild(errEl);
  }
  errEl.textContent = message;
}

function clearFieldError(field) {
  field.style.borderColor = '';
  const errEl = field.parentNode.querySelector('.field-error');
  if (errEl) errEl.remove();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  // Accepts 10-digit numbers, with optional +91 or 0 prefix
  return /^(\+91|0)?[6-9]\d{9}$/.test(phone.replace(/\s/g, ''));
}

/* ─────────────────────────────────────────
   ALERT HELPERS
───────────────────────────────────────── */
function showAlert(el, message) {
  if (!el) return;
  el.textContent = message;
  el.classList.remove('alert-hidden');
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function hideAlert(el) {
  if (!el) return;
  el.classList.add('alert-hidden');
  el.textContent = '';
}
