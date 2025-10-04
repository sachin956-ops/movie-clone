
// BollywoodFlix v3 - offline with local posters
const DATA = [
  {id:1,title:'3 Idiots',year:2009,genres:['Drama','Comedy'],rating:8.4,type:'Movie',desc:'A fun but emotional journey about engineering students and the pressures of education.',poster:'assets/posters/3_idiots.jpg'},
  {id:2,title:'Dangal',year:2016,genres:['Drama','Sports'],rating:8.5,type:'Movie',desc:'Biographical sports drama about wrestler Mahavir Singh Phogat and his daughters.',poster:'assets/posters/dangal.jpg'},
  {id:3,title:'Sacred Games',year:2018,genres:['Crime','Drama'],rating:8.6,type:'Series',desc:'A gritty crime thriller based in Mumbai.',poster:'assets/posters/sacred_games.jpg'},
  {id:4,title:'RRR',year:2022,genres:['Action','Drama'],rating:7.8,type:'Movie',desc:'A fictional story of two Indian revolutionaries and their journey.',poster:'assets/posters/rrr.jpg'},
  {id:5,title:'Dev.D',year:2009,genres:['Drama','Romance'],rating:7.5,type:'Movie',desc:'An experimental take on the classic Devdas story.',poster:'assets/posters/devd.jpg'},
  {id:6,title:'Taare Zameen Par',year:2007,genres:['Drama','Family'],rating:8.4,type:'Movie',desc:'A moving story about a dyslexic child and an understanding teacher.',poster:'assets/posters/taare_zameen_par.jpg'},
  {id:7,title:'Kantara',year:2022,genres:['Action','Drama'],rating:8.1,type:'Movie',desc:'A regional blockbuster with folklore-inspired action.',poster:'assets/posters/kantara.jpg'},
  {id:8,title:'The Lunchbox',year:2013,genres:['Romance','Drama'],rating:7.8,type:'Movie',desc:'A tender Mumbai-based story of two lonely people connected via lunchboxes.',poster:'assets/posters/the_lunchbox.jpg'},
  {id:9,title:'PK',year:2014,genres:['Comedy','Drama'],rating:7.8,type:'Movie',desc:'A satirical comedy about an alien questioning society.',poster:'assets/posters/pk.jpg'},
  {id:10,title:'Bajirao Mastani',year:2015,genres:['History','Romance'],rating:7.2,type:'Movie',desc:'An epic historical romance with grand visuals.',poster:'assets/posters/bajirao_mastani.jpg'},
  {id:11,title:'Attack on Titan',year:2013,genres:['Action','Anime'],rating:8.8,type:'Anime',desc:'Humanity fights for survival against gigantic Titans.',poster:'assets/posters/attack_on_titan.jpg'},
  {id:12,title:'Your Name',year:2016,genres:['Romance','Anime'],rating:8.4,type:'Anime',desc:'A beautiful body-swap/time-travel romance.',poster:'assets/posters/your_name.jpg'},
  {id:13,title:'Pathaan',year:2023,genres:['Action','Thriller'],rating:6.8,type:'Movie',desc:'A high-octane spy actioner.',poster:'assets/posters/pathaan.jpg'},
  {id:14,title:'Andhadhun',year:2018,genres:['Thriller','Crime'],rating:8.3,type:'Movie',desc:'A dark thriller about a blind pianist entangled in a crime.',poster:'assets/posters/andhadhun.jpg'},
  {id:15,title:'Mirzapur',year:2018,genres:['Crime','Drama'],rating:8.4,type:'Series',desc:'Gritty crime series set in a lawless town.',poster:'assets/posters/mirzapur.jpg'}
];

// client-side router and rest of functionality (auth, watchlist, modal, filters, pagination)
// ... (same logic as previous version) ...

// For brevity in this generated file, we'll include full implementations similar to earlier message.
// Below is the full code (copied and adapted):

// Simple client-side router
const routes = {
  '/home': renderHome,
  '/login': renderAuth,
  '/watchlist': renderWatchlist
};

function getUsers(){return JSON.parse(localStorage.getItem('bf_users')||'[]')}
function saveUsers(u){localStorage.setItem('bf_users',JSON.stringify(u))}
function getSession(){return JSON.parse(localStorage.getItem('bf_session')||'null')}
function setSession(s){localStorage.setItem('bf_session',JSON.stringify(s))}
function logout(){localStorage.removeItem('bf_session');updateHeader();navigate('/home')}
function getWatchlist(username){return JSON.parse(localStorage.getItem('bf_watch_'+username)||'[]')}
function saveWatchlist(username,list){localStorage.setItem('bf_watch_'+username,JSON.stringify(list));updateWatchCount();}

function el(tag,cls){const d=document.createElement(tag);if(cls)d.className=cls;return d}
function navigate(path){location.hash='#'+path}

function updateHeader(){
  const session=getSession();
  const loginLink=document.getElementById('login-link');
  const greet=document.getElementById('user-greet');
  const logoutBtn=document.getElementById('logout-btn');
  if(session){
    loginLink.textContent='Profile';
    greet.textContent = 'Hi, '+session.username;
    logoutBtn.style.display='inline-block';
  } else {
    loginLink.textContent='Login / Signup';
    greet.textContent='';
    logoutBtn.style.display='none';
  }
  updateWatchCount();
}

function updateWatchCount(){
  const session=getSession();
  const badge=document.getElementById('watch-count');
  if(session){
    const list=getWatchlist(session.username)||[];
    if(list.length){badge.style.display='inline-block';badge.textContent=list.length}else badge.style.display='none';
  } else {badge.style.display='none'}
}

function render404(){
  const root=document.getElementById('view-root');root.innerHTML='';
  const box=el('div');box.className='auth-wrap';
  box.innerHTML=`<h2>404 — Page not found</h2><p class='muted'>We couldn't find the page you were looking for.</p><p><a class='link' href='#/home'>Go back to Home</a></p>`;
  root.appendChild(box);
}

function renderHome(){
  const root=document.getElementById('view-root');root.innerHTML='';
  const container=el('div');

  const toolbar=el('div','toolbar');
  const search=el('input','search');search.placeholder='Search title...';search.id='search-input';
  const genreSelect=el('select','select');genreSelect.id='genre-select';
  const typeSelect=el('select','select');typeSelect.id='type-select';
  const sortSelect=el('select','select');sortSelect.id='sort-select';

  genreSelect.innerHTML=`<option value='all'>All Genres</option>`+getAllGenres().map(g=>`<option value='${g}'>${g}</option>`).join('');
  typeSelect.innerHTML=`<option value='all'>All Types</option><option value='Movie'>Movie</option><option value='Series'>Series</option><option value='Anime'>Anime</option>`;
  sortSelect.innerHTML=`<option value='rating_desc'>Rating: High → Low</option><option value='rating_asc'>Rating: Low → High</option><option value='year_desc'>Year: New → Old</option><option value='year_asc'>Year: Old → New</option>`;

  toolbar.appendChild(search);toolbar.appendChild(genreSelect);toolbar.appendChild(typeSelect);toolbar.appendChild(sortSelect);

  container.appendChild(toolbar);

  const grid=el('div','grid');grid.id='cards-grid';
  container.appendChild(grid);

  const paginationWrap=el('div');paginationWrap.className='pagination';paginationWrap.id='pagination'
  container.appendChild(paginationWrap);

  root.appendChild(container);

  const state={q:'',genre:'all',type:'all',sort:'rating_desc',page:1,perPage:8}

  search.addEventListener('input',e=>{state.q=e.target.value;state.page=1;refresh()});
  genreSelect.addEventListener('change',e=>{state.genre=e.target.value;state.page=1;refresh()});
  typeSelect.addEventListener('change',e=>{state.type=e.target.value;state.page=1;refresh()});
  sortSelect.addEventListener('change',e=>{state.sort=e.target.value;state.page=1;refresh()});

  function refresh(){
    let items = DATA.filter(d=>{
      if(state.q && !d.title.toLowerCase().includes(state.q.toLowerCase())) return false;
      if(state.genre!=='all' && !d.genres.includes(state.genre)) return false;
      if(state.type!=='all' && d.type!==state.type) return false;
      return true;
    });
    if(state.sort==='rating_desc') items.sort((a,b)=>b.rating-a.rating);
    if(state.sort==='rating_asc') items.sort((a,b)=>a.rating-b.rating);
    if(state.sort==='year_desc') items.sort((a,b)=>b.year-a.year);
    if(state.sort==='year_asc') items.sort((a,b)=>a.year-b.year);

    const total = items.length;
    const pages = Math.max(1, Math.ceil(total/state.perPage));
    if(state.page>pages) state.page=pages;
    const start=(state.page-1)*state.perPage; const end=start+state.perPage;
    const pageItems=items.slice(start,end);

    grid.innerHTML='';
    for(const it of pageItems){
      const c=el('div','card');
      const poster=el('div','poster');
      poster.style.backgroundImage = `linear-gradient(180deg, rgba(0,0,0,0.25), transparent), url('${it.poster}')`;
      poster.innerHTML = `<div style='padding:10px;border-radius:6px;color:#fff;width:100%'>${it.title} <div style='font-size:12px;font-weight:600;color:rgba(255,255,255,0.9)'>${it.year}</div></div>`;
      c.appendChild(poster);
      const meta=el('div','meta');
      meta.innerHTML = `<div class='title'>${it.title}</div><div class='sub'>${it.genres.join(', ')} • ${it.type}</div>`;
      c.appendChild(meta);
      const rating=el('div','rating'); rating.textContent=it.rating; c.appendChild(rating);

      c.addEventListener('click',()=>openModal(it));
      c.addEventListener('contextmenu',e=>{e.preventDefault();toggleWatch(it);});

      grid.appendChild(c);
    }

    const pag=document.getElementById('pagination');
    pag.innerHTML='';
    for(let p=1;p<=pages;p++){
      const b=el('button','page-btn');b.textContent=p; if(p===state.page) b.classList.add('active');
      b.addEventListener('click',()=>{state.page=p;refresh()});
      pag.appendChild(b);
    }
    const prev=el('button','page-btn');prev.textContent='Prev';prev.addEventListener('click',()=>{if(state.page>1){state.page--;refresh()}});
    const next=el('button','page-btn');next.textContent='Next';next.addEventListener('click',()=>{if(state.page<pages){state.page++;refresh()}});
    pag.prepend(prev);pag.appendChild(next);
  }

  refresh();
}

function getAllGenres(){const set=new Set();DATA.forEach(d=>d.genres.forEach(g=>set.add(g)));return Array.from(set).sort();}

function openModal(item){
  const modal=document.getElementById('modal'); const content=document.getElementById('modal-content');
  content.innerHTML='';
  const grid=el('div','modal-grid');
  const left=el('div');left.innerHTML=`<div class='poster' style='height:360px;border-radius:8px;background-image:linear-gradient(180deg, rgba(0,0,0,0.25), transparent), url("${item.poster}");background-size:cover;background-position:center;'><div style='padding:14px;font-weight:800;color:#fff'>${item.title}</div></div>`;
  const right=el('div');
  right.innerHTML = `<h2 id="modal-title">${item.title} <small class='muted'>(${item.year})</small></h2>
    <p class='muted'>${item.genres.join(', ')} • ${item.type} • Rating: ${item.rating}</p>
    <p>${item.desc}</p>
    <div style='margin-top:8px'><button id='add-watch' class='btn'>Add to Watchlist</button> <button id='close-modal' class='ghost'>Close</button></div>`;
  grid.appendChild(left);grid.appendChild(right);
  content.appendChild(grid);
  modal.classList.add('show');
  document.getElementById('close-modal').addEventListener('click',()=>{modal.classList.remove('show')});
  document.getElementById('add-watch').addEventListener('click',()=>{toggleWatch(item);});
}
document.getElementById('modal-close').addEventListener('click',()=>{document.getElementById('modal').classList.remove('show')});
document.getElementById('modal').addEventListener('click',e=>{if(e.target.id==='modal') e.target.classList.remove('show')})

function toggleWatch(item){
  const session=getSession();
  if(!session){alert('Please login to manage your watchlist.');navigate('/login');return}
  const username=session.username;
  let list=getWatchlist(username);
  if(list.includes(item.id)){
    list=list.filter(x=>x!==item.id);
    alert(item.title+' removed from your watchlist');
  } else {list.push(item.id);alert(item.title+' added to your watchlist')}
  saveWatchlist(username,list);
}

function renderAuth(){
  const root=document.getElementById('view-root');root.innerHTML='';
  const box=el('div');box.className='auth-wrap';
  box.innerHTML = `<h2>Login / Sign Up</h2>
    <div style='display:flex;gap:12px;flex-wrap:wrap'>
    <div style='flex:1;min-width:260px'>
      <h3>Login</h3>
      <div class='field'><label>Username</label><input id='login-username' class='select' /></div>
      <div class='field'><label>Password</label><input id='login-password' class='select' type='password' /></div>
      <div><button id='do-login' class='btn'>Login</button></div>
    </div>
    <div style='flex:1;min-width:260px'>
      <h3>Sign Up</h3>
      <div class='field'><label>Choose username</label><input id='signup-username' class='select' /></div>
      <div class='field'><label>Password</label><input id='signup-password' class='select' type='password' /></div>
      <div><button id='do-signup' class='btn'>Create account</button></div>
    </div>
    </div>
    <p class='muted' style='margin-top:10px'>This is a frontend demo — accounts stored locally on your browser only.</p>`;
  root.appendChild(box);

  document.getElementById('do-signup').addEventListener('click',()=>{
    const u=document.getElementById('signup-username').value.trim();
    const p=document.getElementById('signup-password').value;
    if(!u||!p){alert('Provide username and password');return}
    const users=getUsers();
    if(users.find(x=>x.username===u)){alert('Username already exists');return}
    users.push({username:u,password:p});saveUsers(users);setSession({username:u});alert('Account created and logged in');updateHeader();navigate('/home');
  });

  document.getElementById('do-login').addEventListener('click',()=>{
    const u=document.getElementById('login-username').value.trim();
    const p=document.getElementById('login-password').value;
    if(!u||!p){alert('Provide username and password');return}
    const users=getUsers();const found=users.find(x=>x.username===u&&x.password===p);
    if(!found){alert('Invalid credentials');return}
    setSession({username:u});alert('Logged in');updateHeader();navigate('/home');
  });
}

function renderWatchlist(){
  const root=document.getElementById('view-root');root.innerHTML='';
  const session=getSession();
  const box=el('div');box.className='auth-wrap';
  if(!session){box.innerHTML=`<h2>Not logged in</h2><p class='muted'>You need to <a class='link' href='#/login'>login</a> to see your watchlist.</p>`;root.appendChild(box);return}
  const list=getWatchlist(session.username)||[];
  if(!list.length){box.innerHTML=`<h2>Your Watchlist is empty</h2><p class='muted'>Add titles to your watchlist by clicking a card and choosing "Add to Watchlist" or right-click any card.</p>`;root.appendChild(box);return}

  box.innerHTML=`<h2>${session.username}'s Watchlist</h2><div id='watch-grid' class='grid' style='margin-top:12px'></div>`;
  root.appendChild(box);
  const wg=document.getElementById('watch-grid');
  for(const id of list){
    const it=DATA.find(d=>d.id===id); if(!it) continue;
    const c=el('div','card');
    const poster=el('div','poster');poster.style.backgroundImage=`linear-gradient(180deg, rgba(0,0,0,0.25), transparent), url("${it.poster}")`;poster.style.backgroundSize='cover';poster.style.backgroundPosition='center';
    poster.innerHTML=`<div style='padding:10px;font-weight:800'>${it.title}</div>`;
    c.appendChild(poster);
    c.innerHTML += `<div class='meta'><div class='title'>${it.title}</div><div class='sub'>${it.genres.join(', ')} • ${it.type}</div></div>`;
    const rm=el('button','ghost');rm.textContent='Remove';rm.style.margin='8px';rm.addEventListener('click',()=>{toggleWatch(it);renderWatchlist()});
    c.appendChild(rm);
    c.addEventListener('click',()=>openModal(it));
    wg.appendChild(c);
  }
}

function router(){ const hash = location.hash.replace('#','') || '/home'; document.querySelectorAll('#main-nav a').forEach(a=>{a.classList.toggle('active', a.getAttribute('href')===('#'+hash))}); const fn = routes[hash]; if(fn) fn(); else render404(); }

window.addEventListener('hashchange',router);
window.addEventListener('load',()=>{document.getElementById('logout-btn').addEventListener('click',logout);updateHeader();router();});
