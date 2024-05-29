import React from "react";
import "./MerchandiseItem.css";
const MerchandiseItem = ({ merchandise = {
    merchandise_code: "001",
    name: "Áo thun",
    unit: "Cái",
} }) => {
  return (
    <div className="merchandise-item">
      <table>
        <thead>
          <tr>
            <th>Mã hàng hóa</th>
            <th>Tên hàng hóa</th>
            <th>Đơn vị</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{merchandise.merchandise_code}</td>
            <td>{merchandise.name}</td>
            <td>{merchandise.unit}</td>
          </tr>
        </tbody>
      </table>
      <div className="btn-container">
      </div>
    </div>
  );
}

export default MerchandiseItem;
