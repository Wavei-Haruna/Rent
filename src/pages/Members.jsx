import React from "react";
import "tailwindcss/tailwind.css"; // for styling

import avatar1 from "../assets/Images/user1.jpg";
import avatar2 from "../assets/Images/user2.jpg";
import avatar3 from "../assets/Images/user3.jpeg";

import avatar5 from "../assets/Images/user4.jpg";
import avatar6 from "../assets/Images/user.png";
import avatar7 from "../assets/Images/user.png";
import avatar8 from "../assets/Images/user7.jpeg";
import avatar9 from "../assets/Images/user8.jpg";
import avatar10 from "../assets/Images/user9.jpeg";
import avatar11 from "../assets/Images/user.png";

const members = [
  { name: "SULEMANA SUMAILA", index: "5201040191", avatar: avatar1 },
  { name: "KWAKU MENSAH", index: "5201040192", avatar: avatar2 },
  { name: "ANTWI INNER GYAMFI", index: "5201040193", avatar: avatar3 },
  { name: "RICHARD AGYEKUM", index: "5201040194", avatar: avatar5 },
  { name: "AMANKWAAH EMMANUEL", index: "5201040195", avatar: avatar6 },
  { name: "JONATHAN OWUSU AGYEMAN", index: "5201040196", avatar: avatar7 },
  { name: "ALPHONSIA BIO MAYEE", index: "5201040197", avatar: avatar8 },
  { name: "DAPAAH BENJOTIM WILLIAMS", index: "5201040198", avatar: avatar9 },
  { name: "OSEI-ADUSAH YAW", index: "5201040199", avatar: avatar10 },
  { name: "HARUNA WAVEI", index: "5201040200", leader: true, avatar: avatar11 },
];

const MemberSection = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8">Our Members</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member) => (
            <div
              key={member.index}
              className="bg-white shadow-md rounded-lg px-6 py-4 flex flex-col justify-between"
            >
              <div className="flex items-center justify-center bg-gray-200 w-20 h-20 rounded-full mb-4">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full rounded-full"
                />
              </div>
              <h3 className="text-lg font-bold">{member.name}</h3>
              <p className="text-gray-700">{`Index: ${member.index}`}</p>
              {member.leader && (
                <p className="text-green-500 font-bold text-sm">Group Leader</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MemberSection;
