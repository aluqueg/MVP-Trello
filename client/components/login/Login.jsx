import { Input, Button } from '@chakra-ui/react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




export const Login = ({userLogin, setUserLogin}) => {
  const navigate = useNavigate();

  const handleLogin = (e) => { // Maneja los cambios en los inputs del formulario
    const {name, value} = e.target;
    setUserLogin({...userLogin, [name]: value})
  }

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post('http://localhost:3000/api/users/login', userLogin);
      console.log(res.data)
      setUserLogin(res.data.user)

      if(res.data.user.type === 2){
        navigate('/tablero');
      }
    }catch(error){
      console.error(error);
    }
  }


  return (
        <div className='container'>
      <div className='register'>
        <h1>Logueate</h1>
        <form onSubmit={handleSubmit}>
          <Input
          type='email' 
          placeholder="Email"
          name='email'
          onChange={handleLogin}
          value={userLogin?.email || ""}
           />
          <Input 
          type='password'
          placeholder="Contraseña"
          name='password'
          onChange={handleLogin}
          value={userLogin?.password || ""}
           />

          <Button type="submit">
            Login
          </Button>
        </form>
      </div>
    </div>
  )
}
