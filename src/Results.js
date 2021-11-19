import './Results.css';
import {fn} from 'jstat'
import { useEffect, useState } from 'react'
import axios from 'axios'
import nextId from "react-id-generator";

function Results() {

  const [described, setDescribed] = useState({total_amount_samples: null, total_ctrl: null, total_not_ctrl: null, total_ans1: null, total_ans2: null})
  const [testData, setTestData] = useState({})
  const [dataTable, setDataTable] = useState([])

  useEffect(()=>{
    axios.get('https://137.184.175.22:4200/api')
    .then((res) => {
      // handle success
      const response = res.data
      //turn objects nested into arrays nested
      setDataTable(response.map((el) => {return Object.values(el)}) )
      //make data into shape that is easier to work with for prop test
      const array_values = response.reduce((accum, current_val) => {
        if (current_val.ctrl === true){
          accum.q1_ctrl_all_res.push(current_val.q1)
          accum.q2_ctrl_all_res.push(current_val.q2)
          accum.q3_ctrl_all_res.push(current_val.q3)
          accum.q4_ctrl_all_res.push(current_val.q4)
        }
        else if (current_val.ctrl === false){
          accum.q1_not_ctrl_all_res.push(current_val.q1)
          accum.q2_not_ctrl_all_res.push(current_val.q2)
          accum.q3_not_ctrl_all_res.push(current_val.q3)
          accum.q4_not_ctrl_all_res.push(current_val.q4)
        }
        return accum
       
      }, {q1_ctrl_all_res:[], 
        q1_not_ctrl_all_res:[], 
        q2_ctrl_all_res:[], 
        q2_not_ctrl_all_res:[], 
        q3_ctrl_all_res:[], 
        q3_not_ctrl_all_res:[],
        q4_ctrl_all_res:[], 
        q4_not_ctrl_all_res:[]});

      const describe_data = (array_table) => {

        let total_nonempth_var = 0
        let total_empth_var = 0
        for (let [key, value] of Object.entries(array_table)) {
          if (key === 'q3_ctrl_all_res' || key === 'q3_not_ctrl_all_res'){
            total_nonempth_var += value.filter(el => el === 'ans2').length
            total_empth_var += value.filter(el => el === 'ans1').length
          } else{
            total_nonempth_var += value.filter(el => el === 'ans1').length
            total_empth_var += value.filter(el => el === 'ans2').length
          }
        }
    
        return {
          total_amount_samples: array_table.q1_ctrl_all_res.length + array_table.q1_not_ctrl_all_res.length,
          total_ctrl: array_table.q1_ctrl_all_res.length,
          total_not_ctrl: array_table.q1_not_ctrl_all_res.length,
          total_nonempth: total_nonempth_var,
          total_empth: total_empth_var
        }
      }
      setDescribed(describe_data(array_values))

      const run_stat_tests = (array_table) => {
        //test proportions question #1
        const n1_ctrl_q1 = array_table.q1_ctrl_all_res.length
        const n2_not_ctrl_q1 = array_table.q1_not_ctrl_all_res.length
        const p_hat_clicked_ans2_ctrl_q1 = array_table.q1_ctrl_all_res.filter(el => el === 'ans2').length / n1_ctrl_q1
        const p_hat_clicked_ans2_not_ctrl_q1 = array_table.q1_not_ctrl_all_res.filter(el => el === 'ans2').length / n2_not_ctrl_q1

        //test proportions question #2
        const n1_ctrl_q2 = array_table.q2_ctrl_all_res.length
        const n2_not_ctrl_q2 = array_table.q2_not_ctrl_all_res.length
        const p_hat_clicked_ans2_ctrl_q2 = array_table.q2_ctrl_all_res.filter(el => el === 'ans2').length / n1_ctrl_q2
        const p_hat_clicked_ans2_not_ctrl_q2 = array_table.q2_not_ctrl_all_res.filter(el => el === 'ans2').length / n2_not_ctrl_q2

        //test proportions question #3
        //question 3 needs ans1 and ans2 changed because of the nature of the question. ans1 is the empathetic choice here
        const n1_ctrl_q3 = array_table.q3_ctrl_all_res.length
        const n2_not_ctrl_q3 = array_table.q3_ctrl_all_res.length
        const p_hat_clicked_ans1_ctrl_q3 =  array_table.q3_ctrl_all_res.filter(el => el === 'ans1').length / n1_ctrl_q3
        const p_hat_clicked_ans1_not_ctrl_q3 = array_table.q3_not_ctrl_all_res.filter(el => el === 'ans1').length / n2_not_ctrl_q3

        //test proportions question #2
        const n1_ctrl_q4 = array_table.q4_ctrl_all_res.length
        const n2_not_ctrl_q4 = array_table.q4_not_ctrl_all_res.length
        const p_hat_clicked_ans2_ctrl_q4 = array_table.q4_ctrl_all_res.filter(el => el === 'ans2').length / n1_ctrl_q4
        const p_hat_clicked_ans2_not_ctrl_q4 = array_table.q4_not_ctrl_all_res.filter(el => el === 'ans2').length / n2_not_ctrl_q4

        const array_of_proportions = [p_hat_clicked_ans2_ctrl_q1, p_hat_clicked_ans2_not_ctrl_q1,
                                      p_hat_clicked_ans2_ctrl_q2, p_hat_clicked_ans2_not_ctrl_q2,
                                      p_hat_clicked_ans1_ctrl_q3, p_hat_clicked_ans1_not_ctrl_q3,
                                      p_hat_clicked_ans2_ctrl_q4, p_hat_clicked_ans2_not_ctrl_q4]
        const has_invalid_proportions = array_of_proportions.some((el) => {return(el >= 1 || el <= 0)})

        if (has_invalid_proportions){
          setTestData(null)
        }
        else{
            //null: there is no difference between the two groups (i.e. not-ctrl group does not differ in amount of times clicked ans2) (or ans1 in q3 case)
            //alt: there is a difference
            const q1_result = fn.twoSidedDifferenceOfProportions(p_hat_clicked_ans2_ctrl_q1, n1_ctrl_q1, p_hat_clicked_ans2_not_ctrl_q1, n2_not_ctrl_q1)
            const q2_result = fn.twoSidedDifferenceOfProportions(p_hat_clicked_ans2_ctrl_q2, n1_ctrl_q2, p_hat_clicked_ans2_not_ctrl_q2, n2_not_ctrl_q2)
            const q3_result = fn.twoSidedDifferenceOfProportions(p_hat_clicked_ans1_ctrl_q3, n1_ctrl_q3, p_hat_clicked_ans1_not_ctrl_q3, n2_not_ctrl_q3)
            const q4_result = fn.twoSidedDifferenceOfProportions(p_hat_clicked_ans2_ctrl_q4, n1_ctrl_q4, p_hat_clicked_ans2_not_ctrl_q4, n2_not_ctrl_q4)
            setTestData({q1:q1_result, q2: q2_result, q3: q3_result, q4: q4_result})
        }
        
      }
      run_stat_tests(array_values)
    })
    .catch((error) => {console.log(error);})
  },
  [])


  return (
    <div className="Results" style={{padding: "7px"}}>
        <h3>Nov-Dec Survey by Jozef Lumaj (Online Empathy Survey)</h3>
        <p>This survey tries to see if people are more empathetic towards people whom they just know through an online profile and through text messages when they understand someones background story (vs. when they do not)</p>
        <p>All Subjects are exposed to dating-app like profile and text messages hypothetically sent between the other person and oneself; one group is exposed to a story somewhat explaining the online subjects behaviour on text and through their profile image, the other is not (the control group)</p>
        <h1> Results </h1>
        <p> the binary answers for questions are labeled: 'ans1' & 'ans2'; ans1 is for answers that are "less-empathetic", ans2 is for answers that are "more epathetic" [BUT: Q3 actually has them switched where ans1 is the more empathetic one; it has to be taken into consideration for our tests]; our proportions tests are checking whether the control group (the group that does not recieve a prompt that describes the character of the module's story) differs from the non-control/empathy-reading group in the amount of ans2's are recieved for each question</p>
        <hr/>
        <h2>Describe Raw Data</h2>
        <p>Total Amount of Samples Collected: <b> {described.total_amount_samples} </b></p>
        <p>Total Amount in Control Group: <b> {described.total_ctrl} </b></p>
        <p>Total Amount in Empathy-Reading/Not-Control Group: <b> {described.total_not_ctrl} </b></p>
        <p>Total non-empathetic answers collected: <b> {described.total_nonempth} </b></p>
        <p>Total empathetic answers collected: <b> {described.total_empth} </b></p>
        <hr/>
        <h2>Proportions Test for Each Question</h2>
        <p>tests should not be trusted untill the amount of samples collected> 30</p>
        <p>Do the two groups differ in the amount of times they answered the "empathetic answer" for each question?:</p>
        {testData ? 
            <div>
                <p>q1 (p-value | 95%): {testData?.q1} ({testData?.q1 <= .05 ? "significant" : "not significant"})</p>
                <p>q2 (p-value | 95%): {testData?.q2} ({testData?.q2 <= .05 ? "significant" : "not significant"})</p>
                <p>q3 (p-value | 95%): {testData?.q3} ({testData?.q3 <= .05 ? "significant" : "not significant"})</p>
                <p>q4 (p-value | 95%): {testData?.q4} ({testData?.q4 <= .05 ? "significant" : "not significant"})</p>
            </div> :
          <p>not enough data to output tests yet</p>
        }
        <hr/>
        <h2> Data Table </h2>

        <table>
          <colgroup>
            <col/>
            <col style={{backgroundColor: "lightgrey"}}/>
            <col/>
            <col style={{backgroundColor: "lightgrey"}}/>
            <col/>
            <col style={{backgroundColor: "lightgrey"}}/>
          </colgroup>
          <tbody>
            <tr>
              <th>id</th>
              <th>ctrl</th>
              <th>q1</th>
              <th>q2</th>
              <th>q3</th>
              <th>q4</th>
              <th>date_added</th>
            </tr>
            {
              dataTable.map((el) =>  {
                return(
                  <tr key={nextId()}>
                   {el.map((ell) => {return <td key={nextId()}>{ell.toString()}</td>})}
                  </tr>
                )}
              )
            }
          </tbody>
        </table> 
        <hr/>
        <h2>Questions</h2>
        <p>Q1: Would you tell Adam off in the next text (i.e. reciprocate the rudeness/disrespect he is showing you)? (ans1: "yes" | ans2: "no")</p>
        <p>Q2: Should Adam be kicked off the app for this kind of conduct? (ans1: "yes" | ans2: "no")</p>
        <p>Q3: Could you ever see yourself being friends with Adam one day in the future? (ans1: "yes" | ans2: "no") (remeber ans1 is the more empathetic one and ans2 is the less empathetic one this time)</p>
        <p>Q4: Is Adam a Bad Person? (whatever your definition of "Bad Person" is) (ans1: "yes" | ans2: "no")</p>
        
    </div>
  );
}

export default Results;
