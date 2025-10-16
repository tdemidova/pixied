const SUPABASE_URL = 'https://aozghciziapiwobafkem.supabase.co'; // ← убраны пробелы в конце!
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvemdoY2l6aWFwaXdvYmFma2VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NDIyMjIsImV4cCI6MjA3NjAxODIyMn0.Nmav4zv0BKwaW34ZRUzCad3kpg52TnVbpdYa3fezX8E';

 import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

await supabase.auth.getSession();
// === 2. Элементы DOM (используем ваши ID) ===
const modal = document.getElementById('auth-modal');
const openModalBtns = document.querySelectorAll('.open-modal-btn');
const closeModalBtn = document.querySelector('.close-btn');
const signupForm = document.getElementById('signup-form');
const successMessage = document.getElementById('success-message');
const errorMessage = document.getElementById('error-message');
const emailInput = document.getElementById('email');

// === 3. Открытие/закрытие модалки ===
openModalBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';
    signupForm.reset();
  });
});

function closeModal() {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

closeModalBtn?.addEventListener('click', closeModal);
window.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// === 4. Отправка Magic Link ===
signupForm?.addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const email = emailInput?.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email || !emailRegex.test(email)) {
    errorMessage.textContent = 'Please enter a valid email.';
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
    return;
  }

  // Скрываем сообщения, показываем "отправка"
  const submitBtn = signupForm.querySelector('.signup-btn');
  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  try {
    const {  data:{ error } } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: window.location.origin + '/dashboard/'
      }
    });

    if (error) {
      throw error;
    }

    // Успех
    successMessage.style.display = 'block';
    errorMessage.style.display = 'none';
    signupForm.reset();
  } catch (err) {
    errorMessage.textContent = err.message || 'Failed to send magic link.';
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
});

// === 5. Обновление UI в зависимости от сессии ===
async function updateAuthUI() {
  const {  data:{ session } } = await supabase.auth.getSession();

  const authButtons = document.getElementById('auth-buttons');
  const dashboardButton = document.getElementById('dashboard-button');

  if (session) {
    if (authButtons) authButtons.style.display = 'none';
    if (dashboardButton) dashboardButton.style.display = 'inline-block';
  } else {
    if (authButtons) authButtons.style.display = 'block';
    if (dashboardButton) dashboardButton.style.display = 'none';
  }
}

// Запускаем при загрузке и при изменении состояния
document.addEventListener('DOMContentLoaded', updateAuthUI);
supabase.auth.onAuthStateChange(() => updateAuthUI());


  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const answer = button.nextElementSibling;
      const isExpanded = button.getAttribute('aria-expanded') === 'true';

      // Закрываем все остальные
      document.querySelectorAll('.faq-question').forEach(btn => {
        btn.setAttribute('aria-expanded', 'false');
        btn.nextElementSibling.setAttribute('hidden', '');
      });

      // Переключаем текущий
      if (!isExpanded) {
        button.setAttribute('aria-expanded', 'true');
        answer.removeAttribute('hidden');
      } else {
        button.setAttribute('aria-expanded', 'false');
        answer.setAttribute('hidden', '');
      }
    });
  });