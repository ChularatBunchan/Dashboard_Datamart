import React from "react";
import Link from "next/link";
import { BsFillDatabaseFill ,BsSuitHeartFill} from "react-icons/bs";
import { FaSplotch } from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside>
      <div className="text">
        <Link href="/"><h2>Dashbroad</h2></Link>
      </div>
      <div className="wrapper">
        <ul>
          <li>
            <Link href="/SabuyMoney">
              <BsFillDatabaseFill size={30} />
              <p>Sabuy Money</p>
            </Link>
          </li>
          <li>
            <Link href="/VDC">
              <BsSuitHeartFill size={30} />
              <p>VDC</p>
            </Link>
          </li>
          <li>
            <Link href="/VDP">
              <FaSplotch size={30} />
              <p>VDP</p>
            </Link>
          </li>
          
        </ul>
      </div>
    </aside>
  );
}
