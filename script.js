async function fetchAndRenderMarkdown() {
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = ''; // Clear previous content

    if (typeof markdownFiles === 'undefined' || markdownFiles.length === 0) {
        postsContainer.innerHTML = '<p>No posts found. Add a new Markdown file to the "posts/" directory and push to GitHub!</p>';
        return;
    }

   
    for (const file of markdownFiles) {
        try {
            const response = await fetch(file);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${file}: ${response.statusText}`);
            }
            const markdownText = await response.text();
            
            // Convert markdown to HTML
            const htmlContent = marked.parse(markdownText);
            
            // Create a new div for the post and inject the content
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