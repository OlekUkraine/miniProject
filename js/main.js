const wrapper = document.getElementById('wrap');
const head = document.getElementById('head');
setTimeout(() => wrapper.classList.remove('user-animation'),2000);

const getUsers = async () => {
    return await fetch('https://jsonplaceholder.typicode.com/users')
        .then(users => users.json());
}

(async () => {
    const arrayUsers = await getUsers();
    function createNewElement (...element) {
        const newElement = document.createElement(element[0]);
        if (element[1]) newElement.classList.add(element[1]);
        if (element[2]) newElement.innerText = element[2];
        return newElement;
    }

    const hToTitle = createNewElement('h2','link__user-list', 'List of users');
    head.appendChild(hToTitle);

    arrayUsers.forEach(user => {
        const divUser = createNewElement('div', 'user');
        const divText = createNewElement('div', 'text', `${user.id} ${user.name}`);
        const a = createNewElement('a', 'btn__details-user', `Detail`);
        a.href = `user-details.html` + "?id=" + user.id;

        divUser.addEventListener('mouseenter', () => {
            divUser.classList.add('anim-rotate');
        })
        divUser.addEventListener('mouseout', () => {
            setTimeout(() => divUser.classList.remove('anim-rotate'), 1000);
        })

        divUser.append(divText, a);
        wrapper.appendChild(divUser);
    })
})();


