const wrapper = document.getElementById('wrap-detail');
const head = document.getElementById('head');
const userId = new URLSearchParams(location.search).get('id') || 1;

const getUser = async () => {
    return await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(user => user.json())
}

const getPosts = async () => {
    return await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
        .then(posts => posts.json())
}

function createNewElement (...element) {
    const newElement = document.createElement(element[0]);
    if (element[1]) newElement.classList.add(element[1]);
    if (element[2]) newElement.innerText = element[2];
    return newElement;
}

const hToTitle = createNewElement ('h2', 'title', 'User detail');
const aBack = createNewElement ('a', 'back', 'BACK');
aBack.href = `index.html`;
head.append(aBack, hToTitle);

(async () => {
    const user = await getUser();
    const posts = await getPosts();

    const userDetailsBox = createNewElement ('div', 'details-user');
    const divBtnOpenTitles = createNewElement ('div', 'btn__open-titles', `post of current user`);
    wrapper.append(userDetailsBox, divBtnOpenTitles);

    const createUsersListDetails = (obj, parentBlock) => {
        const block = createNewElement ('div', 'inner');
        parentBlock.appendChild(block);

        for (const key in obj) {
            if (typeof obj[key] === 'object') {
                const div = createNewElement ('div', 'inner');
                const titleElem = createNewElement ('h3', 'title', key.toUpperCase());

                parentBlock.appendChild(div);
                div.appendChild(titleElem);

                createUsersListDetails(obj[key], div);
            } else {
                const newKey = key.charAt(0).toUpperCase() + key.slice(1);
                const parElem = createNewElement ('p', 'paragraph', `${newKey}: ${obj[key]}`);

                block.appendChild(parElem);
            }
        }
    }

    divBtnOpenTitles.addEventListener('click', function () {
        const already = document.getElementsByClassName('titles-posts');
        if (!(already.length)) {
            const divListTitlePosts = createNewElement ('div', 'titles-posts');
            wrapper.appendChild(divListTitlePosts);

            for (let i = 0; i < posts.length; i += 5) {
                const ul = createNewElement ('ul', 'posts-list');
                divListTitlePosts.append(ul);
                const newPosts = posts.slice(i, i + 5);

                newPosts.forEach(post => {
                    const newPostTitle = post.title.charAt(0).toUpperCase() + post.title.slice(1);
                    const li = createNewElement ('li', 'lishka', `${newPostTitle}`);
                    const aBtn = createNewElement ('a', 'btn__details-post', `Details`);
                    aBtn.href = 'post-details.html' + "?id=" + userId + "&postId=" + post.id;

                    li.appendChild(aBtn);
                    ul.appendChild(li);
                })
            }
        }
    })
    createUsersListDetails(user, userDetailsBox);
})()

