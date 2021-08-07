import React from 'react'
import '../legal/Legal.css'
const ReferralRules=()=>{
  return(
    <div className="container referral" id="legal">
      <h1 className="text-center p-5"> Sales and Referral Terms</h1>
      {/* <div className="row">
        <div className="col p-4">
          <h1><strong>For Mentors:</strong></h1>
          <p>Get 90% extra of project registration fees for every student who enroll through your referral link or coupon. You will decide the discount student get through referral link. Spartificial’s share will be 10% of the original registration fees.</p>
        </div>
      </div> */}
      <div className="row">
        <div className="col p-4">
          <h1><strong>Refer new student (Open for all):</strong></h1>
          <p>Get 25% of project registration fees for every student you bring who enroll in many project. It will be shared between referrer and referee. Commission sharing ratio will be decided by referrer.</p>
          <p><strong>Note: </strong>You will not get the amount if you yourself enroll with your own referral link.</p>
        </div>
      </div>
      <div className="row pb-5">
        <div className="col p-4">
          <h1><strong>Refer new Spartificial Mentors (Open for all):</strong></h1>
          <p>Get 100%* of project registration fees for every new mentor you bring when they publish their first project. No commission sharing option will be provided by Spartificial between referral and referee.</p>
          <p><strong>Note: </strong>Full registration fees of one student without discount.</p>
        </div>
      </div>
    </div>
  )
}

export default ReferralRules