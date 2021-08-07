import React, { useState } from 'react'
import logo from '../../assets/images/logoname.png'
import './Home.css'
import About from '../about/About'
import { Link } from 'react-router-dom'
const Home = () => {
  const [isMobile, setIsMobile] = useState(false)
  window.addEventListener("resize", function () {
    if (window.innerWidth < 700) {
      setIsMobile(true)
    }
    else setIsMobile(false)
  });

  const aims = [
    {
      "_id": "1",
      "heading": "For Better Future",
      "paragraph": "Finding and identifying practical applications of AI to advance the Sustainable development Goals and scale those solutions for global impact. These small solutions and initiatives are the stepping stones to the better future.",
      "image": "https://i1.wp.com/www.un.org/sustainabledevelopment/wp-content/uploads/2015/12/english_SDG_17goals_poster_all_languages_with_UN_emblem_1.png?fit=728%2C451&ssl=1"
    },
    {
      "_id": "2",
      "heading": "Path to Innovation",
      "paragraph": "Spartificial is a community of like-minded intellectuals that share a common zeal for exploring the world of Impactful Artificial Intelligence.",
      "image": "./1.jpeg"
    },
    {
      "_id": "3",
      "heading": "Collaboration",
      "paragraph": "You'll meet and interact with passionate future scientists and work as a team to complete complex projects and push your own limits of knowledge. Like the Cosmos, Spartificial is an open space that welcomes anyone interested.",
      "image": "./2.jpeg"
    },
    {
      "_id": "4",
      "heading": "Research",
      "paragraph": "It is a place where not just people meet but their minds meet to indulge in some of the most advanced and kick-ass research projects concerning Space Science and AI, whilst also having fun learning and discovering together.",
      "image": "./3.jpeg"
    },
  ]
  // const hp=[
  //   {
  //     "_id":1,
  //     "title":"Project",
  //     "image":"https://espaitic.upc.edu/en/shared/icons/project.png/@@images/79e8ccc3-b4f1-4295-9b2e-baa1c5a9ca16.png"
  //   },
  //   {
  //     "_id":2,
  //     "title":"Project",
  //     "image":"https://espaitic.upc.edu/en/shared/icons/project.png/@@images/79e8ccc3-b4f1-4295-9b2e-baa1c5a9ca16.png"
  //   },
  //   {
  //     "_id":3,
  //     "title":"Project",
  //     "image":"https://espaitic.upc.edu/en/shared/icons/project.png/@@images/79e8ccc3-b4f1-4295-9b2e-baa1c5a9ca16.png"
  //   },
  //   {
  //     "_id":4,
  //     "title":"Project",
  //     "image":"https://espaitic.upc.edu/en/shared/icons/project.png/@@images/79e8ccc3-b4f1-4295-9b2e-baa1c5a9ca16.png"
  //   },
  //   {
  //     "_id":5,
  //     "title":"Project",
  //     "image":"https://espaitic.upc.edu/en/shared/icons/project.png/@@images/79e8ccc3-b4f1-4295-9b2e-baa1c5a9ca16.png"
  //   },
  //   {
  //     "_id":6,
  //     "title":"Project",
  //     "image":"https://espaitic.upc.edu/en/shared/icons/project.png/@@images/79e8ccc3-b4f1-4295-9b2e-baa1c5a9ca16.png"
  //   }
  // ]
  return (
    <div className="home" id="home">
      <div className="hero-image">
        <div className="title">
          {/* <h3>Welcome to</h3>
          <h1>Spartificial</h1> */}
          <img src={logo} alt="..." className="img-fluid" />
          <h1>A complete project based-learning platform</h1>
          <Link to="/projects"><button className="btn btn-sm btn-outline-danger"><strong>All Projects</strong></button></Link>
        </div>
        <div className="arrow bounce">
          <a className="fa fa-arrow-down fa-2x" href="/#hp"></a>
        </div>
      </div>
      {/* <div className="home-project" id="hp">
        <div className="container pb-2">
          <div className="row justify-content-center">
            <h1>Trending projects</h1>
          {
            hp.map(value=>{
              return(
              <div className="col-4 col-sm-3 col-md-3 col-xl-2" key={value._id}>
                <div className="hp-card">
                  <img className="img-fluid" src={value.image} alt="..."/>
                  <h6><strong>{value.title}</strong></h6>
                  <small><strong></strong></small>
                  <Link to={`/projects/${value._id}`}><small><strong>Learn More</strong></small></Link>
                </div>
              </div>
              )
            })
          }
          </div>
          <div className="row">
            <div className="col text-center">
            <Link to="/projects"><button className="btn btn-success"><strong>More Projects</strong></button></Link>
            </div>
          </div>
        </div>
      </div> */}
      <div className="story" id="story">
        <div className="container p-5">
          <div className="row">
            <div className="col-12">
              <h5 className="story-head">We wanted to build an enthusiastic community that loves Space tech, support sustainable future and Artificial Intelligence; where we meet people, "Our Minds Meet" and we indulge in some of the most important, advanced and kick-ass research projects for betterment of humanity, and have fun working on them</h5>
            </div>
          </div>
          <div className="row p-5">
            <div className="col-12 text-center">
              <h1>So, we started <span>Sp</span>ARTIFICIAL</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <h5 className="story-foot">SPARTIFICIAL is an open space like the cosmos to meet some of the most intelligent, innovative and creative people. Here, we give an opportunity to meet nerds like you and work in teams on different interesting and highly complex projects.</h5>
            </div>
          </div>
        </div>
      </div>
      <div id="home-div">
        <div className="container">
          {
            aims.map((value) => {
              return (
                <div className="card" key={value._id}>
                  <div className="row g-0">
                    <div className={value._id % 2 === 0 && (!isMobile || window.innerWidth > 700) ? "col-md-6 text-center align-self-center order-last" : "col-md-6 text-center align-self-center order-first"}>
                      <div className="card-body">
                        <h1 className="card-title">{value.heading}</h1>
                        <p className="text-center">{value.paragraph}</p>
                      </div>
                    </div>
                    <div className="col-md-6 text-center align-self-center">
                      <img loading="lazy" width="auto" className="img-fluid" src={value.image} alt="..." />
                    </div>
                  </div>
                </div>

              )
            })
          }
        </div>
      </div>
      <div className="success">
        <div className="container">
          <div className="row">
          <div className="col-sm-5 offset-sm-1 align-self-center">
            <h2 className="text-center">Success</h2>
            <h6 className="text-center">"Would you like me to give you a formula for success? It’s quite simple, really: Double your rate of failure. You are thinking of failure as the enemy of success. But it isn’t at all. You can be discouraged by failure or you can learn from it, so go ahead and make mistakes. Make all you can. Because remember that’s where you will find success."</h6>
          </div>
          <div className="col-sm-5 align-self-center">
            <img className="img-fluid" src="https://lh6.googleusercontent.com/D6XPD9N_0eNmQ7QAyWaHdkS_ftEFGd9fJixVrAbdLX9kl6aK05nMPoRhedvnUpxwMmk2RDjNUt-IJnYKnUbrTck3PSBQYQk9peSmjivan2bzuG32xx09diZJHNWz6uMb4A=w1280" alt="..."/>
          </div>
          <div className="col-1"></div>
          </div>
        </div>
      </div>
      <div className="suggestion mb-2">
        <div className="container p-5">
          <div className="row justify-content-center">
            <div className="col-sm-6">
              <h5>Are you confused, which project to choose?</h5>
              <h6> Contact our experts and get suggestion for projects best for you.</h6>
            </div>
            <div className="col-sm-6 align-self-center text-center">
              <button className="btn btn-outline-dark btn-lg">Click Here</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home