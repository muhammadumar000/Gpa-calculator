// taking courses input


function notify(type, message) {
  var msg = new Notyf();

  if (type == "success") {
      msg.success(message);
  } else {
      msg.error(message);
  }
}

const cal_gpa = document.getElementById("calcGpa");
cal_gpa.style.display = "none";
let toAdd = "";

function changeCalculatorType() {
  const calculatorType = document.getElementById("calculatorType").value;
  console.log(calculatorType)

  // Hide all calculator sections
  document.getElementById("semesterGpaCalculator").style.display = "none";
  document.getElementById("internalMarksCalculator").style.display = "none";

  // Show the selected calculator section
  document.getElementById(`${calculatorType}Calculator`).style.display = "block";

}

let noOfCourses;
const coursesInput = document.getElementById("coursesInput");


function add_courses(){
  noOfCourses = parseInt(coursesInput.value);
  if (noOfCourses) {
    const allCourses = document.getElementById("allCourses");
    allCourses.style.display = "grid";
    const cal_gpa = document.getElementById("calcGpa");
    cal_gpa.style.display = "block";
    toAdd = "";
    allCourses.innerHTML = "";
    for (let i = 0; i < noOfCourses; i++) {
      toAdd += `
          <label for="">
              Course ${i + 1}
              <input class="courseName" type="text"  placeholder="Enter Course Name">
          </label>
       
          <label for="">
              Credit hrs
              <input class="gpa_crd" id="crd${
                i + 1
              }" onchange = "calcCrd(event.target.value)"  type="number" min="1" max="4" required>
          </label>
       
          <label for="">
              GPA
              <input class="gpa_crd" id="gpa${
                i + 1
              }" onchange="calcGpa(event.target.value)" type="number" min="0" max="4" step="0.1" required>
          </label>
          `;
    }
    allCourses.insertAdjacentHTML("afterbegin", toAdd);
  } else {
    notify("error", "Input Cannot be empty")

  }
}



const addCoursesBtn = document.getElementById("submit_btn");
addCoursesBtn.addEventListener("click", () => {

    toAdd = "";
    add_courses();
});


function clear_courses() {
  noOfCourses = "";
  toAdd = "";
  Gpa = [];
  crdHrs = [];

  const coursesInput = document.getElementById("coursesInput");
  coursesInput.value = "";
  const allCourses = document.getElementById("allCourses");
  allCourses.innerHTML = toAdd;

  allCourses.style.display = "none";

  const cal_gpa = document.getElementById("calcGpa");
  cal_gpa.style.display = "none";
  
  
  const gpaOuput = document.getElementById('gpaOutput');
  gpaOuput.innerHTML = "";

  const outputDisplay = document.getElementById('outputDisplay');
     outputDisplay.classList.remove('display');

    const clearBtn = document.getElementById('clear__btn');
    clearBtn.style.display = "none";
    const semRes = document.getElementById("semRes");
    semRes.style.display = "none";

}



const clear = document.getElementById("clear__btn");
clear.addEventListener("click", () => {
  clear_courses()
});

// calculate gpa
let Gpa = [];
let crdHrs = [];

const calcCrd = (e) => {
  let crd = e;
  crdHrs.push(crd);
};

const calcGpa = (e) => {

  let gpa = e;
  Gpa.push(gpa);
  

};

const calculatedGpa = document.getElementById("calcGpa");
calculatedGpa.addEventListener("click", () => {

  if(!noOfCourses){
    alert("Input Cannot be empty");
  }

  
    const clearBtn = document.getElementById('clear__btn');
    
    clearBtn.style.display = "inline-block";

    const semRes = document.getElementById("semRes");
    semRes.style.display = "block";
 
  let gradeCredit = 0;
  crdHrs = crdHrs.map(credits => parseInt(credits));
  Gpa = Gpa.map(gpa => parseFloat(gpa));
  let credits = crdHrs.reduce((acc, cur) => acc + cur, 0);

//   calculating crds*gpa for all courses 

    for (let i = 0; i < Gpa.length; i++) {

        if((Gpa[i] > 4 || Gpa[i] < 0) || (crdHrs[i] < 3 && crdHrs[i] > 4))
        {
          notify("error", "Invalid Grades or Credit Hrs Entered")
          clear_courses();
          return;
       }

        gradeCredit += Gpa[i]*crdHrs[i];
        
    }
// converting calculated grade credit into GPA
    let GPA = 0;
    if(credits && gradeCredit)
    {
        GPA = (gradeCredit/credits).toFixed(2);
    }


    if(GPA){
        const gpaOuput = document.getElementById('gpaOutput');

        let emoji = '';
        if (GPA >= 3.5) {
          emoji = '🌟'; // Star for high GPA
        } else if(GPA >= 3 && GPA <= 3.5){
          emoji = '🔥'
        }
         else if (GPA >= 2.0) {
          emoji = '😊'; // Smiley face for medium GPA
        } else {
          emoji = '😞'; // Sad face for low GPA
        }
    
        gpaOutput.innerHTML = `GPA: ${GPA} ${emoji}`;
        
        
        const outputDisplay = document.getElementById('outputDisplay');
        outputDisplay.classList.add('display');

        calculatedGpa.style.display = "none";



    }
    else{
      
      notify("error","Invalid Grades Entered" )
      clear_courses()
    }
   
    
});


// Add this code to your existing JavaScript file or script tag

// Get the element references
const numQuizzesInput = document.getElementById("numQuizzes");
const quizDetailsContainer = document.querySelector(".quiz-details");

// Event listener for the number of quizzes input change
numQuizzesInput.addEventListener("change", () => {
   // Clear existing quiz details
   quizDetailsContainer.innerHTML = "";

   // Get the number of quizzes entered by the user
   const numQuizzes = parseInt(numQuizzesInput.value);

   // Create and append quiz input fields dynamically
   for (let i = 0; i < numQuizzes; i++) {
      const quizDiv = document.createElement("div");
      quizDiv.classList.add("quiz");

      quizDiv.innerHTML = `

        <h3>Quiz ${i+1}: </h3>
         <label for="quizObtainedMarks${i + 1}"> Obtained Marks</label>
         <input type="number"  min = "0" id="quizObtainedMarks${i + 1}" >

         <label for="quizTotalMarks${i + 1}">Total Marks</label>
         <input type="number" min = "0" value = "10" id="quizTotalMarks${i + 1}">
      `;

      quizDetailsContainer.appendChild(quizDiv);
   }
});


const numAssignInput = document.getElementById("numAssigns");
const AssignDetailsContainer = document.querySelector(".Assign-details");

numAssignInput.addEventListener("change", () => {
  // Clear existing quiz details
  AssignDetailsContainer.innerHTML = "";

  // Get the number of Assignments entered by the user
  const numAssign= parseInt(numAssignInput.value);
  

  // Create and append Assignment input fields dynamically
  for (let i = 0; i < numAssign; i++) {
     const AssignDiv = document.createElement("div");
    AssignDiv.classList.add("Assign");

     AssignDiv.innerHTML = `

        <h3>Assigment ${i+1}: </h3>
        <label for="AssignObtainedMarks${i + 1}">Obtained Marks</label>
        <input type="number"  min = "0" id="AssignmentObtainedMarks${i + 1}" >

        <label for="AssignTotalMarks${i + 1}">Total Marks</label>
        <input type="number" min = "0" value = "10" id="AssignmentTotalMarks${i + 1}">
     `;

     AssignDetailsContainer.appendChild(AssignDiv);
  }
});





const calc_internal = document.getElementById("calc_internals");
calc_internal.addEventListener("click", () => {
    const internaRes = document.getElementById("internalRes");
    internaRes.style.display = "block";


   let totalQuizMarks = 0;
   let totalAssignMarks = 0;

   let totalObtainedQuizMarks = 0;
   let totalObtainedAssignMarks = 0;

   const numQuizzes = parseInt(numQuizzesInput.value);
   const numAssigns = parseInt(numAssignInput.value);

   let quizMarks = 0;
   let assignMarks = 0;

   for(let i = 0; i < numQuizzes; i++) {
    const obt_quiz_marks = document.getElementById(`quizObtainedMarks${i + 1}`);
    const tot_quiz_mark = document.getElementById(`quizTotalMarks${i + 1}`);

    console.log(obt_quiz_marks, tot_quiz_mark)

    if(parseFloat(obt_quiz_marks.value) > parseFloat(tot_quiz_mark.value))
    {
      console.log("Im here")
      notify("error", "Obtained Marks Cannot be Greater than Total Marks")
      clear_internal_marks()
      return;
    }

    totalObtainedQuizMarks += parseFloat(obt_quiz_marks.value);
    totalQuizMarks += parseFloat(tot_quiz_mark.value);

    quizMarks = (totalObtainedQuizMarks / totalQuizMarks) * 12.5;
    console.log(quizMarks)
    
    
   }

   for(let i = 0; i < numAssigns; i++) {
    const obt_assign_marks = document.getElementById(`AssignmentObtainedMarks${i + 1}`);
    totalObtainedAssignMarks += parseFloat(obt_assign_marks.value);

    const tot_assign_mark = document.getElementById(`AssignmentTotalMarks${i + 1}`);
    totalAssignMarks += parseFloat(tot_assign_mark.value);

    assignMarks = (totalObtainedAssignMarks / totalAssignMarks) * 12.5;
    console.log(assignMarks)

    
   }

   const midtermObtMarks = parseFloat(document.getElementById("midtermObtainedMarks").value);
   const midtermTotMarks = parseFloat(document.getElementById("midtermTotalMarks").value);

   const midtermMarks = (midtermObtMarks / midtermTotMarks) * 25;

   const internalMarks = (midtermMarks + assignMarks + quizMarks).toFixed(2);
   console.log(internalMarks)

   if(!isNaN(internalMarks)){
    const gpaOuput = document.getElementById('internalOutput');
    gpaOuput.innerHTML = `Marks: ${internalMarks}`;
    
    const outputDisplay = document.getElementById('outputDisplayInternal');
    outputDisplay.classList.add('display');

    const clearBtn = document.getElementById("clear_internals");
    clearBtn.style.display = "inline-block";
    calc_internal.style.display = "none";

  }
  else{
    notify("error", "Please Enter Marks Correclty!")
    clear_internal_marks()
  }

  

})


function clear_internal_marks() {

  calc_internal.style.display = "block";

  numAssignInput.value = "";
  numQuizzesInput.value = "";

  AssignDetailsContainer.innerHTML = "";
  quizDetailsContainer.innerHTML = "";

  document.getElementById("midtermObtainedMarks").value = "";

  const gpaOuput = document.getElementById('internalOutput');
  gpaOuput.innerHTML = "";

  const outputDisplay = document.getElementById('outputDisplayInternal');
     outputDisplay.classList.remove('display');

    const clearBtn = document.getElementById('clear_internals');
    clearBtn.style.display = "none";

    const internaRes = document.getElementById("internalRes");
    internaRes.style.display = "none";
}


const clearBtn = document.getElementById("clear_internals");
clearBtn.addEventListener("click", () => {
  clear_internal_marks()
}) 

