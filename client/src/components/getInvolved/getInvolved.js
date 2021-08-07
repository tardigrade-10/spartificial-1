import React, { useState } from 'react'
import axios from 'axios'
import './getInvolved.css'
import {Modal} from 'react-bootstrap'
import InvolvedModal from '../addons/getInvolvedModal'
import {Link} from 'react-router-dom'
import { BASE_URL, RZP_KEY } from '../../config'

const GetInvolved=()=>{
	const [isMobile,setIsMobile]=useState(false)
	window.addEventListener("resize", function() {
		if (window.innerWidth < 700) {
			setIsMobile(true)	
		}
		else setIsMobile(false)
	});

		/***************Payment**************** */

	const [paymentData,setPaymentData]=useState({amount:100,reciept:Date.now()})

	const [show,setShow]=useState(false)

	const loadScript=(src)=>{
    return new Promise((resolve)=>{
      const script=document.createElement("script");
      script.src=src;
      script.onload=()=>{
        resolve(true);
      }
      script.onerror=()=>{
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }
  async function displayRazorpay(e){
    e.preventDefault()
    const res=await loadScript("https://checkout.razorpay.com/v1/checkout.js")
    if(!res){
      alert("Razorpay SDK failed to load!")
      return;
    }
		paymentData.amount=paymentData.amount*100
    const result=await axios.post(BASE_URL+"payments/orders",paymentData);
    if(!result){
      alert("Server error!!!")
      return;
    }
		setPaymentData({amount:100,reciept:Date.now()})
    //console.log(result.data)
    const {amount,id:order_id,currency}=result.data;
    const options = {
      key: RZP_KEY, // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "Spartificial",
      description: "",
      image: "./logo192.png",
      order_id: order_id,
      handler: async function (response) {
          const data = {
              orderCreationId: order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
							amount:amount/100
          };

          const result = await axios.post(BASE_URL+"/payments/success", data);

          alert(JSON.stringify(result.data));
      },
      notes: {
          address: "Spartificial",
      },
    };
		setShow(false)
    const paymentObject=new window.Razorpay(options)
    paymentObject.open()
  }

	const [addOn,setAddOn]=useState({title:'',show:false,appType:''})
	return (
		<div className="getInvolved">
			<Modal backdrop="static" show={show} onHide={()=>setShow(false)}>
				<Modal.Header>Select an Amount</Modal.Header>
				<form onSubmit={displayRazorpay}>
					<Modal.Body>
						<div className="payment">
							<label htmlFor="amount">Amount</label>
							<input id="amount" required type="number" name="amount" value={paymentData.amount} onChange={(e)=>setPaymentData({...paymentData,amount:e.target.value})} placeholder="Amount"/>
						</div>
						<div className="refund text-center p-3">
							<small className="text-muted">By paying you agree to our <a href="#refund">Refund Policy</a>. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac</small>
						</div>

					</Modal.Body>
					<Modal.Footer>
						<button className="btn btn-danger" type="button" onClick={()=>setShow(false)}>Cancel</button>
						<button className="btn btn-primary" type="submit">Pay {paymentData.amount}</button>
					</Modal.Footer>
				</form>
			</Modal>
			<InvolvedModal show={addOn.show} onHide={()=>setAddOn({show:false,appType:'',title:''})} appType={addOn.appType} title={addOn.title}/>
      <div className="hero">
				<div className="title">
					<h4>Get Involved</h4>
					<h1>Join our efforts<br/>to develop AI for the<br/>benefit of everyone.</h1>
				</div>
      </div>
			<div className="container-xl">
			<div className="row align-items-center">
					<div className="col-sm-6 align-self-start">
						<div className="image">
							<img className="img-fluid" alt="..." src="https://cdn.mentorcruise.com/img/undraw_reviewed_docs_neeb.svg"/>
						</div>
					</div>
					<div className={isMobile?("col-sm-6 align-self-center"):("col-sm-6 align-self-center order-first")}>
						<h3 id="heading">Become an Instructor</h3>
						<div className="decription">
							<p>Find a mentoring opportunity today! Using the Spartificial, submit your project for review and gt approved by our experts to become a mentor.</p>
						</div>
						<Link to="/instructor">
							<button className="partner-button button" >Become an Instructor</button>						
						</Link>
					</div>
				</div>

				<div className="row align-items-center">
					<div className="col-sm-6 align-self-start">
						<div className="image">
							<img className="img-fluid" alt="..." src="https://ai4good.org/wp-content/plugins/phastpress/phast.php/c2VydmljZT1pbWFnZXMmc3JjPWh0dHBzJTNBJTJGJTJGYWk0Z29vZC5vcmclMkZ3cC1jb250ZW50JTJGdXBsb2FkcyUyRjIwMjAlMkYxMCUyRmdldGludm9sdmVkLWRvbmF0ZS0xMDI0eDU3Ni5qcGcmY2FjaGVNYXJrZXI9MTYxMDY0MTcwMS0xMDI1NTgmdG9rZW49ZGYyMjZmNzA5OGJiOTFkOQ.q.jpg"/>
						</div>
					</div>
					<div className="col-sm-6 align-self-center">
						<h3 id="heading">Support Us</h3>
						<div className="decription">
							<p>Help us in identifying different problems which can be solved using machine learning and data science</p>
						</div>
						<button disabled onClick={()=>setShow(true)} className="support-button button"> 
							Share your ideas
						</button>
					</div>
				</div>
				<div className="row align-items-center">
					<div className="col-sm-6 align-self-start">
						<div className="image">
							<img className="img-fluid" alt="..." src="https://cdn.zaggle.in/images/web/zaggle/landing/partner-with-us.jpg"/>
						</div>
					</div>
					<div className={isMobile?("col-sm-6 align-self-center"):("col-sm-6 align-self-center order-first")}>
						<h3 id="heading">Partner with us on projects</h3>
						<div className="decription">
							<p>We are looking to team up with Corporates, Academic Institutions, Government Agencies, Nonprofits and others to collaborate with us on AI and Machine Learning Projects and Policy to make a meaningful, global impact.</p>
						</div>
						<button className="partner-button button" onClick={()=>setAddOn({...addOn,show:true,appType:'Partnership',title:'Partner with us on projects'})}> 
							Let's Partner
						</button>
					</div>
				</div>
				<div className="row align-items-center">
					<div className="col-sm-6 align-self-start">
						<div className="image">
							<img className="img-fluid" alt="..." src="https://media.istockphoto.com/photos/woman-hands-holding-piece-of-cardboard-with-words-volunteers-needed-picture-id1087246444?k=6&m=1087246444&s=612x612&w=0&h=SyzlpfbbxuUnOhekEMOjif-uidZ3KEGWroWt4TCoXAY="/>
						</div>
					</div>
					<div className="col-sm-6 align-self-center">
						<h3 id="heading">Volunteer to lead the change</h3>
						<div className="decription">
							<p>Join a team of people driven to design, build and orchestrate innovative AI and Machine Learning research and projects that will shape the future of global policy.</p>
						</div>
						<button className="apply-button button" onClick={()=>setAddOn({...addOn,show:true,appType:'Volunteer',title:'Volunteer to lead the change'})}> 
							Apply now
						</button>
					</div>
				</div>
			</div>
					
		</div>
	)
}

export default GetInvolved;