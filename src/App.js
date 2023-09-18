import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useRef } from 'react'
import WorldTimeComponent from './WorldTimeComponent';
/*
const JUST_LIKE_THAT_WEEKEND_GONE = "https://images.prismic.io/friday-marketing/5469e8fd-6de1-482f-88db-ec69d0c139f8_funny-weekend-memes-48-720x847.jpg"
const I_SMELL_THE_WEEKEND = "https://www.digitalmomblog.com/wp-content/uploads/2021/10/smell-weekend-meme.jpg"
const STAY_STRONG_WEEKEND_SOON = "https://facultyloungers.com/cdn/shop/articles/Weekend-soon-baby-teacher-meme.jpg"
const FINALLY_WEEKEND = "https://www.meme-arsenal.com/memes/b224e236c2f4b3afac4755fa819c149e.jpg"
const REALIZING_ITS_TUESDAY = "https://media.tenor.com/YQBpwdjkwZsAAAAd/pam-tuesday.gif"
const MICHAEL_SCOTT_DANCE = "https://media1.giphy.com/media/oUZDGQg4XNotM6SvH0/giphy.gif?cid=ecf05e47knvg0c4yeoo2reqhe6uxlv84ng5e6q75a5bybgin&ep=v1_gifs_search&rid=giphy.gif&ct=g"
const WOAH_HALFWAY_THERE = "https://i.pinimg.com/736x/cc/49/2c/cc492c3c4ce663df412c159a49db5e17.jpg"
const DRUMROLL = "https://i.giphy.com/media/CLCT8BXR1T2oyBYilM/giphy.webp"
*/
const Weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]




function App() {
  const [today, setToday] = useState(new Date())
  const [percentage, setPercentage] = useState(0)
  const lastMinute = useRef(-10)

  const [isWeekend, setIsWeekend] = useState(false)

  const [imgurl, setImgurl] = useState(null)

  const updateImage = async () => {
    const res = await fetch("https://raw.githubusercontent.com/AleksSpifu/percentage_to_weekend/main/public/images.json", { cache: "no-store" })
    const json = await res.json()
    const todaysImages = json[Weekdays[today.getDay()]]
    const todaysHoursInFloat = today.getHours() + (today.getMinutes() / 60)
    console.log(todaysHoursInFloat)
    const currentImage = todaysImages.find((e) => {
      const startTimeFloat = e.StartHour + (e.StartMinute / 60)
      const endTimeFloat = e.EndHour + (e.EndMinute / 60)
      return startTimeFloat <= todaysHoursInFloat && endTimeFloat > todaysHoursInFloat
    })
    console.log(currentImage)
    if (!currentImage) {
      setImgurl(null)
      return
    }
    if (currentImage.IsGif) {
      if (today.getMinutes() % 10 === 0) {
        setImgurl(currentImage.URL)
      } else {
        setImgurl(null)
      }
    } else {
      setImgurl(currentImage.URL)
    }

  }

  const update = () => {
    setToday(new Date())
    //selectImage()
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
    if (lastMinute.current !== today.getMinutes()) {
      lastMinute.current = today.getMinutes()
      updateImage()
    }
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
