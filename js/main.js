particlesJS.load('particles-js', '/assets/particles-config.json', function() {
  console.log('callback - particles.js config loaded');
});

AOS.init();


// hide all pages
function hideAllPages() {
  let pages = document.querySelectorAll(".page");
  for (let page of pages) {
    if (page.classList.contains("down-enter-active")){
      page.classList.remove("down-enter-active");
      page.classList.add("down-leave-active");

    }
    setTimeout(function(){
      page.style.display = "none";

    }, 600);
  }
}

// show page or tab
function showPage(pageId) {
  hideAllPages();
  setTimeout(function(){
    document.querySelector(`#${pageId}`).style.display = "block";
    let pages = document.querySelectorAll(".page");
    for (let page of pages){
      if (page.classList.contains("down-leave-active")){
        page.classList.remove("down-leave-active");
      }
      page.classList.add("down-enter-active");


    }

  },600);

  setActiveTab(pageId);

}

// sets active nav/ menu item
function setActiveTab(pageId) {
  let pages = document.querySelectorAll("nav a");
  for (let page of pages) {
    if (`#${pageId}` == page.getAttribute("href")) {
      page.classList.add("active");
    } else {
      page.classList.remove("active");
    }

  }
}

// set default page
function setDefaultPage() {
  let page = "home";
  if (location.hash) {
    page = location.hash.slice(1);
  }
  showPage(page);
}

setDefaultPage();

function pageTransition() {
  let pages = document.querySelectorAll('.page');
  for (let page of pages) {
    if (page.classList == 'page circle-leave-active') {
      page.classList.remove('circle-leave-active');
      console.log('removed');
    }
  }
}

//document.body.addEventListener('click', ;

//M.AutoInit();
AOS.init();


var firebaseConfig = {
  apiKey: "AIzaSyAU6D0i4v_W_QITGFVhNJ8MYlWKaNrA5LQ",
  authDomain: "portfolio-6eee7.firebaseapp.com",
  databaseURL: "https://portfolio-6eee7.firebaseio.com",
  projectId: "portfolio-6eee7",
  storageBucket: "",
  messagingSenderId: "524726413467",
  appId: "1:524726413467:web:21c59c64cc01cec3e13e3e",
  measurementId: "G-1FWM6STFYS"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics()

const db = firebase.firestore();
const projectsRef = db.collection('projects');
const softSkillsRef = db.collection('softSkills');

projectsRef.onSnapshot(function(snapshotData) {
  let projects = snapshotData.docs;
  createObjects(projects);
  appendProjects(projects);
  console.log(projects);
});

/*softSkillsRef.onSnapshot(function(snapshotData) {
  let softSkills = snapshotData.docs;
  appendSoftSkills(softSkills);
  console.log(softSkills);
});*/

// function appendProjects(projects) {
//   let cardTemplate = "";
//   let modalTemplate = "";
//   for (let project of projects) {
//     let name = project.data().name;
//     let keywords = project.data().keywords;
//     let description = project.data().description;
//     let img = project.data().img;
//     let link = project.data().link;
//     let listTemplate = "";
//       for (let keyword of keywords) {
//         listTemplate = `
//             <li class="keywords">${keyword}<li>
//             `;
//           };
//
//     cardTemplate = `
//           <div class="card" id="${name}" onclick="openModal()">
//             <img src="${img}" alt="${name}">
//             <h2>${name}</h2>
//           </div>
//       `;
//
//       modalTemplate = `
//         <div class=modal>
//           <ul>${name}</ul>
//         </div>
//       `;
//
//
//       document.querySelector("#projectsGrid").innerHTML += cardTemplate;
//
//
//   };
//
// }

var projectsArray = [];

function createObjects(projects) {
  for (let project of projects) {
    let name = project.data().name;
    let keywords = project.data().keywords;
    let description = project.data().description;
    let img = project.data().img;
    let link = project.data().link;
    let i = 0;

    var projectObject = {
      name: project.data().name,
      keywords: project.data().keywords,
      description: project.data().description,
      img: project.data().img,
      link: project.data().link,
      problem: project.data().problem,
      solution: project.data().solution,
      development: project.data().development,
      mockup: project.data().mockup
    };
    projectsArray.push(projectObject);
    i++;
  }

}

function appendProjects(projects) {
  let cardTemplate = "";
  for(let projectObject of projectsArray){
    console.log(projectObject.name);

        cardTemplate = `
              <div class="projectCard pop-in-center"  id="${projectObject.name}"  onclick="openModal(this.id)" stlye="background-image: url(${projectObject.img})" data-depth="0.3">
                <div class="cardBackground" id="${projectObject.name}"></div>
                <div class="info" data-depth="0.6">
                <h2 data-depth="0.3">${projectObject.name}</h2>
                <div class="divider"></div>
                <p class="button" data-depth="0.2">Read more<p>
                </div>

              </div>
          `;
          document.querySelector("#projectsGrid").innerHTML += cardTemplate;
  }
}
/*
function appendSoftSkills(softSkills) {
  let htmlTemplate = "";
  for (let softSkill of softSkills){
    let title = softSkill.data().title;
    let content = softSkill.data().content;
    let img = softSkill.data().img;

    htmlTemplate = `
      <div class="softSkill">
        <div class="text">
          <h4>${title}</h4>
          <p>${content}</p>
        </div>
        <img src="${img}" alt="${title}">
      </div>
    `;
    document.querySelector('#softSkills').innerHTML += htmlTemplate;

  }
}
*/
function openModal(clicked_id){
  let selectedIndex = projectsArray.findIndex(x => x.name === clicked_id);
  let selectedProject = projectsArray[selectedIndex];

      let listTemplate = "";
        for (let keyword of selectedProject.keywords) {
          listTemplate += `
              <li class="keywords chip">#${keyword}<li>
              `;
            };
console.log(listTemplate);
  let modalTemplate = `
  <div class="projectModal"  data-aos="zoom-in">
  <div id="modalLeft">
  <h3 onclick="closeModal()">X</h3>
  <img src="${selectedProject.mockup}">
  </div>

  <div id="modalRight">
  <div id="modalRightHeader">
  <h2>${selectedProject.name}</h2>
    <ul>${listTemplate}</ul>
    <div id="links">
    <a href="${selectedProject.link}" target="_blank"><img src="img/icons/code.svg" alt="${selectedProject.name}"></a>
    <a href="${selectedProject.githubLink}"><img src="img/icons/github.svg" alt="Github"></a>
    </div>
    </div>
    <h3>The problem</h3>
    <p>${selectedProject.problem}</p>
    <h3>The solution</h3>
    <p>${selectedProject.solution}</p>
    <h3>The development</h3>
    <p>${selectedProject.development}</p>

  </div>
  </div>

  `;

  console.log(selectedProject.keywords);
  document.querySelector("#projectsGrid").innerHTML = "";
  document.querySelector("#modalBackground").style.display = "block";
   document.querySelector("#projectsModal").innerHTML = modalTemplate;
 };

function closeModal(){
  document.querySelector(".projectModal").classList.add('fade-out-bck');
  document.querySelector("#modalBackground").classList.add('fade-out');
  setTimeout(function(){
    document.querySelector(".projectModal").style.display = "none";
    document.querySelector("#modalBackground").style.display = "none";
    document.querySelector("#modalBackground").classList.remove('fade-out');
  }, 901);

//  document.querySelector("#projectsModal").innerHTML = "";
  appendProjects(projects);
}




var slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.querySelectorAll(".slide");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.transform = "scale(1)";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.transform = "scale(1.3)";
  setTimeout(showSlides, 1000);
}



var slideIndex2 = 0;
showSlides2();

function showSlides2() {
  let i;
  var slides2 = document.querySelectorAll(".slide2");
  for (i = 0; i < slides2.length; i++) {
    slides2[i].style.transform = "scale(1)";
  }
  slideIndex2++;
  if (slideIndex2 > slides2.length) {slideIndex2 = 1}
  slides2[slideIndex2-1].style.transform = "scale(1.3)";
  setTimeout(showSlides2, 2000);
}





window.onload = function() {
    try {
      TagCanvas.Start('myCanvas','tags',{
        textColour: '#112d32',

        reverse: true,
        depth: 0.9,
        maxSpeed: 0.1,
        initial: [0.1, 0.1],
        outlineMethod: 'none',
        minSpeed: .1,
        maxSpeed: .1


      });
    } catch(e) {
      // something went wrong, hide the canvas container
      document.getElementById('myCanvasContainer').style.display = 'none';
    }
  };
