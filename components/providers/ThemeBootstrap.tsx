export default function ThemeBootstrap() {
  const code = `(()=>{let p='auto';try{const saved=localStorage.getItem('portfolio-theme-preference');if(saved==='light'||saved==='dark')p=saved}catch(e){}const h=new Date().getHours();document.documentElement.dataset.theme=p==='auto'?(h>=6&&h<18?'light':'dark'):p;document.documentElement.dataset.themePreference=p})()`
  return <script dangerouslySetInnerHTML={{ __html: code }} />
}
