import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import HTMLContent from "../components/Content";
import PageHelmet from "../components/PageHelmet";
import StandardPageTemplate from "../components/StandardPageTemplate";
import "../styles/organizers-page.scss";

const MemberListing = ({ name, organization }) => (
  <article className="member">
    <div className="member-name">{name}</div>
    <div className="member-org">{organization}</div>
  </article>
)

const RoleListing = ({ title, members }) => (
  <section className="role-listing">
    <h3 className="role-title">{title}</h3>
    {members.map(m => <MemberListing {...m} key={m.name}/>)}
  </section>
);

const AllCommitteeRoles = ({ roles }) => (
  <section className="all-committee-roles">
    {roles.map(r => <RoleListing {...r} key={r.title} />)}
  </section>
);

const OrgCommitteePage = ({ data }) => {
  const { markdownRemark: page, footerData, navbarData, site, committee } = data;
  const { roles } = committee

  return (
    <Layout footerData={footerData} navbarData={navbarData} site={site}>
      <PageHelmet page={page} />
      <StandardPageTemplate page={{ ...page }}>
        <HTMLContent className="default-content" content={page.html} />
        <AllCommitteeRoles roles={roles}/>
      </StandardPageTemplate>
    </Layout>
  );
};

OrgCommitteePage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default OrgCommitteePage;

export const organizersPageQuery = graphql`
  query OrgCommitteePage($id: String!) {
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
    committee: allOrganizingCommitteeYaml {
      roles: nodes {
        title
        members {
          name
          organization
        }
      }
    }
    ...LayoutFragment
  }
`;
