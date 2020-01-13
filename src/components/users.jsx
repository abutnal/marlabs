import React, {Component} from 'react';
import './users-style.css';
import { fetchUser, deleteUser, filterUser } from '../store/actions';
import { connect }  from 'react-redux';
import {Table, Card, Form, Group,Row,Col} from 'react-bootstrap';
import Select from 'react-select';
import ReactTooltip from 'react-tooltip'
 
const options = [
  { value: 'all', label: 'All Requests' },
  { value: 'Denied', label: 'Denied' },
  { value: 'Pending', label: 'Pending' },
  { value: 'Approved', label: 'Approved' },
];



class Users extends Component{
	  
    state = {
    selectedOption: null,
  };


  handleChange = selectedOption => {
    this.setState({ selectedOption });
    
    // console.log(`Option selected:`, selectedOption);
    this.filterData(selectedOption);
    
  };

   filterData(selectedOption){
    // console.log(selectedOption);
     this.props.filter_user(selectedOption);
   }

   
	
   componentDidMount(){
     this.props.fetch_User();
   }

    deleteData(e){
    	e.preventDefault();
       const user_id = e.target.id;
       this.props.delete_user(user_id);
    }

    changeStatus(e){
         e.preventDefault();
        console.log('Hello dear');
    }
   

	render(props){
             
    const { selectedOption } = this.state;
             
    const userData = this.props.users;    
	
const sortedUsers = 	userData.sort(function (a, b) {
	
    var key1 = a.updated_at;
    var key2 = b.updated_at;

    if (key1 > key2) {
        return -1;
    } else if (key1 == key2) {
        return 0;
    } else {
        return 1;
    }
});


const arr = [{status:'Denied'}, {status:'Pending'}, {status:'Approved'} ];
const len = arr.length -1;
var opt=[];  
 const userTable = sortedUsers.map((user)=>{
      const opt =  arr.filter((upStatus)=>{
         // console.log(upStatus.status);
           return upStatus.status != user.status;
        })


      return (
      <tr key={user.id}>
      <td>{user.title}</td>
      <td> 
        <a  className="text-success" data-event="click" data-tip={'<a href="">'+opt[0].status+'</a><br/><a href="">'+opt[1].status+'</a>'}   data-place="right"  > {user.status}
        <ReactTooltip html={true}  className="react-tooltip-clickable-link"    effect="solid"/>
      </a>
      </td>
      <td>{user.created_at}</td>
      <td>{user.updated_at}</td>
      <td> <a href="" className="text-danger" onClick={this.deleteData.bind(this)} id={user.id} >Delete</a></td>
    </tr>
        );
 })


		return(<div className="body">
					<h1>Requests</h1>


					
<Card body bg="light" className="mb-4 border-light">

<Row>
	<Col md={3} className="text-right mt-3">Filter by Status: </Col>
	<Col md={4} className="mt-2">
	

  <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
      />
	</Col>
</Row>
 

</Card>

<Table striped bordered hover size="sm">
  <thead>
    <tr>
      <th>Title</th>
      <th>Status</th>
      <th>Created</th>
      <th>Updated</th>
      <th>Deleted</th>
    </tr>
  </thead>
  <tbody>
  {userTable}
  </tbody>
</Table>

		</div>);
	}
}

const mapStateToProps = state =>{
	return{ users: state.users }
}

const mapDispatchToProps = dispatch =>{
	return {
		fetch_User: () => {
			dispatch(fetchUser).then().catch(err=>{
				console.log(err);
			})
		},

    delete_user: (user_id) =>{
      dispatch(deleteUser(user_id));
    },

    filter_user: (selectedOption)=>{
      dispatch(filterUser(selectedOption));
    }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);