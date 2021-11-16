import './comp.css'
import profile from './profile.png'
import texts from './texts.png'

function StartPageZero() {
  return (
    <div id="startPage">
        <h1>Welcome!</h1>
        <p>This study is completely anonymous and to be completed upon request from Jozef Lumaj. </p>
        <p>It consists of a few modules and 4 questions; it should take you no longer than 5 minutes (but you are welcome to take however long you wish).</p>
        <p>Please take all modules into deep consideration & answer the 4 questions honestly</p>
    </div>
  );
}
function EmpthPageOneopt(props) {
    return (
        <div id="empthPage">
            {
                props.control ? 
                <div>
                    <h2>Control Group; dummy page</h2>
                    <p>...</p>
                </div> :
                    <div>
                    <h2>Module: Please take a minute to read and digest the following statement</h2>
                    <p>...</p>
            </div>
            }

        </div>
    );
}

function ProfilePageTwo() {
    return (
        <div id="profilePage">
            <p>Inspect the following module. It is a hypothetical profile found in a "friend-finding" app (similar to a dating app):</p>
            <img className="module-img" src={profile} alt="a hypothetical profile for friend finding app"></img>
        </div>
    );
}
  
function TextsPageThree() {
    return (
        <div id="textsPage">
            <p>Now inspect this module carefully and read the conversation between you and adam (after you hypothetically "matched" with him on the app)</p>
            <img src={texts} className="module-img" alt="text messages on hypothetical app"></img>
        </div>
    );
}

  
function QuestionOnePageFour(props) {

    return (
        <div id="QuestionOnePage">
            <h3>Question 1?</h3>
            <div className="questionbuttons">
                <button className={`ans1 ${props.d === 'ans1' ? "selected" : null}`} onClick={()=>{props.set_func('ans1')}}>Yes</button>
                <button className={`ans2 ${props.d === 'ans2' ? "selected" : null}`} onClick={()=>{props.set_func('ans2')}}>No</button>
            </div>
        </div>
    );
}

function QuestionTwoPageFive(props) {

    return (
        <div id="QuestionTwoPage">
            <h3>Question 2?</h3>
            <div className="questionbuttons">
                <button className={`ans1 ${props.d === 'ans1' ? "selected" : null}`} onClick={()=>{props.set_func('ans1')}}>Yes</button>
                <button className={`ans2 ${props.d === 'ans2' ? "selected" : null}`} onClick={()=>{props.set_func('ans2')}}>No</button>
            </div>
        </div>
    );
}

function QuestionThreePageSix(props) {

    return (
        <div id="QuestionThreePage">
            <h3>Question 3?</h3>
            <div className="questionbuttons">
                <button className={`ans1 ${props.d === 'ans1' ? "selected" : null}`} onClick={()=>{props.set_func('ans1')}}>Yes</button>
                <button className={`ans2 ${props.d === 'ans2' ? "selected" : null}`} onClick={()=>{props.set_func('ans2')}}>No</button>
            </div>
        </div>
    );
}

function QuestionFourPageSeven(props) {

    return (
        <div id="QuestionFourPage">
            <h3>Question 4?</h3>
            <div className="questionbuttons">
                <button className={`ans1 ${props.d === 'ans1' ? "selected" : null}`} onClick={()=>{props.set_func('ans1')}}>Yes</button>
                <button className={`ans2 ${props.d === 'ans2' ? "selected" : null}`} onClick={()=>{props.set_func('ans2')}}>No</button>
            </div>
        </div>
    );
}

function EndPageEight() {
    return (
        <div id="EndPage">
            <div>End_PageEight</div>
        </div>
    );
}
function Bye() {
    return (
        <div id="Bye">
            <div>Thank you for parctipating! It means alot!</div>
        </div>
    );
}

export {
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
}