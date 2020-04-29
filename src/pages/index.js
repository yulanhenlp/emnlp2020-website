import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import PageHelmet from "../components/PageHelmet";
import ReactMarkdown from "react-markdown";
import "../styles/sponsors-page.scss";

import Layout from "../components/Layout";
import "../styles/home.scss";
import HTMLContent from "../components/Content";

const sponsorLevels = ["Platinum", "Gold", "Silver", "Bronze"];

const NewsItem = ({item}) => (
  <tr className="news-item">
    <td className="date">{item.date}</td>
    <td><ReactMarkdown className="news-text" source={item.text}/></td>
  </tr>
)

const NewsSection = ({items}) => (
  <div className="news-section-wrapper">
    <section className="news-section">
      <h4>Latest News</h4>
      <table className="news-section-list">
        <tbody>
          {items.map(i => <NewsItem item={i} key={i.text}></NewsItem>)}
        </tbody>
      </table>
    </section>
  </div>
)

const SponsorImageLink = (props) => (
  <img className="sponsor-image" src={`/sponsors/${props.sponsor.image}`} alt={props.sponsor.longName} />
)

const SponsorTextLink = (props) => (
  <div className="sponsor-name">{props.sponsor.longName}</div>
)

const Sponsor = (props) => {
  const { sponsor } = props;
  return (
    <a href={sponsor.link} title={sponsor.name}>
      <div className="sponsor-tile" key={sponsor.name}>
        <div className="sponsor-image-helper" />
        {sponsor.image === undefined ? <SponsorTextLink sponsor={sponsor} /> : <SponsorImageLink sponsor={sponsor} />}
      </div>
    </a>
  )
}

const SponsorLevelListing = (props) => {
  const { level, sponsors } = props;
  return (
    <div className={`sponsor-block level-${level.toLowerCase()}`} key={level}>
      <h4 className="sponsor-level">{level} Sponsors</h4>
      <div className="sponsors-at-level">
        {sponsors.map(s => <Sponsor sponsor={s} />)}
      </div>
    </div>
  );
}

const SponsorListing = (props) => {
  const { sponsors } = props;
  return (
    <div className="sponsor-listing">
      {
        sponsorLevels.map(level => {
          const matching = sponsors.filter(s => s.level === level);
          return matching.length ? <SponsorLevelListing level={level} sponsors={matching} /> : null;
        })
      }
    </div>
  );
}

const KeyDateListing = ({ date, dateEnd, dateStartShort, event, formerly }) => (
  <tr className="key-date-info">
    <td className="date">{dateEnd ? `${dateStartShort} – ${dateEnd}` : date}</td>
    <td className="key-date-entry">
      <ReactMarkdown renderers={{paragraph: 'span'}} source={event}/>
      { formerly ? <span className="key-date-formerly"> (was: {formerly})</span>: null }
    </td>
  </tr>
);

const KeyDates = ({ items: dates }) => (
  <div className="key-dates-section-wrapper">
    <section className="key-dates-section">
      <h4>Key Dates</h4>
      <table className="key-date-table">
        <tbody>
          {dates.map(d => <KeyDateListing {...d} key={d.event}/>)}
        </tbody>
      </table>
      <span className="extra-date-info">
        <p><strong>Updated April 8th, 2020</strong> – the above dates have all been updated to reflect the new scheduled dates EMNLP in its online format.</p>
        <p>See the <a href="/call-for-papers">call for papers</a> for further important details about the submission process</p>
      </span>
    </section>
  </div>
);

export const HomePageTemplate = ({ home, sponsors }) => {
  return (
    <>
      <section className="header">
        <div className="header-container container">
          {home.headerImage && 
            <img className="header-image" src={home.headerImage.image} alt={home.headerImage.imageAlt} />
          }
          <div className="header-text" title="Image Credit: NASA">
            <h3 className="header-name">{home.title}</h3>
            <h4 className="header-tagline">
              <HTMLContent className="header-taglinePart" content={home.description}/>
            </h4>
            <div className="header-extra-info">
              {home.extraInfo.map((ei, idx) => <p key={idx}>{ei}</p>)}
            </div>
          </div>
        </div>
      </section>
      <NewsSection items={home.newsItems}/>
      <KeyDates items={home.keyDates}/>
      <section className="sponsors">
        <SponsorListing sponsors={sponsors} />
      </section>
     </>
  );
};

class HomePage extends React.Component {
  render() {
    const { data } = this.props;
    const {
      data: { footerData, navbarData, site },
    } = this.props;
    const { frontmatter: home } = data.homePageData.edges[0].node;
    const { sponsors } = site.siteMetadata;
    return (
      <Layout footerData={footerData} navbarData={navbarData} site={site}>
        <PageHelmet page={{frontmatter: home}} />
        <HomePageTemplate home={home} sponsors={sponsors} />
      </Layout>
    );
  }
}

HomePage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default HomePage;

export const pageQuery = graphql`
  query HomePageQuery {
    ...LayoutFragment
    homePageData: allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "home-page" } } }) {
      edges {
        node {
          frontmatter {
            title
            description
            extraInfo
            seo {
              browserTitle
              title
              description
            }
            newsItems {
              date(formatString: "MMMM Do, YYYY")
              text
            }
            keyDates {
              date(formatString: "MMMM Do, YYYY")
              dateEnd(formatString: "MMMM Do, YYYY")
              dateStartShort: date(formatString: "MMMM Do")
              event
              important
              formerly(formatString: "MMMM Do")
            }
          }
        }
      }
    }
  }
`;
