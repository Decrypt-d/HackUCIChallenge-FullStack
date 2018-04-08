//Note that there will be a warning for key in react but that warning is irrelevant because by default react uses the index as key.

import React from 'react';
import ReactDOM from 'react-dom';

//Note that there will be a warning for key in react but that warning is irrelevant because by default react uses the index as key.

const endpoint = "http://localhost:3000/api/addEmail";

class DropDownMenu extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {shouldShowDropDown: false};
  }
  handleInterestInput()
  {
    this.setState({shouldShowDropDown: !this.state.shouldShowDropDown});
  }
  
  handleItemClicked(item)
  {
    this.setState({shouldShowDropDown: !this.state.shouldShowDropDown});
    this.props.selectInterest(item);
  }
  
  render()
  {
    return (<div className="inputBox interestInput" onClick ={() => this.handleInterestInput()}>
        {this.props.currentInterest === "" ? "Interested in..." : this.props.currentInterest}
        <span><img className="dropDownArrow" src="https://image.flaticon.com/icons/svg/60/60995.svg"/> </span>
        {this.state.shouldShowDropDown && <div className="dropDownBox">
          {this.props.items.map(item => <div onClick={() => this.handleItemClicked(item)}>{item}</div>)}
        </div>}
        </div>);
  }
}


class SignupForm extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {Email: "", currentInterest: "", shouldDisplayError:false};
    this.updateCurrentInterest = this.updateCurrentInterest.bind(this);
  }
  
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
  
  updateCurrentInterest(newInterest)
  {
    this.setState({currentInterest: newInterest });
  }
  
   handleEmailInput(newEmail)
   {
    this.setState({Email: newEmail})
   }
  
    handleSubmit()
    {
      if (!this.validateEmail(this.state.Email))
        {
          this.setState({shouldDisplayError: true})
          return;
        }
      console.log( "email="+this.state.Email);
      const form = new FormData();
       form.append("email",this.state.Email);
      fetch(endpoint,{method:"POST",header:{"Content-Type": "application/x-www-form-urlencoded"}, body :form }).then(response => console.log(response));
      
      this.setState({shouldDisplayError: false})
    }
  
  
  render()
  {
    return (
      <div id= "SignUpForm">
        <h2>Stay up to date with our latest news and events by joining our newsletter!</h2>
        <div id="divider"/>
        <div>
          <h5>SUBSCRIBE FOR THE LATEST NEWS</h5>
          <div style={{width:"100%"}}>
          <input className="inputBox emailinput" onChange={(event) =>   this.handleEmailInput(event.target.value)} placeholder="Email Address"/>
          <DropDownMenu currentInterest={this.state.currentInterest} selectInterest = {this.updateCurrentInterest} items={["test","test2","test3","test4"]}/>
           </div>
          {this.state.shouldDisplayError && <h6 id="errorDisplay">Please enter a valid email address</h6>}
          <button onClick={() => this.handleSubmit()} id="submit">Sign up now</button>
        </div>
      </div> 
    )  
  }
}

ReactDOM.render(<SignupForm/>,document.getElementById('signup'))