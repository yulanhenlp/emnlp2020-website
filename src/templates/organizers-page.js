import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import HTMLContent from "../components/Content";
import PageHelmet from "../components/PageHelmet";
import StandardPageTemplate from "../components/StandardPageTemplate";
import "../styles/organizers-page.scss";

// const imagePathForName = (name) => `people/org-committee/${imageStem(name)}`;

const imageStem = (name) => `${name.toLowerCase().replace(/ /g, '_')}`;

const MemberPhoto = ({ src, name }) => (
  <div className="member-photo-wrapper">
    <img className="member-photo" src={src} alt={name}></img>
  </div>
)

const PlaceholderPhoto = () => (
  <div className="member-photo-wrapper placeholder"></div>
)

const MemberListing = ({ name, organization, imageUrl }) => (
  <article className="member">
    {imageUrl ? <MemberPhoto src={imageUrl} name={name}/> : <PlaceholderPhoto />}
    <div className="member-text-details">
      <div className="member-name">{name}</div>
      <div className="member-org">{organization}</div>
    </div>
  </article>
)

const RoleListing = ({ title, members, images }) => (
  <section className="role-listing">
    <h3 className="role-title">{title}</h3>
    <div className="role-listing-members">
      {members.map(m => <MemberListing {...m} imageUrl={images.get(imageStem(m.name))} key={m.name}/>)}
    </div>
  </section>
);

const AllCommitteeRoles = ({ roles, images }) => (
  <section className="all-committee-roles">
    {roles.map(r => <RoleListing {...r} key={r.title} images={images} />)}
  </section>
);

const OrgCommitteePage = ({ data }) => {
  const { markdownRemark: page, footerData, navbarData, site, committee, committeeImages } = data;
  const { roles } = committee;
  const { images } = committeeImages;
  const imagesByName = new Map(images.map(({ name, publicURL }) => [name, publicURL]));

  return (
    <Layout footerData={footerData} navbarData={navbarData} site={site}>
      <PageHelmet page={page} />
      <StandardPageTemplate page={{ ...page }}>
        <HTMLContent className="default-content" content={page.html} />
        <AllCommitteeRoles roles={roles} images={imagesByName}/>
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
    committeeImages: allFile(filter: {relativeDirectory: {eq: "org-committee"}, sourceInstanceName: {eq: "images"}}) {
      images: nodes {
        name
        publicURL
      }
    }
    ...LayoutFragment
  }
`;
