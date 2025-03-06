document.addEventListener("DOMContentLoaded", function () {
    const API_URL = "http://localhost:5000/api/posts";
    const token = localStorage.getItem("token");
    const postForm = document.getElementById("postForm");
    const postsContainer = document.getElementById("postsContainer");

    async function fetchPosts() {
        try {
            const res = await fetch(API_URL, { headers: { Authorization: token } });
            if (!res.ok) throw new Error("Failed to fetch posts.");

            const posts = await res.json();
            postsContainer.innerHTML = posts.length > 0 
                ? posts.map(post => `
                    <div>
                        <h4>${post.title}</h4>
                        <p>${post.content}</p>
                        <button onclick="deletePost('${post.id}')">Delete</button>
                    </div>
                `).join("")
                : "<p>No posts available.</p>";
        } catch (error) {
            alert(error.message);
        }
    }

    if (postForm) {
        postForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const title = document.getElementById("title").value.trim();
            const content = document.getElementById("content").value.trim();

            if (!title || !content) {
                alert("Title and content cannot be empty.");
                return;
            }

            try {
                const res = await fetch(API_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json", Authorization: token },
                    body: JSON.stringify({ title, content }),
                });

                if (!res.ok) throw new Error("Failed to add post.");

                alert("Post added successfully!");
                fetchPosts();
            } catch (error) {
                alert(error.message);
            }
        });
    }

    window.deletePost = async (id) => {
        if (!confirm("Are you sure you want to delete this post?")) return;

        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
                headers: { Authorization: token },
            });

            if (!res.ok) throw new Error("Failed to delete post.");

            alert("Post deleted successfully!");
            fetchPosts();
        } catch (error) {
            alert(error.message);
        }
    };

    fetchPosts();
});
