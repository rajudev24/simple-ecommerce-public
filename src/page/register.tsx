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
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
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

    fetch('https://e-commerce-puce-five.vercel.app/api/v1/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then((data:ResponseData) => {
        console.log(data?.message);
        navigate('/login')
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className='from-container'>
        
      <form onSubmit={handleSubmit}>
      <h1>Please register</h1>
      <label htmlFor="">You Name</label> <br />
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleInputChange}
        />{' '}
        <br /> <br />
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
        <NavLink to={'/login'}>Register User? Please Login</NavLink>
      </form>
    </div>
  );
};

export default Register;
