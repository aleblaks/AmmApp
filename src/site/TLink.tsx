import { Link, useNavigate, type LinkProps } from 'react-router-dom'

// Link interno con transizione di pagina nativa (View Transitions): il browser fotografa la
// pagina vecchia, noi navighiamo, e quando la nuova è a schermo (routeCommitted, chiamata da
// App.tsx) le anima una nell'altra. Dove manca il supporto, o con "Riduci movimento", è un Link normale.
let done: (() => void) | undefined
export const routeCommitted = () => { done?.(); done = undefined }

export function TLink(props: LinkProps) {
  const navigate = useNavigate()
  return (
    <Link
      {...props}
      onClick={(e) => {
        props.onClick?.(e)
        if (
          e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey ||
          !document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches
        ) return
        e.preventDefault()
        // Da qui in poi l'icona e il telefono d'arrivo non rifanno l'ingresso (vedi [data-vt] in styles.css):
        // atterrano in volo, e ricomparire subito dopo sarebbe un doppione.
        document.documentElement.dataset.vt = ''
        document.startViewTransition(() => new Promise<void>((resolve) => {
          done = resolve
          navigate(props.to)
          // ponytail: se la pagina tarda (rete lenta) o è la stessa, si rinuncia all'animazione dopo 600 ms.
          setTimeout(resolve, 600)
        }))
      }}
    />
  )
}
