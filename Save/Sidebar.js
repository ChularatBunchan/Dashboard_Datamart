import React from "react";
import Link from "next/link";
import { MdPeopleOutline } from "react-icons/md";
import { BsCartFill } from "react-icons/bs";
import { GiVendingMachine } from "react-icons/gi";

export default function Sidebar() {
  return (
    <aside>
      <div className="text">
        <Link href="/"><h2>Dashbroad</h2></Link>
      </div>
      <div className="wrapper">
        <ul>
          <li>
            <Link href="/Customer">
                <MdPeopleOutline size={30} />
                <p></p>
                Customer
            </Link>
          </li>
          <li>
            <BsCartFill size={30} />
            <p></p>
            <Link href="/Product">Product</Link>
          </li>
          <li>
            <GiVendingMachine size={30} />
            <p></p>
            <Link href="/Vending">Vending</Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
