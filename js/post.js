const wrapper = document.getElementById('wrap-detail-post');
const head = document.getElementById('head');
const url = new URLSearchParams(location.search);

const getPost = async () => {
    return await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(post => post.json())
}
const getComments = async () => {
    return await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then(comments => comments.json())
}

function createNewElement (...element) {
    const newElement = document.createElement(element[0]);
    if (element[1]) newElement.classList.add(element[1]);
    if (element[2]) newElement.innerText = element[2];
    return newElement;
}

const hToTitle = createNewElement ('h2', 'title', 'Post');
const aBack = createNewElement ('a', 'back', 'BACK');

const postId = url.get('postId') || 1;
const userId = url.get('id');
aBack.href = `user-details.html` + "?id=" + userId;
head.append(aBack, hToTitle);



(async () => {
    const post = await getPost();
    const comments = await getComments();
    const divDetailsPost = createNewElement ('div', 'details-post');
    const hToTitle = createNewElement ('h2', `title`, 'COMMENTS');
    const divBlockComments = createNewElement ('div', 'block-comments');
    wrapper.append(divDetailsPost, hToTitle, divBlockComments);

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



