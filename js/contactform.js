const form = document.getElementsByClassName('contact__form');
const formName = document.getElementById('contact__form__name');
const formMail = document.getElementById('contact__form__mail');
const formTextArea = document.getElementById('contact__form__textarea');
const formPhone = document.getElementById('contact__form__phone');
const formSubmit = document.getElementById('contact__form__submit');
formSubmit.addEventListener("click", function(event) {
    event.preventDefault();

    // Reset border colors
    formName.style.borderColor = '';
    formMail.style.borderColor = '';
    formTextArea.style.borderColor = '';
    formPhone.style.borderColor = '';
    formSubmit.style.borderColor = '';
    formSubmit.style.backgroundColor = '';
    
    // Redex validators
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const textAreaPattern = /^.{10,200}$/;
    const phonePattern = /^\+?[1-9]\d{1,14}$/;
    let isValid = true;

    // Empty notifier
    if (formName.value === "") {
        formName.style.borderColor = 'red';
        isValid = false;
    } else {
        formName.style.borderColor = 'lime';
    }
    if (formMail.value === ""){
        formMail.style.borderColor = 'red';
        isValid = false;
              
    } else {
        formMail.style.borderColor = 'lime';
    }
    if (formTextArea.value === "") {
        formTextArea.style.borderColor = 'red';
        isValid = false;
    } else {
        formTextArea.style.borderColor = 'lime';
    }

    if (formPhone.value === "") {
        formPhone.style.borderColor = 'red';
        isValid = false;
    } else {
        formPhone.style.borderColor = 'lime';
    }

    // Redex Notifier 
    if (formMail.value && !formMail.value.match(emailPattern)) {
        formMail.style.borderColor = 'orange';
        isValid = false;
    }
    if (formTextArea.value && !formTextArea.value.match(textAreaPattern)) {
        formTextArea.style.borderColor = 'orange';
        isValid = false;
    }
    if (formPhone.value && !formPhone.value.match(phonePattern)) {
        formPhone.style.borderColor = 'orange';
        isValid = false;
    }
    if (isValid) {
        formSubmit.style.borderColor = 'lime';
        formSubmit.style.backgroundColor = 'lime';
        const originalText = formSubmit.textContent;
        formSubmit.textContent = "Your message has been sent";
        setTimeout(() => {
            formSubmit.textContent = originalText;
            formName.value = '';
            formMail.value = '';
            formTextArea.value = '';
            formPhone.value = '';
            formName.style.borderColor = '';
            formMail.style.borderColor = '';
            formTextArea.style.borderColor = '';
            formPhone.style.borderColor = '';
        }, 3000);
    } else {
        formSubmit.style.borderColor = 'red';
        formSubmit.style.backgroundColor = 'red';
    }
});




