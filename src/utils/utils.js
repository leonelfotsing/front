export function speech(text){


  const utterThis = new SpeechSynthesisUtterance()
  const synth = window.speechSynthesis

  const checkBrowserCompatibility = () => {
    "speechSynthesis" in window
      ? console.log("Web Speech API supported!")
      : console.log("Web Speech API not supported :-(")
  }

  checkBrowserCompatibility()

  utterThis.text = text

  synth.speak(utterThis)

  

}