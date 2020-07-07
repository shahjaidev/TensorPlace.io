import React, { Component } from "react";
import HeroSection from '../components/Home/HeroSection';
import ProductList from '../components/Home/ProductList';

class Home extends Component {
  render() {
    return (
      <>
        <HeroSection />
        <div className="container">
          <div className="main-content trending">
            <div className="home-top-section">
              <div className="page-title text-center">
                <h1>About TensorPlace</h1>
              </div>
              <div className="text-center mb-4">
                <h4>Our current offering</h4>
                <div className="about-us text-center">
                  <p>Developing and deploying a specialized machine learning project is hard. Lack of documentation, code structure and the sheer amount of ‘noise’ make it difficult to get something useful. TensorPlace can greatly reduce your end-to-end development time by providing a one-stop platform to search for well-documented, high-quality, specialized repositories.</p>
                  <p>We’re building a developer2developer marketplace where as a developer, you can purchase a repository along with 20 minutes of the original data scientist or ML engineer’s time to walk you through the codebase and guide you through how to integrate into your project.</p>
                </div>
              </div>
              <div className="text-center mb-4">
                <h4>Verifiable Reputations</h4>
                <div className="about-us text-center">
                  <p>Leveraging the benefits of the Hyperledger Fabric blockchain, we publish all anonymized transactions and reviews on a permission ledger. This enables the trustless calculation of reputation metrics through a Smart Contract for both a repository as well as an overall one for the developer, with the option for users to easily verify the legitimacy of someone’s reputation through SC methods. Portal search results will be directly dependent on these metrics, enabling greater transparency and incentive for ‘sellers’ on the marketplace to push high quality commits. Furthermore, ML developers can use these comprehensive metrics when claiming the impact of their work in the community or talking to potential employers.</p>
                </div>
              </div>

            </div>
            <div className="home-top-section">
              <div className="page-title text-center">
                <h1>TensorPlace Trending</h1>
              </div>
              {/* <div className="about-us text-center">
                <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the
                          more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word.</p>
              </div> */}
            </div>
            <div className="treding-list-filter">
              <div className="row">
                {/* <div className="col-md-4 col-lg-3 mb-4">
                  <h5 className="sidebar-tilte">Filters</h5>
                  <Sidebar />
                </div> */}
                <div className="col-lg-12">
                  <ProductList />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Home;