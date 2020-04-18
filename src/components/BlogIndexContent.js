import React from "react";
import { Link } from "gatsby";

const BlogIndexListing = ({ post }) => (
  <li>
    <Link to={post.fields.slug}>{post.frontmatter.date}: {post.frontmatter.title}</Link>
  </li>
);

const BlogIndexContent = ({ posts }) => (
  <article className="blog-posts default-content">
    <h2>All Posts</h2> 
    <ul>
      {posts.map(({ post }) => <BlogIndexListing post={post} />)}
    </ul> 
  </article>
);

export default BlogIndexContent;