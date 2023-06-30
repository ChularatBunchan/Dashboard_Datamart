import * as d3 from "d3";
import React, { useEffect, useState } from "react";

export default function TableDay() {
  const [Sunday, setSun] = useState([]);
  const [Monday, setMon] = useState([]);
  const [Tuesday, setTue] = useState([]);
  const [Wednesday, setWeb] = useState([]);
  const [Thursday, setThu] = useState([]);
  const [Friday, setFri] = useState([]);
  const [Saturday, setSat] = useState([]);

  useEffect(() => {
    d3.csv("/sun.csv").then(setSun);
    d3.csv("/mon.csv").then(setMon);
    d3.csv("/sun.csv").then(setTue);
    d3.csv("/sun.csv").then(setWeb);
    d3.csv("/sun.csv").then(setThu);
    d3.csv("/sun.csv").then(setFri);
    d3.csv("/sun.csv").then(setSat);
  }, []);
  console.log("sunday: ", Sunday);
  console.log("Monday: ", Monday);
  console.log("Tuesday: ", Tuesday);
  console.log("Wednesday: ", Wednesday);
  console.log("Thursday: ", Thursday);
  console.log("Friday: ", Friday);
  console.log("Saturday: ", Saturday);

  function calculateTotal(data) {
    return data.reduce((total, element) => total + parseInt(element.count),0);
  }

  function findBestSellingProduct(data) {
    if (data.length === 0) {
      return "N/A";
    }
    let bestProduct = data[0];
    
    for (let i = 1; i < data.length; i++) {
      if (parseInt(data[i].count) > parseInt(bestProduct.count)) {
        bestProduct = data[i];
      }
    }
    return bestProduct.service_product;
  }  

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Total Count</th>
            <th>Best-Selling Product</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Sunday</th>
            <td>{calculateTotal(Sunday)}</td>
            <td>{findBestSellingProduct(Sunday)}</td>
          </tr>
          <tr>
            <th>Monday</th>
            <td>{calculateTotal(Monday)}</td>
            <td>{findBestSellingProduct(Monday)}</td>
          </tr>
          <tr>
            <th>Tuesday</th>
            <td>{calculateTotal(Tuesday)}</td>
            <td>{findBestSellingProduct(Tuesday)}</td>
          </tr>
          <tr>
            <th>Wednesday</th>
            <td>{calculateTotal(Wednesday)}</td>
            <td>{findBestSellingProduct(Wednesday)}</td>
          </tr>
          <tr>
            <th>Thursday</th>
            <td>{calculateTotal(Thursday)}</td>
            <td>{findBestSellingProduct(Thursday)}</td>
          </tr>
          <tr>
            <th>Friday</th>
            <td>{calculateTotal(Friday)}</td>
            <td>{findBestSellingProduct(Friday)}</td>
          </tr>
          <tr>
            <th>Saturday</th>
            <td>{calculateTotal(Saturday)}</td>
            <td>{findBestSellingProduct(Saturday)}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
