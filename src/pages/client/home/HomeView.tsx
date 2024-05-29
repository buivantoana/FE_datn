import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import Slider from "react-slick";
import slider1 from "../../../images/slider1.png";
import slider2 from "../../../images/slider2.png";
import slider3 from "../../../images/slider3.png";
import { useEffect, useState } from "react";
import Product from "@/components/Product";
import ProductList from "@/components/ProductList";
import { RiVolumeUpLine } from "react-icons/ri";
import certificate from "../../../images/capture (2).png"
import postImage from "../../../images/Screenshot from 2024-05-29 14-06-07.png"
type Props = {
  courses: typeCourses[];
  progress: any;
  post: any;
};

const HomeView = ({ courses, progress, post }: Props) => {
  const settings = {
    customPaging: function (i: any) {
      return (
        <Box
          sx={{
            width: "32px",
            height: "8px",
            borderRadius: "5px",
            background: "#dce0e3",
          }}
        ></Box>
      );
    },
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  useEffect(()=>{
    setOpen(true);
  },[])
  const [open, setOpen] = useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          ".slick-slider": {
            zIndex: 0,
            width: "97.5%",
          },
          ".slick-list": {
            borderRadius: "20px",
            zIndex: "0 !important",
          },
          ".slick-prev, .slick-next": {
            zIndex: 1,
          },
          ".slick-prev": {
            left: "5px",
          },
          ".slick-next": {
            right: "19px",
          },
          ".slick-prev:before,.slick-next:before": {
            fontSize: "34px !important",
          },
          ".slick-dots": {
            display: "flex !important",
            gap: "15px",
            bottom: "-40px",
            left: "20px",
          },

          ".slick-dots .slick-active div": {
            background: "#9aa6af",
          },
          mb: "70px",
        }}
        className="slider-container"
      >
        <Slider {...settings}>
          <Box
            height={"270px"}
            borderRadius={"20px"}
            padding={"0 50px"}
            sx={{
              background:
                "linear-gradient(to right, rgb(253, 34, 92), rgb(253, 144, 4))",
            }}
          >
            <Stack
              direction={"row"}
              height={"100%"}
              justifyContent={"space-between"}
            >
              <Box
                width={"40%"}
                height={"100%"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
                color={"white"}
              >
                <Box>
                  <Typography fontWeight={700} variant="h4">
                    Mở bán áo logo F8 đợt 2
                  </Typography>
                  <Typography my={"18px"}>
                    Áo Polo F8 với thiết kế tối giản, lịch sự, phù hợp mặc mọi
                    lúc, mọi nơi. Chất áo mềm mại, thoáng mát, ngực và tay áo in
                    logo F8 - Fullstack.
                  </Typography>
                  <Button
                    sx={{
                      color: "white",
                      height: "36px",
                      border: "2px solid white",
                    }}
                  >
                    ĐẶT ÁO NGAY
                  </Button>
                </Box>
              </Box>
              <Box
                width={"60%"}
                display={"flex"}
                justifyContent={"center"}
                color={"white"}
              >
                <img src={slider1} />
              </Box>
            </Stack>
          </Box>
          <Box
            height={"270px"}
            borderRadius={"20px"}
            padding={"0 50px"}
            sx={{
              background:
                "linear-gradient(to right, rgb(136, 40, 250), rgb(89, 169, 250))",
            }}
          >
            <Stack
              direction={"row"}
              height={"100%"}
              justifyContent={"space-between"}
            >
              <Box
                width={"40%"}
                height={"100%"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
                color={"white"}
              >
                <Box>
                  <Typography fontWeight={700} variant="h4">
                    Mở bán áo logo F8 đợt 2
                  </Typography>
                  <Typography my={"18px"}>
                    Áo Polo F8 với thiết kế tối giản, lịch sự, phù hợp mặc mọi
                    lúc, mọi nơi. Chất áo mềm mại, thoáng mát, ngực và tay áo in
                    logo F8 - Fullstack.
                  </Typography>
                  <Button
                    sx={{
                      color: "white",
                      height: "36px",
                      border: "2px solid white",
                    }}
                  >
                    ĐẶT ÁO NGAY
                  </Button>
                </Box>
              </Box>
              <Box
                width={"60%"}
                display={"flex"}
                justifyContent={"center"}
                color={"white"}
              >
                <img src={slider2} />
              </Box>
            </Stack>
          </Box>
          <Box
            height={"270px"}
            borderRadius={"20px"}
            padding={"0 50px"}
            sx={{
              background:
                "linear-gradient(to right, rgb(104, 40, 250), rgb(255, 186, 164))",
            }}
          >
            <Stack
              direction={"row"}
              height={"100%"}
              justifyContent={"space-between"}
            >
              <Box
                width={"40%"}
                height={"100%"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
                color={"white"}
              >
                <Box>
                  <Typography fontWeight={700} variant="h4">
                    Mở bán áo logo F8 đợt 2
                  </Typography>
                  <Typography my={"18px"}>
                    Áo Polo F8 với thiết kế tối giản, lịch sự, phù hợp mặc mọi
                    lúc, mọi nơi. Chất áo mềm mại, thoáng mát, ngực và tay áo in
                    logo F8 - Fullstack.
                  </Typography>
                  <Button
                    sx={{
                      color: "white",
                      height: "36px",
                      border: "2px solid white",
                    }}
                  >
                    ĐẶT ÁO NGAY
                  </Button>
                </Box>
              </Box>
              <Box
                width={"60%"}
                display={"flex"}
                justifyContent={"center"}
                color={"white"}
              >
                <img src={slider3} />
              </Box>
            </Stack>
          </Box>
        </Slider>
      </Box>
      <ProductList
        type="takecharge"
        data={courses && courses.filter((item) => item.price !== 0)}
        progress={progress}
        title="Khóa học Pro"
      />
      <ProductList
        type={"free"}
        data={courses && courses.filter((item) => item.price == 0)}
        progress={progress}
        title="Khóa học miễn phí"
      />
      <ProductList type={"blog"} data={post} title="Bài viết nổi bật" />
      <ProductList type={"video"} title="Videos nổi bật" />
      <Box
        onClick={handleClickOpen}
        sx={{
          position: "fixed",
          bottom: "50px",
          left: "20px",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          background: "hsla(0, 0%, 94%, .8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 3,
        }}
      >
        <RiVolumeUpLine size={25} />
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{".css-1t1j96h-MuiPaper-root-MuiDialog-paper":{
          maxWidth:"none"
        }}}
      >
        <Box className="see-more" sx={{width:"900px" ,padding:"30px",overflowY:"scroll"}}>
        <DialogTitle id="alert-dialog-title">
        <Typography variant="h5" fontWeight={"bold"}>FDemy Thông báo</Typography>
        </DialogTitle>
        <DialogContent>
          
            <Box>
              <Typography variant="h6" fontWeight={"bold"} fontSize={"20px"}>1. Thông Báo Hoàn Tiền 10% Khi Hoàn Thành Khóa Học mất phí</Typography>
              <DialogContentText sx={{my:"10px"}}>
              <Typography>Chúng tôi rất vui mừng thông báo về chương trình khuyến mãi đặc biệt dành cho học viên của chúng tôi. Khi bạn hoàn thành bất kỳ khóa học mất phí nào trên nền tảng, bạn sẽ được hoàn lại 10% số tiền đã trả cho khóa học đó vào ví của bạn!</Typography>
              </DialogContentText>
              <Typography fontWeight={"bold"}>Cách Thức Nhận Hoàn Tiền:</Typography>
              <DialogContentText sx={{my:"10px"}}>
              <img src={certificate} width={"100%"} alt="" />
              <Box ml={"10px"}>
              <Typography sx={{my:"4px"}}>1.Hoàn thành khóa học bạn đã đăng ký.</Typography>
              <Typography sx={{my:"4px"}}>2.Số tiền hoàn lại sẽ tự động được chuyển vào ví của bạn trong vòng 24 giờ sau khi hoàn thành khóa học và nhận.</Typography>
              </Box>
              </DialogContentText>
            </Box>
            <Box mt={"15px"}>
              <Typography variant="h6" fontWeight={"bold"} fontSize={"20px"}>2. Thông Báo Thưởng 10,000 VND Vào Ví Khi Bài Viết Đạt 1,000 Lượt Thích</Typography>
              <DialogContentText sx={{my:"10px"}}>
              <Typography>Để khuyến khích các bạn tích cực chia sẻ kiến thức và kinh nghiệm học tập, chúng tôi xin giới thiệu chương trình thưởng hấp dẫn: Khi bài viết của bạn đạt 1,000 lượt thích, bạn sẽ được thưởng ngay 10,000 VND vào ví!</Typography>
              </DialogContentText>
              <Typography fontWeight={"bold"}>Cách Thức Nhận Thưởng:</Typography>
              <DialogContentText sx={{my:"10px"}}>
              <img src={postImage} width={"100%"} alt="" />
              <Box ml={"10px"}>
              <Typography sx={{my:"4px"}}>1.Viết và đăng bài viết chia sẻ kiến thức hoặc kinh nghiệm học tập lên blog của nền tảng.</Typography>
              <Typography sx={{my:"4px"}}>2.Khi bài viết đạt đủ 1,000 lượt thích, số tiền thưởng 10,000 VND sẽ tự động được chuyển vào ví của bạn.</Typography>
              </Box>
              </DialogContentText>
              <Typography fontWeight={"bold"}>Lưu Ý:</Typography>
              <ul>
                <li>Số tiền thưởng sẽ được chuyển vào ví của bạn và có thể sử dụng để đăng ký các khóa học mới hoặc rút về tài khoản ngân hàng.</li>
              </ul>
            </Box>
          
        </DialogContent>
        </Box>
        
       
      </Dialog>
    </>
  );
};

export default HomeView;
