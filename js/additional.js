        const modal = document.getElementById('modal');
        const openModalBtns = document.querySelectorAll('.open-modal-btn');
        const closeModalBtn = document.querySelector('.close-btn');
        const signupForm = document.getElementById('signup-form');
        const successMessage = document.getElementById('success-message');
        const errorMessage = document.getElementById('error-message');
        
        openModalBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                successMessage.style.display = 'none';
                errorMessage.style.display = 'none';
                signupForm.reset();
            });
        });
        
        closeModalBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        signupForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // Отменяем стандартную отправку

            const formData = new FormData(signupForm);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            try {
              const response = await fetch('https://formspree.io/f/xrbyypnq', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                },
                body: json
              });

              if (response.ok) {
                successMessage.style.display = 'block';
                errorMessage.style.display = 'none';
                signupForm.reset(); // Очистить форму
              } else {
                const errorData = await response.json();
                errorMessage.style.display = 'block';
                successMessage.style.display = 'none';
                
              }
            } catch (error) {
                console.error('Ошибка сети:', error);
                errorMessage.style.display = 'block';
                successMessage.style.display = 'none';
            }
        });
        
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }