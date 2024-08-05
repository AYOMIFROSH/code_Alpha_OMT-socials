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
    window.location.reload();
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




// script.js
const registerForm = document.getElementById('create-account');
const loginForm = document.getElementById('login-form');
const page = document.getElementById('content');
const loginLink = document.getElementById('login-link');
const registerLink = document.getElementById('register-link');
const passwordInput = document.getElementById('password');
const showPasswordCheckbox = document.getElementById('show-password');
const resetPassword = document.getElementById('reset-link');
const forgotPasswordForm = document.getElementById('forgot-password-form');




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
            document.getElementById('message-area').textContent = 'User registered successfully';

            registerForm.style.display = 'none';

            loginForm.style.display = 'block'; // Or 'flex', 'inline', etc., depending on your CSS

        } else {
            document.getElementById('message-area').textContent = 'Error: ' + data.message;
        }
    } catch (error) {
        alert('Network Error: ' + error.message);
    }
});


const token = localStorage.getItem('token');
if (token) {
  fetch('http://localhost:3000/profile', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => alert('Network Error: ' + error.message));
}


loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userName = document.getElementById('username-phonenumber').value;
    const password = document.getElementById('login-password').value;

    try {
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: ('/protected-route', {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken
            }),
            body: JSON.stringify({ userName, password })
        });
        const data = await response.json();
        if (response.ok) {
            document.getElementById('message-area').textContent = 'Error: ' + data.message;
            const token = data.token;
            localStorage.setItem('token', token);
            const profileResponse = await fetch('http://localhost:3000/profile', {
                headers: {
                    'Authorization': `Bearer ${data.token}`
                }
            });
            const profileData = await profileResponse.json();
            console.log(profileData); // Display or use the profile data as needed        

            loginForm.style.display = 'none';

            page.style.display = 'block';

        } else {
            alert('Error: ' + data.message);
        }
    } catch (error) {
        alert('Network Error: ' + error.message);
    }
});


// page.addEventListener('click', (e) => {
//     e.preventDefault();
//     window.location.reload('false');
// })

// login link

// const token = localStorage.getItem('token');
// fetch('/protected-route', {
//   headers: {
//     'Authorization': `Bearer ${token}`,
//     'x-access-token': token
//   }
// });


loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
});

registerLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
});

resetPassword.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.style.display = 'none';
    forgotPasswordForm.style.display = 'block';
});

// View password input 
showPasswordCheckbox.addEventListener('change', () => {
    passwordInput.type = showPasswordCheckbox.checked ? 'text' : 'password';
});

// forget password form 
forgotPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let email = document.getElementById('forgot-email').value;

    try {

        // Display a message to the user indicating that the code has been sent
        document.getElementById('message-area').textContent = 'Verification code sent to your email.';

        email = document.getElementById('code-verification').style.display = 'block';

    } catch (error) {
        alert('Error sending verification code: ' + error.message);
    }
});

// Handle password reset after successful verification
document.getElementById('reset-password-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const newPassword = document.getElementById('new-password').value;

    try {

        // Inform the user that their password has been reset
        document.getElementById('message-area').textContent = 'Password reset successful!';
    } catch (error) {
        alert('Error resetting password: ' + error.message);
    }
});
