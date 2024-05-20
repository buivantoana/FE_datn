import {
  Box,
  Button,
  Modal,
  Popover,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
  
  type typeProps = {
    data: typeRole[];
    register: any;
    handleSubmit: any;
    onFinish: any;
    errors: any;
    handleOpenModal: any;
    handleCloseModal: any;
    openModal: boolean;
    onSubmit: any;
    handleDelete: any;
    handleClick: any;
    handleClose: any;
    id: any;
    anchorEl: any;
    open: any;
    action: string;
    deleteRole:any;
  };
  const RoleView = ({
    data,
    register,
    handleSubmit,
    errors,
    onFinish,
    handleCloseModal,
    handleOpenModal,
    openModal,
    onSubmit,
    handleDelete,
    handleClick,
    handleClose,
    id,
    anchorEl,
    open,
    action,
    deleteRole
  }: typeProps) => {
    return (
      <>
        <Stack my={"20px"} direction={"row"} justifyContent={"space-between"}>
          <Typography variant='h5'>Role</Typography>
          <Button onClick={() => handleOpenModal("CREATE")} variant='contained'>
            Add Role
          </Button>
        </Stack>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align='left'>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.length &&
                data.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component='th' scope='row'>
                      {row.name}
                    </TableCell>
                    <TableCell align='left'>
                      <Button onClick={() => handleOpenModal("UPDATE", row)}>
                        Edit
                      </Button>
                      <Button
                        aria-describedby={id}
                        onClick={(e) => handleClick(e, row)}
                        sx={{ color: "red" }}>
                        Delete
                      </Button>
                    </TableCell>
                   
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}>
          <Box padding={"10px"}>
            <Typography>Bạn có muốn xóa không?</Typography>
            <Stack direction={"row"} mt={"15px"} justifyContent={"end"}>
              <Button onClick={handleClose}>Hủy</Button>
              <Button
                onClick={() => handleDelete(deleteRole)}
                sx={{ color: "red" }}>
                Xóa
              </Button>
            </Stack>
          </Box>
        </Popover>
        <ModalForm
          open={openModal}
          register={register}
          handleSubmit={handleSubmit}
          onFinish={onFinish}
          errors={errors}
          handleClose={handleCloseModal}
          onSubmit={onSubmit}
          action={action}
        />
      </>
    );
  };
  
  export default RoleView;
  const ModalForm = (props: any) => {
    const style = {
      position: "absolute" as "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "40%",
      bgcolor: "background.paper",
  
      boxShadow: 24,
      p: 4,
    };
  
    return (
      <Modal
        open={props.open}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Typography variant='h5' textAlign={"center"}>
            {props.action == "CREATE" ? "Add Role" : "Update Role"}
          </Typography>
          <form onSubmit={props.handleSubmit(props.onFinish)}>
            <Stack
              width={"100%"}
              mt={"20px"}
              gap={"15px"}
              direction={"row"}
              flexWrap={"wrap"}>
              <Box width={"98%"}>
                <TextField
                  {...props.register("name")}
                  fullWidth
                  id='outlined-basic'
                  label='Title'
                  variant='outlined'
                  size='small'
                  error={props.errors.name?.message}
                />
              </Box>
             
  
              <Box
                width={"100%"}
                display={"flex"}
                justifyContent={"end"}
                gap={"10px"}>
                <Button
                  onClick={props.handleClose}
                  sx={{
                    color: "black",
                    borderRadius: "99px",
                    width: "82px",
                    height: "34px",
                    border: "1px solid #333",
                  }}>
                  Close
                </Button>
                <Button
                  onClick={props.onSubmit}
                  type='submit'
                  sx={{
                    background:
                      "linear-gradient(to right bottom, #ff8f26, #ff5117)",
                    color: "white",
                    borderRadius: "99px",
                    width: "92px",
                    height: "34px",
                  }}>
                  Add
                </Button>
              </Box>
            </Stack>
          </form>
        </Box>
      </Modal>
    );
  };
  