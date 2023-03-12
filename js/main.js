const wrapper = document.getElementById('wrap');

const getUsers = () => {
    return new Promise((resolve, reject) => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(users => users.json())
            .then(users => resolve(users))
    })
}

(async () => {
    const arrayUsers = await getUsers();

    arrayUsers.forEach(user => {
        const divUser = document.createElement('div');
        const divText = document.createElement('div');
        const a = document.createElement('a');

        divUser.classList.add('user');
        divText.classList.add('text');
        a.classList.add('btn__details-user');

        divText.innerText = `${user.id} ${user.name}`;
        a.innerText = `Detail`;
        a.href = `user-details.html` + "?id=" + user.id;

        divUser.append(divText, a);
        wrapper.appendChild(divUser);
    })
})();




// animation
// function rotateDiv () {
//
//     if (wrapper.childNodes.length > i) {
//         const user = wrapper.childNodes[i];
//         user.classList.toggle('anim-div');
//
//         i++;
//         setTimeout(rotateDiv,1500);
//     } else {
//         wrapper.childNodes.forEach(elem => elem.classList.remove('anim-div'));
//         i = 0;
//
//         setTimeout(rotateDiv,10000);
//     }
// }
// let i = 0;
// window.onload = () => {
//     const timerId = setTimeout(rotateDiv, 1500);
// }

