import { useContext, useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";
import "./order.css";
import axios from "axios";
import useFetch from "../../hooks/useFetch";

const Order = () => {
  const { user } = useContext(AuthContext);
  // const [data, setData] = useState([]);
  // const orderRequest = {
  //   _id: user._id
  // };
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = axios.get(
  //         "http://localhost:8800/api/users/order",
  //         orderRequest
  //       );
  //       setData(response.data);
  //     } catch (err) {}
  //   };
  //   fetchData();
  // }, []);
  // console.log(data)
  const { data, loading, error } = useFetch(`/users/order/${user._id}`);
  const formatDateRange = (dates) => {
    if (dates.length === 0) {
      return "";
    }

    const startDate = new Date(dates[0]);
    const endDate = new Date(dates[dates.length - 1]);

    const formattedStartDate = startDate.toLocaleDateString();
    const formattedEndDate = endDate.toLocaleDateString();

    return `From ${formattedStartDate} to ${formattedEndDate}`;
  };
  const handleCancel = async (orderId, roomNeedToUpdate, orderDates) => {
    try {
      await axios.put('/rooms/updateRooms', {
        roomNeedToUpdate,
        orderDates,
      });
      await axios.delete(`/users/${orderId}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <Header />
      <div className="orderContainer">
        <div>
          <h3 className="mb-4 title">Orders</h3>
          <div className="table-container">
            <table className="order-table">
              <thead>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Hotel</th>
                  <th scope="col">Rooms</th>
                  <th scope="col">Dates</th>
                  <th scope="col">Paid At</th>
                  <th scope="col">Total Price</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((order, index) => {
                  const roomNeedToUpdate = [];
                  order.roomNumbers.forEach((roomNumber) => {
                    roomNeedToUpdate.push(roomNumber.roomId);
                  });
                  console.log(roomNeedToUpdate)
                  // console.log(order.dates)
                  return (
                    <tr key={order._id}>
                      <td>{index + 1}</td>
                      <td>{order.hotel.name}</td>
                      <td>
                        {order.roomNumbers
                          .map((roomNumber) => roomNumber.number)
                          .join(", ")}
                      </td>
                      <td>{formatDateRange(order.dates)}</td>
                      <td>{new Date(order.paidAt).toLocaleString()}</td>
                      <td>${order.totalPrice}</td>
                      <td>
                        <button onClick={() => handleCancel(order._id, roomNeedToUpdate, order.dates)}>
                          Cancel
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Order;
