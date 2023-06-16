
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import './login.css'

import { Home } from '../Home/Home';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const handleLogin = async () => {
    try {
      const response = await fetch('https://localhost:7248/api/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
      
        history.push('/home');
         localStorage.getItem('token', token);
         const storedData = localStorage.getItem('token');
         console.log(storedData);
        console.log('Đăng nhập thành công');
        console.log(token.Id);
      } else {
        // Xử lý lỗi đăng nhập, hiển thị thông báo lỗi cho người dùng
        console.log('Đăng nhập thất bại');
      }
    } catch (error) {
      // Xử lý lỗi gọi API
      console.log('Lỗi gọi API', error);
    }
  };

  return (
    <div>
      {/* <input
        type="text"
        placeholder="Username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Đăng nhập</button> */}

     

        <div class="myform form ">
					 <div class="logo mb-3">
						 <div class="col-md-12 text-center">
							<h1>Login</h1>
						 </div>
					</div>
                   <form action="" method="post" name="login">
                           <div class="form-group">
                              <label for="exampleInputEmail1">Email address</label>
                              <input type="email" 
                              name="email"  
                              class="form-control" 
                              id="email" 
                              aria-describedby="emailHelp"  
                              placeholder="Enter email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}/>
                           </div>
                           <div class="form-group">
                              <label for="exampleInputEmail1">Password</label>
                              <input type="password" 
                              name="password" 
                              id="password"  
                              class="form-control" 
                              aria-describedby="emailHelp" 
                              placeholder="Enter Password"
                              value={password}
                               onChange={(e) => setPassword(e.target.value)}/>
                           </div>
                           <div class="form-group">
                              <p class="text-center">By signing up you accept our <a href="#">Terms Of Use</a></p>
                           </div>
                           <div class="col-md-12 text-center ">
                              <button type="submit" onClick={handleLogin} class=" btn btn-block mybtn btn-primary tx-tfm">Login</button>
                           </div>
                           <div class="col-md-12 ">
                              <div class="login-or">
                                 {/* <hr class="hr-or"> */}
                                 <span class="span-or">or</span>
                              </div>
                           </div>
                           <div class="col-md-12 mb-3">
                              <p class="text-center">
                                 <a href="javascript:void();" class="google btn mybtn"><i class="fa fa-google-plus">
                                 </i> Signup using Google
                                 </a>
                              </p>
                           </div>
                           <div class="form-group">
                              <p class="text-center">Don't have account? <a href="#" id="signup">Sign up here</a></p>
                           </div>
                        </form>
                        
                 
				</div>
    </div>
  );
};

export default Login;