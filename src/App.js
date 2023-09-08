import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react'
import WorldTimeComponent from './WorldTimeComponent';

const JUST_LIKE_THAT_WEEKEND_GONE = "https://images.prismic.io/friday-marketing/5469e8fd-6de1-482f-88db-ec69d0c139f8_funny-weekend-memes-48-720x847.jpg"
const I_SMELL_THE_WEEKEND = "https://www.digitalmomblog.com/wp-content/uploads/2021/10/smell-weekend-meme.jpg"
const STAY_STRONG_WEEKEND_SOON = "https://facultyloungers.com/cdn/shop/articles/Weekend-soon-baby-teacher-meme.jpg"
const FINALLY_WEEKEND = "https://www.meme-arsenal.com/memes/b224e236c2f4b3afac4755fa819c149e.jpg"
const REALIZING_ITS_TUESDAY = "https://media.tenor.com/YQBpwdjkwZsAAAAd/pam-tuesday.gif"
const MICHAEL_SCOTT_DANCE = "https://media1.giphy.com/media/oUZDGQg4XNotM6SvH0/giphy.gif?cid=ecf05e47knvg0c4yeoo2reqhe6uxlv84ng5e6q75a5bybgin&ep=v1_gifs_search&rid=giphy.gif&ct=g"
const WOAH_HALFWAY_THERE = "https://i.pinimg.com/736x/cc/49/2c/cc492c3c4ce663df412c159a49db5e17.jpg"
const DRUMROLL = "https://i.giphy.com/media/CLCT8BXR1T2oyBYilM/giphy.webp"
const Weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

const TimeZoneDisplayer = () => {
  useEffect(() => {
    const today = new Date('2023-09-06T00:00:00')
    const hrs = today.getHours()
    console.log(hrs)
    const offsets = [-7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

  }, [])
  return (
    <div></div>
  )
}


function App() {
  const [today, setToday] = useState(new Date())
  const [percentage, setPercentage] = useState(0)

  const [isWeekend, setIsWeekend] = useState(false)

  const [imgurl, setImgurl] = useState(null)

  const selectImage = () => {
    // Is it monday before 8 in the morning?
    if (today.getDay() === 1 && today.getHours() < 8) {
      setImgurl(FINALLY_WEEKEND)
    }

    // Is it monday morning?
    else if (today.getDay() === 1 && today.getHours() < 12) {
      setImgurl(JUST_LIKE_THAT_WEEKEND_GONE)
    }

    // Is it tuesday?
    else if (today.getDay() === 2 && (today.getMinutes() % 10 === 0)) {
      setImgurl(REALIZING_ITS_TUESDAY)
    }

    // Is it wednesday after noon?
    else if (today.getDay() === 3 && today.getHours() >= 12) {
      setImgurl(WOAH_HALFWAY_THERE)
    }

    // Is it Thursday?
    else if (today.getDay() === 4) {
      setImgurl(STAY_STRONG_WEEKEND_SOON)
    }

    // Is it friday before noon?
    else if (today.getDay() === 5 && today.getHours() < 12) {
      setImgurl(STAY_STRONG_WEEKEND_SOON)
    }

    // Is it friday just before 16?
    else if (today.getDay() === 5 && today.getHours() === 15 && today.getMinutes() > 58) {
      setImgurl(DRUMROLL)
    }

    // Is it friday after noon?
    else if (today.getDay() === 5 && today.getHours() >= 12 && today.getHours() < 16) {
      setImgurl(I_SMELL_THE_WEEKEND)
    }

    // Or is it friday after 16?
    else if (today.getDay() === 5 && today.getHours() >= 16 && today.getMinutes() < 5) {
      setImgurl(MICHAEL_SCOTT_DANCE)
    }

    // Or is it friday after 16?
    else if (today.getDay() === 5 && today.getHours() >= 16) {
      setImgurl(FINALLY_WEEKEND)
    }

    // Is it the weekend?
    else if (today.getDay() === 6 || today.getDay() === 0) {
      setImgurl(FINALLY_WEEKEND)
    }



    // If none, set img to null and dont show anything
    else {
      setImgurl(null)
    }
  }

  const update = () => {
    setToday(new Date())
    selectImage()
    if (today.getDay() === 6 || today.getDay() === 0) {
      setIsWeekend(true)
      return
    }
    const prevMonday = new Date(today.getTime())
    while (prevMonday.getDay() != 1) {
      prevMonday.setTime(prevMonday.getTime() - 1000 * 60 * 60 * 24)
    }
    prevMonday.setHours(8, 0, 0, 0)
    if (today.getTime() < prevMonday.getTime()) {
      setIsWeekend(true)
      return
    }
    const localNextFriday = new Date(today.getTime())
    while (localNextFriday.getDay() != 5) {
      localNextFriday.setTime(localNextFriday.getTime() + 1000 * 60 * 60 * 24)
    }
    localNextFriday.setHours(16, 0, 0, 0)
    if (today.getTime() > localNextFriday.getTime()) {
      console.log(today, localNextFriday)
      setIsWeekend(true)
      return
    }
    setIsWeekend(false)
    const normalizedToday = today.getTime() - prevMonday.getTime()
    const normalizedFriday = localNextFriday.getTime() - prevMonday.getTime()
    // setPercentage(0.4)
    setPercentage((normalizedToday / normalizedFriday))
  }

  const blendColor = (t) => {
    if (t < 0.25) {
      return "rgb(210, 95, 86)"
    }
    else if (t < 0.75) {
      return "rgb(238, 173, 81)"
    }
    return "rgb(116, 183, 103)"
  }


  useEffect(() => {
    const timer = setTimeout(update, 1000)
    return (() => {
      clearTimeout(timer)
    })
  }, [today])


  return (
    <div style={{ alignItems: 'center', justifyContent: 'flex-start', display: 'flex', flexDirection: 'column', padding: 20, backgroundColor: '#282c34', minHeight: '100vh' }}>
      {!!!isWeekend ? <>
        <h1 style={{ color: '#bbbbbb' }}>{`Percentage towards weekend: ${(percentage * 100).toFixed(2)}%`}</h1>
        <div style={{ width: '100%', border: '3px solid #bbbbbb', borderRadius: 10, overflow: 'hidden', backgroundColor: '#282c34' }}>
          <div style={{ width: `${(percentage * 100)}%`, height: 50, backgroundColor: blendColor(percentage) }}></div>
        </div>
      </>
        :
        <div style={{ color: '#bbbbbb', fontSize: 40, marginBottom: 0, paddingBottom: 0 }}>
          <h1>WOHOOO WEEKEND</h1>
        </div>
      }
      {imgurl && <div style={{ height: '60vh' }}>
        <img src={imgurl} style={{ maxHeight: '60vh', maxWidth: '80vw', height: '100%', border: '3px solid #bbbbbb', borderRadius: 10, overflow: 'hidden', marginTop: 40, objectFit: 'cover' }} />
      </div>}
      <WorldTimeComponent />

    </div>
  );
}

export default App;
