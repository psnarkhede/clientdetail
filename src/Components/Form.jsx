import React, { useEffect, useRef, useState } from "react";
import Table from "./Table";
import Styles from "./Form.module.css";
import axios from "axios";

const Form = () => {
  const [formval, setFormval] = useState({});
  const [page, setPage] = useState(1);
  const [input, setInput] = useState([]);
  const [totalCount, setTotalCount] = useState(0);


  const nameref = useRef();

  const handleChange = (e) => {
    let { name, value, type, checked, files } = e.target;

    if (name === "married") {
      setFormval({ ...formval, married: checked });
    } else if (name === "unmarried") {
      setFormval({ ...formval, married: !checked });
    } else if (type === "file") {
      console.log(files);
      setFormval({ ...formval, [name]: files });
    } else {
      setFormval({ ...formval, [name]: value });
    }
  };

  const handlesubmit = (e) => {
    e.preventDefault();

    if(!formval.username){
      nameref.current.focus();
    }else{
      fetch(`http://localhost:3007/data`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formval),
      })
      .then((res) => res.json())
        .then((res) => {
          input.push(res)
          setInput([input[input.length-1]]);
          setTotalCount(totalCount+1);
        });
    }
  };

  useEffect(() => {
      axios
    .get(`http://localhost:3007/data?_page=${page}&_limit=1`)
      .then((res) => {
          setInput((res.data));
        setTotalCount(Number(res.headers["x-total-count"]));
      });
      
  }, [page]);


  // Delete Function
  const deletefn = (index) => {
    fetch(`http://localhost:3007/data/${index}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) =>
        fetch(`http://localhost:3007/data?_page=${page}&_limit=1`)
          .then((res) => res.json())
          .then((res) => {
            setInput(res);
            setTotalCount(totalCount-1);
          })
      );
  };

  return (
    <div className={Styles.father}>
      <div className={Styles.left}>
        <h1>Form</h1>

        <form onSubmit={handlesubmit}>
          <div className={Styles.box}>
            <label className={Styles.heading}>Name :</label>

            <input
              ref={nameref}
              className={Styles.input}
              type="text"
              name="username"
              placeholder="Name..."
              onChange={handleChange}
            ></input>
          </div>

          <div className={Styles.box}>
            <label className={Styles.heading}>Age :</label>

            <input
              className={Styles.input}
              type="number"
              name="age"
              placeholder="Age..."
              onChange={handleChange}
            ></input>
          </div>

          <div className={Styles.box}>
            <label className={Styles.heading}>Address :</label>

            <input
              className={Styles.input}
              type="text"
              name="address"
              placeholder="Address..."
              onChange={handleChange}
            ></input>
          </div>

          <div className={Styles.box}>
            <label className={Styles.heading}>Department :</label>

            <select
              className={Styles.select}
              name="department"
              onChange={handleChange}
            >
              <option value="">Department</option>
              <option value="HR">HR</option>
              <option value="Marketing">Marketing</option>
              <option value="Production">Production</option>
            </select>
          </div>

          <div className={Styles.box}>
            <label className={Styles.heading}>Salary :</label>

            <input
              className={Styles.input}
              type="number"
              name="salary"
              placeholder="Salary $$$"
              onChange={handleChange}
            ></input>
          </div>

          <div className={Styles.box}>
            <label className={Styles.heading}>Maritial Status :</label>

            <input
              className={Styles.married}
              type="checkbox"
              name="married"
              checked={formval.ismarried}
              onChange={handleChange}
            />
            <label className={Styles.marriedlabel}> Married</label>

            <br />

            <input
              className={Styles.married1}
              type="checkbox"
              name="unmarried"
              checked={formval.ismarried}
              onChange={handleChange}
            />
            <label className={Styles.marriedlabel}> Unmarried</label>
          </div>

          <div className={Styles.box}>
            <label className={Styles.heading}>Photo : </label>

            <input
              className={Styles.photo}
              type="file"
              accept="image/png, image/jpeg"
              name="photo"
              files={formval.photo}
              onChange={handleChange}
            ></input>
          </div>

          <button className={Styles.submitbtn} type="submit">
            Submit
          </button>
        </form>
      </div>

      <div className={Styles.right}>
        <h1>Collected Forms</h1>
        <Table data={input} delete={deletefn} />
        <div>
          <button
          hidden={totalCount <= 0 ? true : false}
            disabled={page <= 1}
            onClick={() => {
              if (page > 1) {
                setPage(page - 1);
              }
            }}
          >
            {"<"}
          </button>

          <button
          hidden={totalCount <= 0 ? true : false}
            disabled={totalCount <= page }
            onClick={() => {
              setPage(page + 1)}}
          >{">"}</button>
        </div>
      </div>
    </div>
  );
};

export default Form;
