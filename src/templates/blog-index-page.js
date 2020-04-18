import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import BlogIndexContent from "../components/BlogIndexContent";
import PageHelmet from "../components/PageHelmet";
import "../styles/about-page.scss";
import StandardPageTemplate from "../components/StandardPageTemplate";


const DefaultPage = ({ data }) => {
  const { markdownRemark: page, footerData, navbarData, site, allPosts } = data;
  const { posts } = allPosts

  return (
    <Layout footerData={footerData} navbarData={navbarData} site={site}>
      <PageHelmet page={page} />
      <StandardPageTemplate page={{ ...page }}>
        <BlogIndexContent posts={posts} />
      </StandardPageTemplate>
    </Layout>
  );
};

DefaultPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default DefaultPage;

export const defaultPageQuery = graphql`
  query BlogIndexPage($id: String!) {
    allPosts: allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "blog-post-page"}}}, sort: {fields: frontmatter___date, order: DESC}) {
      posts: edges {
        post: node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString:"MMMM Do, YYYY")
          }
        }
      }
    }
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        seo {
          browserTitle
          title
          description
        }
      }
    }
    ...LayoutFragment
  }
`;
