import React, { Component } from 'react'
import { Dropdown} from 'react-bootstrap';
import axios from 'axios';
export default class Column extends Component {
    constructor(props){

        super(props);
        this.state={
            headers:props.location.state.header,
            column_name:"Choose Column",
             check1:false,
            check2:false,
            mess:'',
        }
         this.handleOnChange1=this.handleOnChange1.bind(this);   
        this.handleOnChange2=this.handleOnChange2.bind(this); 
        this.onSubmit=this.onSubmit.bind(this);
    }
handleOnChange1(e){
    const val=e.target.value
    this.setState({check1:true})
    this.setState({check2:false})
  }
   handleOnChange2(e){
    const val=e.target.value
    this.setState({check2:true})
    this.setState({check1:false})
  }
onSubmit(){
if(this.state.check1||this.state.check2){
const data=this.state.headers;
const options = {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials:true
    } 
axios.post(`api/submit`,data,options)
.then(res=>{
this.setState({mess:res.data})
})
.catch(err=>{
this.setState({mess:''})
})
}
else{
    alert("Please tick checkbox")
}
}

render() {
        return (
            <div>
                <div className="ctr col">
                    <p>Does it contain Headers?</p>
                </div>
                <div className="check">
                <div className="checkbox">
                    <input
                    type="checkbox"
                    id="topping"
                    name="topping"
                    value={true}
                    onChange={this.handleOnChange1}
                    checked={this.state.check1}        
                    />
                    Yes
                </div>
                <div className="checkbox">
                    <input
                    type="checkbox"
                    id="topping"
                    name="topping"
                    value={true}
                    checked={this.state.check2}
                    onChange={this.handleOnChange2}
                    />
                    No
                </div>
                {this.state.check1&& 
        <div className="dropdownbasic">
            <p>Choose the Column Names that contains Text</p>
    <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
            {this.state.column_name}
        </Dropdown.Toggle>

        <Dropdown.Menu>
            {this.state.headers.map(col=>{
            return <>
            <Dropdown.Item onClick={()=>{this.setState({column_name:col})}}>{col}</Dropdown.Item>
            </>
            })}   
        </Dropdown.Menu>
    </Dropdown>
    </div>}                                                          
    </div>
    <div className="mess">
        <p>{this.state.mess}</p>
    </div>
    <div className="btn-emp">
    <button type="submit" onClick={this.onSubmit}>Submit</button>
    </div>
            </div>
        )
    }
}
