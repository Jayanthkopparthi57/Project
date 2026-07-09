import React, { useEffect, useState } from 'react';
import { FaUserDoctor } from "react-icons/fa6";
import { IoCalendarNumber, IoDocumentText } from "react-icons/io5";

const BetterCare = () => {

  const [mobile, setMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth <= 600);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const threesteps = [
    {
      icon: <FaUserDoctor />,
      step: 1,
      title: 'Find the right doctor',
      description: 'Browse verified specialists by location, language, and availability.'
    },
    {
      icon: <IoCalendarNumber />,
      step: 2,
      title: 'Schedule an appointment',
      description: 'Select a time that works for you and receive a confirmation.'
    },
    {
      icon: <IoDocumentText />,
      step: 3,
      title: 'Get the care you need',
      description: 'Attend your appointment and receive personalized treatment.'
    }
  ];


  return (
    <div style={{padding: mobile ? "30px 15px" : "50px"}}>

      <div style={{textAlign:"center"}}>
        <h1 style={{
          fontFamily:"sans-serif",
          fontSize: mobile ? "30px" : "50px",
          marginBottom:"15px",
          color:"#f87004"
        }}>
          Three steps to better care
        </h1>

        <p style={{
          fontSize: mobile ? "16px" : "25px",
          color:"#555"
        }}>
          We've stripped away the friction so getting help feels effortless.
        </p>
      </div>


      <div style={{
        display:"flex",
        flexDirection: mobile ? "column" : "row",
        justifyContent:"space-around",
        alignItems: mobile ? "center" : "stretch",
        gap:"25px",
        marginTop:"50px"
      }}>

        {threesteps.map((i) => (

          <div key={i.step} style={{
            display:"flex",
            flexDirection: mobile ? "column" : "row",
            alignItems:"center",
            width: mobile ? "90%" : "350px",
            padding:"25px",
            borderRadius:"20px",
            boxShadow:"0px 0px 15px rgba(255,0,0,0.15)",
            textAlign: mobile ? "center" : "left"
          }}>

            <div style={{
              fontSize: mobile ? "40px" : "45px",
              color:"black",
              marginRight: mobile ? "0px" : "20px",
              marginBottom: mobile ? "15px" : "0px"
            }}>
              {i.icon}
            </div>


            <div>
              <p style={{
                color:"orange",
                fontSize: mobile ? "20px" : "25px",
                margin:"5px 0"
              }}>
                Step {i.step}
              </p>

              <h2 style={{
                fontSize: mobile ? "20px" : "24px"
              }}>
                {i.title}
              </h2>

              <p style={{
                color:"#555",
                fontSize: mobile ? "14px" : "16px"
              }}>
                {i.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BetterCare;
