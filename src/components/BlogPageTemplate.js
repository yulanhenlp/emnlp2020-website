import React from "react";
import { Link } from "gatsby";

const BlogPageTemplate = props => {
  const { page, endContent } = props;
  const { title, date } = page.frontmatter;

  return (
    <article className="about blog">
      <div className="about-container container">
        <section className="post-header">
          <div className="all-posts-link"><Link to="/blog">❮ All Blog Posts</Link></div>
          <div className="post-date">{date}</div>
        </section>
        <section className="about-header">
          <div className="about-titleWrapper">
            <h1 className="about-title">{title}</h1>
          </div>
        </section>
        <section className="section">
          {props.children}
        </section>
      </div>
      {endContent}
    </article>
  );
};

export default BlogPageTemplate