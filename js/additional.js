        const modal = document.getElementById('modal');
        const openModalBtn = document.querySelector('.open-modal-btn');
        const closeModalBtn = document.querySelector('.close-btn');
        const signupForm = document.getElementById('signup-form');
        const successMessage = document.getElementById('success-message');
        const errorMessage = document.getElementById('error-message');
        
        openModalBtn.addEventListener('click', function() {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Запрещаем прокрутку страницы
            // Сбрасываем сообщения при открытии
            successMessage.style.display = 'none';
            errorMessage.style.display = 'none';
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
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(signupForm);
            fetch('send_email.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    successMessage.style.display = 'block';
                    errorMessage.style.display = 'none';
                    signupForm.reset();
                    setTimeout(function() {
                        modal.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    }, 3000);
                } else {
                    errorMessage.style.display = 'block';
                    successMessage.style.display = 'none';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                errorMessage.style.display = 'block';
                successMessage.style.display = 'none';
            });
        });
        
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }