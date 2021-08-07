import React from 'react'
import {Link} from 'react-router-dom'
import './Footer.css'

const Footer=()=>{
	return (
		<footer>
			<div className="footer">
        <div className="container-xl">
          <div className="row justify-content-center">             
            <div className="col-12 col-sm-4 links">
              <h5>Quick Links</h5>
							<ul className="list-unstyled">
								<li><Link to="/home">Home</Link></li>
								<li><Link to="/getInvolved">Get Involved</Link></li>
								<li><Link to="/instructor">Become an Instructor</Link></li>
								<li><Link to="/privacy-policy">Privacy Policy</Link></li>
								<li><Link to="/terms-conditions">Terms of Use</Link></li>
							</ul>
						</div>
						<div className="col-12 col-sm-4 links">
              <h5>Queries</h5>
							<ul className="list-unstyled">
								<li><Link to="/project-types">Learn about T1 and T2 courses</Link></li>
								<li><Link to="/referral-rules">Learn about referral</Link></li>
							</ul>
						</div>
						<div className="col-12 col-sm-4 align-self-center">
							<div className="text-center">
								<a className="social-icon" href="http://www.linkedin.com/in/"><i className="fa fa-linkedin"></i></a>
								<a className="social-icon" href="mailto:"><i className="fa fa-envelope-o"></i></a>
							</div>
						</div>
					</div>
					<div className="row justify-content-center">             
						<div className="col-auto copyright align-self-center">
							<p>© Copyright 2021 Spartificial</p>
						</div>
					</div>
        </div>
      </div>		
		</footer>
	)
}

export default Footer;