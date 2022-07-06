import { AppProps } from "next/app";
import '../styles/globals.css'
import { useRouter} from "next/router";

let prev

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter()
  console.info(':: app mounting', router)
  if (prev) {
    console.info(':: router === prev', router === prev)
    prev = router
  }

  return <Component {...pageProps} />
}

export default App
