import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import HTMLContent from "../components/Content";
import OrganizerSection from "../components/OrganizerSection";
import PageHelmet from "../components/PageHelmet";
import "../styles/about-page.scss";
import StandardPageTemplate from "../components/StandardPageTemplate";

const AboutPage = ({ data }) => {
  const { markdownRemark: page, footerData, navbarData, site } = data;
  const { organizers } = page.frontmatter;

  return (
    <Layout footerData={footerData} navbarData={navbarData} site={site}>
      <PageHelmet page={page} />
      <StandardPageTemplate page={{ ...page }} endContent={<OrganizerSection organizers={organizers} />}>
        <HTMLContent className="about-description" content={page.html} />
      </StandardPageTemplate>
    </Layout>
  );
};

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AboutPage;

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        organizers {
          title
          gallery {
            image
            imageAlt
            name
            role
            organization
          }
        }
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
