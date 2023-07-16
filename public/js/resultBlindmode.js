localStorage.setItem('order2', 3);
console.log(localStorage.getItem('order'));
if(localStorage.getItem('order') == 1){
    localStorage.setItem('order2', 1);
const synth = window.speechSynthesis;
let utter = new SpeechSynthesisUtterance("");

// utter.text = "مرحبا";
  utter.voiceURI = 'Google العربية';
  utter.lang = 'ar-SA';

  // window.addEventListener("load", () => {
  //   setTimeout(()=>{utter.text ="يوجد 20 طريق متاحة.. برجاء اختيار الطريق المرغوب من الطرق التالية:"; synth.speak(utter);}, "1000");
  //   // setTimeout(()=>{utter.text ="الطريق رقم واحد: 8.75  جنيه"; synth.speak(utter);}, "15000");
  //   // setTimeout(()=>{utter.text ="الطريق رقم اثنين: 9.25  جنيه"; synth.speak(utter);}, "20000");
  //   // setTimeout(()=>{utter.text ="الطريق رقم ثلاثة: 9.75 جنيه"; synth.speak(utter);}, "25000");
  //   // setTimeout(()=>{utter.text ="الطريق رقم اربعة: 12.75 جنيه"; synth.speak(utter);}, "30000");
  //   // setTimeout(()=>{utter.text ="الطريق رقم خمسة:  جنيه"; synth.speak(utter);}, "35000");
  //   // setTimeout(()=>{utter.text ="الطريق رقم ستة:  جنيه"; synth.speak(utter);}, "40000");
  //   // setTimeout(()=>{utter.text ="الطريق رقم سبعة:  جنيه"; synth.speak(utter);}, "45000");
  //   // setTimeout(()=>{utter.text ="الطريق رقم ثمانية:  جنيه"; synth.speak(utter);}, "50000");
  //   // setTimeout(()=>{utter.text ="الطريق رقم 9:  جنيه"; synth.speak(utter);}, "55000");
  //   // setTimeout(()=>{utter.text ="الطريق رقم 10:  جنيه"; synth.speak(utter);}, "60000");
  //   // setTimeout(()=>{utter.text ="الطريق رقم 11:  جنيه"; synth.speak(utter);}, "65000");
  //   // setTimeout(()=>{utter.text ="الطريق رقم 12:  جنيه"; synth.speak(utter);}, "70000");
  //   // setTimeout(()=>{utter.text ="الطريق رقم 13:  جنيه"; synth.speak(utter);}, "75000");
  //   // setTimeout(()=>{utter.text ="الطريق رقم 14:  جنيه"; synth.speak(utter);}, "80000");
  //   // setTimeout(()=>{utter.text ="الطريق رقم 15:  جنيه"; synth.speak(utter);}, "85000");
  //   // setTimeout(()=>{utter.text ="الطريق رقم 16:  جنيه"; synth.speak(utter);}, "90000");
  //   // setTimeout(()=>{utter.text ="الطريق رقم 17:  جنيه"; synth.speak(utter);}, "95000");
  //   // setTimeout(()=>{utter.text ="الطريق رقم 18:  جنيه"; synth.speak(utter);}, "100000");
  //   // setTimeout(()=>{utter.text ="الطريق رقم 19:  جنيه"; synth.speak(utter);}, "105000");
  //   // setTimeout(()=>{utter.text ="الطريق رقم 20:  جنيه"; synth.speak(utter);}, "110000");
  //   // setTimeout(()=>{utter.text ="للاختيار قل: الطريق رقم:"; synth.speak(utter);}, "115000");


  // });
  let paths = [];
  let results= []

  // Assuming there are 19 dynamically rendered elements
  for (let i = 0; i < 20; i++) {
    const pathElement = document.querySelectorAll(".route-heading")[i];
    const path = pathElement.innerHTML;
    const trimmedPath = path.replace(/\n/g, '').replace(/\s+/g, ' ');
    paths.push(trimmedPath.trim());
  }
  
  paths.forEach((path, index) => {
    const matchResult = path.match(/السعر\s*:\s*(\S+)/);
  
    if (matchResult) {
      matchResult.forEach((match,i) => {
        const roadNumber = index + 1;
        if(i == 1){
          console.log(`الطريق رقم ${roadNumber}:  السعر ${match} جنيه`);
          setTimeout(() => {
            utter.text = `الطريق رقم ${roadNumber} السعر ${match} جنيه`;
            // utter.text = results;
            synth.speak(utter);
          }, 8000 * (index));
        }
        // results.push(`الطريق رقم ${roadNumber}: ${match} كيلومتر`)
        
      });
    }
  });
  
  setTimeout(() => {
    utter.text = "للاختيار قل: الطريق رقم:";
    synth.speak(utter);
  }, 8000 * paths.length + 5000);
   // annyang
if (annyang) {
    
    // Add Arabic language model
    annyang.setLanguage('ar');
  
    // Add voice commands
    annyang.addCommands({
      'الطريق رقم واحد': () => {
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[0].innerText);
        heading[0].click();
        utter.text = "لقد قمت باختيار الطريق رقم واحد";
        synth.speak(utter);
      },
      'الطريق رقم اثنين': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[1].innerText);
        heading[1].click();
        utter.text = "لقد قمت باختيار الطريق رقم اثنين";
        synth.speak(utter);
      },
      'الطريق رقم ثلاثه': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[2].innerText);
        heading[2].click();
        utter.text = "لقد قمت باختيار الطريق رقم ثلاثة";
        synth.speak(utter);
      },
      'الطريق رقم اربعه': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[3].innerText);
        heading[3].click();
        utter.text = "لقد قمت باختيار الطريق رقم اربعة";
        synth.speak(utter);
      },
      'الطريق رقم خمسه': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[4].innerText);
        heading[4].click();
        utter.text = "لقد قمت باختيار الطريق رقم خمسة";
        synth.speak(utter);
      },
      'الطريق رقم سته': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[5].innerText);
        heading[5].click();
        utter.text = "لقد قمت باختيار الطريق رقم ستة";
        synth.speak(utter);
      },
      'الطريق رقم سبعه': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[6].innerText);
        heading[6].click();
        utter.text = "لقد قمت باختيار الطريق رقم سبعة";
        synth.speak(utter);
      },
      'الطريق رقم ثمانيه': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[7].innerText);
        heading[7].click();
        utter.text = "لقد قمت باختيار الطريق رقم ثمانية";
        synth.speak(utter);
      },
      'الطريق رقم تسعه': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[8].innerText);
        heading[8].click();
        utter.text = "لقد قمت باختيار الطريق رقم تسعة";
        synth.speak(utter);
      },
      'الطريق رقم عشره': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[9].innerText);
        heading[9].click();
        utter.text = "لقد قمت باختيار الطريق رقم عشرة";
        synth.speak(utter);
      },
      'الطريق رقم حداشر': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[10].innerText);
        heading[10].click();
        utter.text = "لقد قمت باختيار الطريق رقم 11";
        synth.speak(utter);
      },
      'الطريق رقم اتناشر': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[11].innerText);
        heading[11].click();
        utter.text = "لقد قمت باختيار الطريق رقم 12";
        synth.speak(utter);
      },
      'الطريق رقم تلتاشر': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[12].innerText);
        heading[12].click();
        utter.text = "لقد قمت باختيار الطريق رقم 13";
        synth.speak(utter);
      },
      'الطريق رقم اربعتاشر': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[13].innerText);
        heading[13].click();
        utter.text = "لقد قمت باختيار الطريق رقم 14";
        synth.speak(utter);
      },
      'الطريق رقم خمستاشر': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[14].innerText);
        heading[14].click();
        utter.text = "لقد قمت باختيار الطريق رقم 15";
        synth.speak(utter);
      },
      'الطريق رقم ستاشر': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[15].innerText);
        heading[15].click();
        utter.text = "لقد قمت باختيار الطريق رقم 16";
        synth.speak(utter);
      },
      'الطريق رقم سبعتاشر': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[16].innerText);
        heading[16].click();
        utter.text = "لقد قمت باختيار الطريق رقم 17";
        synth.speak(utter);
      },
      'الطريق رقم تمنتاشر': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[17].innerText);
        heading[17].click();
        utter.text = "لقد قمت باختيار الطريق رقم 18";
        synth.speak(utter);
      },
      'الطريق رقم تسعتاشر': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[18].innerText);
        heading[18].click();
        utter.text = "لقد قمت باختيار الطريق رقم 19";
        synth.speak(utter);
      },
      'الطريق رقم عشرين': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[19].innerText);
        heading[19].click();
        utter.text = "لقد قمت باختيار الطريق رقم 20";
        synth.speak(utter);
      }
    });
   
    
    // Start listening for commands
    annyang.start();
  } else {
    console.log('annyang not supported');
  }

}else if(localStorage.getItem('order') == 0){
    localStorage.setItem('order2', 0);
    const synth = window.speechSynthesis;
let utter = new SpeechSynthesisUtterance("");
// utter.text = "مرحبا";
  utter.voiceURI = 'Google العربية';
  utter.lang = 'ar-SA';
  // window.addEventListener("load", () => {
  //   setTimeout(()=>{utter.text ="يوجد 20 طريق متاحة.. برجاء اختيار الطريق المرغوب من الطرق التالية:"; synth.speak(utter);}, "1000");
  //   });
  let paths = [];
  let results= []

  // Assuming there are 19 dynamically rendered elements
  for (let i = 0; i < 20; i++) {
    const pathElement = document.querySelectorAll(".route-heading")[i];
    const path = pathElement.innerHTML;
    const trimmedPath = path.replace(/\n/g, '').replace(/\s+/g, ' ');
    paths.push(trimmedPath.trim());
  }
  
  paths.forEach((path, index) => {
    const matchResult = path.match(/المسافة\s*:\s*(\S+)/);
  
    if (matchResult) {
      matchResult.forEach((match,i) => {
        const roadNumber = index + 1;
        if(i == 1){
          console.log(`الطريق رقم ${roadNumber}:  المسافة ${match} كيلومتر`);
          setTimeout(() => {
            utter.text = `الطريق رقم ${roadNumber} المسافة ${match} كيلومتر`;
            // utter.text = results;
            synth.speak(utter);
          }, 8000 * (index));
        }
        // results.push(`الطريق رقم ${roadNumber}: ${match} كيلومتر`)
        
      });
    }
  });
  
  setTimeout(() => {
    utter.text = "للاختيار قل: الطريق رقم:";
    synth.speak(utter);
  }, 8000 * paths.length + 5000);

  // annyang
if (annyang) {
    
    // Add Arabic language model
    annyang.setLanguage('ar');
  
    // Add voice commands
    annyang.addCommands({
      'الطريق رقم واحد': () => {
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[0].innerText);
        heading[0].click();
        utter.text = "لقد قمت باختيار الطريق رقم واحد";
        synth.speak(utter);
      },
      'الطريق رقم اثنين': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[1].innerText);
        heading[1].click();
        utter.text = "لقد قمت باختيار الطريق رقم اثنين";
        synth.speak(utter);
      },
      'الطريق رقم ثلاثه': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[2].innerText);
        heading[2].click();
        utter.text = "لقد قمت باختيار الطريق رقم ثلاثة";
        synth.speak(utter);
      },
      'الطريق رقم اربعه': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[3].innerText);
        heading[3].click();
        utter.text = "لقد قمت باختيار الطريق رقم اربعة";
        synth.speak(utter);
      },
      'الطريق رقم خمسه': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[4].innerText);
        heading[4].click();
        utter.text = "لقد قمت باختيار الطريق رقم خمسة";
        synth.speak(utter);
      },
      'الطريق رقم سته': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[5].innerText);
        heading[5].click();
        utter.text = "لقد قمت باختيار الطريق رقم ستة";
        synth.speak(utter);
      },
      'الطريق رقم سبعه': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[6].innerText);
        heading[6].click();
        utter.text = "لقد قمت باختيار الطريق رقم سبعة";
        synth.speak(utter);
      },
      'الطريق رقم ثمانيه': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[7].innerText);
        heading[7].click();
        utter.text = "لقد قمت باختيار الطريق رقم ثمانية";
        synth.speak(utter);
      },
      'الطريق رقم تسعه': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[8].innerText);
        heading[8].click();
        utter.text = "لقد قمت باختيار الطريق رقم تسعة";
        synth.speak(utter);
      },
      'الطريق رقم عشره': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[9].innerText);
        heading[9].click();
        utter.text = "لقد قمت باختيار الطريق رقم عشرة";
        synth.speak(utter);
      },
      'الطريق رقم حداشر': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[10].innerText);
        heading[10].click();
        utter.text = "لقد قمت باختيار الطريق رقم 11";
        synth.speak(utter);
      },
      'الطريق رقم اتناشر': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[11].innerText);
        heading[11].click();
        utter.text = "لقد قمت باختيار الطريق رقم 12";
        synth.speak(utter);
      },
      'الطريق رقم تلتاشر': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[12].innerText);
        heading[12].click();
        utter.text = "لقد قمت باختيار الطريق رقم 13";
        synth.speak(utter);
      },
      'الطريق رقم اربعتاشر': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[13].innerText);
        heading[13].click();
        utter.text = "لقد قمت باختيار الطريق رقم 14";
        synth.speak(utter);
      },
      'الطريق رقم خمستاشر': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[14].innerText);
        heading[14].click();
        utter.text = "لقد قمت باختيار الطريق رقم 15";
        synth.speak(utter);
      },
      'الطريق رقم ستاشر': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[15].innerText);
        heading[15].click();
        utter.text = "لقد قمت باختيار الطريق رقم 16";
        synth.speak(utter);
      },
      'الطريق رقم سبعتاشر': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[16].innerText);
        heading[16].click();
        utter.text = "لقد قمت باختيار الطريق رقم 17";
        synth.speak(utter);
      },
      'الطريق رقم تمنتاشر': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[17].innerText);
        heading[17].click();
        utter.text = "لقد قمت باختيار الطريق رقم 18";
        synth.speak(utter);
      },
      'الطريق رقم تسعتاشر': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[18].innerText);
        heading[18].click();
        utter.text = "لقد قمت باختيار الطريق رقم 19";
        synth.speak(utter);
      },
      'الطريق رقم عشرين': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[19].innerText);
        heading[19].click();
        utter.text = "لقد قمت باختيار الطريق رقم 20";
        synth.speak(utter);
      }
    });
   
    
    // Start listening for commands
    annyang.start();
  } else {
    console.log('annyang not supported');
  }
}else if(localStorage.getItem('order') == 5){
  localStorage.setItem('order2', 5);
  const synth = window.speechSynthesis;
let utter = new SpeechSynthesisUtterance("");
// utter.text = "مرحبا";
utter.voiceURI = 'Google العربية';
utter.lang = 'ar-SA';

// window.addEventListener("load", () => {
//   setTimeout(()=>{utter.text ="يوجد 20 طريق متاح.. برجاء اختيار الطريق المرغوب من الطرق التالية:"; synth.speak(utter);}, "1000");
// //   setTimeout(()=>{utter.text ="الطريق رقم واحد: 65 دقيقة"; synth.speak(utter);}, "15000");
// //   setTimeout(()=>{utter.text ="الطريق رقم اثنين: 65 دقيقة"; synth.speak(utter);}, "20000");
// //   setTimeout(()=>{utter.text ="الطريق رقم ثلاثة: 78 دقيقة"; synth.speak(utter);}, "25000");
// //   setTimeout(()=>{utter.text ="الطريق رقم اربعة: 78 دقيقة"; synth.speak(utter);}, "30000");
// //   setTimeout(()=>{utter.text ="الطريق رقم خمسة: 78 دقيقة"; synth.speak(utter);}, "35000");
// //   setTimeout(()=>{utter.text ="الطريق رقم ستة: 78 دقيقة"; synth.speak(utter);}, "40000");
// //   setTimeout(()=>{utter.text ="الطريق رقم سبعة: 88 دقيقة"; synth.speak(utter);}, "45000");
// //   setTimeout(()=>{utter.text ="الطريق رقم ثمانية: 88 دقيقة"; synth.speak(utter);}, "50000");
// //   setTimeout(()=>{utter.text ="الطريق رقم 9: 101 دقيقة"; synth.speak(utter);}, "55000");
// //   setTimeout(()=>{utter.text ="الطريق رقم 10: 101 دقيقة"; synth.speak(utter);}, "60000");
// //   setTimeout(()=>{utter.text ="الطريق رقم 11: 101 دقيقة"; synth.speak(utter);}, "65000");
// //   setTimeout(()=>{utter.text ="الطريق رقم 12: 101 دقيقة"; synth.speak(utter);}, "70000");
// //   setTimeout(()=>{utter.text ="الطريق رقم 13: 109 دقيقة"; synth.speak(utter);}, "75000");
// //   setTimeout(()=>{utter.text ="الطريق رقم 14: 122 دقيقة"; synth.speak(utter);}, "80000");
// //   setTimeout(()=>{utter.text ="الطريق رقم 15: 122 دقيقة"; synth.speak(utter);}, "85000");
// //   setTimeout(()=>{utter.text ="الطريق رقم 16: 126 دقيقة"; synth.speak(utter);}, "90000");
// //   setTimeout(()=>{utter.text ="الطريق رقم 17: 126 دقيقة"; synth.speak(utter);}, "95000");
// //   setTimeout(()=>{utter.text ="الطريق رقم 18: 139 دقيقة"; synth.speak(utter);}, "100000");
// //   setTimeout(()=>{utter.text ="الطريق رقم 19: 139 دقيقة"; synth.speak(utter);}, "105000");
// //   setTimeout(()=>{utter.text ="الطريق رقم 20: 139 دقيقة"; synth.speak(utter);}, "110000");
// //   setTimeout(()=>{utter.text ="للاختيار قل: الطريق رقم:"; synth.speak(utter);}, "115000");
// });

let paths = [];
  let results= []

  // Assuming there are 19 dynamically rendered elements
  for (let i = 0; i < 20; i++) {
    const pathElement = document.querySelectorAll(".route-heading")[i];
    const path = pathElement.innerHTML;
    const trimmedPath = path.replace(/\n/g, '').replace(/\s+/g, ' ');
    paths.push(trimmedPath.trim());
  }
  
  paths.forEach((path, index) => {
    const matchResult = path.match(/الوقت\s*:\s*(\S+)/);
  
    if (matchResult) {
      matchResult.forEach((match,i) => {
        const roadNumber = index + 1;
        if(i == 1){
          console.log(`الطريق رقم ${roadNumber}:  الوقت ${match} دقييقة`);
          setTimeout(() => {
            utter.text = `الطريق رقم ${roadNumber} الوقت ${match} دقييقة`;
            // utter.text = results;
            synth.speak(utter);
          }, 8000 * (index));
        }
        // results.push(`الطريق رقم ${roadNumber}: ${match} كيلومتر`)
        
      });
    }
  });
  
  setTimeout(() => {
    utter.text = "للاختيار قل: الطريق رقم:";
    synth.speak(utter);
  }, 8000 * paths.length + 5000);

// annyang
if (annyang) {
  
  // Add Arabic language model
  annyang.setLanguage('ar');

  // Add voice commands
  annyang.addCommands({
    'الطريق رقم واحد': () => {
      const heading = document.querySelectorAll('.route-heading');
      console.log(heading[0].innerText);
      heading[0].click();
      utter.text = "لقد قمت باختيار الطريق رقم واحد";
      synth.speak(utter);
    },
    'الطريق رقم اثنين': ()=>{
      const heading = document.querySelectorAll('.route-heading');
      console.log(heading[1].innerText);
      heading[1].click();
      utter.text = "لقد قمت باختيار الطريق رقم اثنين";
      synth.speak(utter);
    },
    'الطريق رقم ثلاثه': ()=>{
      const heading = document.querySelectorAll('.route-heading');
      console.log(heading[2].innerText);
      heading[2].click();
      utter.text = "لقد قمت باختيار الطريق رقم ثلاثة";
      synth.speak(utter);
    },
    'الطريق رقم اربعه': ()=>{
      const heading = document.querySelectorAll('.route-heading');
      console.log(heading[3].innerText);
      heading[3].click();
      utter.text = "لقد قمت باختيار الطريق رقم اربعة";
      synth.speak(utter);
    },
    'الطريق رقم خمسه': ()=>{
      const heading = document.querySelectorAll('.route-heading');
      console.log(heading[4].innerText);
      heading[4].click();
      utter.text = "لقد قمت باختيار الطريق رقم خمسة";
      synth.speak(utter);
    },
    'الطريق رقم سته': ()=>{
      const heading = document.querySelectorAll('.route-heading');
      console.log(heading[5].innerText);
      heading[5].click();
      utter.text = "لقد قمت باختيار الطريق رقم ستة";
      synth.speak(utter);
    },
    'الطريق رقم سبعه': ()=>{
      const heading = document.querySelectorAll('.route-heading');
      console.log(heading[6].innerText);
      heading[6].click();
      utter.text = "لقد قمت باختيار الطريق رقم سبعة";
      synth.speak(utter);
    },
    'الطريق رقم ثمانيه': ()=>{
      const heading = document.querySelectorAll('.route-heading');
      console.log(heading[7].innerText);
      heading[7].click();
      utter.text = "لقد قمت باختيار الطريق رقم ثمانية";
      synth.speak(utter);
    },
    'الطريق رقم تسعه': ()=>{
      const heading = document.querySelectorAll('.route-heading');
      console.log(heading[8].innerText);
      heading[8].click();
      utter.text = "لقد قمت باختيار الطريق رقم تسعة";
      synth.speak(utter);
    },
    'الطريق رقم عشره': ()=>{
      const heading = document.querySelectorAll('.route-heading');
      console.log(heading[9].innerText);
      heading[9].click();
      utter.text = "لقد قمت باختيار الطريق رقم عشرة";
      synth.speak(utter);
    },
    'الطريق رقم حداشر': ()=>{
      const heading = document.querySelectorAll('.route-heading');
      console.log(heading[10].innerText);
      heading[10].click();
      utter.text = "لقد قمت باختيار الطريق رقم 11";
      synth.speak(utter);
    },
    'الطريق رقم اتناشر': ()=>{
      const heading = document.querySelectorAll('.route-heading');
      console.log(heading[11].innerText);
      heading[11].click();
      utter.text = "لقد قمت باختيار الطريق رقم 12";
      synth.speak(utter);
    },
    'الطريق رقم تلتاشر': ()=>{
      const heading = document.querySelectorAll('.route-heading');
      console.log(heading[12].innerText);
      heading[12].click();
      utter.text = "لقد قمت باختيار الطريق رقم 13";
      synth.speak(utter);
    },
    'الطريق رقم اربعتاشر': ()=>{
      const heading = document.querySelectorAll('.route-heading');
      console.log(heading[13].innerText);
      heading[13].click();
      utter.text = "لقد قمت باختيار الطريق رقم 14";
      synth.speak(utter);
    },
    'الطريق رقم خمستاشر': ()=>{
      const heading = document.querySelectorAll('.route-heading');
      console.log(heading[14].innerText);
      heading[14].click();
      utter.text = "لقد قمت باختيار الطريق رقم 15";
      synth.speak(utter);
    },
    'الطريق رقم ستاشر': ()=>{
      const heading = document.querySelectorAll('.route-heading');
      console.log(heading[15].innerText);
      heading[15].click();
      utter.text = "لقد قمت باختيار الطريق رقم 16";
      synth.speak(utter);
    },
    'الطريق رقم سبعتاشر': ()=>{
      const heading = document.querySelectorAll('.route-heading');
      console.log(heading[16].innerText);
      heading[16].click();
      utter.text = "لقد قمت باختيار الطريق رقم 17";
      synth.speak(utter);
    },
    'الطريق رقم تمنتاشر': ()=>{
      const heading = document.querySelectorAll('.route-heading');
      console.log(heading[17].innerText);
      heading[17].click();
      utter.text = "لقد قمت باختيار الطريق رقم 18";
      synth.speak(utter);
    },
    'الطريق رقم تسعتاشر': ()=>{
      const heading = document.querySelectorAll('.route-heading');
      console.log(heading[18].innerText);
      heading[18].click();
      utter.text = "لقد قمت باختيار الطريق رقم 19";
      synth.speak(utter);
    },
    'الطريق رقم عشرين': ()=>{
      const heading = document.querySelectorAll('.route-heading');
      console.log(heading[19].innerText);
      heading[19].click();
      utter.text = "لقد قمت باختيار الطريق رقم 20";
      synth.speak(utter);
    }
  });
 
  
  // Start listening for commands
  annyang.start();
} else {
  console.log('annyang not supported');
}
}













// let paths = [];
// // Assuming there are 19 dynamically rendered elements
// for (let i = 0; i < 20; i++) {
//   const pathElement = document.querySelectorAll(".route-heading")[i];
//   const path = pathElement.innerHTML;
//   const trimmedPath = path.replace(/\n/g, '').replace(/\s+/g, ' ');
//   paths.push(trimmedPath.trim());
// }
// paths.forEach((path, index) => {
//   const matchResult = path.match(/المسافة\s*:\s*(\S+)/);
//   if (matchResult) {
//     matchResult.forEach((match, i) => {
//       const roadNumber = index+1;
      
//       if(i == 1){
//         // console.log(` الطريق رقم${roadNumber}: ${match} كيلو متر`);
//         console.log(`${match} `);
//       }
      
//     })
//   }
// });


