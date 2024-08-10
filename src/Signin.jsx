import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { useState } from 'react';

function Signin(){
    const [email,setEmail]  = useState(null);
    const[password,setPassword] = useState(null);

    return <div>
        <div style = {{
            paddingTop : 130,
            display : "flex",
            justifyContent :"center" 
          }}>
        <Card variant="outlined" style = {{
            width : 400,
            padding : 20,
        }}>
              <div style = {{
            display : "flex",
            justifyContent :"center" 
          }}>
            <img src='src/assets/download.png' style = {{
                width : 75,
                height : 50
            }}></img>
            </div>
            <center>
             <Typography padding={1} variant='h5' > Sign In </Typography>
             <Typography padding={1}> Use your Google Account </Typography>
            </center>
            <div style = {{
                padding : 20
            }}>
        <TextField 
         onChange={(e) => {
            setEmail(e.target.value);
         }}
         fullWidth = "true" 
         id="outlined-basic" 
         label="Email or Phone" 
         variant="outlined"/> 
        <br />  <br />
        <TextField  
        onChange={(e) => {
            setPassword(e.target.value);
        }}
        fullWidth = {true}  
        label="Create Password" 
        variant="outlined"
        type = "password"/> 

        <Link href="#" style={{ fontWeight: 'bold', fontSize: 'small',fontFamily: 'roboto,"Noto Sans Myanmar UI",arial,sans-serif', textDecoration : 'none'}}>Forgot Pass?</Link>
            <br /> <br /> <br />
        <Typography style = {{fontWeight : "lighter", fontSize : "small"}}>Not your computer? Use Guest mode to sign in privately.</Typography>
        <Link href="#" style={{ fontWeight: 'bold', fontSize: 'small', fontFamily: 'roboto,"Noto Sans Myanmar UI",arial,sans-serif', textDecoration : 'none'}}>Learn more about using guest mode</Link>

        <div style = {{
            display : "flex",
            justifyContent : "space-between",
            paddingTop : 50,
            paddingBottom : 40
        }}>
            <div>
        <Link href="/signup" style={{ fontWeight: 'bold', fontSize: 'small' , fontFamily: 'roboto,"Noto Sans Myanmar UI",arial,sans-serif', textDecoration : 'none'}}>Create User</Link>
        </div>
        <div>
        <Button 
            variant="contained" 
            size = "small"
            onClick={ () => {
                function callback2(data){
                    localStorage.setItem("token",data.token);
                    window.location = "/";
                }
                function callback1(res){
                    res.json().then(callback2)
                }
                fetch("http://localhost:3000/admin/login", {
                    method : "POST",
                    body : JSON.stringify({
                        username : email,
                        password : password
                    }),
                    headers : {
                        "Content-type" : "application/json"
                    }
                }).then(callback1)
            }}
         >Next</Button>
        </div>
        </div>  
        </div>
        <div>
       
        </div>
        
         </Card>
         </div>
        </div>
}
export default Signin