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

