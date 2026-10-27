(() => {
  'use strict';
  const KEY = 'urenberekenaar.v1';
  const byId = id => document.getElementById(id);
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch {}
  const validTime = n => Number.isInteger(n) && n >= 0 && n <= 95;
  const validPause = n => Number.isInteger(n) && n >= 0 && n <= 720 && n % 15 === 0;
  const state = { start:validTime(saved.start)?saved.start:32, end:validTime(saved.end)?saved.end:68, pause:validPause(saved.pause)?saved.pause:30, theme:['auto','light','dark'].includes(saved.theme)?saved.theme:'auto' };
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const timeLabel = i => `${String(Math.floor(i/4)).padStart(2,'0')}:${String((i%4)*15).padStart(2,'0')}`;
  const pauseLabel = p => `${Math.floor(p/60)}u ${String(p%60).padStart(2,'0')}m`;
  const persist = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {} };
  const wheels = {};
  function makeWheel(field){
    const el = byId(field+'Wheel'); wheels[field]=el;
    for(let i=0;i<96;i++){
      const item=document.createElement('div');item.className='wheel-option';item.textContent=timeLabel(i);item.dataset.value=i;item.setAttribute('role','option');item.setAttribute('aria-selected','false');el.appendChild(item);
    }
    let timer;
    const select = (i,scroll=false) => {
      i=Math.max(0,Math.min(95,i));state[field]=i;
      [...el.children].forEach(child => { const yes=Number(child.dataset.value)===i;child.classList.toggle('selected',yes);child.setAttribute('aria-selected',String(yes)); });
      if(scroll) el.scrollTo({top:i*44,behavior:'smooth'});
      persist();render();
    };
    el.addEventListener('click',ev=>{const option=ev.target.closest('[data-value]');if(option)select(Number(option.dataset.value),true)});
    el.addEventListener('scroll',()=>{clearTimeout(timer);timer=setTimeout(()=>select(Math.round(el.scrollTop/44)),115)},{passive:true});
    el.addEventListener('keydown',ev=>{if(['ArrowUp','ArrowDown','Home','End'].includes(ev.key)){ev.preventDefault();select(ev.key==='Home'?0:ev.key==='End'?95:state[field]+(ev.key==='ArrowUp'?-1:1),true)}});
    select(state[field]);
    requestAnimationFrame(()=>{el.scrollTop=state[field]*44});
  }
  function render(){
    let elapsed=(state.end-state.start)*15;
    const overnight=elapsed<0;
    if(overnight) elapsed+=1440;
    const total=Math.max(0,elapsed-state.pause);
    byId('total').textContent=`${Math.floor(total/60)}:${String(total%60).padStart(2,'0')}`;
    byId('totalWords').textContent=`${Math.floor(total/60)} uur en ${total%60} minuten`;
    const note=byId('note');
    note.hidden=state.pause<=elapsed;
    note.textContent='De pauze is langer dan de totale aanwezigheid.';
    byId('pauseLabel').textContent=state.pause<60?`${state.pause} minuten`:pauseLabel(state.pause);
    document.querySelectorAll('[data-pause]').forEach(btn=>{const selected=Number(btn.dataset.pause)===state.pause;btn.classList.toggle('active',selected);btn.setAttribute('aria-pressed',String(selected))});
    byId('customPause').value=String(state.pause);
  }
  const custom=byId('customPause');
  for(let min=0;min<=720;min+=15){const opt=document.createElement('option');opt.value=String(min);opt.textContent=pauseLabel(min);custom.appendChild(opt)}
  custom.addEventListener('change',()=>{state.pause=Number(custom.value);persist();render()});
  byId('pauseGrid').addEventListener('click',ev=>{const btn=ev.target.closest('[data-pause]');if(!btn)return;state.pause=Number(btn.dataset.pause);persist();render()});
  const themeButton=byId('themeToggle');
  function applyTheme(){const actual=state.theme==='auto'?(media.matches?'dark':'light'):state.theme;document.documentElement.dataset.theme=actual;document.querySelector('meta[name="theme-color"]').content=actual==='dark'?'#080e19':'#f5f7fb';themeButton.textContent=state.theme==='auto'?'◐':state.theme==='light'?'☀':'☾';themeButton.title=`Kleurmodus: ${state.theme==='auto'?'automatisch':state.theme==='light'?'licht':'donker'}. Tik om te wisselen.`;themeButton.setAttribute('aria-label',themeButton.title)}
  themeButton.addEventListener('click',()=>{state.theme={auto:'light',light:'dark',dark:'auto'}[state.theme];applyTheme();persist()});
  media.addEventListener?.('change',applyTheme);
  makeWheel('start');makeWheel('end');render();applyTheme();
  if('serviceWorker' in navigator && (location.protocol==='https:' || location.hostname==='localhost')){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}))}
})();
