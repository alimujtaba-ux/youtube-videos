import sys, os, json
from pathlib import Path
root = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(root / '.tools/python'))
os.environ['HF_HOME'] = str(root / '.tools/huggingface')
os.environ['HF_HUB_DISABLE_XET'] = '1'
from faster_whisper import WhisperModel
import av
source = root / 'public/audio/voiceover.mp3'
with av.open(str(source)) as container:
    duration = container.duration / av.time_base
print('Audio duration:', duration, flush=True)
model = WhisperModel('base.en', device='cpu', compute_type='int8', cpu_threads=6, download_root=str(root / '.tools/models'))
import numpy as np
samples=[]
with av.open(str(source)) as container:
    resampler=av.AudioResampler(format='s16',layout='mono',rate=16000)
    for frame in container.decode(audio=0):
        for converted in resampler.resample(frame):
            samples.append(converted.to_ndarray().flatten())
audio=np.concatenate(samples).astype(np.float32)/32768.0
wave=[]
for chunk in np.array_split(audio,1000):
    wave.append(round(float(np.sqrt(np.mean(chunk**2))),4))
peak=max(wave)
(root/'src/timeline/waveform.json').write_text(json.dumps([round((x/peak)**0.6,3) for x in wave]),encoding='utf8')
segments, info = model.transcribe(audio, word_timestamps=True, beam_size=5, language='en', vad_filter=False)
result=[]
for segment in segments:
    row={'start':segment.start,'end':segment.end,'text':segment.text.strip(),'words':[{'start':w.start,'end':w.end,'word':w.word.strip(),'probability':w.probability} for w in segment.words]}
    result.append(row)
    print(f'{segment.start:.2f} - {segment.end:.2f}: {segment.text}', flush=True)
(root/'src/timeline').mkdir(parents=True,exist_ok=True)
(root/'src/timeline/transcript.json').write_text(json.dumps({'duration':duration,'language':info.language,'segments':result},indent=2),encoding='utf8')
