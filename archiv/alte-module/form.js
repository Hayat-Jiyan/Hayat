export function initReservationForm() {
  const reservationForm = document.getElementById('reservation-form');
  const formContainer = document.getElementById('reservation-form-container');
  const successMessage = document.getElementById('reservation-success');
  const errorMessage = document.getElementById('reservation-form-error');
  const reservationDateInput = document.getElementById('res-date');
  const reservationTimeInput = document.getElementById('res-time');
  const reservationEmailInput = document.getElementById('res-email');

  const formatDateForInput = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const validateReservationDateTime = () => {
    if (!reservationDateInput || !reservationTimeInput) return true;

    const selectedDate = reservationDateInput.value;
    const selectedTime = reservationTimeInput.value;
    reservationDateInput.setCustomValidity('');
    
    if (!selectedDate || !selectedTime) {
      reservationTimeInput.setCustomValidity('');
      return true;
    }

    const now = new Date();
    const currentDate = formatDateForInput(now);
    
    if (selectedDate < currentDate) {
      reservationDateInput.setCustomValidity('Vergangene Tage können nicht reserviert werden.');
      return false;
    }
    
    const selectedDateTime = new Date(`${selectedDate}T${selectedTime}`);
    if (Number.isNaN(selectedDateTime.getTime())) {
      reservationTimeInput.setCustomValidity('Bitte wählen Sie eine gültige Uhrzeit.');
      return false;
    }

    if (selectedDate === currentDate && selectedDateTime < now) {
      reservationTimeInput.setCustomValidity('Für heute können nur zukünftige Uhrzeiten gewählt werden.');
      return false;
    }

    reservationTimeInput.setCustomValidity('');
    return true;
  };

  const updateReservationConstraints = () => {
    if (!reservationDateInput || !reservationTimeInput) return;

    const now = new Date();
    const currentDate = formatDateForInput(now);
    const currentHour = now.getHours();

    if (currentHour >= 16) {
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      reservationDateInput.min = formatDateForInput(tomorrow);
    } else {
      reservationDateInput.min = currentDate;
    }

    reservationTimeInput.min = "18:00"; 
    reservationTimeInput.max = "23:30"; 
    validateReservationDateTime();
  };

  if (reservationDateInput && reservationTimeInput) {
    updateReservationConstraints();
    reservationDateInput.addEventListener('input', updateReservationConstraints);
    reservationDateInput.addEventListener('change', updateReservationConstraints);
    reservationTimeInput.addEventListener('input', validateReservationDateTime);
  }

  if (reservationForm && formContainer && successMessage) {
    reservationForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      errorMessage.hidden = true;
      errorMessage.textContent = '';

      // Strenge Format-Prüfung für die E-Mail-Adresse
      if (reservationEmailInput) {
        const emailValue = reservationEmailInput.value.trim();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(emailValue)) {
          errorMessage.textContent = 'Bitte geben Sie eine vollständige und gültige E-Mail-Adresse ein (z. B. name@anbieter.de).';
          errorMessage.hidden = false;
          reservationEmailInput.focus();
          return;
        }
      }
      
      updateReservationConstraints();
      if (!validateReservationDateTime()) {
        errorMessage.textContent = reservationDateInput.validationMessage || reservationTimeInput.validationMessage;
        errorMessage.hidden = false;
        return;
      }
      
      const submitBtn = reservationForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Wird gesendet…';
      }
      
      try {
        const response = await fetch(reservationForm.getAttribute('action'), {
          method: 'POST',
          body: new FormData(reservationForm),
          headers: { Accept: 'application/json' }
        });
        if (response.ok) {
          formContainer.hidden = true;
          successMessage.hidden = false;
        }
      } catch (err) {
        errorMessage.textContent = `Fehler beim Senden. Bitte versuchen Sie es später erneut.`;
        errorMessage.hidden = false;
      }
    });
  }
}