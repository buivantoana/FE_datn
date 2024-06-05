import { useQuery } from "react-query";
import DetailCourseView from "./DetailCourseView";
import { getOneCourses } from "@/service/courses";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { addProgress, getProgress, getUserProgress } from "@/service/progress";
import { useCoursesContext } from "@/App";
import {
  Box,
  Button,
  Drawer,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { RiCheckFill } from "react-icons/ri";
import { convertToVND } from "@/utils/utils";
import {
  addOrder,
  deleteOrder,
  getOrderUserAndCourses,
  updateOrder,
} from "@/service/order";
import { getVnpay } from "@/service/vnpay";
import { toast } from "react-toastify";
import { getUserWallet, updateWallet } from "@/service/wallet";
import { addTransactions } from "@/service/transactions";
import { getStar } from "@/service/star";

const DetailCourseController = () => {
  const { id }: any = useParams();
  const [toggle, setToggle] = useState(true);
  const [totalLesson, setTotalLesson] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();
  const [expanded, setExpanded]: any = useState([]);
  const context: any = useCoursesContext();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paramTransactionStatus = queryParams.get("vnp_TransactionStatus");
  const paramOrder_id = queryParams.get("order_id");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  let count = 0;

  const {} = useQuery(["progress", id], {
    queryFn: () => {
      return getProgress(
        context.state.user[0]
          ? context.state.user[0]._id
          : "6656f102f161c2adccer5ej2",
        id
      );
    },
    onSuccess(data) {
      if (data[0]) {
        navigate(`/learning/${id}`);
      }
    },
    refetchOnWindowFocus: false,
  });

  const { data: star }:any = useQuery("star", {
    queryFn: () => {
      return getStar(id,"averageRating");
    },
    refetchOnWindowFocus: false,
  });
  
  useEffect(() => {
    if (!(Object.keys(context.state.user).length == 0)) {
      let message = "";
      if (paramTransactionStatus) {
        switch (paramTransactionStatus) {
          case "00":
            message += "Giao dịch thành công";
            break;
          case "01":
            message += "Giao dịch chưa hoàn tất";
            break;
          case "02":
            message += "Giao dịch bị lỗi";
            break;
          case "04":
            message +=
              "Giao dịch đảo (Khách hàng đã bị trừ tiền tại Ngân hàng nhưng GD chưa thành công ở VNPAY)";
            break;
          case "05":
            message += "VNPAY đang xử lý giao dịch này (GD hoàn tiền)";
            break;
          case "06":
            message +=
              "VNPAY đã gửi yêu cầu hoàn tiền sang Ngân hàng (GD hoàn tiền)";
            break;
          case "07":
            message += "Giao dịch bị nghi ngờ gian lận";
            break;
          case "09":
            message += "GD Hoàn trả bị từ chối";
            break;

          default:
            break;
        }
        if (message == "Giao dịch thành công") {
          setPaymentSuccess(true);
          updateStatusOrder();
          if (count == 0) {
            toast.success(message);
            count++;
          }
        } else {
          deleteOrderStatus();
          if (count == 0) {
            toast.error(message);
            count++;
          }
        }
      } else {
        getOrderCourses();
      }
    }
  }, [context.state.user]);
  const getOrderCourses = async () => {
    try {
      if (Object.keys(context.state.user)[0]) {
        let data = await getOrderUserAndCourses(id, context.state.user[0]._id);
        if (data?.status == 0) {
          if (data.data[0]) {
            setPaymentSuccess(true);
          }
        }
      }
    } catch (error) {}
  };

  const updateStatusOrder = async () => {
    try {
      let data = await updateOrder(paramOrder_id);
      if (data?.status == 0) {
        console.log("oke");
      }
    } catch (error) {}
  };
  const deleteOrderStatus = async () => {
    try {
      let data = await deleteOrder(String(paramOrder_id));
      if (data?.status == 0) {
        console.log("delete");
      }
    } catch (error) {}
  };

  const { data: courses } = useQuery("detail", {
    queryFn: () => {
      return getOneCourses(id && id);
    },
    onSuccess(data) {
      setExpanded([true, ...Array(data.lesson.length).fill(false)]);
      let total = 0;
      data.lesson.map((item: any) => (total += item.sub_lesson.length));
      setTotalLesson(total);
    },
  });

  const handleTongle = (index: number) => {
    setExpanded((prevExpanded: any) =>
      prevExpanded.map((item: any, idx: any) => (idx === index ? !item : item))
    );
  };
  const handleTongleAll = () => {
    if (toggle) {
      setExpanded(Array(courses && courses.lesson.length).fill(true));
      setToggle(false);
    } else {
      setExpanded(Array(courses && courses.lesson.length).fill(false));
      setToggle(true);
    }
  };

  const handleProgress = async () => {
    try {
      if (paymentSuccess) {
        let arr = courses.lesson.map((item: any, index: number) => {
          return {
            lesson_id: item._id,
            completed: false,
            sub_lesson: item.sub_lesson.map((item2: any, index2: number) => {
              if (index == 0 && index2 == 0) {
                return {
                  sub_lesson_id: item2._id,
                  completed: false,
                  result: true,
                };
              }
              return {
                sub_lesson_id: item2._id,
                completed: false,
                result: false,
              };
            }),
          };
        });
        if (Object.keys(context.state.user)[0]) {
          let body = {
            courses_id: courses._id,
            completed: false,
            user_id:
              context.state.user !== undefined && context.state.user[0]._id,
            lesson_progress: arr,
          };

          let data = await addProgress(body);
          if (data?.status == 0) {
            let res: any = await getUserProgress(context.state.user[0]._id);
            context.dispatch({
              type: "PROGRESS",
              payload: {
                ...context.state,
                progress: res.data,
              },
            });
            navigate(`/learning/${courses && courses._id}`);
          }
        }
      } else {
        if (courses.price == 0) {
          let arr = courses.lesson.map((item: any, index: number) => {
            return {
              lesson_id: item._id,
              completed: false,
              sub_lesson: item.sub_lesson.map((item2: any, index2: number) => {
                if (index == 0 && index2 == 0) {
                  return {
                    sub_lesson_id: item2._id,
                    completed: false,
                    result: true,
                  };
                }
                return {
                  sub_lesson_id: item2._id,
                  completed: false,
                  result: false,
                };
              }),
            };
          });

          if (Object.keys(context.state.user)[0]) {
            let body = {
              courses_id: courses._id,
              completed: false,
              user_id:
                context.state.user !== undefined && context.state.user[0]._id,
              lesson_progress: arr,
            };

            let data = await addProgress(body);
            if (data?.status == 0) {
              let res: any = await getUserProgress(context.state.user[0]._id);
              context.dispatch({
                type: "PROGRESS",
                payload: {
                  ...context.state,
                  progress: res.data,
                },
              });
              navigate(`/learning/${courses && courses._id}`);
            }
          } else {
            toast.warning("Bạn cần đăng nhập");
          }
        } else {
          setOpen(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const handlePayment = async () => {
    try {
      if (Object.keys(context.state.user).length == 0) {
        toast.warning("Bạn cần đăng nhập");
      } else {
        if (paymentMethod == "wallet") {
          let wallet = await getUserWallet(context.state.user[0]._id);
          if (wallet?.status == 0) {
            if (Number(wallet.data[0].balance) - Number(courses.price) >= 0) {
              let res = await updateWallet({
                _id: wallet.data[0]._id,
                user_id: [wallet.data[0].user_id[0]],
                balance: Number(wallet.data[0].balance) - Number(courses.price),
              });
              await addTransactions({
                user_id: [context.state.user[0]._id],
                type: "purchase",
                status: "completed",
                amount: courses.price,
              });
              if (res?.status == 0) {
                let data = await addOrder({
                  status: true,
                  courses_id: [courses._id],
                  user_id: [context.state.user[0]._id],
                });
                if (data?.status == 0) {
                  setOpen(false);
                  setPaymentSuccess(true);
                  toast.success("Bạn đã thanh toán thành công");
                }
              }
            } else {
              toast.warning("Bạn không đủ số dư trong ví");
            }
          }
        } else {
          let data = await addOrder({
            status: false,
            courses_id: [courses._id],
            user_id: [context.state.user[0]._id],
          });
          if (data?.status == 0) {
            let url: any = await getVnpay({
              order_id: data.data._id,
              amount: courses.price,
              courses_id: courses._id,
              type: "payment",
            });
            if (url) {
              window.location.href = url;
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <DetailCourseView
        paymentSuccess={paymentSuccess}
        courses={courses && courses}
        expanded={expanded}
        handleTongle={handleTongle}
        handleTongleAll={handleTongleAll}
        toggle={toggle}
        totalLesson={totalLesson}
        navigate={navigate}
        handleProgress={handleProgress}
        star={star!==undefined?star.status==0&&star.averageRating!==null?star.averageRating:0:0}
      />
      <Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
        <Box padding={"50px"} width={"100%"}>
          <Stack>
            <Box>
              <Typography fontSize={"28px"} fontWeight={"bold"}>
                {courses && courses.title}
              </Typography>
              <Typography my={"20px"} color={"#333"} fontSize={"14px"}>
                {courses && courses.description}
              </Typography>
            </Box>
            <Box>
              {" "}
              <Typography
                fontSize={"18px"}
                m={"20px 0 10px"}
                fontWeight={"bold"}
              >
                Bạn sẽ học được gì?
              </Typography>
              <Stack direction={"column"} gap={"10px"}>
                {courses &&
                  courses.result_courses.map((item: any) => {
                    return (
                      <Stack direction={"row"} mt={"10px"} gap={"8px"}>
                        <RiCheckFill color={"#f05123"} />
                        <Typography color={"#333"} fontSize={"14px"}>
                          {item}
                        </Typography>
                      </Stack>
                    );
                  })}
              </Stack>
            </Box>
            <Box
              mt={"20px"}
              width={"100%"}
              padding={"10px"}
              border={"1px solid #dddddd"}
              borderRadius={"10px"}
            >
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Box>Giá bán : </Box>
                <Box>{courses && convertToVND(courses.price)}</Box>
              </Stack>
              <Stack
                direction={"row"}
                mt={"15px"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Box>Tổng tiền : </Box>
                <Box>{courses && convertToVND(courses.price)}</Box>
              </Stack>
              <FormControl sx={{ mt: "20px", display: "block" }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Phương thức thanh toán
                </FormLabel>

                <RadioGroup
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="wallet"
                    control={<Radio />}
                    label="Thanh toán bằng ví"
                  />
                  <FormControlLabel
                    value="vnpay"
                    control={<Radio />}
                    label="Cổng thanh toán VNPAY"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box mt={"20px"}>
              <Button
                onClick={handlePayment}
                sx={{
                  background:
                    "linear-gradient(to right bottom, #ff8f26, #ff5117)",
                  color: "white",
                  borderRadius: "30px",
                  float: "right",
                  height: "34px",
                }}
              >
                Thanh toán
              </Button>
            </Box>
          </Stack>
        </Box>
      </Drawer>
    </>
  );
};

export default DetailCourseController;
