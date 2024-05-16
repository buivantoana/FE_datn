import { useQuery } from "react-query";

import Loading from "@/components/Loading";
import { useRoleMutation } from "@/hooks/useRoleMutation";
import { getRole } from "@/service/role";
import React, { useState } from "react";
import RoleView from "./RoleView";

const RoleController = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [action, setAction]: any = useState("CREATE");
  const [deleteRole, setDeleteRole] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    dataDelete: any
  ) => {
    setDeleteRole(dataDelete);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const { data } = useQuery("role", {
    queryFn: () => getRole(),
  });
  const { register, handleSubmit, onFinish, errors, reset } =
    useRoleMutation({
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
      reset({ name: "" });
      setOpenModal(true);
    } else {
      reset(data);
      setOpenModal(true);
    }
  };
  const handleCloseModal = () => {
    reset();
    setOpenModal(false);
  };
  const { onRemove } = useRoleMutation({
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
      <RoleView
        register={register}
        handleSubmit={handleSubmit}
        onFinish={onFinish}
        errors={errors}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        openModal={openModal}
        data={data}
        onSubmit={onSubmit}
        handleDelete={handleDelete}
        handleClick={handleClick}
        handleClose={handleClose}
        id={id}
        anchorEl={anchorEl}
        open={open}
        action={action}
        deleteRole={deleteRole}
      />

      {loading && <Loading />}
    </>
  );
};

export default RoleController;
