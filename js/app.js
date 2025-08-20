// Shared JS for both pages
(function(){
  const yearEl = document.getElementById('year');
  if(yearEl){ yearEl.textContent = new Date().getFullYear(); }

  // Simple bootstrap validation helper
  function applyBootstrapValidation(form){
    form.addEventListener('submit', function (event) {
      // custom password match check when present
      const pw = form.querySelector('input[name="password"]');
      const cpw = form.querySelector('input[name="confirmPassword"]');
      if (pw && cpw && pw.value !== cpw.value){
        cpw.setCustomValidity('Passwords do not match');
      }else if(cpw){
        cpw.setCustomValidity('');
      }

      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault();
        // Show success modal then redirect
        const modalEl = document.getElementById('successModal');
        if(modalEl){
          const m = new bootstrap.Modal(modalEl);
          m.show();
          modalEl.addEventListener('hidden.bs.modal', () => {
            window.location.href = 'index.html';
          }, { once: true });
        }else{
          alert('Application submitted successfully!');
          window.location.href = 'index.html';
        }
      }
      form.classList.add('was-validated');
    }, false);
  }

  // Attach to forms on accounts.html
  document.querySelectorAll('form.needs-validation').forEach(applyBootstrapValidation);

  // Deep-link to tabs via hash (#savings or #current)
  const hash = window.location.hash;
  if(hash === '#current'){
    const trigger = document.querySelector('button[data-bs-target="#current"]');
    if(trigger){ new bootstrap.Tab(trigger).show(); }
  }else if(hash === '#savings'){
    const trigger = document.querySelector('button[data-bs-target="#savings"]');
    if(trigger){ new bootstrap.Tab(trigger).show(); }
  }
})();
