import { useRef } from 'react'

//bcrypt.genSaltSync(4)

// const handleSubmit = async (event) => {
//     event.preventDefault();
//     console.log("Submitted");
//     try {
//       const response = await axios.post(apiURL, formData);
//       console.log(response.data.id);
//       navigate(`/user/:${response.data.id}`, {
//         state: { isEdit: false, formData: response.data },
//       });
//     } catch (error) {
//       console.error("Error submitting form", error);
//     }
//   };

function Password() {
    const emailInputRef = useRef()
    const passwordInputRef = useRef()
  
    function handleLoginForm() {
      const email = emailInputRef.current.value
      const password = passwordInputRef.current.value
// hash created previously created upon sign up
  
      fetch('http://localhost:8081/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      })
    }
  
    return (
      <div className='App'>
        <header className='App-header'>
          <form>
            <input style={{ padding: '15px', borderRadius: '10px', margin: '10px' }} ref={emailInputRef} type='email' placeholder='Email' />
            <input style={{ padding: '15px', borderRadius: '10px', margin: '10px' }} ref={passwordInputRef} type='password' placeholder='Password' />
            <button
              type='submit'
              style={{ padding: '15px', borderRadius: '10px', margin: '10px' }}
              onClick={e => {
                e.preventDefault()
                handleLoginForm()
              }}>
              Log In
            </button>
          </form>

          <br />
          <span>
            Save this Salt, UPON sign up <br /> if you refresh it will generate a new SALT!!!
          </span>
        </header>
      </div>
    )
  }
  
  export default Password