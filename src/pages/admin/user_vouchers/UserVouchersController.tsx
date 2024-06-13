import { useQuery } from "react-query";
import CategoriesView from "./UserVouchersView";
import { getCategories } from "@/service/categories";
import { useCategoriesMutation } from "@/hooks/useCategoriesMutation";
import React, { useState } from "react";
import Loading from "@/components/Loading";
import { Box } from "@mui/material";
import VouchersView from "./UserVouchersView";
import { useVouchersMutation } from "@/hooks/useVouchersMutation";
import { getVouchers } from "@/service/vouchers";
import UserVouchersView from "./UserVouchersView";
import { getUserVouchers } from "@/service/user_vouchers";
import { getUser } from "@/service/auth";
import { useUserVouchersMutation } from "@/hooks/useUserVouchersMutation";

const UserVouchersController = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [valueUser,setValueUser] = useState("")
  const [valueVouchers,setValueVouchers] = useState("")
  const [action, setAction]: any = useState("CREATE");
  const [deleteCategory, setDeleteCategory] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    dataDelete: any
  ) => {
    setDeleteCategory(dataDelete);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const { data, isFetching }:any = useQuery("user_vouchers", {
    queryFn: () => getUserVouchers(),
  });
  const { data: vouchers } = useQuery("vouchers", {
    queryFn: () => getVouchers(),
  });
  const { data: user } = useQuery("user", {
    queryFn: () => getUser(),
  });
  const { register, handleSubmit, onFinish, errors, reset } =
    useUserVouchersMutation({
      action: action,
      onSuccess: () => {
        reset();
        setTimeout(() => {
          handleCloseModal();
          setLoading(false);
        }, 1000);
      },
    });
    
  const handleOpenModal = (type: any, data: any) => {
    setAction(type);
    if (type == "CREATE") {
      reset()
      setValueUser("")
      setValueVouchers("")
      setOpenModal(true);
    } else {
      reset({_id:data._id,status:data.status})
      setValueUser(data.user_id[0]._id)
      setValueVouchers(data.vouchers_id[0]._id)
      setOpenModal(true);
    }
  };
  const handleCloseModal = () => {
    reset();
    setOpenModal(false);
  };
  const { onRemove } = useUserVouchersMutation({
    action: "DELETE",
    onSuccess: () => {
      handleClose();
    },
  });
  const onSubmit = () => {
    setLoading(true);
  };
  const handleDelete = (value: any) => {
   
    onRemove(value);
  };
  return (
    <>
      
        <>
          <UserVouchersView
            register={register}
            handleSubmit={handleSubmit}
            onFinish={onFinish}
            errors={errors}
            handleOpenModal={handleOpenModal}
            handleCloseModal={handleCloseModal}
            openModal={openModal}
            data={data!==undefined&&data.length>0?data:[]}
            vouchers={vouchers!==undefined&&vouchers.length>0?vouchers:[]}
            user={user!==undefined&&user.length>0?user:[]}
            onSubmit={onSubmit}
            handleDelete={handleDelete}
            handleClick={handleClick}
            handleClose={handleClose}
            id={id}
            anchorEl={anchorEl}
            open={open}
            action={action}
            deleteCategory={deleteCategory}
            valueUser={valueUser}
            setValueUser = {setValueUser}
            valueVouchers={valueVouchers}
            setValueVouchers = {setValueVouchers}
           
          />

          {loading && <Loading />}
        </>
      
    </>
  );
};

export default UserVouchersController;
