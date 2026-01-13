// ==============================
// Datepicker
// ==============================

function initDatepicker(inputId, iconId) {
  const input = document.getElementById(inputId);
  const icon = document.getElementById(iconId);

  if (!input) {
    console.warn(`Input #${inputId} not found`);
    return null;
  }

  const dp = new AirDatepicker(input, {
    firstDay: 1,
    autoClose: true,
    locale: { 
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] 
    },
    onSelect({ date }) {
      if (!date) {
        input.value = '';
        return;
      }

      const d = Array.isArray(date) ? date[0] : date;
      const dd = String(d.getDate()).padStart(2, '0');
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const yyyy = d.getFullYear();

      input.value = `${dd}_${mm}_${yyyy}`;
    }
  });

  if (icon) {
    icon.addEventListener('click', () => {
      dp.show();
      input.focus();
    });
  }

  return dp;
}

const dp1 = initDatepicker('my-datepicker-1', 'calendarIcon-1');
const dp2 = initDatepicker('my-datepicker-2', 'calendarIcon-2');

// ==============================
// VIEW SWITCHER: TILES / ROWS
// ==============================

document.addEventListener('DOMContentLoaded', () => {
  const views = {
    tiles: { btn: '.btn-switch__btn--tiles', list: '.post-list--tiles' },
    rows:  { btn: '.btn-switch__btn--rows',  list: '.post-list--rows' }
  };

  const switchView = (type) => {
    Object.entries(views).forEach(([key, { btn, list }]) => {
      const isActive = key === type;
      const btnEl = document.querySelector(btn);
      const listEl = document.querySelector(list);
      if (btnEl) btnEl.classList.toggle('btn-switch__btn--active', isActive);
      if (listEl) listEl.classList.toggle('post-list--active', isActive);
    });
  };

  const btnTiles = document.querySelector(views.tiles.btn);
  const btnRows = document.querySelector(views.rows.btn);

  if (btnTiles) btnTiles.addEventListener('click', () => switchView('tiles'));
  if (btnRows) btnRows.addEventListener('click', () => switchView('rows'));

  switchView('tiles'); // default
});