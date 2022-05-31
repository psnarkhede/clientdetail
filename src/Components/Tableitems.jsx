import React, { useState } from "react";
import Styles from "./Table.module.css" 

const Tableitems = (props) => {
  return (

    <div key={props.id}>

        <div className={Styles.main2}>
        <img className={Styles.photo} src="https://statinfer.com/wp-content/uploads/dummy-user.png"/>
        
      </div>

      <div className={Styles.main}>
         <div>
            <p className={Styles.heading} >Name :</p>
        </div>
        <div>
            <p className={Styles.name}>{props.data.username}</p>
        </div>
      </div>

      <div className={Styles.main}>
        <div>
        <p className={Styles.heading} >Age :</p>
        </div>
        <div>
        <p className={Styles.age}>{props.data.age}</p>
        </div>
      </div>

      <div className={Styles.main}>
        <div>
        <p className={Styles.heading} >Address :</p>
        </div>
        <div>
        <p className={Styles.address}>{props.data.address}</p>
        </div>
      </div>

      <div className={Styles.main}>
        <div>
        <p className={Styles.heading} >Department :</p>
        </div>
        <div>
        <p className={Styles.department}>{props.data.department}</p>
        </div>
      </div>

      <div className={Styles.main}>
        <div>
        <p className={Styles.heading} >Salary :</p>
        </div>
        <div>
        <p className={Styles.salary}>{props.data.salary}</p>
        </div>
      </div>

      <div className={Styles.main}>
        <div>
        <p className={Styles.heading} >Maritial Status :</p>
        </div>
        <div>
        <p className={Styles.married}>{!props.data.married ? "Not Married" : "married"}</p>
        </div>
      </div>

      

      <button className={Styles.delete} onClick={() => props.delete(props.data.id)}>Delete</button>
    </div>
  );
};

export default Tableitems;
