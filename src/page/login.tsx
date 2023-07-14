import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router';
import '../styles/index.css'
import { NavLink } from 'react-router-dom';

interface ResponseData {
    message: string
    stausCode: number
    success: true
}
interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });
const navigate = useNavigate()
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    fetch('http://localhost:5000/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then((data:ResponseData) => {
        console.log(data?.message);
        localStorage.setItem('email', formData.email);
        navigate('/')
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className='from-container'>
      <form onSubmit={handleSubmit}>
    <h1>Please Login</h1>
        <label htmlFor="">You Email</label> <br />
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={formData.email}
          onChange={handleInputChange}
        />{' '}
       <br /> <br />
        <label htmlFor="">You Password</label> <br />
        <input
          type="password"
          name="password"
          placeholder="Your password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <br />
        <button type="submit">Submit</button> 
        <NavLink to={'/register'}>New user? Please Register</NavLink>
     
      </form>
    </div>
  );
};

export default Login;
