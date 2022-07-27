// taking courses input

let noOfCourses;
const coursesInput = document.getElementById("coursesInput");
coursesInput.addEventListener("change", (event) => {
  noOfCourses = event.target.value;

});

let toAdd = "";
const addCoursesBtn = coursesInput.nextElementSibling;
addCoursesBtn.addEventListener("click", () => {
  if (noOfCourses) {
    const allCourses = document.getElementById("allCourses");

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
    alert("Input cannot be empty!");
  }
});

const clear = document.getElementById("clear__btn");
clear.addEventListener("click", () => {
    noOfCourses = "";
  toAdd = "";
  Gpa = [];
  crdHrs = [];
  const allCourses = document.getElementById("allCourses");
  allCourses.innerHTML = toAdd;
  const gpaOuput = document.getElementById('gpaOutput');
  gpaOuput.innerHTML = "";

  const outputDisplay = document.getElementById('outputDisplay');
     outputDisplay.classList.remove('display');

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

 
  let gradeCredit = 0;
  crdHrs = crdHrs.map(credits => parseInt(credits));
  Gpa = Gpa.map(gpa => parseFloat(gpa));
  let credits = crdHrs.reduce((acc, cur) => acc + cur, 0);

//   calculating crds*gpa for all courses 

    for (let i = 0; i < Gpa.length; i++) {

        gradeCredit += Gpa[i]*crdHrs[i];
        
    }

    let GPA = 0;
    if(credits && gradeCredit)
    {
        GPA = (gradeCredit/credits).toFixed(2);
        console.log(GPA)
        console.log(!GPA)
    }


    if(GPA){
        const gpaOuput = document.getElementById('gpaOutput');
        gpaOuput.innerHTML = `GPA : ${GPA}`;
        
        const outputDisplay = document.getElementById('outputDisplay');
        outputDisplay.classList.add('display');

    }
   
    
});
