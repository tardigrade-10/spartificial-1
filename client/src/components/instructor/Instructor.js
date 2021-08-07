import React, { useState } from 'react'
import './Instructor.css'
import JoinUs from './JoinUs'
import SubmitProject from './SubmitProject'

const Instructor=()=>{
  const faqs=[
    {
      "id":1,
      "question":"Who can become an instructor at Spartificial?",
      "answer":"Spartificial instructor are research students, working professionals, experts, and subject matter enthusiasts. Anyone can submit their ideas for the project, after evaluation, our team will contact you and discuss further details regarding the project. OR you can share only your experiences and interests with us and we can together develop a project."
    },
    {
      "id":2,
      "question":"What topics do research fellowship program covers?",
      "answer":"Spartificial invite instructors who can provide guidance for Machine learning research fellowship to interested students in the areas of Space-technology, social-good and Sustainable development. Any real-world machine learning project under this criteria and that can be taught to students via online medium is eligible."
    },
    {
      "id":3,
      "question":"Do you offer any resources for instructors in building the projects?",
      "answer":"Yes, we do provide some resources and access to datasets for developing the projects if required."
    },
    {
      "id":4,
      "question":"What's included in a Spartificial research fellowship projects?",
      "answer":"Spartificial projects work on a shared workspace of instructors and students. It includes doubt sessions, important topics sessions and regular meeting for discussions. The main aim is to guide students from start to end, make them understand the whole concept behind the project through any resources or help required, evaluate their reports and proceed accordingly."
    },
    {
      "id":5,
      "question":"How can I earn money?",
      "answer":"You’ll earn money through monthly royalties based on the number of students enroll in your project. Please refer 'Spartificial-Instructors Revenue Share'."
    },
    {
      "id":5,
      "question":"Do I need to promote my projects?",
      "answer":"Please refer 'Spartificial-Instructor Revenue Share'."
    },
  ]
  const [show,setShow]=useState(false);
  const handleModal=(status)=>{
    setShow(status)
  }
  const [showP,setShowP]=useState(false);
  const handleModalP=(status)=>{
    setShowP(status)
  }

  return (
    <div className="instructor">
      <div className="hero">
        <div className="hero-text text-center p-5">
          <h1>Become an Instructor</h1>
          <h6>Become an Instructor on Spartificial and share your research with students around the world.</h6>
        </div>
      </div>
      <div className="container p-5 why">
        <div className="row">
          <div className="col">
            {/* <h2 className="text-center p-2"><strong>Why become Spartificial's Instructor?</strong></h2> */}
            <h5 className="text-center p-1">At Spartificial, we are working on different real-world projects mainly in the field of space-tech, social good and sustainable development. <br/>We believe by working on such projects, students as well as instructors can connect more intuitively with the ideas and work harder for better results because these projects may become the stepping stones for the better future.</h5>
          </div>
        </div>
      </div>
      <div className="container works">
        <div className="row">
          <div className="col">
            <h3 className="text-left pb-4"><strong>How it Works?</strong></h3>
          </div>
        </div>
        <div className="row">
        <div className="col-sm-4 col-12">
            <div className="work-card p-3">
              <img src="https://lh3.googleusercontent.com/B3L4yCmXciWFGZkZWREv3uXuWmv5tJoJOzNOXNCg3KbClzKIMdOm9qriEC2pBLiTRDdudrzyLV8I-RRMXNXqu_8wn6aGq0rmM3j5pVycQLJEpgZRNTyfB5Nzl3HdiuHPfw=w1280" alt="..." className="img-fluid"/>
              <h5 className="p-2"><strong>Submit your ideas</strong></h5>
              <p>Connect with us and and share your project idea, we'll discuss the project over a call and decide duration, fees etc.</p>
              <a></a>
            </div>
          </div>
          <div className="col-sm-4 col-12">
            <div className="work-card p-3">
              <img src="https://images.ctfassets.net/0sb929keftek/o4aUykmCQI7b1Tkh59Nh3/c1f779091ad3df96f2291dcbd53e6950/Touchtribe-team-in-overleg.jpg?w=375&q=80" alt="..." className="img-fluid"/>
              <h5 className="p-2"><strong>Build Projects</strong></h5>
              <p>If you want to build a project with us, just share your interests and experiences, after mutually deciding, we will start working on the project.</p>
              <a></a>
            </div>
          </div>
          <div className="col-sm-4 col-12">
            <div className="work-card p-3">
              <img src="https://lh3.googleusercontent.com/JQ15kSq4izbHqgdw9KqCxH4kZNV2N_fbqZRKj8I0wj8oe_1twTljLcJybPsq49PjGqQBpLUvQ6cHsc_eUQl5qiqdGvaJ_Ki2Zn4983k-YRrNoml5CXuZKCMgmpdGOGWGMw=w1280" alt="..." className="img-fluid"/>
              <h5 className="p-2"><strong>Start mentoring</strong></h5>
              <p>After building the project, do participate in our mentor training program. After the training, we will publish your project and start enrolling students.</p>
              <a></a>
            </div>
          </div>
        </div>
      </div>
      <div className="container works">
        <div className="row">
          <div className="col">
            <h3 className="text-left pb-4"><strong>Spartificial-Instructor revenue share</strong></h3>
          </div>
        </div>
        <div className="row p-2">
          <div className="col-sm-6 col-12 p-1">
            <h6><strong>When you submit your own developed project:</strong></h6>
            <ul className="list-styled" style={{color:'rgb(87, 5, 5)'}}>
              <li>If you promote a project via any promo code or referral link, you will receive 90% of the revenue when the student enroll in your project.</li>
              <li>Enrollments occurring through Spartifical's Promotion or discovery on the platform, you will receive 50% of the revenue generated.</li>
            </ul>
          </div>
          <div className="col-sm-6 col-12 p-1">
            <h6><strong>When you develop a project with our team:</strong></h6>
            <ul className="list-styled" style={{color: 'rgb(87, 5, 5)'}}>
              <li>If you promote a project via any promo code or referral link, you will receive 80% of the revenue when the student enroll in your project.</li>
              <li>Enrollments occurring through Spartifical's Promotion or discovery on the platform, you will receive 40% of the revenue generated.</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="ready-instr">
        <JoinUs show={show} handleModal={handleModal}/>
        <SubmitProject show={showP} handleModal={handleModalP}/>
        <div className="container text-center p-3">
          <h3 className="pb-1"><strong>Ready to Start?</strong></h3>
          {/* <h5><strong><a href="#" className="text-light">Create your project</a> and share your skills with millions of members today.</strong></h5> */}
          <div className="p-3 pb-4">
            <button className="btn btn-success m-1" onClick={()=>handleModal(true)}>Join US</button>
            <button className="btn btn-primary m-1" onClick={()=>handleModalP(true)}>Start a Project</button>
          </div>
        </div>
      </div>
      <div className="faq">
        <div className="container p-3">
          <div className="row">
            <div className="col">
              <h2 className="text-left pb-2"><strong>Frequently Asked Questions</strong></h2>
            </div>
          </div>
          <div className="row">
          {faqs.map(value=>{
            return(
              <div className="col-md-6 col-12 align-self-center" key={value.id}>
                <h6 className=""><strong>{value.question}</strong></h6>
                <p>{value.answer}</p>
              </div>
            )
          })}
          </div>
          <div className="row">
            <div className="col text-center p-3">
              <h5><strong>Why do Spartificial have impactful projects only?</strong></h5>
              <p>At Spartificial, we believe in learning by doing, that’s why Spartificial works on project-based learning methodologies. Our projects are related to social issues and impactful technologies. We believe that there is an urgent need to seriously start engaging students in these issues.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Instructor