import { Card } from "react-bootstrap"
import moment from 'moment'
import { BASE_URL } from "../../config"

const FileTable=({tableCol,data})=>{
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
          {data.map((file,idx)=>{
            return <tr key={idx}>
              <th>{idx+1}</th>
              <td><a href={`${BASE_URL}/files/${file.filename}`}>{file.filename}</a></td>
              <td>{moment(file.createdAt).format('MMMM Do YYYY')}</td>
            </tr>
          })}
        </tbody>
      </table>
    </Card>
  )
}

export default FileTable