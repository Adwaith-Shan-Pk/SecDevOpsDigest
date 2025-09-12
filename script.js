// A list of your markdown files. Just add new filenames here.
const markdownFiles = [
    'posts/welcome.md',
    'posts/first-plant.md'
];

async function fetchAndRenderMarkdown() {
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = ''; 
    for (const file of markdownFiles) {
        try {
            const response = await fetch(file);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${file}: ${response.statusText}`);
            }
            const markdownText = await response.text();
            
            const htmlContent = marked.parse(markdownText);
            
            
            const postDiv = document.createElement('div');
            postDiv.className = 'post';
            postDiv.innerHTML = htmlContent;

            postsContainer.appendChild(postDiv);
        } catch (error) {
            console.error(error);
            const errorDiv = document.createElement('div');
            errorDiv.innerHTML = `<p style="color: red;">Error loading post: ${file}</p>`;
            postsContainer.appendChild(errorDiv);
        }
    }
}

document.addEventListener('DOMContentLoaded', fetchAndRenderMarkdown);