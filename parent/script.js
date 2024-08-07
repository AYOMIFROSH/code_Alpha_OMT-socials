// Sidebar classes

const menuItems = document.querySelectorAll('.menu-item');

//-------------------Messages
const messagesNotification = document.querySelector('#messages-notification');
const messages = document.querySelector('.messages');
const message = messages.querySelectorAll('.message');
const messageSearch = document.querySelector('#message-search');

// -----------Theme Customisation

const theme = document.querySelector('#theme');
const themeModal = document.querySelector('.customize-theme');
const fontSizes = document.querySelectorAll('.choose-size span');
var root = document.querySelector(':root');
const colorPalatte = document.querySelectorAll('.choose-color span');




//remove all the active clicks class from all menu items
const chnageActiveItem = () => {
    menuItems.forEach(item => {
        item.classList.remove('active');
    })
}

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        chnageActiveItem()
        item.classList.add('active');
        if (item.id != 'notifications') {
            document.querySelector('.notifications-popup').style.display = 'none';
        }
        else {
            document.querySelector('.notifications-popup').style.display = 'block';
            document.querySelector('#notifications .notification-count').style.display = 'none';
        }
    })
})


// -------------Messages Active Section

//------ search filter chat
const searchMessage = () => {
    const val = messageSearch.value.toLowerCase();
    message.forEach(user => {
        let name = user.querySelector('h5').textContent.toLowerCase();
        if (name.indexOf(val) != -1) {
            user.style.display = 'flex';
        } else {
            user.style.display = 'none';
        }
    })
}

messageSearch.addEventListener('keyup', searchMessage);


//---------Highlight message card/box when message notification clicked
messagesNotification.addEventListener('click', () => {
    messages.style.boxShadow = '0 0 1rem var(--deepblue)';
    messagesNotification.querySelector('.notification-count').style.display = 'none';
    setTimeout(() => {
        messages.style.boxShadow = 'none';
    }, 2000)
})

// ------Theme Display Customization




// ---this opens the themeModal
const openThemeModal = () => {
    themeModal.style.display = 'grid';
}

//close the themeModal
const closeThemeModal = (e) => {
    if (e.target.classList.contains('customize-theme')) {
        themeModal.style.display = 'none';
    }
}

//close notification-pop


themeModal.addEventListener('click', closeThemeModal);

theme.addEventListener('click', openThemeModal);




// --------------Font size

//remove active spans or font size selectors 
const removeSizeSelector = () => {
    fontSizes.forEach(size => {
        size.classList.remove('active');
    })
}


fontSizes.forEach(size => {


    size.addEventListener('click', () => {

        removeSizeSelector();
        let fontSize;
        size.classList.toggle('active');

        if (size.classList.contains('font-size-1')) {
            fontSize = '10px';
            root.style.setProperty('--sticky-top-left', '5.4rem');
            root.style.setProperty('--sticky-top-right', '5.4rem');

        }
        else if (size.classList.contains('font-size-2')) {
            fontSize = '13px';
            root.style.setProperty('--sticky-top-left', '5.4rem');
            root.style.setProperty('--sticky-top-right', '-7rem');
        }
        else if (size.classList.contains('font-size-3')) {
            fontSize = '16px';
            root.style.setProperty('--sticky-top-left', '-2rem');
            root.style.setProperty('--sticky-top-right', '-17rem');
        }
        else if (size.classList.contains('font-size-4')) {
            fontSize = '19px';
            root.style.setProperty('--sticky-top-left', '-5rem');
            root.style.setProperty('--sticky-top-right', '-25rem');
        }
        else if (size.classList.contains('font-size-5')) {
            fontSize = '22px';
            root.style.setProperty('--sticky-top-left', '-12rem');
            root.style.setProperty('--sticky-top-right', '-35rem');
        }

        // change the font size of the root html element 
        document.querySelector('html').style.fontSize = fontSize;
    })

})






// Change primary colors 

var root = document.querySelector(':root');
const colorPalette = document.querySelectorAll('.choose-color span');

//remove active class from color

const changeActiveColorClass = () => {
    colorPalette.forEach(colorPicker => {
        colorPicker.classList.remove('active');
    })
}

colorPalette.forEach(color => {
    color.addEventListener('click', () => {
        let rootColor;
        //remove active class from color
        changeActiveColorClass();

        if (color.classList.contains('color-1')) {
            rootColor = 'var(--darkgrey)';
        } else if (color.classList.contains('color-2')) {
            rootColor = 'var(--purple)';
        } else if (color.classList.contains('color-3')) {
            rootColor = 'var(--color-danger)';
        } else if (color.classList.contains('color-4')) {
            rootColor = 'var(--nighttime)';
        } else if (color.classList.contains('color-5')) {
            rootColor = 'var(--deepblue)';
        }

        root.style.setProperty('--secon-bg-color', rootColor);

        color.classList.add('active');
    });
});



const Bg1 = document.querySelector('.bg-1');
const Bg2 = document.querySelector('.bg-2');
const Bg3 = document.querySelector('.bg-3');


// theme BACKGROUND values
const background = '#F5FFFA';
const nighttime = '#A0522D';
const blackness = '#250521';

const changeBg = (color) => {
    root.style.setProperty('--background', color);
};





Bg1.addEventListener('click', () => {
    // Activate class
    Bg1.classList.add('active');

    // Remove active class from other options
    Bg2.classList.remove('active');
    Bg3.classList.remove('active');

    changeBg(background);

    // Apply the background changes
    // window.location.reload();
});


Bg2.addEventListener('click', () => {
    Bg2.classList.add('active');
    Bg1.classList.remove('active');
    Bg3.classList.remove('active');
    changeBg(nighttime);

});

Bg3.addEventListener('click', () => {
    Bg3.classList.add('active');
    Bg1.classList.remove('active');
    Bg2.classList.remove('active');
    changeBg(blackness);

});

// interactive profile pictur and logout dropdown

document.addEventListener('DOMContentLoaded', () => {
    const profileImg = document.getElementById('profile-img');
    const uploadInput = document.getElementById('upload-input');
    const dropdownMenu = document.getElementById('dropdown-menu');
    const uploadLink = document.getElementById('upload-link');
    const logoutLink = document.getElementById('logout-link');
    const loginForm = document.getElementById('login-form');
    const leftProfileImg = document.querySelector('.left .profile-picture img');

    // Load saved profile picture from localStorage
    const savedProfilePic = localStorage.getItem('profilePic');
    if (savedProfilePic) {
        profileImg.src = savedProfilePic;
        leftProfileImg.src = savedProfilePic;
    }




    profileImg.addEventListener('click', () => {
        dropdownMenu.style.display = 'block';
    });

    uploadLink.addEventListener('click', (e) => {
        e.preventDefault();
        uploadInput.click();
    });

    uploadInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const newProfilePic = event.target.result;
                // profileImg.src = event.target.result;
                leftProfileImg.src = newProfilePic;
                profileImg.src = newProfilePic;
                // Save the new profile picture to localStorage
                localStorage.setItem('profilePic', newProfilePic);

            };
            reader.readAsDataURL(file);
        }
    });

    logoutLink.addEventListener('click', (e) => {
        e.preventDefault();
        // Clear specific items from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('currentForm');
        // Optionally, clear other user-related data
        // localStorage.removeItem('user');

        // Update the UI
        loginForm.style.display = 'block';
        document.getElementById('content').style.display = 'none';
        alert('Logged out');
    });

    document.addEventListener('click', (e) => {
        if (!dropdownMenu.contains(e.target) && e.target !== profileImg) {
            dropdownMenu.style.display = 'none';
        }
    });
});








// script.js
const registerForm = document.getElementById('create-account');
const loginForm = document.getElementById('login-form');
const page = document.getElementById('content');
const loginLink = document.getElementById('login-link');
const registerLink = document.getElementById('register-link');
const forgotLink = document.getElementById('forgot-link');
const passwordInput = document.getElementById('password');
const passwordInputs = document.getElementById('login-password');
const passcodeInput = document.getElementById('new-password');
const showPasswordCheckbox = document.getElementById('show-password');
const showPasswordCheckboxs = document.getElementById('show-passwords');
const showPasscodeCheckbox = document.getElementById('show-passcode');
const resetPassword = document.getElementById('reset-link');
const sendCodeBtn = document.getElementById('send-code-btn');
const resetPasswordBtn = document.getElementById('reset-password-btn');
const getusername = document.getElementById('user-username');
const forgotPasswordForm = document.getElementById('forgot-password-form');
const codeVerificationForm = document.getElementById('code-verification');
const resetPasswordForm = document.getElementById('reset-password-form');



function showForm(formId) {
    registerForm.style.display = 'none';
    loginForm.style.display = 'none';
    forgotPasswordForm.style.display = 'none';
    codeVerificationForm.style.display = 'none';
    resetPasswordForm.style.display = 'none';
    page.style.display = 'none';
    // getusername.style.display = 'none';

    if (formId) {
        document.getElementById(formId).style.display = 'block';
    }
}

// Check the saved state when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const savedState = localStorage.getItem('currentForm');
    if (savedState) {
        showForm(savedState);
    } else {
        showForm('create-account');
    }
});

// Save the current state to localStorage
function saveState(formId) {
    localStorage.setItem('currentForm', formId);
}

// Event listeners to save the state when navigating between forms
loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    saveState('login-form');
    showForm('login-form');
});

registerLink.addEventListener('click', (e) => {
    e.preventDefault();
    saveState('create-account');
    showForm('create-account');
});

resetPassword.addEventListener('click', (e) => {
    e.preventDefault();
    saveState('forgot-password-form');
    showForm('forgot-password-form');
});

// const forgotLink = document.getElementById('forgot-link');

forgotLink.addEventListener('click', (e) => {
    e.preventDefault();
    saveState('login-form');
    showForm('login-form');
});


// Create account form script
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const firstName = document.getElementById('firstname').value;
    const lastName = document.getElementById('lastname').value;
    const userName = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const password = document.getElementById('password').value;

    try {
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken
            },
            body: JSON.stringify({ firstName, lastName, userName, email, phoneNumber, password })
        });
        const data = await response.json();
        if (response.ok) {
            document.getElementById('register-message-area').textContent = 'User registered successfully';
            saveState('login-form');
            showForm('login-form');
        } else {
            document.getElementById('register-message-area').textContent = 'Error: ' + data.message;
        }
    } catch (error) {
        alert('Network Error: ' + error.message);
    }
});

// Login account credentials script
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userName = document.getElementById('username-phonenumber').value;
    const password = document.getElementById('login-password').value;
    const userLastName = document.getElementById('user-lastname');
    const userUsername = document.getElementById('user-username');

    try {
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken
            },
            body: JSON.stringify({ userName, password })
        });
        const data = await response.json();
        if (response.ok) {
            document.getElementById('login-message-area').textContent = 'Login successful';
            const token = data.token;
            localStorage.setItem('token', token);
            const profileResponse = await fetch('http://localhost:3000/profile', {
                headers: {
                    'Authorization': `Bearer ${data.token}`
                }
            });
            const profileData = await profileResponse.json();

            userLastName.textContent = profileData.lastName;
            userUsername.textContent = profileData.userName;

            saveState('content');
            showForm('content');


        } else {
            document.getElementById('login-message-area').textContent = 'Error: ' + data.message;
            clearLoginForm();
        }
    } catch (error) {
        alert('Network Error: ' + error.message);
        clearLoginForm();
    }
});

function clearLoginForm() {
    document.getElementById('username-phonenumber').value = '';
    document.getElementById('login-password').value = '';
}

// View password input
showPasswordCheckbox.addEventListener('change', () => {
    passwordInput.type = showPasswordCheckbox.checked ? 'text' : 'password';
});
showPasswordCheckboxs.addEventListener('change', () => {
    passwordInputs.type = showPasswordCheckboxs.checked ? 'text' : 'password';
});
showPasscodeCheckbox.addEventListener('change', () => {
    passcodeInput.type = showPasscodeCheckbox.checked ? 'text' : 'password';
});

// Forget password script
forgotPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('forgot-email').value;
    sendCodeBtn.textContent = 'Sending...';

    try {
        const response = await fetch('http://localhost:3000/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });
        const data = await response.json();
        if (response.ok) {
            document.getElementById('forgot-message-area').textContent = 'Verification code sent to your email.';
            saveState('code-verification');
            showForm('code-verification');
            sendCodeBtn.textContent = 'Send Code';
        } else {
            document.getElementById('forgot-message-area').textContent = 'Error: ' + data.message;
            sendCodeBtn.textContent = 'Send Code';
        }
    } catch (error) {
        alert('Error sending verification code: ' + error.message);
        sendCodeBtn.textContent = 'Send Code';
    }
});

// Code verification script
document.getElementById('code-verification').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('forgot-email').value;
    const verificationCode = document.getElementById('enter-code').value;

    try {
        const response = await fetch('http://localhost:3000/verify-code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, verificationCode })
        });
        const data = await response.json();

        if (response.ok) {
            document.getElementById('code-message-area').textContent = 'Verification successful!';
            saveState('reset-password-form');
            showForm('reset-password-form');
        } else {
            document.getElementById('code-message-area').textContent = 'Error: ' + data.message;
        }
    } catch (error) {
        alert('Network Error: ' + error.message);
    }
});

// Reset password script
document.getElementById('reset-password-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('forgot-email').value;
    const verificationCode = document.getElementById('enter-code').value;
    const newPassword = document.getElementById('new-password').value;
    resetPasswordBtn.textContent = 'Resetting...';

    try {
        const response = await fetch('http://localhost:3000/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, verificationCode, newPassword })
        });

        const data = await response.json();
        if (response.ok) {
            document.getElementById('reset-message-area').textContent = 'Password reset successful!';
            saveState('login-form');
            showForm('login-form');
            resetPasswordBtn.textContent = 'Reset Password';
        } else {
            document.getElementById('reset-message-area').textContent = 'Error: ' + data.message;
            resetPasswordBtn.textContent = 'Reset Password';

        }
    } catch (error) {
        alert('Error resetting password: ' + error.message);
        resetPasswordBtn.textContent = 'Reset Password';

    }
});


