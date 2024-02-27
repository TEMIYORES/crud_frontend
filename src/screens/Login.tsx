import axios from "axios";
import { ChangeEvent, useState } from "react"
import { Link } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
      });
    
      const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
    const [accessToken, setAccessToken] = useState('');

    const handleSubmit = async(e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission here, e.g., send data to server
      await axios.post('http://localhost:3500/api/auth', formData).then(res=>console.log(res))
      };


  return (
    <div className="flex w-[100vw] h-[100vh] place-items-center justify-center">
        <div className="flex w-[500px] min-h-[400px] flex-col gap-5 border-2 border-white rounded-lg p-5" >
        <h2 className="font-semibold text-5xl">Sign In</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2 text-xl">
            <label className="font-semibold">Username:</label>
            <input name="username" type="text" className="border-2 border-white rounded-md p-2" value={formData.username} onChange={handleChange}/>
            </div>
            <div className="flex flex-col gap-2 text-xl">
            <label className="font-semibold">Password:</label>
            <input name="password" type="password" className="border-2 border-white rounded-md p-2" value={formData.password} onChange={handleChange}/>
            </div>
            <button type="submit" className="border-2 border-[#242424] bg-white text-[#242424] rounded-md p-2">Sign In</button>
            </form>
           <div className="flex gap-2 place-items-center"> <input className="w-[15px] h-[15px]" type="checkbox"/><span>Trust this device?</span></div>
           <div>Need an account? <Link to={'/signup'}>Sign up</Link></div>
            <div>
            </div>
        </div>
    </div>
  )
}

export default Login;