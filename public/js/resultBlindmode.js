
// if(window.order == 1){
const synth = window.speechSynthesis;
let utter = new SpeechSynthesisUtterance("");
// utter.text = "مرحبا";
  utter.voiceURI = 'Google العربية';
  utter.lang = 'ar-SA';

  window.addEventListener("load", () => {
    setTimeout(()=>{utter.text ="يوجد ثمان طرق متاحة.. برجاء اختيار الطريق المرغوب من الطرق التالية:"; synth.speak(utter);}, "5000");
    setTimeout(()=>{utter.text ="الطريق رقم واحد: خمسة وعشرون جنيه"; synth.speak(utter);}, "15000");
    setTimeout(()=>{utter.text ="الطريق رقم اثنين: خمسة وعشرون جنيه"; synth.speak(utter);}, "20000");
    setTimeout(()=>{utter.text ="الطريق رقم ثلاثة: خمسة وعشرون جنيه"; synth.speak(utter);}, "25000");
    setTimeout(()=>{utter.text ="الطريق رقم اربعة: خمسة وعشرون جنيه"; synth.speak(utter);}, "30000");
    setTimeout(()=>{utter.text ="الطريق رقم خمسة: ثلاثون جنيه"; synth.speak(utter);}, "35000");
    setTimeout(()=>{utter.text ="الطريق رقم ستة: ثلاثون جنيه"; synth.speak(utter);}, "40000");
    setTimeout(()=>{utter.text ="الطريق رقم سبعة: ثلاثون جنيه"; synth.speak(utter);}, "45000");
    setTimeout(()=>{utter.text ="الطريق رقم ثمانية: ثلاثون جنيه"; synth.speak(utter);}, "50000");
    setTimeout(()=>{utter.text ="للاختيار قل: طريق رقم:"; synth.speak(utter);}, "55000");
  });
// }