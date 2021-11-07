import React, { Component } from 'react';
import axios from 'axios';
import {ProgressBar, Dropdown} from 'react-bootstrap';
import * as XLSX from "xlsx";
import Dropzone from 'react-dropzone';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
export default class Upload extends Component{
    constructor(props){
        super(props);            
        this.onDrop=this.onDrop.bind(this); 
        this.remove=this.remove.bind(this);                             
        this.state={            
            data:[],
            file:'',               
            mess:'',        
            errorMessage:'',
            percent:0,          
            headers:[],
        }
    }  
remove(){
  this.setState({percent:0,headers:[]})
}


onDrop(files){
    this.setState({file:files[0]})
    const formData = new FormData();
    formData.append('file',this.state.file)


    const reader = new FileReader();
    reader.onload = (evt) => {
    
      const binstr = evt.target.result;
      const wb = XLSX.read(binstr, { type: 'binary' });
  
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
  
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      this.processData(data);}
      reader.readAsBinaryString(this.state.file);

  const options = {
      onUploadProgress: (progressEvent) => {
        const {loaded, total} = progressEvent;
        let percent = Math.floor( (loaded * 100) / total )
        console.log( `${loaded}kb of ${total}kb | ${percent}%` );

        if( percent < 100 ){
          this.setState({ percent: percent })
        }
      },
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials:true
    } 

    axios.post('api/upload', formData,options)      
.then(res=>{
this.setState({data:res.data})
this.setState({mess:"ok"})
 this.setState({ percent: 100 })
})
.catch(err=>{
    this.setState({errorMessage: err.response.data})
    if(this.state.errorMessage!==''){
      alert(this.state.errorMessage)
    }
   this.setState({mess:''})
})

}
 processData(dataString){
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
    console.log(headers)
    this.setState({headers:headers})
  }

render(){
  const {percent}=this.state;
  return (
    <div>
         <div className="container-fluid" id="ms-container"> 
         <div className="uploadform">		                     
                   <Dropzone onDrop={this.onDrop} multiple={false} accept=".csv">
             
        {({getRootProps, getInputProps}) => (
          <section className="container ctr">
            <div {...getRootProps({className: 'dropzone'})}>
              <input {...getInputProps()} />
              <i class="bi bi-plus-circle-fill icolor"></i>
            </div>            
          </section>
        )}
      </Dropzone>
             <div className='ctr'>
        <p>Upload Your File</p>
        </div>  
                <div className='Progress'>      
               {  <ProgressBar striped variant="warning" now={percent} active label={`${percent}%`} /> }         
             </div>
             <div className='ctr'> 
                <p className="pctr">Upload Status</p>
             </div>  
             {this.state.percent===100 &&
             <div className='ctrr'> 
             <div className="ctrbutton">
             <button onClick={this.remove}>Remove File</button>
             </div>
             <NavLink to={{
                    pathname:'/column',
                    state: {header:this.state.headers}  
                        }}>
                     <button>Choose Column</button>
              </NavLink>            
              </div>
}
              </div>        
</div>                             
    </div>
  );
}
}