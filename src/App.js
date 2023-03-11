import { useState, useEffect } from 'react';
import { AiOutlineArrowUp } from 'react-icons/ai'
import Text from './components/Text';
import './App.css';

function App() {
  const [position, setPosition] = useState(0);
  const [backVisible, setBackVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(()=>{
    const handleScroll = () => {
      setBackVisible(window.scrollY < position && window.scrollY > 200 && !isScrolling)
      setPosition(window.scrollY);
    }
    window.addEventListener("scroll", handleScroll);

    return ()=>{
      window.removeEventListener("scroll", handleScroll);
    }
  }, [position, isScrolling,]);

  const scrollToTop = () => {
    setIsScrolling(true);

    let back = setInterval(()=>{
      window.scrollBy(0, -position / 50);
      if (window.scrollY <= 0){
        setIsScrolling(false);
        clearInterval(back);
      }
    }, 20);
  }

  const [numberOfWord, setNumberOfWord] = useState(0);
  const [word, setWord] = useState("");

  useEffect(()=>{
    let countWord = setTimeout(()=>{
      setNumberOfWord(word ? word.trim().split(' ').length : 0);
    }, 500);

    return ()=>{
      clearTimeout(countWord);
    }
  }, [word,])

  return (
    <div className="App">
      <div className="input_wrap">
        <textarea value={word} rows={4} cols={50} onChange={e => setWord(e.target.value)}></textarea>
        <div id="word_number">{numberOfWord < 2 ? `Word: ${numberOfWord}` : `Words: ${numberOfWord}`}</div>
      </div>
      <Text/>
      <div id="back_wrap" className={backVisible ? "active" : ""} onClick={scrollToTop}>
        <AiOutlineArrowUp id="back_icon"/>
      </div>
    </div>
  );
}

export default App;
