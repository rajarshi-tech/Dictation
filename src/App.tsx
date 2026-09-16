import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

type Chunk = { id: number; sentences: string[] }
type Status = 'idle' | 'playing' | 'paused' | 'finished'

const starterText = 'The quick brown fox jumps over the lazy dog. It then runs into the forest. The forest was completely silent. A bird calls once in the distance.'

function splitSentences(text: string) {
  return text.replace(/\s+/g, ' ').trim().match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map((sentence) => sentence.trim()) ?? []
}

function App() {
  const [text, setText] = useState(starterText)
  const [chunkSize, setChunkSize] = useState(2)
  const [repetitions, setRepetitions] = useState(2)
  const [speed, setSpeed] = useState(0.9)
  const [speedChange, setSpeedChange] = useState(0.1)
  const [pause, setPause] = useState(2)
  const [status, setStatus] = useState<Status>('idle')
  const [chunkIndex, setChunkIndex] = useState(0)
  const [repeatIndex, setRepeatIndex] = useState(0)
  const [selectedVoice, setSelectedVoice] = useState('')
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const pauseTimer = useRef<number | undefined>(undefined)
  const statusRef = useRef<Status>('idle')
  const chunkIndexRef = useRef(0)
  const repeatIndexRef = useRef(0)

  const updateStatus = (nextStatus: Status) => {
    statusRef.current = nextStatus
    setStatus(nextStatus)
  }

  const chunks = useMemo<Chunk[]>(() => {
    const sentences = splitSentences(text)
    const grouped: Chunk[] = []
    for (let index = 0; index < sentences.length; index += chunkSize) grouped.push({ id: grouped.length + 1, sentences: sentences.slice(index, index + chunkSize) })
    return grouped
  }, [chunkSize, text])

  const totalPlays = chunks.length * repetitions
  const completedPlays = chunkIndex * repetitions + repeatIndex

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices()
      setVoices(availableVoices)
      if (!selectedVoice && availableVoices[0]) setSelectedVoice(availableVoices[0].voiceURI)
    }
    loadVoices()
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices)
    return () => window.speechSynthesis.removeEventListener('voiceschanged', loadVoices)
  }, [selectedVoice])

  useEffect(() => () => {
    window.speechSynthesis.cancel()
    if (pauseTimer.current) window.clearTimeout(pauseTimer.current)
  }, [])

  const speakCurrent = () => {
    const activeChunk = chunks[chunkIndexRef.current]
    const activeRate = Math.min(2, Math.max(0.4, speed + repeatIndexRef.current * speedChange))
    if (!activeChunk) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(activeChunk.sentences.join(' '))
    utterance.rate = activeRate
    const voice = voices.find((item) => item.voiceURI === selectedVoice)
    if (voice) utterance.voice = voice
    utterance.onstart = () => updateStatus('playing')
    utterance.onend = () => {
      if (statusRef.current !== 'playing') return
      if (repeatIndexRef.current + 1 < repetitions) {
        repeatIndexRef.current += 1
        setRepeatIndex(repeatIndexRef.current)
        pauseTimer.current = window.setTimeout(speakCurrent, pause * 1000)
      } else if (chunkIndexRef.current + 1 < chunks.length) {
        chunkIndexRef.current += 1
        setChunkIndex(chunkIndexRef.current)
        repeatIndexRef.current = 0
        setRepeatIndex(0)
        pauseTimer.current = window.setTimeout(speakCurrent, pause * 1000)
      } else updateStatus('finished')
    }
    window.speechSynthesis.speak(utterance)
  }

  const start = () => {
    if (status === 'paused') {
      window.speechSynthesis.resume()
      updateStatus('playing')
      return
    }
    updateStatus('playing')
    window.setTimeout(speakCurrent, 0)
  }

  const pausePlayback = () => { window.speechSynthesis.pause(); updateStatus('paused') }
  const stop = () => {
    window.speechSynthesis.cancel()
    if (pauseTimer.current) window.clearTimeout(pauseTimer.current)
    chunkIndexRef.current = 0
    repeatIndexRef.current = 0
    setChunkIndex(0); setRepeatIndex(0); updateStatus('idle')
  }
  const skip = (direction: number) => {
    window.speechSynthesis.cancel()
    if (pauseTimer.current) window.clearTimeout(pauseTimer.current)
    chunkIndexRef.current = Math.min(Math.max(chunkIndex + direction, 0), chunks.length - 1)
    repeatIndexRef.current = 0
    setChunkIndex(chunkIndexRef.current); setRepeatIndex(0); updateStatus('idle')
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLTextAreaElement || event.target instanceof HTMLInputElement) return
      if (event.code === 'Space') { event.preventDefault(); if (statusRef.current === 'playing') pausePlayback(); else start() }
      if (event.key.toLowerCase() === 'r') speakCurrent()
      if (event.key === 'ArrowRight') skip(1)
      if (event.key === 'ArrowLeft') skip(-1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  return <main className="app-shell">
    <header className="topbar"><div><span className="brand-mark">D</span><strong>DICTATION</strong></div><span className="provider-label">LOCAL / BROWSER VOICE</span></header>
    <section className="workspace">
      <div className="source-panel panel"><div className="panel-heading"><div><span className="eyebrow">01 / SOURCE</span><h1>Text to dictate</h1></div><span className="char-count">{text.length} CHAR</span></div><textarea value={text} onChange={(event) => setText(event.target.value)} aria-label="Text to dictate" /><div className="source-footer"><span>{splitSentences(text).length} SENTENCES / {chunks.length} CHUNKS</span><button type="button" className="text-button" onClick={() => setText('')}>CLEAR TEXT</button></div></div>
      <aside className="control-panel panel"><div className="panel-heading"><div><span className="eyebrow">02 / SETUP</span><h2>Playback</h2></div><span className={`status status-${status}`}>{status.toUpperCase()}</span></div>
        <label>VOICE<select value={selectedVoice} onChange={(event) => setSelectedVoice(event.target.value)}><option value="">System default</option>{voices.map((voice) => <option key={voice.voiceURI} value={voice.voiceURI}>{voice.name} / {voice.lang}</option>)}</select></label>
        <div className="field-grid"><label>CHUNK SIZE<input type="number" min="1" max="8" value={chunkSize} onChange={(event) => setChunkSize(Math.max(1, Number(event.target.value)))} /><small>SENTENCES</small></label><label>REPETITIONS<input type="number" min="1" max="6" value={repetitions} onChange={(event) => setRepetitions(Math.max(1, Number(event.target.value)))} /><small>PER CHUNK</small></label><label>START SPEED<input type="number" min="0.4" max="2" step="0.05" value={speed} onChange={(event) => setSpeed(Number(event.target.value))} /><small>× RATE</small></label><label>RATE CHANGE<input type="number" min="-0.3" max="0.3" step="0.05" value={speedChange} onChange={(event) => setSpeedChange(Number(event.target.value))} /><small>PER REPEAT</small></label></div>
        <label>PAUSE<input type="range" min="0" max="8" step="0.5" value={pause} onChange={(event) => setPause(Number(event.target.value))} /><span className="range-value">{pause} SEC</span></label>
        <div className="transport"><button type="button" className="button button-main" onClick={status === 'playing' ? pausePlayback : start}>{status === 'playing' ? 'PAUSE' : status === 'paused' ? 'RESUME' : 'START'}</button><button type="button" className="button" onClick={stop}>STOP</button></div><div className="transport transport-secondary"><button type="button" className="button" onClick={() => skip(-1)}>PREVIOUS</button><button type="button" className="button" onClick={speakCurrent}>REPLAY</button><button type="button" className="button" onClick={() => skip(1)}>NEXT</button></div><p className="shortcut-note">SPACE PLAY / PAUSE <span>R REPLAY</span> <span>ARROWS SKIP</span></p>
      </aside>
    </section>
    <section className="queue-section"><div className="queue-heading"><div><span className="eyebrow">03 / QUEUE</span><h2>Dictation sequence</h2></div><strong>{Math.min(completedPlays, totalPlays)} / {totalPlays || 0} PLAYS</strong></div><div className="chunk-list">{chunks.map((chunk, index) => <button type="button" className={`chunk-row ${index === chunkIndex ? 'active' : ''} ${index < chunkIndex ? 'done' : ''}`} key={chunk.id} onClick={() => { chunkIndexRef.current = index; repeatIndexRef.current = 0; setChunkIndex(index); setRepeatIndex(0); updateStatus('idle') }}><span className="chunk-number">{String(chunk.id).padStart(2, '0')}</span><span className="chunk-copy"><strong>{chunk.sentences.join(' ')}</strong><small>{chunk.sentences.length} SENTENCE{chunk.sentences.length === 1 ? '' : 'S'} / {index === chunkIndex ? `REPEAT ${repeatIndex + 1} OF ${repetitions}` : index < chunkIndex ? 'COMPLETE' : 'QUEUED'}</small></span><span className="chunk-arrow">{index === chunkIndex ? 'NOW' : index < chunkIndex ? 'DONE' : '>'}</span></button>)}</div>{chunks.length === 0 && <div className="empty-state">Paste text above to build a dictation queue.</div>}</section>
    <footer className="footer"><span>NO CLOUD / NO ACCOUNT / YOUR TEXT STAYS HERE</span><span>WEB SPEECH API</span></footer>
  </main>
}

export default App
