const aBack = document.getElementById('back-btn');
const divDetailsPost = document.getElementById('details-post');
const divBlockComments = document.getElementById('block-comments');
const url = new URLSearchParams(location.search);
const postId = url.get('postId') || 1;
aBack.href = `user-details.html` + "?id=" + url.get('id') || 1;

const getPost = () => {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(post => post.json())
}
const getComments = () => {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then(comments => comments.json())
}

function createNewElement (...element) {
    const newElement = document.createElement(element[0]);
    if (element[1]) newElement.classList.add(element[1]);
    if (element[2]) newElement.innerText = element[2];
    return newElement;
}

(async () => {
    const post = await getPost();
    const comments = await getComments();

    const createPostListDetails = (post) => {

        for (const key in post) {
            const newKey = key.charAt(0).toUpperCase() + key.slice(1);

            if (typeof post[key] !== 'object') {
                const div = createNewElement ('div', `inner`, `${newKey}: ${post[key]}`);
                divDetailsPost.appendChild(div);
            } else {
                const div = createNewElement ('div', `inner`, `${newKey}:`);
                divDetailsPost.appendChild(div);
                createPostListDetails(post[key]);
            }
        }
    }

    const createCommentsForPost = (comments) => {

        comments.forEach(comment => {
            const divComment = createNewElement ('div', 'comment');
            divBlockComments.appendChild(divComment);

            for (const key in comment) {
                const newKey = key.charAt(0).toUpperCase() + key.slice(1);
                const div = createNewElement ('div', 'inner', `${newKey}: ${comment[key]}`);
                divComment.appendChild(div);
            }
        })
    }

    createPostListDetails(post);
    createCommentsForPost(comments);
})()



