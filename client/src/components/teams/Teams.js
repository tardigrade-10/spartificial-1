import React from "react";
import './Teams.css'
import {useSelector} from 'react-redux'

const Teams=()=>{
  const teams=useSelector(state=>state.teams.teams)
  //console.log(teams)
  return(
    <div id="teams">
			<div className="hero">
				<div className="title">
					<h4>Our Teams</h4>
					<h1>Teams is a collaboration<br/> platform that unifies chat, <br/>voice, video and file sharing.</h1>
				</div>
      </div>
      <div className="container">
        <div className="row" style={{padding:'40px 0 0 0'}}>
					<div className="col-12 text-center">
						<div className="teams-heading">
							<h2>Mentors/Instructors</h2>
						</div>
					</div>
				</div>
				<div className="row">
					{teams?(
						teams.map((val,idx)=>{
							return(
								<div className=" col-sm-4 col-md-3 col-12  card-group text-center" key={idx}>
									<div class="card text-center">
                    <div className="card-inner">
                      <div class="card-body">
                        <div className="card-front">
                          <img src={val.image} class="img-fluid" alt="..."/>
                          <h5 class="card-title">{val.name}</h5>
                          <h6>{val.designation}</h6>
                        </div>
                        <div className="card-back">
                          <p className="card-text">{val.about}</p>
                          <a href={`mailto:${val.email}`}><span className="fa fa-envelope"></span></a>
                          <a href={`tel:${val.phone}`} ><span className="fa fa-phone"></span></a>
                          <a href={val.facebook?val.facebook:"#"}><span className="fa fa-facebook"></span></a>
                          <a href={val.instagram?val.instagram:"#"} rel="noopener noreferrer"><span className="fa fa-instagram"></span></a>
                        </div>
                      </div>
                    </div>
									</div>					
								</div>
							)
						})
					):(<></>)}
				</div>
      </div>
    </div>
  )
}
export default Teams