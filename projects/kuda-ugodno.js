// Tabs Logic
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons and panes
    tabBtns.forEach(b => b.classList.remove('active'));
    tabPanes.forEach(p => p.classList.remove('active'));
    
    // Add active class to clicked button and corresponding pane
    btn.classList.add('active');
    const targetId = btn.getAttribute('data-target');
    document.getElementById(targetId).classList.add('active');
  });
});

// UX Grade (Guest Selector Component) Logic
const toggleBtn = document.getElementById('toggle-guest-dropdown');
const dropdown = document.getElementById('guest-dropdown');
const guestTotal = document.getElementById('guest-total');
const countAdultsEl = document.getElementById('count-adults');
const countChildrenEl = document.getElementById('count-children');
const errorMsg = document.getElementById('guest-error');
const applyBtn = document.getElementById('apply-guests');

let state = {
  adults: 2,
  children: 0
};

// Max limits (example)
const MAX_TOTAL_GUESTS = 5;
const MAX_CHILDREN_PER_ADULT = 2;

function updateUI() {
  countAdultsEl.textContent = state.adults;
  countChildrenEl.textContent = state.children;
  
  // Logic constraints
  let error = '';
  
  // Rule: Total guests
  if (state.adults + state.children > MAX_TOTAL_GUESTS) {
    error = `Максимум ${MAX_TOTAL_GUESTS} гостей в одном номере.`;
  }
  
  // Rule: Children require adults
  if (state.children > 0 && state.adults === 0) {
    error = 'Дети не могут проживать без взрослых.';
  }
  
  // Rule: Ratio children to adults
  if (state.children > state.adults * MAX_CHILDREN_PER_ADULT) {
    error = `Слишком много детей на одного взрослого.`;
  }

  errorMsg.textContent = error;
  
  // Disable apply if error
  applyBtn.disabled = error !== '';
  
  // Update Total String
  const total = state.adults + state.children;
  const word = total === 1 ? 'гость' : (total >= 2 && total <= 4 ? 'гостя' : 'гостей');
  guestTotal.textContent = `${total} ${word}`;
}

toggleBtn.addEventListener('click', () => {
  dropdown.classList.toggle('hidden');
});

applyBtn.addEventListener('click', () => {
  if (!applyBtn.disabled) {
    dropdown.classList.add('hidden');
  }
});

const controls = document.querySelectorAll('.counter-btn');

controls.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const type = e.target.getAttribute('data-type');
    const isPlus = e.target.classList.contains('plus');
    
    if (type === 'adults') {
      if (isPlus) {
        state.adults++;
      } else {
        if (state.adults > 1) state.adults--; // At least 1 adult normally, but let's say 0 is possible for testing constraints
        else if (state.adults > 0) state.adults--;
      }
    } else if (type === 'children') {
      if (isPlus) {
        state.children++;
      } else {
        if (state.children > 0) state.children--;
      }
    }
    
    updateUI();
  });
});

// Init
updateUI();
