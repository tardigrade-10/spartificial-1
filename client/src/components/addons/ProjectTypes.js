import React from 'react'
import '../legal/Legal.css'
const ProjectTypes=()=>{
  return(
    <div className="container" id="legal">
      <h1 className="text-center p-3 pb-5">About different training options</h1>
      <div className="row">
        <div className="col p-4">
          <h1><strong>We have two kinds of project enrolment options:</strong></h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas cursus posuere nulla. Nam quis magna dapibus, consectetur tellus quis, eleifend ante.</p>
        </div>
      </div>
      <div className="row">
        <div className="col p-4 table-responsive">
          <table className="table table-sm table-bordered table-hover">
            <thead>
              <tr>
                <th>Features</th>
                <th>T1</th>
                <th>T2</th>
              </tr>
            </thead>
            <tbody>
            <tr>
                <td>Training Resources</td>
                <td>Yes</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Extra sessions for prerequisites</td>
                <td>Yes</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Doubt Solving</td>
                <td>Yes</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Discussion forum</td>
                <td>Yes</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Project Meetings</td>
                <td>Yes</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Training Certificate</td>
                <td>Yes</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Training Feedback Report</td>
                <td>Yes</td>
                <td>No</td>
              </tr>
              <tr>
                <td>Paid Research Internship Offer((based on Feedback report))</td>
                <td>Yes</td>
                <td>No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="row pb-5">
        {/* <div className="col p-4">
          <h1><strong>Refer new Spartificial Mentors (Open for all):</strong></h1>
          <p>Get 100%* of project registration fees for every new mentor you bring when they publish their first project. No commission sharing option will be provided by Spartificial between referral and referee.</p>
          <p><strong>Note: </strong>Full registration fees of one student without discount.</p>
        </div> */}
      </div>
    </div>
  )
}

export default ProjectTypes