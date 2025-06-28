// Blog data - in a real implementation, this would be fetched from a JSON file or API
const blogPosts = [
    {
        slug: "web-design-trends-2024",
        title: "10 Web Design Trends for 2024",
        date: "2024-06-15",
        author: "Your Name",
        category: "Web Design",
        excerpt: "Explore the latest trends shaping the web design industry this year.",
        image: "/assets/images/blog-images/web-design-trends.jpg",
        content: `## Introduction\nThe world of web design is constantly evolving...`
    },
    {
        slug: "seo-strategies",
        title: "SEO Strategies That Actually Work",
        date: "2024-06-20",
        author: "Your Name",
        category: "SEO",
        excerpt: "Proven techniques to improve your search engine rankings.",
        image: "/assets/images/blog-images/seo-strategies.jpg",
        content: `## Introduction\nSearch engine optimization is crucial for...`
    }
];

// Initialize blog functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the blog listing page
    if (document.querySelector('.blog-listing')) {
        renderBlogListing();
        setupBlogFilters();
    }
    
    // Check if we're on a blog post page
    if (document.querySelector('.blog-post')) {
        renderBlogPost();
        setupBlogNavigation();
    }
});

// Render blog listing
function renderBlogListing() {
    const blogGrid = document.getElementById('blog-grid');
    if (!blogGrid) return;
    
    blogGrid.innerHTML = blogPosts.map(post => `
        <article class="blog-card" data-category="${post.category.toLowerCase().replace(' ', '-')}">
            <a href="/blog/${post.slug}/">
                <div class="blog-card-image">
                    <img src="${post.image}" alt="${post.title}" loading="lazy">
                    <span class="blog-category">${post.category}</span>
                </div>
                <div class="blog-card-content">
                    <h2>${post.title}</h2>
                    <div class="blog-meta">
                        <span>By ${post.author}</span>
                        <span>•</span>
                        <time datetime="${post.date}">${formatDate(post.date)}</time>
                    </div>
                    <p>${post.excerpt}</p>
                    <a href="/blog/${post.slug}/" class="read-more">Read More →</a>
                </div>
            </a>
        </article>
    `).join('');
}

// Render individual blog post
function renderBlogPost() {
    const slug = window.location.pathname.split('/')[2];
    const post = blogPosts.find(p => p.slug === slug);
    const blogContent = document.getElementById('blog-content');
    
    if (post && blogContent) {
        // Update document title
        document.title = `${post.title} | YourSiteName`;
        
        // Render post content
        blogContent.innerHTML = `
            <header class="blog-post-header">
                <div class="blog-post-meta">
                    <span class="blog-category">${post.category}</span>
                    <time datetime="${post.date}">${formatDate(post.date)}</time>
                    <span>•</span>
                    <span>By ${post.author}</span>
                </div>
                <h1>${post.title}</h1>
                <div class="blog-post-image">
                    <img src="${post.image}" alt="${post.title}" loading="lazy">
                </div>
            </header>
            <div class="blog-post-body" id="post-content">
                ${marked.parse(post.content)}
            </div>
        `;
        
        // Apply syntax highlighting
        document.querySelectorAll('pre code').forEach(block => {
            hljs.highlightElement(block);
        });
    } else {
        blogContent.innerHTML = `
            <div class="blog-not-found">
                <h2>Post Not Found</h2>
                <p>The blog post you're looking for doesn't exist.</p>
                <a href="/blog/" class="btn">Back to Blog</a>
            </div>
        `;
    }
}

// Blog filter functionality
function setupBlogFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter posts
            const category = this.getAttribute('data-category');
            const posts = document.querySelectorAll('.blog-card');
            
            posts.forEach(post => {
                if (category === 'all' || post.getAttribute('data-category') === category) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    });
}

// Blog navigation (previous/next post)
function setupBlogNavigation() {
    const currentSlug = window.location.pathname.split('/')[2];
    const currentIndex = blogPosts.findIndex(post => post.slug === currentSlug);
    
    if (currentIndex > 0) {
        const prevPost = blogPosts[currentIndex - 1];
        document.getElementById('prev-post').href = `/blog/${prevPost.slug}/`;
    } else {
        document.getElementById('prev-post').style.visibility = 'hidden';
    }
    
    if (currentIndex < blogPosts.length - 1) {
        const nextPost = blogPosts[currentIndex + 1];
        document.getElementById('next-post').href = `/blog/${nextPost.nextPost}/`;
    } else {
        document.getElementById('next-post').style.visibility = 'hidden';
    }
}

// Helper function to format dates
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}