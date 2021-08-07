import { Card } from "react-bootstrap"
import moment from 'moment'

const PaymentTable=({tableCol,data})=>{
  return(
    <Card className="table-responsive">
      <table className="table table-hover table-sm table-striped table-bordered">
        <thead>
          <tr>
            {tableCol.map((val,idx)=>{
              return <th key={idx}>{val}</th>
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((payment,idx)=>{
            return <tr key={idx}>
              <th>{idx+1}</th>
              <td>{payment.orderId}</td>
              <td>{payment.paymentId}</td>
              <td>{payment.projectId}</td>
              <td>{payment.amount}</td>
              <td>{payment.message}</td>
              <td>{moment(payment.createdAt).format('MMMM Do YYYY')}</td>
            </tr>
          })}
        </tbody>
      </table>
    </Card>
  )
}

export default PaymentTable