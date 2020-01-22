import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import HTMLContent from "../components/Content";
import PageHelmet from "../components/PageHelmet";
import StandardPageTemplate from "../components/StandardPageTemplate";
import "../styles/all-events-page.scss";

const WorkshopListing = ({ title, summary, authors, url }) => (
  <article className="event-listing">
    <h3><a href={url}>{title}</a></h3>
    <div className="event-organizers">{authors}</div>
    <p className="event-summary">{summary}</p>
  </article>
);

const AllWorkshops = ({ workshops }) => (
  <section className="all-events">
    {workshops.map(w => <WorkshopListing {...w} key={w.workshopNumber} />)}
  </section>
);

const AllWorkshopsPage = ({ data }) => {
  const { markdownRemark: page, footerData, navbarData, site, allWorkshopsCsv } = data;
  const { workshops } = allWorkshopsCsv

  return (
    <Layout footerData={footerData} navbarData={navbarData} site={site}>
      <PageHelmet page={page} />
      <StandardPageTemplate page={{ ...page }}>
        <HTMLContent className="default-content" content={page.html} />
        <AllWorkshops workshops={workshops}/>
      </StandardPageTemplate>
    </Layout>
  );
};

AllWorkshopsPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AllWorkshopsPage;

export const allWorkshopsPageQuery = graphql`
  query WorkshopsPage($id: String!) {
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
    allWorkshopsCsv {
      workshops: nodes {
        authors
        workshopNumber
        url
        title
        summary
      }
    }
    ...LayoutFragment
  }
`;
