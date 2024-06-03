import React, { useState } from "react";
import HomeView from "./HomeView";
import { useQuery } from "react-query";
import { getCourses } from "@/service/courses";
import { getUserProgress } from "@/service/progress";
import { useCoursesContext } from "@/App";
import { useNavigate } from "react-router";
import { getPostActive } from "@/service/post";
import * as yup from "yup"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addContact } from "@/service/contact";
import { toast } from "react-toastify";

const schema = yup.object({
  name:yup.string().required(),
  email:yup.string().required(),
  subject:yup.string().required(),
  message:yup.string().required(),
})
const HomeController = () => {
  const context: any = useCoursesContext();
  const { data: courses } = useQuery("courses", {
    queryFn: () => getCourses(),
  });
  const  {register,handleSubmit,formState:{errors},reset } = useForm({resolver:yupResolver(schema)})
  
  const navigate = useNavigate()
  const { data: post } = useQuery(["post_active"], {
    queryFn: () => {
     
      return getPostActive({page:0,limit:4});
    },
    refetchOnWindowFocus: false,
  });
  
  const onSubmit = async (value:any)=>{
    try {
      let data = await addContact(value)
      if(data?.status==0){
        toast.success("Gửi liên hệ thành công.Bạn để ý mail để thấy phản hồi.")
        reset()
      }
    } catch (error) {
      
    }
  }
  return (
    <>
      <HomeView
        progress={context.state.progress !== undefined && context.state.progress[0]  && context.state.progress}
        courses={courses && courses}
        post={post&&post.data}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        onSubmit={onSubmit}

      />
    </>
  );
};

export default HomeController;
