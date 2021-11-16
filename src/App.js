import { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios'
import {
  StartPageZero,
  EmpthPageOneopt,
  ProfilePageTwo,
  TextsPageThree,
  QuestionOnePageFour,
  QuestionTwoPageFive,
  QuestionThreePageSix,
  QuestionFourPageSeven,
  EndPageEight,
  Bye
} from './app_components'

function App() {

  const [page, setPage] = useState(0) // 9 pages total: 0-8, (8 for control group; no page 1)
  const movePage = () => {
    if (page <= 8) {
      setPage(page + 1)
    }
    else if (page >= 9){
      setPage(0)
    }
  }
  const movePageBack = () => {
    if (page > 0 && page <= 8) {
      setPage(page - 1)
    }
    else if (page <= 0){
      setPage(0)
    }
  }

  //set who is the control group
  const [control, setControl] = useState(.5)
  useEffect(() => {
    setControl(Math.round(Math.random()) === 0)// control = ones who do not see the second page
  }, [])

  const [data_q1, setData_q1] = useState(null)
  const [data_q2, setData_q2] = useState(null)
  const [data_q3, setData_q3] = useState(null)
  const [data_q4, setData_q4] = useState(null)
  const data = [control, data_q1, data_q2, data_q3, data_q4]
  const data_has_null = data_q1 == null |  data_q2 == null | data_q3 == null | data_q4 == null

  const sendData = (data) => {
    console.log("sending data: ", data)
    axios.post('http://localhost:4000/', data)
      .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }



  return (
    <div className="App">
      <header className="App-header">
        <div>November-December 2021 Online Study by Jozef Lumaj</div>
      </header>
      <div className="Page">
        {
         (()=>{switch(page) {
            case 1:
              return (<EmpthPageOneopt control={control}></EmpthPageOneopt>)
            case 2:
              return (<ProfilePageTwo></ProfilePageTwo>)
            case 3:
              return (<TextsPageThree></TextsPageThree>)
            case 4:
              return (<QuestionOnePageFour d={data_q1} set_func={setData_q1}></QuestionOnePageFour>)
            case 5:
              return (<QuestionTwoPageFive d={data_q2} set_func={setData_q2}></QuestionTwoPageFive>)
            case 6:
              return (<QuestionThreePageSix d={data_q3} set_func={setData_q3}></QuestionThreePageSix>)
            case 7:
              return (<QuestionFourPageSeven d={data_q4} set_func={setData_q4}></QuestionFourPageSeven>)
            case 8:
              return (<EndPageEight can_submit={!data_has_null}></EndPageEight>)
            case 9:
              return (<Bye></Bye>)
            default: // case 0
              return (<StartPageZero></StartPageZero>)
           }})()
        } 
      </div>
      { page < 9 ? <div className="nextbutton" onClick={()=>{movePage()}}>{(()=>{
        if (page === 0) {return("Start") }
        else if (page < 8 && page > 0) {return("Next Page")}
        else if (page === 8) {return(<button disabled={data_has_null} className={`submit_button ${data_has_null ? "disabled_b" : "enabled_b"}`} onClick={()=>{sendData(data)}}>Submit</button>)}
        else if (page >= 9) {return(null)}
      })()}</div>: null } 
      {page > 0 && page < 9 ?  <div className="backbutton" onClick={()=>{movePageBack()}}>Back</div> : null}
    </div>
  );
}

export default App;
