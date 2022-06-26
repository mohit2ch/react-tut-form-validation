import { useState } from "react";

const SimpleInput = (props) => {

  const [enteredValue, setEnteredValue] = useState({name:'', email:''});
  const [error, setError] = useState({name: true, email: true});
  const [isTouched, setIsTouched] = useState({name: false, email: false});

  function handleNameChange(event){
    const val = event.target.value;

    setError((prev)=>{
      return{
        name: (val.trim().length === 0),
        email: prev.email
      }
    })

    setEnteredValue((prev)=>{
      return {
        name: val,
        email: prev.email
      }
    })
  }
  function handleEmailChange(event){
    const val = event.target.value;

    setError((prev)=>{
      return{
        name: prev.name,
        email: !(val.trim().length > 0 && val.includes('@'))
      }
    })

    setEnteredValue((prev)=>{
      return {
        name: prev.name,
        email: val
      }
    })
  }
  function handleNameBlur(event){
    setIsTouched((prev)=>{
      return {
        name: true,
        email: prev.email
      }
    })
  }
  function handleEmailBlur(event){
    setIsTouched((prev)=>{
      return {
        name: prev.name,
        email: true
      }
    });
  }
  function handleSubmit(event){
    event.preventDefault();
    if(error.name || error.email) return;
    setIsTouched({name: false, email: false});
    setError({name: true, email: true});
    setEnteredValue({name:'', email:''});
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className={(error.name && isTouched.name)?'form-control invalid':'form-control '}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' value={enteredValue.name} onChange={handleNameChange} onBlur={handleNameBlur} />
        { (error.name && isTouched.name)? <p>this field is required to be filled</p>:<></>}
      </div>
      <div className={(error.email && isTouched.email)?'form-control invalid':'form-control '}>
        <label htmlFor='email'>Your Email</label>
        <input  type='email' id='email' value={enteredValue.email} onChange={handleEmailChange} onBlur={handleEmailBlur} />
        { (error.email && isTouched.email)? <p>this field is required to be filled</p>:<></>}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
