
import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import HTMLContent from "../components/Content";
import PageHelmet from "../components/PageHelmet";
import StandardPageTemplate from "../components/StandardPageTemplate";
import "../styles/all-events-page.scss";

const TutorialListing = ({ title, authors, url }) => (
  <article className="event-listing">
    <h3>{title}</h3>
    <div className="event-organizers">{authors}</div>
  </article>
);

const AllTutorials = ({ tutorials }) => (
  <section className="all-events">
    {tutorials.map(t => <TutorialListing {...t} key={t.tutorialNumber} />)}
  </section>
);

const AllTutorialsPage = ({ data }) => {
  const { markdownRemark: page, footerData, navbarData, site, allTutorialsCsv } = data;
  const { tutorials } = allTutorialsCsv

  return (
    <Layout footerData={footerData} navbarData={navbarData} site={site}>
      <PageHelmet page={page} />
      <StandardPageTemplate page={{ ...page }}>
        <HTMLContent className="default-content" content={page.html} />
        <AllTutorials tutorials={tutorials}/>
      </StandardPageTemplate>
    </Layout>
  );
};

AllTutorialsPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AllTutorialsPage;

export const allWorkshopsPageQuery = graphql`
  query TutorialsPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        seo {
          browserTitle
          title
          description
        }
      }
    }
    allTutorialsCsv {
      tutorials: nodes {
        authors
        tutorialNumber
        title
      }
    }
    ...LayoutFragment
  }
`;
