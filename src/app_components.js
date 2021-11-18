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
                    <h2>The Situation You Are In</h2>
                    <p>The Following 2 modules is a profile & a text converstation from a hypothetical friend-finding app (dating-app-like).</p>
                    <p>Please read all the text carefully and proceed (you will be asked questions on these modules later)</p>
                </div> :
                    <div>
                    <p style={{fontSize:"70%"}}>Module: Please take a minute to read and digest the following statement</p>
                    <p>...</p>
                    <p className="adam_empth">Adam has an anxiety disorder that hinders him socially. He gets panic attacks around social situations, which have put him in the hospital multiple times. The reason why he feels this anxiety is because of his fear of people leaving him, and his defense mechanism that resulted from this is coldness to the world. He currently goes to therapy and hopes to become better socially.</p>
                    <p>...</p>
                    <p style={{fontSize:"78%"}}>It turns out you have matched with Adam on a friend finding app (please see the next two modules)</p>
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
            <h3>Would you tell Adam off in the next text (i.e. reciprocate the rudeness/disrespect he is showing you)?</h3>
            <div className="questionbuttons">
                <button className={`ans1 ${props.d === 'ans1' ? "selected" : null}`} onClick={()=>{props.set_func('ans1')}} onTouchStart={()=>{props.set_func('ans1')}}>Yes</button>
                <button className={`ans2 ${props.d === 'ans2' ? "selected" : null}`} onClick={()=>{props.set_func('ans2')}} onTouchStart={()=>{props.set_func('ans2')}}>No</button>
            </div>
        </div>
    );
}

function QuestionTwoPageFive(props) {

    return (
        <div id="QuestionTwoPage">
            <h3>Should Adam be kicked off the app for this kind of conduct?</h3>
            <div className="questionbuttons">
                <button className={`ans1 ${props.d === 'ans1' ? "selected" : null}`} onClick={()=>{props.set_func('ans1')}} onTouchStart={()=>{props.set_func('ans1')}}>Yes</button>
                <button className={`ans2 ${props.d === 'ans2' ? "selected" : null}`} onClick={()=>{props.set_func('ans2')}} onTouchStart={()=>{props.set_func('ans2')}}>No</button>
            </div>
        </div>
    );
}

function QuestionThreePageSix(props) {

    return (
        <div id="QuestionThreePage">
            <h3>Could you ever see yourself being friends with Adam one day in the future?</h3>
            <div className="questionbuttons">
                <button className={`ans1 ${props.d === 'ans1' ? "selected" : null}`} onClick={()=>{props.set_func('ans1')}} onTouchStart={()=>{props.set_func('ans1')}}>Yes</button>
                <button className={`ans2 ${props.d === 'ans2' ? "selected" : null}`} onClick={()=>{props.set_func('ans2')}} onTouchStart={()=>{props.set_func('ans2')}}>No</button>
            </div>
        </div>
    );
}

function QuestionFourPageSeven(props) {

    return (
        <div id="QuestionFourPage">
            <h3>Is Adam a Bad Person? (whatever your definition of "Bad Person" is)</h3>
            <div className="questionbuttons">
                <button className={`ans1 ${props.d === 'ans1' ? "selected" : null}`} onClick={()=>{props.set_func('ans1')}} onTouchStart={()=>{props.set_func('ans1')}}>Yes</button>
                <button className={`ans2 ${props.d === 'ans2' ? "selected" : null}`} onClick={()=>{props.set_func('ans2')}} onTouchStart={()=>{props.set_func('ans2')}}>No</button>
            </div>
        </div>
    );
}

function EndPageEight(props) {
    return (
        <div id="EndPage">
            {props.can_submit ?
                <div>Please submit your answers below!</div>
                : <div>You cannot submit because you have not selected an answer for all questions yet, please go back and select those which you havent selected for yet</div>
            }
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