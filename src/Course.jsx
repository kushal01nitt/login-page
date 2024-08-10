import { useEffect } from "react"
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Card, Typography ,TextField , Button, Grid} from "@mui/material";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

function Course(){
    let {courseId} = useParams();
    // const [courses,setCourses] = useState([]);
    const setCourses = useSetRecoilState(courseState);

    useEffect(() => {
        function callback2(data){
            setCourses(data.courses);
        }
        function callback1(res){
            res.json().then(callback2);
        }
        fetch("http://localhost:3000/admin/courses" ,  {
            method : "GET",
            headers : {
                "Authorization" : "Bearer " + localStorage.getItem("token")
            }
        }).then(callback1);
    },[]);

    // let course  = null;
    // for(let i = 0 ; i  < courses.length ; i ++){
    //     if(courses[i].id == courseId){
    //         course = courses[i];
    //     }
    // }
    // if(!course){
    //     return <div>
    //         Loading .... 
    //     </div>
    // }

    return  <div>
    <GrayTopper courseId = {courseId} />
    <Grid container>
    <Grid item lg = {8} md = {12} sm = {12}>
        <UpdateCard courseId = {courseId} />
        </Grid>
        <Grid item lg = {4} md = {12} sm = {12}>
        <CourseCard courseId = {courseId} />
        </Grid>
    </Grid>
</div>
    // return <div style = {{
    //     display : "flex",
    //     justifyContent : "center",
    //     padding : 20
    // }}>
    //     {<CourseCard courseId = {courseId}/>}
    //     {<UpdateCard courseId = {courseId} />}
    // </div>
}
function UpdateCard(props){

    const[title,setTitle] = useState(null);
    const[description,setDescription] = useState(null);
    const[imageUrl, setImageUrl] = useState(null);
    const[courses,setCourses] = useRecoilState(courseState);

    const course = props.course;

    return <div>
        <div style = {{
            display : " flex",
            margin : 100,
            marginTop : 20
        }}>
        <Card variant="outlined" style = {{
            width : 500,
        }}>

<TextField 
         onChange={(e) => {
           setTitle(e.target.value);
         }}
         fullWidth = {true}
         label="Title" 
         variant="outlined"/> 
        <br />  <br />
        <TextField  
        onChange={(e) => {
            setDescription(e.target.value);
        }}
        fullWidth = {true}
        label="Description" 
        variant="outlined"/> 
<br />  <br />
<TextField 
         onChange={(e) => {
           setImageUrl(e.target.value);
         }}
         fullWidth = {true}
         label="imageUrl" 
         variant="outlined"/> 
    <br /><br />
<div style = {{
            display : " flex",
            justifyContent : "center",
        }}>
<Button 
            variant="contained" 
            size = "small" 
            onClick={ () => {
                function callback2(data){
                    // alert("course updated !")
                    let updatedCourses = [];
                    for(let i = 0 ; i < courses.length ; i++){
                        if(courses[i].id == props.courseId){
                            updatedCourses.push({
                                id : props.courseId,
                                title : title,
                                description : description,
                                imageLink : imageUrl
                            })
                        }
                        else{
                            updatedCourses.push(courses[i]);
                        }
                    }
                    setCourses(updatedCourses);
                }

                function callback1(res){
                    res.json().then(callback2)
                }
                
                fetch("http://localhost:3000/admin/courses/" + props.courseId, {
                    method : "PUT",
                    body : JSON.stringify({
                        title : title,
                        description : description,
                        imageLink : imageUrl,
                        published : true
                    }),
                    headers : {
                        "Content-type" : "application/json",
                        "Authorization" : "Bearer " + localStorage.getItem("token")
                    }
                }).then(callback1)
                
                
            }}>Update Course</Button>
            </div>
        </Card>
        </div>
    </div>
}


function CourseCard(props){
    const courses = useRecoilValue(courseState)
    let course  = null;
    for(let i = 0 ; i  < courses.length ; i ++){
        if(courses[i].id == props.courseId){
            course = courses[i];
        }
    }
    if(!course){
        return <div>
            isLoading...
        </div>
    }
    return <div style = {{display : "flex" , marginTop : -100 , justifyContent : "center" ,width : "100%"}}>
        <Card style = {{
            magin : 10,
            width : 350,
            minHeight : 200,
            borderRadius : 20,
            marginRight : 50,
            paddingBottom : 15,
            zIndex : 2
        }}>
                <img src = {course.imageLink} style = {{width : 350}}></img>
                <div style={{ marginLeft : 10}}>
                 <Typography variant="h5" textAlign={"center"}>{course.title}</Typography>
                 <Typography variant = "subtitle2" style={{color :"gray"}} textAlign={"center"}>
                    Price
                 </Typography>
                 <Typography variant="subtitle1" textAlign={"center"}>
                   <b>Rs 5999</b> 
                 </Typography>
                </div>
        </Card>
      
</div>
   
}

function GrayTopper(props){
    const courses = useRecoilValue(courseState)
    let course  = null;
    for(let i = 0 ; i  < courses.length ; i ++){
        if(courses[i].id == props.courseId){
            course = courses[i];
        }
    }
    if(!course){
        return <div>
            isLoading...
        </div>
    }
    return <div style = {{height : 250 , background : "#212121" , top : 0 , width : "100vw" , zIndex : 0  }}>
        <div style = {{height : 250 ,display : "flex" ,  justifyContent : "center" , flexDirection : "column"} }>
            <div>
            <Typography style = {{color  : "white" , fontWeight : 600}} variant="h3" textAlign={ "center"}> 
            {course.title}
            </Typography>
            </div>
        </div>
    </div>
}

export default Course

const courseState = atom({
    key: 'courseState', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
  });